import { LitElement, html, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  EightSleepCardConfig,
  HomeAssistant,
  LovelaceCard,
  SideData,
  RoomData,
} from './types';
import { cardStyles } from './styles/card-styles';
import {
  extractSideData,
  extractRoomData,
  formatTemperature,
} from './utils';

// Import sub-components
import './components/bed-side';
import './components/sleep-stats';
import './components/alarm-display';
import './editor';

@customElement('eight-sleep-card')
export class EightSleepCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config?: EightSleepCardConfig;
  @state() private _sidesData: SideData[] = [];
  @state() private _roomData: RoomData = { temperature: null, hasWater: true, isPriming: false };

  static styles = cardStyles;

  static getConfigElement() {
    return document.createElement('eight-sleep-card-editor');
  }

  static getStubConfig() {
    return {
      type: 'custom:eight-sleep-card',
      entity_prefix: 'eight_sleep',
      sides: ['left', 'right'],
      show_sleep_stats: true,
      show_alarms: true,
      show_room_info: true,
    };
  }

  setConfig(config: EightSleepCardConfig): void {
    if (!config.entity_prefix) {
      throw new Error('Please define entity_prefix');
    }

    this._config = {
      sides: ['left', 'right'],
      show_sleep_stats: true,
      show_alarms: true,
      show_room_info: true,
      compact: false,
      ...config,
    };

    if (this._config.compact) {
      this.setAttribute('compact', '');
    } else {
      this.removeAttribute('compact');
    }
  }

  getCardSize(): number {
    let size = 3; // Base size for bed display
    if (this._config?.show_sleep_stats !== false) size += 2;
    if (this._config?.show_alarms !== false) size += 1;
    if (this._config?.show_room_info !== false) size += 1;
    if (this._config?.compact) size = Math.ceil(size * 0.7);
    return size;
  }

  protected willUpdate(changedProps: PropertyValues): void {
    super.willUpdate(changedProps);

    if (changedProps.has('hass') && this.hass && this._config) {
      this._updateData();
    }
  }

  private _updateData(): void {
    if (!this.hass || !this._config) return;

    const prefix = this._config.entity_prefix;
    const sides = this._config.sides || ['left', 'right'];

    this._sidesData = sides.map(side => extractSideData(this.hass, prefix, side));
    this._roomData = extractRoomData(this.hass, prefix);
  }

  private _getOverallStatus(): { text: string; icon: string; class: string } {
    const heatingCount = this._sidesData.filter(s => s.hvacAction === 'heating').length;
    const coolingCount = this._sidesData.filter(s => s.hvacAction === 'cooling').length;

    if (heatingCount > 0 && coolingCount > 0) {
      return { text: 'Active', icon: '⚡', class: 'active' };
    } else if (heatingCount > 0) {
      return { text: 'Heating', icon: '🔥', class: 'heating active' };
    } else if (coolingCount > 0) {
      return { text: 'Cooling', icon: '❄️', class: 'cooling active' };
    } else if (this._sidesData.some(s => s.hvacAction === 'idle')) {
      return { text: 'Idle', icon: '⏸️', class: '' };
    }
    return { text: 'Off', icon: '⭘', class: '' };
  }

  private _renderRoomInfo() {
    if (this._config?.show_room_info === false) return nothing;

    const tempUnit = this._config?.temperature_unit ||
      (this.hass?.config.unit_system.temperature === '°C' ? 'celsius' : 'fahrenheit');

    return html`
      <div class="room-info">
        ${this._roomData.temperature !== null ? html`
          <div class="room-info-item">
            <span>🌡️</span>
            <span>Room: ${formatTemperature(this._roomData.temperature, tempUnit)}</span>
          </div>
        ` : nothing}
        ${!this._roomData.hasWater ? html`
          <div class="room-info-item warning">
            <span>💧</span>
            <span>Low Water</span>
          </div>
        ` : nothing}
        ${this._roomData.isPriming ? html`
          <div class="room-info-item">
            <span>🔄</span>
            <span>Priming</span>
          </div>
        ` : nothing}
      </div>
    `;
  }

  render() {
    if (!this._config || !this.hass) {
      return html`
        <ha-card>
          <div class="unavailable-message">
            Card not configured
          </div>
        </ha-card>
      `;
    }

    const status = this._getOverallStatus();
    const tempUnit = this._config.temperature_unit ||
      (this.hass.config.unit_system.temperature === '°C' ? 'celsius' : 'fahrenheit');

    return html`
      <ha-card>
        <div class="card-header">
          <div class="card-title">Eight Sleep Pod</div>
          <div class="status-badge ${status.class}">
            <span>${status.icon}</span>
            <span>${status.text}</span>
          </div>
        </div>

        <div class="bed-container">
          ${this._sidesData.map(
            sideData => html`
              <eight-sleep-bed-side
                .data=${sideData}
                .temperatureUnit=${tempUnit}
              ></eight-sleep-bed-side>
            `
          )}
        </div>

        ${this._config.show_sleep_stats !== false ? html`
          <eight-sleep-stats .sidesData=${this._sidesData}></eight-sleep-stats>
        ` : nothing}

        ${this._config.show_alarms !== false ? html`
          <eight-sleep-alarms .sidesData=${this._sidesData}></eight-sleep-alarms>
        ` : nothing}

        ${this._renderRoomInfo()}
      </ha-card>
    `;
  }
}

// Register card with Home Assistant
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'eight-sleep-card',
  name: 'Eight Sleep Card',
  description: 'A custom card for displaying Eight Sleep bed status and sleep data',
  preview: true,
});

declare global {
  interface HTMLElementTagNameMap {
    'eight-sleep-card': EightSleepCard;
  }
}
