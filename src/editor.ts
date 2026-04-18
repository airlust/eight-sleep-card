import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EightSleepCardConfig, HomeAssistant, LovelaceCardEditor } from './types';
import { editorStyles } from './styles/card-styles';

@customElement('eight-sleep-card-editor')
export class EightSleepCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config?: EightSleepCardConfig;

  static styles = editorStyles;

  setConfig(config: EightSleepCardConfig): void {
    this._config = config;
  }

  private _dispatchConfig(newConfig: EightSleepCardConfig): void {
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _valueChanged(ev: Event): void {
    if (!this._config) return;

    const target = ev.target as HTMLInputElement | HTMLSelectElement;
    const configKey = target.dataset.configKey as keyof EightSleepCardConfig;

    if (!configKey) return;

    let value: string | boolean;

    if (target.type === 'checkbox') {
      value = (target as HTMLInputElement).checked;
    } else {
      value = target.value;
    }

    const newConfig = {
      ...this._config,
      [configKey]: value,
    };

    this._dispatchConfig(newConfig);
  }

  private _sideValueChanged(ev: Event): void {
    if (!this._config) return;

    const target = ev.target as HTMLInputElement;
    const side = target.dataset.side as 'left' | 'right';
    const field = target.dataset.field as 'prefix' | 'label';

    if (!side || !field) return;

    const currentSideConfig = this._config[side] || { prefix: '', label: '' };
    const newSideConfig = {
      ...currentSideConfig,
      [field]: target.value,
    };

    // If prefix is empty, remove the side config entirely
    if (!newSideConfig.prefix) {
      const { [side]: _, ...rest } = this._config;
      this._dispatchConfig(rest as EightSleepCardConfig);
    } else {
      this._dispatchConfig({
        ...this._config,
        [side]: newSideConfig,
      });
    }
  }

  render() {
    if (!this._config) {
      return html`<div>No configuration</div>`;
    }

    return html`
      <div class="editor-container">
        <div class="editor-row">
          <label class="editor-label">Left Side</label>
          <input
            type="text"
            class="editor-input"
            .value=${this._config.left?.prefix || ''}
            data-side="left"
            data-field="prefix"
            @input=${this._sideValueChanged}
            placeholder="Entity prefix (e.g., ben_eight_sleep)"
            style="margin-bottom: 4px;"
          />
          <input
            type="text"
            class="editor-input"
            .value=${this._config.left?.label || ''}
            data-side="left"
            data-field="label"
            @input=${this._sideValueChanged}
            placeholder="Display label (e.g., Ben)"
          />
        </div>

        <div class="editor-row">
          <label class="editor-label">Right Side</label>
          <input
            type="text"
            class="editor-input"
            .value=${this._config.right?.prefix || ''}
            data-side="right"
            data-field="prefix"
            @input=${this._sideValueChanged}
            placeholder="Entity prefix (e.g., partner_eight_sleep)"
            style="margin-bottom: 4px;"
          />
          <input
            type="text"
            class="editor-input"
            .value=${this._config.right?.label || ''}
            data-side="right"
            data-field="label"
            @input=${this._sideValueChanged}
            placeholder="Display label (e.g., Partner)"
          />
        </div>

        <div class="editor-row">
          <label class="editor-label">Hub Prefix (for room data)</label>
          <input
            type="text"
            class="editor-input"
            .value=${this._config.hub_prefix || ''}
            data-config-key="hub_prefix"
            @input=${this._valueChanged}
            placeholder="eight_sleep_pod"
          />
          <small style="color: var(--secondary-text-color); display: block; margin-top: 4px;">
            Used for room temperature and water level entities
          </small>
        </div>

        <div class="editor-row">
          <label class="editor-label">Temperature Unit</label>
          <select
            class="editor-select"
            .value=${this._config.temperature_unit || ''}
            data-config-key="temperature_unit"
            @change=${this._valueChanged}
          >
            <option value="">Auto (from HA settings)</option>
            <option value="fahrenheit">Fahrenheit</option>
            <option value="celsius">Celsius</option>
          </select>
        </div>

        <div class="editor-row">
          <label class="editor-label">Display Options</label>
          <div class="editor-checkbox-row">
            <input
              type="checkbox"
              id="show-sleep-stats"
              .checked=${this._config.show_sleep_stats !== false}
              data-config-key="show_sleep_stats"
              @change=${this._valueChanged}
            />
            <label for="show-sleep-stats">Show Sleep Statistics</label>
          </div>
          <div class="editor-checkbox-row">
            <input
              type="checkbox"
              id="show-alarms"
              .checked=${this._config.show_alarms !== false}
              data-config-key="show_alarms"
              @change=${this._valueChanged}
            />
            <label for="show-alarms">Show Alarms</label>
          </div>
          <div class="editor-checkbox-row">
            <input
              type="checkbox"
              id="show-room-info"
              .checked=${this._config.show_room_info !== false}
              data-config-key="show_room_info"
              @change=${this._valueChanged}
            />
            <label for="show-room-info">Show Room Info</label>
          </div>
          <div class="editor-checkbox-row">
            <input
              type="checkbox"
              id="compact"
              .checked=${this._config.compact === true}
              data-config-key="compact"
              @change=${this._valueChanged}
            />
            <label for="compact">Compact Mode</label>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eight-sleep-card-editor': EightSleepCardEditor;
  }
}
