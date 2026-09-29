# 🧠 AI Pipeline & Predictive Models

The IRIS ecosystem employs a multi-tier Artificial Intelligence architecture to balance **immediate localized response** with **macro-level predictive forecasting**.

## 1. Edge Intelligence (TinyML on ESP32)
Deployed directly on the ESP32 IoT sensor microcontrollers.
- **Purpose**: Zero-latency anomaly detection without relying on cloud connectivity.
- **Models**: Quantized decision trees and lightweight Autoencoders.
- **Workflow**:
  1. Reads soil moisture, vibration, and temperature data at 10Hz.
  2. Runs local inference to detect sudden spikes (e.g., flash flood water pressure).
  3. Immediately alerts the local Raspberry Pi Central Hub via LoRa/WiFi.

## 2. Local Processing Hub (Raspberry Pi)
Acts as the central aggregator for a cluster of ESP32 nodes.
- **Purpose**: Mid-tier data filtering, anomaly verification, and reliable cloud transmission.
- **Workflow**: Aggregates the high-frequency TinyML alerts from ESP32 nodes to prevent false positives before forwarding critical verified payloads to the Node.js backend.

## 3. Cloud Intelligence (GNN Transformers)
Deployed on the backend infrastructure.
- **Purpose**: Spatio-temporal forecasting and hazard propagation mapping.
- **Why GNNs?**: Sensor nodes geographically form a graph topology. Graph Neural Networks (GNNs) combined with Transformer attention mechanisms excel at understanding how a flood at Node A will affect downstream Node B based on terrain elevation.
- **Inputs**: Aggregated telemetry from all Raspberry Pi hubs + topographical satellite data.
- **Outputs**: 3D hazard polygons (rendered in Cesium) and dynamic safe evacuation routes.
