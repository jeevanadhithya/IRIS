import sys

content = '''<div align="center">

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
| [**iris-frontend-sih.vercel.app**](https://iris-frontend-sih.vercel.app/) | [**Download v1.0.0 Release**](https://github.com/jeevanadhithya/IRIS/releases/tag/v1.0.0) | [**Google Drive Assets**](https://drive.google.com/drive/folders/1S2ui2_ELrqhOKkWcbbIvXsx56H7OcEDZ?usp=drive_link) |

</div>

---

## ⚡ How IRIS Works (End-to-End Pipeline)

> [!NOTE]
> **Core Concept**: Traditional monitoring systems rely on centralized infrastructure, resulting in delayed responses. IRIS uses a distributed network of smart sensors powered by **edge AI** to improve early detection, reducing response times and saving lives.

**SENSE ⟶ ANALYZE ⟶ PREDICT ⟶ WARN ⟶ GUIDE ⟶ RESPOND**

- **📡 SENSE:** Live IoT environmental telemetry (Rainfall, River Stage, Pore Pressure, AQI) and citizen GPS coordinates stream continuously to the EOC network.
- **🧠 ANALYZE:** Spatial geospatial algorithms (Haversine formula) calculate hazard proximities within 400-meter safety radiuses in real-time.
- **🔮 PREDICT:** 3D Digital Twins simulate flash flood water volumes and landslide zones directly over topographical OpenStreetMap architecture.
- **🚨 WARN:** Automated Twilio Studio Flows trigger instant regional-language Voice Calls and SMS broadcasts to vulnerable citizens.
- **🗺️ GUIDE:** Dynamic GIS Evacuation Corridors route citizens around critical infrastructure failures to verified safe zones.
- **🏥 RESPOND:** EOC Administrators monitor live dashboards and shelter capacities to coordinate disaster relief.

---

## 🧑‍⚖️ Evaluator & Demonstration Instructions

### 🔑 One-Click Demo Accounts
Evaluators can test the live system immediately using our pre-configured production accounts on the **[Live Web Dashboard](https://iris-frontend-sih.vercel.app/)**:

**🛡️ EOC Administrator Account (Command Center)**
- **Email:** dmin@iris.gov.in
- **Password:** Admin2026!
- **Features Unlocked:** 3D Cesium Digital Twin Sandbox, Custom GIS Boundary Drawing, Live IoT Telemetry Monitoring, Twilio Broadcast Overrides, Shelter Hub.

**👤 Citizen App Account (Mobile App Preview)**
- **Email:** citizen@iris.gov.in
- **Password:** Citizen2026!
- **Features Unlocked:** Live Regional Alerts, One-Tap SOS Broadcaster, Proximity-Based Evacuation Map, Community Incident Reporting.

*(Note: The Android APK bypasses the login screen automatically to act as a seamless Citizen Portal).*

### 📱 Step-by-Step 3-Minute Testing Flow
1. **Launch the 3D Digital Twin (Web):** Navigate to the Web Portal, log in as Administrator, click the **3D Digital Twin** tab, draw a custom boundary, and click **Generate 3D Twin** to watch OpenStreetMap extrusions load natively.
2. **Test Automated Broadcasting (Mobile):** Open the Android APK, allow GPS permissions, and trigger a disaster overlapping your location from the web dashboard. Watch the Twilio API execute a live regional voice call/SMS to your registered device!

---

## 🎯 Our 7-Point Solution Features (Smart India Hackathon)

### 1. Distributed Smart Sensor Nodes
- We utilize solar-powered **ESP32** microcontrollers designed for remote, low-maintenance deployments.
- **Sensors equipped**: Water level, rainfall, temperature, humidity, smoke, air quality (PM2.5/PM10), gas leakage, soil moisture, and vibration.

### 2. On-Device AI Analytics
- **Edge AI (TinyML)** is deployed directly on the ESP32 sensors, enabling them to detect anomalies (like flash flood pressure spikes) *without continuous cloud connectivity*.
- Minimizes bandwidth requirements and reduces latency to zero.

### 3. Multi-Hazard Early Warning System
- Automated, confidence-scored alerts generated for Flooding, Forest fires, Air Pollution episodes, Landslides, and extreme weather conditions.

### 4. Regional Environmental Risk Mapping
- A state-of-the-art **Cesium 3D Digital Twin** Web Dashboard provides geospatial visualization of sensor data.
- Dynamic risk maps showcase emerging hotspots, risk trends, and affected disaster zones.

### 5. Community and Authority Notification
- **IRIS Mobile App (Flutter)** and **Web Dashboard** deliver priority-based alerts.
- Our isolated **DMS Microservice** dispatches automated SMS and WhatsApp warnings via Twilio to citizens based on the severity of the hazard.

### 6. Cloud and Edge Hybrid Architecture
- **Edge (ESP32 & Raspberry Pi)**: Handles immediate life-saving decisions and siren triggers.
- **Cloud (Node.js & GNNs)**: Handles centralized analytics, long-term trend forecasting, and complex graph neural network modeling. 

### 7. Scalable and Cost-Effective Deployment
- A highly modular architecture scaling seamlessly from a single village to a state-wide deployment, supporting LoRaWAN, Wi-Fi, and NB-IoT.

---

## 🏗️ System Architecture & Technology Stack

The repository is modularized into four interconnected components working in unison:

- **Web Portal (React + Vite):** High-performance frontend utilizing @mui/material v5, React Router, Cesium.js, and Leaflet for 3D geospatial mapping.
- **Mobile Client (Flutter 3.13+):** Native Dart architecture utilizing BottomNavigationBar, Geolocation watchers, and cross-platform webview integration for rendering complex evacuation maps.
- **Backend API Gateway (Node.js 20 LTS):** Express.js server hosted on Vercel handling multi-platform API routing and MongoDB Atlas distributed database connections.
- **Telecommunications (Twilio Studio):** Automated API trigger flows utilizing Twilio Programmable Voice (Google WaveNet Regional TTS) and Twilio SMS.

---

## 💻 Local Installation & Docker Setup

We have fully dockerized the core infrastructure for immediate, offline evaluation.

### 1. Configure Environment Variables
Copy the provided .env.example file to .env in the root directory and insert your Twilio credentials:
`ash
cp .env.example .env
`

### 2. Start the Project via Docker
Ensure you have Docker installed, then run:
`ash
docker-compose up -d --build
`
- **Web Dashboard**: Available at http://localhost:80
- **Backend API**: Available at http://localhost:3009

### 3. Run the Mobile Application Locally
`ash
cd iris_mobile
flutter pub get
flutter run
`

---
<div align="center">
  <i>Built with passion by the IRIS Team for a safer, resilient tomorrow (Smart India Hackathon 2026).</i>
</div>
'''

with open('README.md', 'w', encoding='utf-8') as f:
    f.write(content)
