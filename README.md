# Eight Sleep Card

A custom Home Assistant Lovelace card for displaying Eight Sleep bed status, temperature control, and sleep data.

![Eight Sleep Card Preview](preview.png)

## Features

- **Real-time temperature display** - Shows current and target temperatures for each side
- **Temperature gradient visualization** - Blue (cool) to red (warm) background based on heating level
- **Animated status indicators** - Pulse animation when actively heating or cooling
- **Presence detection** - Shows when someone is in bed
- **Sleep statistics** - Previous night's sleep score, duration, heart rate, HRV, and breath rate
- **Alarm display** - Next alarm time for each side
- **Room information** - Ambient temperature and water level warnings
- **Dark/light theme support** - Uses Home Assistant theme variables

## Installation

### HACS (Recommended)

1. Open HACS in Home Assistant
2. Go to "Frontend" section
3. Click the three dots menu and select "Custom repositories"
4. Add `https://github.com/yourusername/eight-sleep-card` as a "Lovelace" repository
5. Install "Eight Sleep Card"
6. Restart Home Assistant

### Manual Installation

1. Download `eight-sleep-card.js` from the [latest release](https://github.com/yourusername/eight-sleep-card/releases)
2. Copy to `/config/www/eight-sleep-card.js`
3. Add resource in Home Assistant:
   - Go to Settings → Dashboards → Resources
   - Add `/local/eight-sleep-card.js` as JavaScript Module

## Configuration

### Minimal Configuration

```yaml
type: custom:eight-sleep-card
entity_prefix: eight_sleep
```

### Full Configuration

```yaml
type: custom:eight-sleep-card
entity_prefix: eight_sleep
sides:
  - left
  - right
show_sleep_stats: true
show_alarms: true
show_room_info: true
temperature_unit: fahrenheit  # or celsius
compact: false
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity_prefix` | string | **Required** | The prefix for your Eight Sleep entities |
| `sides` | array | `['left', 'right']` | Which bed sides to display |
| `show_sleep_stats` | boolean | `true` | Show sleep statistics section |
| `show_alarms` | boolean | `true` | Show alarm times |
| `show_room_info` | boolean | `true` | Show room temperature and status |
| `temperature_unit` | string | auto | `fahrenheit` or `celsius` (defaults to HA settings) |
| `compact` | boolean | `false` | Use compact display mode |

## Required Entities

The card auto-discovers entities based on your `entity_prefix`. Ensure these entities exist:

### Per-Side Sensors (`sensor.{prefix}_{left|right}_*`)
- `bed_temperature` - Current bed temperature
- `target_heating_temp` - Target temperature
- `bed_state` - Heating level (-100 to +100)
- `current_sleep_quality_score` - Sleep score percentage
- `time_slept` - Sleep duration in seconds
- `current_heart_rate` - Average heart rate
- `current_hrv` - Heart rate variability
- `current_breath_rate` - Breath rate
- `next_alarm` - Next alarm timestamp

### Per-Side Binary Sensors
- `binary_sensor.{prefix}_{left|right}_bed_presence` - Bed occupancy

### Per-Side Climate Entities
- `climate.{prefix}_{left|right}` - HVAC state (heating/cooling/idle/off)

### Room-Level Sensors
- `sensor.{prefix}_room_temperature` - Ambient temperature
- `sensor.{prefix}_has_water` - Water level status
- `sensor.{prefix}_is_priming` - Priming status

## Development

### Setup

```bash
npm install
```

### Build

```bash
npm run build
```

### Development Server

```bash
npm run dev
```

## License

MIT
