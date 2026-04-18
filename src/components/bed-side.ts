import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SideData } from '../types';
import {
  formatTemperature,
  getTemperatureGradient,
} from '../utils';

@customElement('eight-sleep-bed-side')
export class BedSideComponent extends LitElement {
  @property({ type: Object }) data!: SideData;
  @property({ type: String }) temperatureUnit: 'fahrenheit' | 'celsius' = 'fahrenheit';

  static styles = css`
    :host {
      display: block;
      flex: 1;
    }

    .bed-side {
      border-radius: 12px;
      padding: 16px;
      text-align: center;
      transition: background 0.3s ease;
      border: 1px solid var(--divider-color, #e0e0e0);
      position: relative;
      overflow: hidden;
      height: 100%;
      box-sizing: border-box;
    }

    .bed-side.has-presence::before {
      content: '👤';
      position: absolute;
      top: 8px;
      right: 8px;
      font-size: 14px;
    }

    .bed-side-label {
      font-size: 0.8em;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
    }

    .temperature-display {
      font-size: 2em;
      font-weight: 300;
      color: var(--primary-text-color);
      margin: 8px 0;
    }

    .temperature-indicator {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }

    .temperature-indicator.warming {
      color: #ef5350;
      animation: pulse 2s infinite;
    }

    .temperature-indicator.cooling {
      color: #42a5f5;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }

    .target-temp {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin-top: 8px;
    }
  `;

  private getIndicatorClass(): string {
    if (this.data.hvacAction === 'heating') return 'warming';
    if (this.data.hvacAction === 'cooling') return 'cooling';
    return '';
  }

  private getIndicatorText(): string {
    if (this.data.hvacAction === 'heating') return '(warming ↑)';
    if (this.data.hvacAction === 'cooling') return '(cooling ↓)';
    if (this.data.hvacAction === 'idle') return '(idle)';
    if (this.data.hvacAction === 'off') return '(off)';
    return '';
  }

  render() {
    const bgColor = getTemperatureGradient(this.data.heatingLevel);

    return html`
      <div
        class="bed-side ${this.data.presence ? 'has-presence' : ''}"
        style="background: ${bgColor}"
      >
        <div class="bed-side-label">${this.data.label}</div>
        <div class="temperature-display">
          ${formatTemperature(this.data.bedTemperature, this.temperatureUnit)}
        </div>
        ${this.data.hvacAction ? html`
          <div class="temperature-indicator ${this.getIndicatorClass()}">
            ${this.getIndicatorText()}
          </div>
        ` : nothing}
        ${this.data.targetTemperature !== null ? html`
          <div class="target-temp">
            Target: ${formatTemperature(this.data.targetTemperature, this.temperatureUnit)}
          </div>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eight-sleep-bed-side': BedSideComponent;
  }
}
