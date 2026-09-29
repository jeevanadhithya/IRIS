# 🎬 SIH 2026 Evaluation Demo Flow

This guide outlines the step-by-step narrative for demonstrating IRIS to hackathon evaluators.

## Step 1: The Command Center Overview (2 mins)
- Open the **Vite + Cesium Web Dashboard**.
- Show the 3D map of India with green (healthy) sensor nodes.
- Explain the UI: Real-time telemetry graphs, node status, and the Gemini AI chat assistant.

## Step 2: Injecting the Hazard (1 min)
- Use Postman or the provided simulator script to rapidly inject critical water-level data into a specific node cluster in a vulnerable region (e.g., Assam).
- Explain how this mimics a sudden cloudburst.

## Step 3: Edge & Cloud AI Activation (1 min)
- Show the dashboard instantly flashing red.
- Explain how the **TinyML** edge node caught the spike first, and the **GNN Model** mapped the hazard polygon.
- Demonstrate the 3D hazard overlay appearing in Cesium.

## Step 4: Dynamic Evacuation & Alerts (2 mins)
- Switch to the **Flutter Mobile App** running on an emulator/device.
- Show the Push Notification arriving.
- Open the app to view the dynamic safe route (avoiding the red hazard zone).
- Show the **WhatsApp DMS Bot** receiving the exact same alert with GPS coordinates.

## Step 5: SOS & Community Response (1 min)
- Trigger the SOS button on the Mobile App.
- Show the SOS ping instantly appearing on the Command Center 3D map to direct NDRF teams.
