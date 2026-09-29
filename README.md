<div align="center">

<img src="iris_mobile/assets/images/iris_logo.png" alt="IRIS Logo" width="190" style="border-radius: 24px; box-shadow: 0 8px 24px rgba(0,0,0,0.12);" />

# I R I S

### **Detect. Analyze. Alert. Protect.**

**A Resilient AI-Powered Environmental Monitoring Network providing early detection, localized intelligence, and actionable alerts for floods, landslides, and forest fires.**

[![Frontend](https://img.shields.io/badge/Web%20Dashboard-React%2018%20%7C%20Vite%20%7C%20Cesium%203D-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Mobile](https://img.shields.io/badge/Mobile%20App-Flutter%203.13+-02569B?style=for-the-badge&logo=flutter&logoColor=white)](https://flutter.dev)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express%20%7C%20Socket.io-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Database](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![SIH 2026](https://img.shields.io/badge/SIH%202026-PS--26178-brightgreen?style=for-the-badge)](https://sih.gov.in)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

<br/>

| 🌐 **Web Dashboard** | 📱 **Mobile Application** | 🎯 **Official Submission** |
|:---:|:---:|:---:|
| **Local Port: 5173** | **Flutter Release** | **SIH 2026 · PS-26178** |

</div>

---

## ⚡ How IRIS Works (At a Glance)

> [!NOTE]
> **Core Concept**: IRIS replaces reactive disaster response with a proactive **AI-driven localized early warning system**. It fuses ground-level sensor data, on-device edge ML, and a 3D digital twin to predict and route users away from hazards in real-time.

```
  ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
  │   1. SENSE      │  ──▶  │  2. INFER       │  ──▶  │   3. VISUALIZE  │  ──▶  │     4. ALERT    │
  │ ESP32 Sensors & │       │ Edge TinyML &   │       │ 3D Digital Twin │       │ DMS Multi-channel│
  │ Raspberry Pi Hub│       │ GNN Transformers│       │ Command Center  │       │ WhatsApp & SOS  │
  └─────────────────┘       └─────────────────┘       └─────────────────┘       └─────────────────┘
```

### 🎯 The 4-Step Workflow — Short & Sweet

- 📡 **Step 1: Hyper-local Sensing**
  - Distributed IoT sensor nodes gather real-time micro-climate metrics (soil moisture, temperature, gas levels, water pressure).
  - Designed for continuous monitoring in vulnerable terrains.

- 🧠 **Step 2: On-Device & Cloud Inference**
  - **Edge AI (TinyML):** Runs lightweight anomaly detection models directly on the ESP32 sensor nodes for instant, zero-latency trigger warnings even offline.
  - **Local Hub (Raspberry Pi):** Aggregates edge data and filters false positives before secure cloud transmission.
  - **Cloud AI:** GNN (Graph Neural Network) Transformers process spatio-temporal data for accurate forecasting of floods, landslides, and forest fires.

- 🌐 **Step 3: 3D Digital Twin Command Center**
  - Built with **Cesium & React Three Fiber**.
  - Renders a 3D satellite and terrain model of India.
  - Allows authorities to visually track hazard propagation and dynamically compute safe evacuation routes.

- 🚨 **Step 4: Omni-channel Alerts (DMS)**
  - Instantly dispatches localized warnings to affected citizens and authorities.
  - Utilizes **Twilio** for SMS, a dedicated **WhatsApp Bot**, and WebSockets for real-time mobile app push notifications.
  - Triggers SOS broadcasts mapped directly to the nearest rescue personnel.

---

## 📚 Table of Contents

- [🎯 Smart India Hackathon Context](#-smart-india-hackathon-context)
- [🔍 Problem](#-problem)
- [💡 Solution](#-solution)
- [🚀 Key Features](#-key-features)
- [🏗️ System Architecture](#️-system-architecture)
- [🛠️ Technology Stack](#️-technology-stack)
- [💻 Installation & Setup](#-installation--setup)

---

## 🎯 Smart India Hackathon Context

<a id="smart-india-hackathon-context"></a>

- **Hackathon Initiative**: Smart India Hackathon 2026 (SIH 2026)
- **Problem Statement ID**: PS-26178
- **Official Title**: *Resilient AI Environmental Monitoring Network*
- **Theme / Category**: Disaster Management / Environmental Intelligence
- **Target Beneficiaries**: Disaster Response Forces (NDRF/SDRF), Local Authorities, and Vulnerable Community Members.

---

## 🔍 Problem

<a id="problem"></a>

Current disaster management systems in India face significant technological and operational gaps:

- **Reactive vs. Proactive**: Most systems alert authorities *after* a disaster strikes, leading to delayed evacuation and resource deployment.
- **Macro-level Inaccuracies**: Relying solely on broad satellite weather data misses hyper-local anomalies (e.g., localized soil saturation leading to landslides).
- **Communication Blackouts**: During a crisis, internet infrastructure often fails, rendering cloud-only warning systems useless.
- **Lack of Situational Awareness**: Command centers lack real-time, interactive 3D visualizations of hazard propagation and safe routing.

---

## 💡 Solution

<a id="solution"></a>

**I R I S** bridges these gaps by establishing a decentralized, AI-first ecosystem:

- 🛠️ **Edge Intelligence**: By deploying TinyML on edge sensor nodes, IRIS can detect imminent threats and sound local alarms even during network blackouts.
- 🔮 **Predictive Accuracy**: Utilizing GNN Transformers to analyze multi-modal sensor telemetry and predict disaster vectors before they climax.
- 🗺️ **Dynamic Evacuation**: Replaces static hazard maps with a live 3D Digital Twin that calculates optimal evacuation routes dynamically based on real-time flood/fire spread.

---

## 🚀 Key Features

<a id="key-features"></a>

### 🌐 3D Digital Twin (Web Dashboard)
- **Cesium Engine**: High-fidelity 3D terrain and satellite rendering.
- **Hazard Overlays**: Real-time rendering of predicted flood plains, forest fire perimeters, and landslide risk zones.
- **Generative AI Chat**: Integrated Google Generative AI (Gemini) assistant for actionable disaster response insights.

### 🧠 Predictive AI Models
- **GNN Transformers**: Analyzes sensor network topologies to predict complex environmental interactions.
- **Edge TinyML**: Low-power machine learning inference for immediate, offline hazard detection.

### 📱 Community Response App (Flutter)
- **Interactive Maps (Leaflet/Mapbox)**: Community-sourced hazard reporting and dynamic safe routing.
- **SOS Broadcasting**: One-tap emergency distress signals with embedded geolocation.
- **Real-time Alerts**: Push notifications and localized danger warnings.

### 💬 Disaster Management System (DMS)
- **Omni-channel Delivery**: Twilio integration for SMS and WhatsApp-based automated alerts.
- **WebSocket Streaming**: Bi-directional, low-latency communication between sensors, the command center, and mobile users.

---

## 🏗️ System Architecture

<a id="system-architecture"></a>

The repository is modularized into four distinct interconnected components:

1. **`IRIS Frontend/`**: The Command Center Web Dashboard (Vite, React, TypeScript, Cesium, Three.js).
2. **`IRIS Backend/`**: The core API, Database, and Real-time WebSocket server (Node.js, Express, MongoDB, Socket.io).
3. **`iris_mobile/`**: The cross-platform Community application (Flutter, Dart).
4. **`DMS/`**: The localized microservice for SMS and WhatsApp emergency alerts (Twilio).

---

## 🛠️ Technology Stack

<a id="technology-stack"></a>

### Web Command Center (Frontend)
- **Framework**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI, Framer Motion
- **3D & Mapping**: Cesium, React Three Fiber (Three.js), Leaflet, Mapbox GL
- **AI Integration**: `@google/generative-ai`

### Core Server & Database (Backend)
- **Runtime**: Node.js, Express.js
- **Database**: MongoDB (`mongodb` driver)
- **Real-time**: Socket.io
- **Security**: JWT (`jsonwebtoken`), bcryptjs

### Hardware & Edge Tier
- **Edge Nodes**: ESP32 Microcontrollers (TinyML)
- **Central Hub**: Raspberry Pi (Data Aggregation & Filtering)

### Mobile Application
- **Framework**: Flutter
- **Features**: Geolocator, Google Fonts, HTTP, Intl

### Notification Microservice (DMS)
- **Infrastructure**: Node.js, Express.js
- **Communications API**: Twilio (SMS & WhatsApp API)

---

## 💻 Installation & Setup

<a id="installation--setup"></a>

Follow these instructions to get a local copy of the project up and running.

### Prerequisites
- Node.js (v18 or higher)
- Flutter SDK (v3.13+)
- MongoDB Community Server

### 1. IRIS Backend
```bash
cd "IRIS Backend"
npm install
# Create a .env file and add MongoDB URI, JWT Secret, etc.
npm start # (or pm2 start ecosystem.config.js)
```

### 2. IRIS Frontend (Command Center)
```bash
cd "IRIS Frontend"
npm install
# Create a .env file and configure Vite variables (e.g., VITE_MAPBOX_TOKEN)
npm run dev
```
Access the dashboard at `http://localhost:5173`.

### 3. DMS (Alerts Microservice)
```bash
cd DMS
npm install
# Configure Twilio / WhatsApp keys in environment
node index.js
```

### 4. IRIS Mobile (Flutter App)
```bash
cd iris_mobile
flutter pub get
# Run on connected device or emulator
flutter run
```

---
<div align="center">
  <i>Built with passion for a safer, resilient tomorrow.</i>
</div>
