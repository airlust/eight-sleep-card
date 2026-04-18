# Eight Sleep Card

A custom Home Assistant Lovelace card for displaying Eight Sleep bed status, temperature control, and sleep data.

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
4. Add `https://github.com/airlust/eight-sleep-card` as a "Dashboard" repository
5. Install "Eight Sleep Card"
6. Restart Home Assistant

### Manual Installation

1. Download `eight-sleep-card.js` from the [latest release](https://github.com/airlust/eight-sleep-card/releases)
2. Copy to `/config/www/eight-sleep-card.js`
3. Add resource in Home Assistant:
   - Go to Settings → Dashboards → Resources
   - Add `/local/eight-sleep-card.js` as JavaScript Module

## Configuration

### Individual Side Prefixes (Recommended)

Use this when your left and right sides have different entity prefixes:

```yaml
type: custom:eight-sleep-card
left:
  prefix: ben_eight_sleep       # Your left side entity prefix
  label: Ben                    # Display name (optional)
right:
  prefix: partner_eight_sleep   # Your right side entity prefix
  label: Partner                # Display name (optional)
hub_prefix: eight_sleep_pod     # Hub entities (room temp, water level)
```

### Single Side Only

Show just one side of the bed:

```yaml
type: custom:eight-sleep-card
left:
  prefix: ben_eight_sleep
  label: Ben
hub_prefix: eight_sleep_pod
```

### Full Configuration

```yaml
type: custom:eight-sleep-card
left:
  prefix: ben_eight_sleep
  label: Ben
right:
  prefix: partner_eight_sleep
  label: Partner
hub_prefix: eight_sleep_pod
show_sleep_stats: true
show_alarms: true
show_room_info: true
temperature_unit: fahrenheit  # or celsius
compact: false
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `left` | object | - | Left side configuration |
| `left.prefix` | string | - | Entity prefix for left side |
| `left.label` | string | "Left Side" | Display label for left side |
| `right` | object | - | Right side configuration |
| `right.prefix` | string | - | Entity prefix for right side |
| `right.label` | string | "Right Side" | Display label for right side |
| `hub_prefix` | string | - | Prefix for hub/room entities |
| `show_sleep_stats` | boolean | `true` | Show sleep statistics section |
| `show_alarms` | boolean | `true` | Show alarm times |
| `show_room_info` | boolean | `true` | Show room temperature and status |
| `temperature_unit` | string | auto | `fahrenheit` or `celsius` (defaults to HA settings) |
| `compact` | boolean | `false` | Use compact display mode |

## Finding Your Entity Prefixes

1. Go to **Settings → Devices & Services → Entities**
2. Search for "eight" or "sleep"
3. Look at your entity IDs:
   - `sensor.ben_eight_sleep_bed_temperature` → prefix is `ben_eight_sleep`
   - `sensor.partner_eight_sleep_bed_temperature` → prefix is `partner_eight_sleep`
   - `sensor.eight_sleep_pod_room_temperature` → hub_prefix is `eight_sleep_pod`

The prefix is everything before `_bed_temperature`, `_current_heart_rate`, etc.

## Required Entities

The card auto-discovers entities based on your prefixes.

### Per-Side Sensors (`sensor.{prefix}_*`)
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
- `binary_sensor.{prefix}_bed_presence` - Bed occupancy

### Per-Side Climate Entities
- `climate.{prefix}` - HVAC state (heating/cooling/idle/off)

### Hub Sensors (`sensor.{hub_prefix}_*`)
- `room_temperature` - Ambient temperature
- `has_water` - Water level status
- `is_priming` - Priming status

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
