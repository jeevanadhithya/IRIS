# 🧪 Testing & Simulation

To ensure life-saving reliability, IRIS must be rigorously tested across its modules.

## Backend Unit Testing
- We utilize **Jest** and **Supertest** to validate API endpoints.
- Run `npm test` inside the Backend directory to execute the auth and telemetry validation suites.

## Simulating Disasters (Mock IoT)
Since we cannot create a real flood during the hackathon presentation, a simulation script can be used to inject artificial data.
- **Process**: Send POST requests to `/api/telemetry/ingest` with extremely high water pressure readings.
- This bypasses physical hardware, triggering the exact same WebSocket and AI inference pathways as a real event.

## Mobile Testing
- Flutter widget and integration tests are written in the `iris_mobile/test` folder.
- They validate that the UI responds correctly to WebSocket `hazard_alert` events and that the SOS button accurately fetches the device GPS coordinates before transmitting.
