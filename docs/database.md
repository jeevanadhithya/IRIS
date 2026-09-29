# 🗄️ Database Design

IRIS utilizes **MongoDB** for its schema flexibility, making it ideal for storing unstructured time-series telemetry and GeoJSON data.

## Core Collections

### 1. `Users`
Stores authentication and profile data.
- `role`: Citizen, Responder, Admin.
- `location`: GeoJSON Point (last known location for targeted alerts).

### 2. `Nodes`
Represents physical IoT sensor installations.
- `node_id`: Unique MAC or UUID.
- `location`: GeoJSON Point (Lat/Lng).
- `status`: Active, Offline, Maintenance.
- `capabilities`: Array (e.g., `["moisture", "temperature", "vibration"]`).

### 3. `Telemetry` (Time-Series)
High-throughput collection for sensor readings.
- `node_id`: Reference to Node.
- `timestamp`: ISO Date.
- `metrics`: Object containing numerical readings.

### 4. `Hazards`
AI-generated or admin-verified disaster events.
- `type`: Flood, Landslide, Forest Fire.
- `severity`: 1 (Low) to 5 (Critical).
- `polygon`: GeoJSON Polygon representing the affected area.
- `active`: Boolean.
