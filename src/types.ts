import { LitElement } from 'lit';

export interface SideConfig {
  prefix: string;
  label?: string;  // Optional custom label (defaults to "Left Side" / "Right Side")
}

export interface EightSleepCardConfig {
  type: string;
  // New: individual prefixes per side
  left?: SideConfig;
  right?: SideConfig;
  hub_prefix?: string;  // For room-level entities
  // Legacy: single prefix for all (still supported)
  entity_prefix?: string;
  show_sleep_stats?: boolean;
  show_alarms?: boolean;
  show_room_info?: boolean;
  temperature_unit?: 'fahrenheit' | 'celsius';
  compact?: boolean;
}

export interface SideData {
  side: 'left' | 'right';
  label: string;
  bedTemperature: number | null;
  targetTemperature: number | null;
  heatingLevel: number | null;
  hvacAction: 'heating' | 'cooling' | 'idle' | 'off' | null;
  sleepScore: number | null;
  timeSlept: number | null;
  heartRate: number | null;
  hrv: number | null;
  breathRate: number | null;
  nextAlarm: string | null;
  presence: boolean;
}

export interface RoomData {
  temperature: number | null;
  hasWater: boolean;
  isPriming: boolean;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  config: {
    unit_system: {
      temperature: string;
    };
  };
  themes: {
    darkMode: boolean;
  };
  callService: (
    domain: string,
    service: string,
    data?: Record<string, unknown>
  ) => Promise<void>;
}

export interface LovelaceCard extends LitElement {
  hass?: HomeAssistant;
  setConfig(config: EightSleepCardConfig): void;
  getCardSize(): number;
}

export interface LovelaceCardEditor extends LitElement {
  hass?: HomeAssistant;
  setConfig(config: EightSleepCardConfig): void;
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
    }>;
  }
}
