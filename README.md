<div align="center">

<img src="iris_mobile/assets/images/iris_logo.png" alt="IRIS Logo" width="190" style="border-radius: 24px; box-shadow: 0 8px 24px rgba(0,0,0,0.12);" />

# I R I S

### **A Resilient AI-Powered Environmental Monitoring Network**

**Providing early detection, localized intelligence, and actionable alerts for floods, forest fires, pollution events, and other environmental hazards common in India, enabling authorities and communities to shift from reactive disaster response to proactive risk prevention.**

[![Frontend](https://img.shields.io/badge/Web%20Dashboard-React%2018%20%7C%20Vite%20%7C%20Cesium%203D-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Mobile](https://img.shields.io/badge/Mobile%20App-Flutter%203.13+-02569B?style=for-the-badge&logo=flutter&logoColor=white)](https://flutter.dev)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express%20%7C%20Socket.io-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Database](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![SIH 2026](https://img.shields.io/badge/SIH%202026-PS--26178-brightgreen?style=for-the-badge)](https://sih.gov.in)

<br/>

| 🌐 **Live Web Dashboard** | 📱 **Android App (APK)** | 📁 **Evaluation Drive** |
|:---:|:---:|:---:|
| [**iris-frontend-sih.vercel.app**](https://iris-frontend-sih.vercel.app/) | [**Download v1.0.0 Release**](https://github.com/jeevanadhithya/IRIS/releases/tag/v1.0.0) | [**Google Drive Assets**](https://drive.google.com/drive/folders/1S2ui2_ELrqhOKkWcbbIvXsx56H7OcEDZ?usp=drive_link) | **Flutter Release** | **SIH 2026 · PS-26178** |

</div>

---

## ⚡ How IRIS Works (At a Glance)

> [!NOTE]
> **Core Concept**: Traditional monitoring systems rely on centralized infrastructure, resulting in delayed responses. IRIS uses a distributed network of smart sensors powered by **edge AI** to improve early detection, reducing response times and saving lives.

```
  ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
  │   1. SENSE      │  ──▶  │  2. INFER       │  ──▶  │   3. VISUALIZE  │  ──▶  │     4. ALERT    │
  │ ESP32 Sensors & │       │ Edge TinyML &   │       │ 3D Digital Twin │       │ DMS Multi-channel│
  │ Raspberry Pi Hub│       │ Cloud Analytics │       │ Risk Mapping    │       │ WhatsApp & SOS  │
  └─────────────────┘       └─────────────────┘       └─────────────────┘       └─────────────────┘
```

---

## 📚 Table of Contents

- [🎯 Smart India Hackathon Context](#-smart-india-hackathon-context)
- [🔍 The Background & Problem](#-the-background--problem)
- [🚀 Our 7-Point Solution Features](#-our-7-point-solution-features)
- [🏗️ System Architecture & Flows](#️-system-architecture--flows)
- [🛠️ Technology Stack](#️-technology-stack)
- [💻 Installation & Docker Setup](#-installation--docker-setup)

---

## 🎯 Smart India Hackathon Context

<a id="smart-india-hackathon-context"></a>

- **Hackathon Initiative**: Smart India Hackathon 2026 (SIH 2026)
- **Problem Statement ID**: PS-26178
- **Theme / Category**: Disaster Management / Hardware
- **Problem Creator**: Sarim Moin
- **Organization**: Qualcomm Inc & Ministry of Education's Innovation Cell (MIC)
- **Target Beneficiaries**: NDMA, IMD, ISRO, Local Authorities, and Vulnerable Community Members.

---

## 🔍 The Background & Problem

<a id="the-background--problem"></a>

India faces a growing range of environmental and climate-related risks, including urban flooding, river floods, cyclones, forest fires, air pollution, droughts, landslides, and extreme weather events. 
- **The Challenge**: Traditional monitoring systems depend on centralized infrastructure. They struggle to provide sufficiently localized, real-time intelligence.
- **The Impact**: Floods repeatedly devastate Assam and Bihar; forest fires ravage Uttarakhand and Himachal Pradesh; and severe air pollution chokes major urban centers.
- **The Gap**: When the internet goes down during a crisis, cloud-dependent warning systems fail entirely. A localized, edge-computing approach is desperately needed.

---

## 🚀 Our 7-Point Solution Features

<a id="our-7-point-solution-features"></a>

IRIS perfectly maps to the 7 core requirements outlined by Qualcomm:

### 1. Distributed Smart Sensor Nodes
- We utilize solar-powered **ESP32** microcontrollers designed for remote, low-maintenance deployments.
- **Sensors equipped**: Water level, rainfall, temperature, humidity, smoke, air quality (PM2.5/PM10), gas leakage, soil moisture, and vibration.

### 2. On-Device AI Analytics
- **Edge AI (TinyML)** is deployed directly on the ESP32 sensors, enabling them to detect anomalies (like flash flood pressure spikes) *without continuous cloud connectivity*.
- Minimizes bandwidth requirements and reduces latency to zero.

### 3. Multi-Hazard Early Warning System
- Automated, confidence-scored alerts generated for:
  - Flooding and flash floods
  - Forest fires and smoke events
  - Hazardous pollution episodes
  - Landslides and extreme weather conditions
  - Industrial safety incidents (chemical leaks)

### 4. Regional Environmental Risk Mapping
- A state-of-the-art **Cesium 3D Digital Twin** Web Dashboard provides geospatial visualization of sensor data.
- Dynamic risk maps showcase emerging hotspots, risk trends, and affected disaster zones.

### 5. Community and Authority Notification
- **IRIS Mobile App (Flutter)** and **Web Dashboard** deliver priority-based alerts.
- Our isolated **DMS Microservice** dispatches automated SMS and WhatsApp warnings via Twilio to citizens based on the severity of the hazard.

### 6. Cloud and Edge Hybrid Architecture
- **Edge (ESP32 & Raspberry Pi)**: Handles immediate life-saving decisions and siren triggers.
- **Cloud (Node.js & GNNs)**: Handles centralized analytics, long-term trend forecasting, and complex graph neural network modeling. Only critical alerts are transmitted to regional control centers, saving bandwidth.

### 7. Scalable and Cost-Effective Deployment
- A highly modular architecture.
- Nodes can scale seamlessly from a single village to a state-wide deployment.
- Supports flexible IoT protocols including LoRaWAN, Wi-Fi, and NB-IoT.

---

## 🏗️ System Architecture & Flows

<a id="system-architecture--flows"></a>

The repository is modularized into four interconnected components working in unison:

1. **`Hardware Tier (Simulated)`**: ESP32s gather metrics and run TinyML. They forward anomalies to local **Raspberry Pi** hubs which filter false positives via LoRaWAN/Wi-Fi.
2. **`IRIS Backend/`**: The Node.js cloud server ingests the filtered telemetry, runs predictive analytics, and manages the MongoDB database. It broadcasts critical states via WebSockets.
3. **`IRIS Frontend/`**: The React/Cesium web command center for NDMA authorities to visualize the 3D terrain and dynamic hazard polygons.
4. **`iris_mobile/` & `DMS/`**: The Flutter app receives push notifications and dynamic safe evacuation routes. Simultaneously, the Twilio DMS microservice blasts SMS/WhatsApp alerts to feature-phone users.

---

## 🛠️ Technology Stack

<a id="technology-stack"></a>

### Hardware & Edge Tier
- **Edge Nodes**: ESP32 Microcontrollers (TinyML Anomaly Detection)
- **Central Hub**: Raspberry Pi (Data Aggregation & Filtering)

### Web Command Center (Frontend)
- **Framework**: React 18, Vite, TypeScript
- **3D & Mapping**: Cesium, React Three Fiber, Leaflet, Mapbox GL
- **AI Integration**: `@google/generative-ai`

### Core Server & Database (Backend)
- **Runtime**: Node.js, Express.js
- **Database**: MongoDB (`mongodb` driver)
- **Real-time**: Socket.io

### Mobile Application & Microservices
- **Mobile Framework**: Flutter (Dart)
- **Notifications**: Node.js, Twilio (SMS & WhatsApp API)

---

## 💻 Installation & Docker Setup

<a id="installation--docker-setup"></a>

We have fully dockerized the core infrastructure (MongoDB, Backend, and Frontend) for immediate, hassle-free evaluation.

### 1. Configure Environment Variables
Copy the provided `.env.example` file to `.env` in the root directory:
```bash
cp .env.example .env
```
Open `.env` and insert your Twilio credentials and Gemini API keys.

### 2. Start the Project via Docker
Ensure you have Docker and Docker Compose installed, then simply run:
```bash
docker-compose up -d --build
```
- **Web Dashboard**: Available at `http://localhost:80`
- **Backend API**: Available at `http://localhost:3009`

### 3. Run the Mobile Application
```bash
cd iris_mobile
flutter pub get
flutter run
```

### 4. Run the DMS Microservice (Optional / Standalone)
```bash
cd DMS
cp .env.example .env # Configure your Twilio keys here too
npm install
node index.js
```

---
<div align="center">
  <i>Built with passion for a safer, resilient tomorrow.</i>
</div>
