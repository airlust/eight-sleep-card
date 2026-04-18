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

  private _valueChanged(ev: Event): void {
    if (!this._config) return;

    const target = ev.target as HTMLInputElement | HTMLSelectElement;
    const configKey = target.dataset.configKey as keyof EightSleepCardConfig;

    if (!configKey) return;

    let value: string | boolean | string[];

    if (target.type === 'checkbox') {
      value = (target as HTMLInputElement).checked;
    } else {
      value = target.value;
    }

    const newConfig = {
      ...this._config,
      [configKey]: value,
    };

    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _sidesChanged(ev: Event): void {
    if (!this._config) return;

    const target = ev.target as HTMLInputElement;
    const side = target.dataset.side as 'left' | 'right';
    const checked = target.checked;

    const currentSides = this._config.sides || ['left', 'right'];
    let newSides: ('left' | 'right')[];

    if (checked && !currentSides.includes(side)) {
      newSides = [...currentSides, side].sort();
    } else if (!checked && currentSides.includes(side)) {
      newSides = currentSides.filter(s => s !== side);
    } else {
      return;
    }

    // Ensure at least one side is selected
    if (newSides.length === 0) {
      return;
    }

    const newConfig = {
      ...this._config,
      sides: newSides,
    };

    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    if (!this._config) {
      return html`<div>No configuration</div>`;
    }

    const sides = this._config.sides || ['left', 'right'];

    return html`
      <div class="editor-container">
        <div class="editor-row">
          <label class="editor-label">Entity Prefix</label>
          <input
            type="text"
            class="editor-input"
            .value=${this._config.entity_prefix || ''}
            data-config-key="entity_prefix"
            @input=${this._valueChanged}
            placeholder="eight_sleep"
          />
          <small style="color: var(--secondary-text-color); display: block; margin-top: 4px;">
            The prefix used for your Eight Sleep entities (e.g., "eight_sleep")
          </small>
        </div>

        <div class="editor-row">
          <label class="editor-label">Sides to Display</label>
          <div class="editor-checkbox-row">
            <input
              type="checkbox"
              id="side-left"
              .checked=${sides.includes('left')}
              data-side="left"
              @change=${this._sidesChanged}
            />
            <label for="side-left">Left</label>
          </div>
          <div class="editor-checkbox-row">
            <input
              type="checkbox"
              id="side-right"
              .checked=${sides.includes('right')}
              data-side="right"
              @change=${this._sidesChanged}
            />
            <label for="side-right">Right</label>
          </div>
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
