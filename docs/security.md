# 🔒 Security & Reliability

Given the critical nature of disaster management, IRIS is designed with zero-trust principles and high availability.

## Authentication & Authorization
- **JWT (JSON Web Tokens)**: All REST APIs and WebSocket connections require a valid bearer token.
- **Role-Based Access Control (RBAC)**: Only `Admin` roles can manually trigger mass alerts or reconfigure sensor nodes. Citizens have read-only hazard access.

## Data & Network Security
- **IoT Payload Encryption**: Sensor payloads sent to the ingest API are HMAC-signed to prevent malicious actors from injecting fake disaster data (causing panic).
- **Rate Limiting**: Implementation of `express-rate-limit` prevents DDoS attacks on the telemetry ingestion endpoints.

## Infrastructure Reliability
- **Offline Fallback**: Flutter mobile app caches the latest safe maps and emergency protocols locally.
- **DMS Queueing**: The Twilio DMS service uses in-memory queuing to handle mass SMS dispatching without hitting carrier rate limits.
