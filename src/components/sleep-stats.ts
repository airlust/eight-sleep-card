import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SideData } from '../types';
import {
  formatTimeSlept,
  getSleepScoreColor,
} from '../utils';

@customElement('eight-sleep-stats')
export class SleepStatsComponent extends LitElement {
  @property({ type: Array }) sidesData: SideData[] = [];

  static styles = css`
    :host {
      display: block;
    }

    .sleep-stats {
      background: var(--secondary-background-color);
      border-radius: 12px;
      padding: 16px;
    }

    .sleep-stats-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    .sleep-stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px;
    }

    .sleep-side {
      padding: 12px;
      background: var(--card-background-color, #fff);
      border-radius: 8px;
    }

    .sleep-side-title {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
    }

    .sleep-score {
      font-size: 1.4em;
      font-weight: 500;
      margin-bottom: 4px;
    }

    .sleep-metric {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin: 4px 0;
    }

    .sleep-metric-icon {
      width: 16px;
      text-align: center;
      flex-shrink: 0;
    }

    .no-data {
      color: var(--disabled-text-color, #999);
      font-style: italic;
      text-align: center;
      padding: 12px;
    }
  `;

  private renderSideStats(data: SideData) {
    const hasAnyData = data.sleepScore !== null ||
                       data.timeSlept !== null ||
                       data.heartRate !== null;

    if (!hasAnyData) {
      return html`
        <div class="sleep-side">
          <div class="sleep-side-title">${data.label}</div>
          <div class="no-data">No sleep data</div>
        </div>
      `;
    }

    return html`
      <div class="sleep-side">
        <div class="sleep-side-title">${data.label}</div>
        ${data.sleepScore !== null ? html`
          <div class="sleep-score" style="color: ${getSleepScoreColor(data.sleepScore)}">
            Score: ${Math.round(data.sleepScore)}%
          </div>
        ` : nothing}
        ${data.timeSlept !== null ? html`
          <div class="sleep-metric">
            <span class="sleep-metric-icon">🛏️</span>
            <span>Slept: ${formatTimeSlept(data.timeSlept)}</span>
          </div>
        ` : nothing}
        ${data.heartRate !== null ? html`
          <div class="sleep-metric">
            <span class="sleep-metric-icon">❤️</span>
            <span>${Math.round(data.heartRate)} bpm</span>
          </div>
        ` : nothing}
        ${data.hrv !== null ? html`
          <div class="sleep-metric">
            <span class="sleep-metric-icon">📊</span>
            <span>HRV: ${Math.round(data.hrv)}ms</span>
          </div>
        ` : nothing}
        ${data.breathRate !== null ? html`
          <div class="sleep-metric">
            <span class="sleep-metric-icon">💨</span>
            <span>${Math.round(data.breathRate)}/min</span>
          </div>
        ` : nothing}
      </div>
    `;
  }

  render() {
    if (this.sidesData.length === 0) {
      return nothing;
    }

    return html`
      <div class="sleep-stats">
        <div class="sleep-stats-header">
          <span>🛏️</span>
          <span>Last Night</span>
        </div>
        <div class="sleep-stats-grid">
          ${this.sidesData.map(side => this.renderSideStats(side))}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eight-sleep-stats': SleepStatsComponent;
  }
}
