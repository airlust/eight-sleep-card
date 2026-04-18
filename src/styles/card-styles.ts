import { css } from 'lit';

export const cardStyles = css`
  :host {
    --eight-sleep-primary: var(--primary-color, #03a9f4);
    --eight-sleep-warm: #ef5350;
    --eight-sleep-cool: #42a5f5;
    --eight-sleep-neutral: var(--secondary-text-color, #727272);
  }

  ha-card {
    padding: 16px;
    box-sizing: border-box;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .card-title {
    font-size: 1.2em;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .status-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.85em;
    background: var(--secondary-background-color);
  }

  .status-badge.heating {
    background: rgba(239, 83, 80, 0.15);
    color: var(--eight-sleep-warm);
  }

  .status-badge.cooling {
    background: rgba(66, 165, 245, 0.15);
    color: var(--eight-sleep-cool);
  }

  .status-badge.active {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  .bed-container {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  }

  .bed-side {
    flex: 1;
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    transition: background 0.3s ease;
    border: 1px solid var(--divider-color, #e0e0e0);
    position: relative;
    overflow: hidden;
  }

  .bed-side.has-presence::before {
    content: '';
    position: absolute;
    top: 8px;
    right: 8px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--success-color, #4caf50);
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
    color: var(--eight-sleep-warm);
  }

  .temperature-indicator.cooling {
    color: var(--eight-sleep-cool);
  }

  .target-temp {
    font-size: 0.85em;
    color: var(--secondary-text-color);
    margin-top: 8px;
  }

  .sleep-stats {
    background: var(--secondary-background-color);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
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
    grid-template-columns: 1fr 1fr;
    gap: 16px;
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
  }

  .alarms-section {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    background: var(--secondary-background-color);
    border-radius: 8px;
    font-size: 0.9em;
    color: var(--secondary-text-color);
  }

  .alarm-divider {
    color: var(--divider-color);
  }

  .room-info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 12px;
    font-size: 0.85em;
    color: var(--secondary-text-color);
  }

  .room-info-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .warning {
    color: var(--warning-color, #ff9800);
  }

  .error {
    color: var(--error-color, #f44336);
  }

  /* Compact mode */
  :host([compact]) .sleep-stats {
    padding: 12px;
  }

  :host([compact]) .bed-side {
    padding: 12px;
  }

  :host([compact]) .temperature-display {
    font-size: 1.6em;
  }

  :host([compact]) .sleep-stats-grid {
    gap: 8px;
  }

  /* Unavailable state */
  .unavailable {
    opacity: 0.5;
  }

  .unavailable-message {
    text-align: center;
    padding: 24px;
    color: var(--secondary-text-color);
  }
`;

export const editorStyles = css`
  .editor-container {
    padding: 16px;
  }

  .editor-row {
    margin-bottom: 16px;
  }

  .editor-label {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
  }

  .editor-input {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
  }

  .editor-checkbox-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  .editor-select {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
  }
`;
