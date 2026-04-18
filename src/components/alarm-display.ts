import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SideData } from '../types';
import { formatAlarmTime, capitalize } from '../utils';

@customElement('eight-sleep-alarms')
export class AlarmDisplayComponent extends LitElement {
  @property({ type: Array }) sidesData: SideData[] = [];

  static styles = css`
    :host {
      display: block;
    }

    .alarms-section {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      padding: 12px;
      background: var(--secondary-background-color);
      border-radius: 8px;
      font-size: 0.9em;
      color: var(--secondary-text-color);
    }

    .alarm-icon {
      flex-shrink: 0;
    }

    .alarm-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .alarm-divider {
      color: var(--divider-color);
    }

    .no-alarms {
      font-style: italic;
    }
  `;

  render() {
    const alarmsWithData = this.sidesData.filter(s => s.nextAlarm !== null);

    if (alarmsWithData.length === 0) {
      return html`
        <div class="alarms-section">
          <span class="alarm-icon">⏰</span>
          <span class="no-alarms">No alarms set</span>
        </div>
      `;
    }

    return html`
      <div class="alarms-section">
        <span class="alarm-icon">⏰</span>
        <span>Alarms:</span>
        ${alarmsWithData.map((side, index) => html`
          ${index > 0 ? html`<span class="alarm-divider">│</span>` : nothing}
          <span class="alarm-item">
            <span>${capitalize(side.side)}</span>
            <span>${formatAlarmTime(side.nextAlarm)}</span>
          </span>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eight-sleep-alarms': AlarmDisplayComponent;
  }
}
