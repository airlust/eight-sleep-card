import { HomeAssistant, SideData, RoomData } from './types';

/**
 * Format seconds into human-readable time (e.g., "7h 23m")
 */
export function formatTimeSlept(seconds: number | null): string {
  if (seconds === null || seconds === undefined || isNaN(seconds)) {
    return '--';
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

/**
 * Convert temperature based on user preference
 */
export function formatTemperature(
  value: number | null,
  unit: 'fahrenheit' | 'celsius',
  hass?: HomeAssistant
): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '--°';
  }

  const targetUnit = unit || hass?.config.unit_system.temperature || 'fahrenheit';
  const symbol = targetUnit === 'celsius' ? '°C' : '°F';

  return `${Math.round(value)}${symbol}`;
}

/**
 * Get color for sleep score
 */
export function getSleepScoreColor(score: number | null): string {
  if (score === null) return 'var(--disabled-text-color, #999)';
  if (score >= 80) return 'var(--success-color, #4caf50)';
  if (score >= 60) return 'var(--warning-color, #ff9800)';
  return 'var(--error-color, #f44336)';
}

/**
 * Get temperature gradient color based on heating level (-100 to +100)
 */
export function getTemperatureGradient(level: number | null): string {
  if (level === null) return 'var(--card-background-color, #fff)';

  // Normalize to 0-1 range where 0 = coldest, 1 = hottest
  const normalized = (level + 100) / 200;

  if (normalized < 0.4) {
    // Cool tones (blue)
    const intensity = 1 - normalized / 0.4;
    return `rgba(66, 165, 245, ${0.1 + intensity * 0.3})`;
  } else if (normalized > 0.6) {
    // Warm tones (red/orange)
    const intensity = (normalized - 0.6) / 0.4;
    return `rgba(239, 83, 80, ${0.1 + intensity * 0.3})`;
  }

  // Neutral
  return 'var(--card-background-color, #fff)';
}

/**
 * Parse entity state to number, handling 'unavailable' and 'unknown'
 */
export function parseEntityState(state: string | undefined): number | null {
  if (!state || state === 'unavailable' || state === 'unknown') {
    return null;
  }
  const num = parseFloat(state);
  return isNaN(num) ? null : num;
}

/**
 * Get entity state from Home Assistant
 */
export function getEntityState(
  hass: HomeAssistant | undefined,
  entityId: string
): string | null {
  if (!hass?.states[entityId]) return null;
  const state = hass.states[entityId].state;
  if (state === 'unavailable' || state === 'unknown') return null;
  return state;
}

/**
 * Get entity attribute from Home Assistant
 */
export function getEntityAttribute<T>(
  hass: HomeAssistant | undefined,
  entityId: string,
  attribute: string
): T | null {
  if (!hass?.states[entityId]) return null;
  return (hass.states[entityId].attributes[attribute] as T) ?? null;
}

/**
 * Extract side data from Home Assistant entities
 * @param hass - Home Assistant instance
 * @param prefix - Entity prefix (e.g., "ben_eight_sleep" for sensor.ben_eight_sleep_bed_temperature)
 * @param side - Which side this represents (for internal tracking)
 * @param label - Display label (e.g., "Ben" or "Left Side")
 */
export function extractSideData(
  hass: HomeAssistant | undefined,
  prefix: string,
  side: 'left' | 'right',
  label?: string
): SideData {
  // The prefix is the full entity prefix - entities are like sensor.{prefix}_bed_temperature
  const sensorPrefix = `sensor.${prefix}`;
  const binaryPrefix = `binary_sensor.${prefix}`;
  const climateEntity = `climate.${prefix}`;

  const hvacActionRaw = getEntityAttribute<string>(hass, climateEntity, 'hvac_action');
  let hvacAction: SideData['hvacAction'] = null;
  if (hvacActionRaw === 'heating' || hvacActionRaw === 'cooling' ||
      hvacActionRaw === 'idle' || hvacActionRaw === 'off') {
    hvacAction = hvacActionRaw;
  }

  return {
    side,
    label: label || capitalize(side) + ' Side',
    bedTemperature: parseEntityState(getEntityState(hass, `${sensorPrefix}_bed_temperature`) ?? undefined),
    targetTemperature: parseEntityState(getEntityState(hass, `${sensorPrefix}_target_heating_temp`) ?? undefined),
    heatingLevel: parseEntityState(getEntityState(hass, `${sensorPrefix}_bed_state`) ?? undefined),
    hvacAction,
    sleepScore: parseEntityState(getEntityState(hass, `${sensorPrefix}_current_sleep_quality_score`) ?? undefined),
    timeSlept: parseEntityState(getEntityState(hass, `${sensorPrefix}_time_slept`) ?? undefined),
    heartRate: parseEntityState(getEntityState(hass, `${sensorPrefix}_current_heart_rate`) ?? undefined),
    hrv: parseEntityState(getEntityState(hass, `${sensorPrefix}_current_hrv`) ?? undefined),
    breathRate: parseEntityState(getEntityState(hass, `${sensorPrefix}_current_breath_rate`) ?? undefined),
    nextAlarm: getEntityState(hass, `${sensorPrefix}_next_alarm`),
    presence: getEntityState(hass, `${binaryPrefix}_bed_presence`) === 'on',
  };
}

/**
 * Extract room-level data from Home Assistant entities
 */
export function extractRoomData(
  hass: HomeAssistant | undefined,
  prefix: string
): RoomData {
  const sensorPrefix = `sensor.${prefix}`;

  return {
    temperature: parseEntityState(getEntityState(hass, `${sensorPrefix}_room_temperature`) ?? undefined),
    hasWater: getEntityState(hass, `${sensorPrefix}_has_water`) === 'on' ||
              getEntityState(hass, `${sensorPrefix}_has_water`) === 'true',
    isPriming: getEntityState(hass, `${sensorPrefix}_is_priming`) === 'on' ||
               getEntityState(hass, `${sensorPrefix}_is_priming`) === 'true',
  };
}

/**
 * Format alarm time from ISO timestamp
 */
export function formatAlarmTime(isoString: string | null): string {
  if (!isoString) return '--';

  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '--';

    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return '--';
  }
}

/**
 * Get HVAC action display text and icon
 */
export function getHvacDisplay(action: SideData['hvacAction']): { text: string; icon: string } {
  switch (action) {
    case 'heating':
      return { text: 'Heating', icon: '🔥' };
    case 'cooling':
      return { text: 'Cooling', icon: '❄️' };
    case 'idle':
      return { text: 'Idle', icon: '⏸️' };
    case 'off':
      return { text: 'Off', icon: '⭘' };
    default:
      return { text: '--', icon: '' };
  }
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
