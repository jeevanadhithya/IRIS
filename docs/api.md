# 🔌 API & WebSocket Reference

The IRIS Backend acts as the central nervous system, exposing REST APIs for CRUD operations and a WebSocket server for real-time telemetry and alerts.

## RESTful Endpoints

### Auth
- `POST /api/auth/register` - Register a new citizen or responder.
- `POST /api/auth/login` - Authenticate and receive JWT.

### Sensors & Telemetry
- `GET /api/nodes` - Fetch all active sensor nodes and their metadata.
- `POST /api/telemetry/ingest` - (IoT Only) Ingest batch sensor readings.
- `GET /api/hazards/active` - Retrieve currently active AI-predicted hazards.

### DMS & Alerts
- `POST /api/alerts/broadcast` - Manually trigger an omni-channel alert (Admin).

## WebSocket Events (Socket.io)

### Client (Frontend/Mobile) Listens To:
- `sensor_update`: Emitted every 5 seconds with the latest node metrics.
- `hazard_alert`: High-priority event emitted when the AI detects a critical threshold.
- `sos_broadcast`: Emitted when a nearby mobile user triggers SOS.

### Client Emits:
- `join_region`: Subscribe to alerts for a specific geospatial bounding box.
- `trigger_sos`: Send distress signal with `lat/lng`.
