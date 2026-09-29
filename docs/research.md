# 🔬 Problem Research & Feasibility

## The Status Quo (Gaps in Current Systems)
Current disaster warning systems (like those utilized by NDMA) heavily rely on macroscopic satellite imagery and meteorological forecasts. 
- **The Flaw**: These systems cannot predict *micro-disasters* (like a highly localized landslide on a specific hill due to unforeseen soil saturation).
- **The Communication Gap**: Warnings are broadcast via TV/Radio, often missing isolated communities during network blackouts.

## The IRIS Feasibility Approach
1. **Cost-Effective IoT**: By utilizing $5 ESP32 microcontrollers at the edge, feeding into centralized Raspberry Pi processing hubs, covering vast terrains becomes both economically viable and computationally efficient for state governments.
2. **Bandwidth Optimization**: Instead of streaming continuous data, nodes only transmit deltas (changes) or anomalies, preserving battery and low-bandwidth LoRaWAN/cellular networks.
3. **Graph Neural Networks (GNNs)**: Traditional CNNs fail on irregular geographical data. GNNs inherently understand spatial relationships (e.g., River Node A is upstream of Town Node B), drastically improving flood path prediction accuracy over flat neural networks.
