<div align="center">

<img src="iris_mobile/assets/images/iris_logo.png" alt="IRIS Logo" width="190" style="border-radius: 24px; box-shadow: 0 8px 24px rgba(0,0,0,0.12);" />

# IRIS
### Intelligent Resilient Infrastructure & Safety

**AI-Powered Multi-Hazard Monitoring, Prediction & 3D Response Platform**

*Sense ⟶ Analyze ⟶ Predict ⟶ Warn ⟶ Guide ⟶ Respond*

[![Frontend](https://img.shields.io/badge/Frontend-React_18_%7C_Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)](#)
[![Mobile](https://img.shields.io/badge/Mobile-Flutter_3.13+-02569B?style=for-the-badge&logo=flutter&logoColor=white)](#)
[![Backend](https://img.shields.io/badge/Backend-Node.js_%7C_Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](#)
[![Database](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](#)
[![3D Engine](https://img.shields.io/badge/3D_Engine-CesiumJS-63A538?style=for-the-badge)](#)
[![SIH 2026](https://img.shields.io/badge/SIH_2026-PS--26178-brightgreen?style=for-the-badge)](#)

<br/>

| 🌐 **Live Web Dashboard** | ⚙️ **Live Backend API** | 📱 **Android App (APK)** | 📁 **Demo Assets** |
|:---:|:---:|:---:|:---:|
| [**Frontend App**](https://iris-frontend-sih.vercel.app/) | [**API Server**](https://iris-backend-sih.vercel.app/) | [**Download Release**](https://github.com/jeevanadhithya/IRIS/releases/tag/v1.0.0) | [**Google Drive**](https://drive.google.com/drive/folders/1S2ui2_ELrqhOKkWcbbIvXsx56H7OcEDZ?usp=drive_link) |

</div>

---

## 📑 Table of Contents

- [1. Project Overview](#1-project-overview)
- [2. Problem Statement](#2-problem-statement)
- [3. Core Idea](#3-core-idea)
- [4. Key Features](#4-key-features)
- [5. What Makes IRIS Different](#5-what-makes-iris-different)
- [6. System Architecture](#6-system-architecture)
- [7. Technology Stack](#7-technology-stack)
- [8. Evaluator & Demo Instructions](#8-evaluator--demo-instructions)
- [9. Installation & Setup](#9-installation--setup)
- [10. Future Enhancements](#10-future-enhancements)

---

## 1. Project Overview

**IRIS** (Intelligent Resilient Infrastructure & Safety) is a comprehensive disaster management ecosystem built to bridge the gap between environmental monitoring and actionable civilian response. 

The platform synthesizes **Environmental Monitoring**, **Geospatial Data (OpenStreetMap)**, **AI Risk Intelligence**, and a **3D Digital Twin** into a single centralized Emergency Operations Center (EOC). When hazards like flash floods or landslides are detected via simulated IoT telemetry, IRIS triggers an automated workflow that analyzes impact radiuses, formulates safe evacuation routes, and executes localized Twilio Voice/SMS alerts to vulnerable populations before disaster strikes.

---

## 2. Problem Statement

- **Hackathon:** Smart India Hackathon 2026
- **Problem Statement ID:** PS-26178
- **Theme:** Disaster Management
- **Category:** Hardware (IoT / Network Systems)
- **Team:** TechTitens

**The Challenge:**
India requires a resilient, AI-powered environmental monitoring network that provides early detection, localized intelligence, and actionable alerts for floods, forest fires, pollution events, and other environmental hazards. Traditional monitoring systems rely heavily on centralized, cloud-dependent infrastructure, leading to delayed responses and complete system failures when local internet goes down during a crisis.

**The IRIS Solution:**
IRIS addresses this gap by combining highly modular edge-processing (simulated in this prototype) with a robust Serverless Node.js backend. It focuses on proactive risk prevention by providing immediate visual context (3D mapping) to administrators and deterministic, offline-capable SMS/Voice alerts directly to citizens' feature phones.

---

## 3. Core Idea

IRIS operates on a six-stage continuous pipeline:

- **SENSE:** IoT edge nodes (simulated) continuously monitor environmental conditions (Rainfall, River Stage, Pore Pressure, AQI) alongside live citizen GPS telemetry.
- **ANALYZE:** Spatial geospatial algorithms (Haversine calculations) process environmental thresholds and intersect them with civilian coordinates.
- **PREDICT:** A Multi-Hazard Risk Matrix calculates National Threat Levels, while 3D Digital Twins simulate topographical flood scenarios.
- **WARN:** The Twilio-integrated DMS (Disaster Messaging Service) bypasses smartphone requirements by blasting automated regional-language Voice calls and SMS messages to affected sectors.
- **GUIDE:** The Flutter Mobile App dynamically re-routes citizens around flooded infrastructure toward verified safe Shelter hubs.
- **RESPOND:** Authorities monitor live incidents, dispatch resources, and evaluate community-reported SOS triangulations on the web dashboard.

---

## 4. Key Features

| Feature | Description | User | Technology | Status |
| :--- | :--- | :--- | :--- | :--- |
| **3D Digital Twin Sandbox** | Visualizes live topographical data, extruding buildings and rivers directly over vulnerable terrains. | Admin | React, CesiumJS | Implemented |
| **Disaster Simulation** | Volumetric simulation of floods/landslides over mapped boundaries to assess theoretical impact. | Admin | CesiumJS, Vercel API | Implemented |
| **Multi-Hazard Risk Matrix** | Calculates global threat scores based on aggregated IoT telemetry and active incidents. | System | Node.js, Vercel | Implemented |
| **Serverless Resilience** | Fallback HTTP polling architecture ensuring connectivity even when persistent WebSockets fail. | System | Node.js, Vercel | Implemented |
| **Twilio Broadcast Alerts** | Executes programmatic Voice and SMS warnings directly to registered phone numbers. | System | Node.js, Twilio API | Implemented |
| **Dynamic Evacuation Routing** | Provides pathfinding around compromised infrastructure to nearby verified shelters. | Citizen | Flutter, Dart | Implemented |
| **One-Tap SOS & Incidents** | Allows citizens to broadcast coordinates and report ground-truth environmental conditions. | Citizen | Flutter, Node.js | Implemented |
| **Virtual Sensor Network** | UI for administrators to inject virtual environmental spikes to test the pipeline. | Admin | React, Zustand | Implemented |

---

## 5. What Makes IRIS Different

### Multi-source Environmental Intelligence
IRIS doesn't rely on a single point of failure. It cross-references fixed sensor telemetry with dynamic community incident reports to validate disaster conditions (e.g., matching a "River Stage" spike with a citizen's "Flooded Road" SOS).

### 3D Digital Twin
Instead of relying on flat, abstract 2D maps, IRIS utilizes CesiumJS to render photorealistic 3D topologies, allowing EOC commanders to literally see how floodwaters might rise against local architecture.

### What-if Simulation
Administrators can draw custom GIS polygons over a map and simulate artificial disaster scenarios, generating actionable predictions before a real hazard occurs.

### Virtual Sensors
The platform allows evaluators to simulate edge-node behavior without physical hardware. Injecting a "Water Level: Critical" reading directly triggers the entire analytical and warning pipeline.

### Emergency Communication
By integrating the Twilio Programmable Voice API, IRIS guarantees that citizens without internet access or smartphones can still receive life-saving, localized warnings via standard cellular phone calls.

### Resilience
The system is built for catastrophe. The Node.js API runs on a decentralized Serverless architecture with in-memory fallbacks, while the React and Flutter clients utilize resilient HTTP polling to maintain state even when network conditions degrade.

---

## 6. System Architecture

`mermaid
graph TD
    subgraph Data Sources & Edge
        S[Environmental Sensors<br/>ESP32 Simulated] -->|Telemetry| N[Communication Network]
        C[Citizen Mobile App<br/>GPS & SOS] -->|HTTP| N
    end

    subgraph IRIS Serverless Backend
        N --> G[Vercel API Gateway]
        G --> P[Data Processing & Validation]
        P --> E[Environmental State Store]
        E --> R[Multi-Hazard Risk Engine]
    end

    subgraph Intelligence & Simulation
        R -->|Hazard Detected| H[Event Bus / Polling]
        R -->|Threshold Breach| SIM[Disaster Simulation Engine]
    end

    subgraph Outputs & Actions
        H -->|State Sync| DT[3D Digital Twin Dashboard]
        H -->|Evac Path| M[Mobile Citizen UI]
        H -->|Trigger| T[Twilio SMS & Voice API]
    end
    
    T -.->|Phone Call / Text| C
    DT -.->|Command Override| G
`

---

## 7. Technology Stack

### Frontend (Admin Web Dashboard)
- **Framework:** React 18, TypeScript, Vite
- **UI/Styling:** Tailwind CSS, Material UI (MUI v5), Framer Motion
- **Geospatial 3D:** CesiumJS, Leaflet
- **State Management:** Zustand
- **Deployment:** Vercel

### Mobile Application (Citizen Portal)
- **Framework:** Flutter 3.13+ (Dart)
- **Networking:** HTTP (REST API Polling)
- **Mapping:** Flutter Map / Native Integration
- **Build Output:** Android APK

### Backend & Microservices
- **Framework:** Node.js 20 LTS, Express.js
- **Database:** MongoDB Atlas (Mongoose) + In-Memory Fallback State
- **Telecommunications:** Twilio API (Voice & SMS Studio Flows)
- **Deployment:** Vercel Serverless Functions (/api/index.js)

---

## 8. Evaluator & Demo Instructions

The platform is fully hosted and ready for immediate evaluation without requiring local setup.

### 🔑 One-Click Demo Accounts

**🛡️ EOC Administrator Account (Web Command Center)**
- **URL:** [iris-frontend-sih.vercel.app](https://iris-frontend-sih.vercel.app/)
- **Email:** dmin@iris.gov.in
- **Password:** Admin2026!
- **Capabilities:** View 3D Digital Twin, draw custom GIS boundaries, monitor IoT telemetry, view Community SOS reports, and trigger virtual sensors.

**👤 Citizen App Account (Mobile Portal)**
- **Download:** [Android APK](https://github.com/jeevanadhithya/IRIS/releases/tag/v1.0.0)
- **Authentication:** The Android application automatically bypasses login to act as a seamless Citizen endpoint. *(If prompted, use citizen@iris.gov.in / Citizen2026!)*
- **Capabilities:** Broadcast SOS coordinates, report community incidents, view dynamic evacuation maps, and view system resilience scores.

### 📱 3-Minute Testing Flow
1. **Launch the Dashboard:** Log into the Web Portal as an Administrator. Navigate to the **3D Digital Twin**. Draw a boundary over a city and click **Generate 3D Twin**.
2. **Launch the Mobile App:** Open the APK on an Android device and grant GPS permissions.
3. **Trigger the Alert:** On the web dashboard, trigger a disaster scenario overlapping the mobile device's location.
4. **Observe Resilience:** Watch as the Node.js backend calculates the Risk Matrix and triggers a live Twilio phone call / SMS directly to the registered phone number, bypassing standard internet limitations.

---

## 9. Installation & Setup

If you prefer to run the architecture locally for development or code review:

### Prerequisites
- Node.js (v18+)
- Flutter SDK (v3.13+)
- Docker & Docker Compose
- Twilio Account & Credentials

### Step 1: Environment Variables
Clone the repository and configure your .env file in the root iris-backend directory:
`ash
git clone https://github.com/jeevanadhithya/IRIS.git
cd IRIS/iris-backend
cp .env.example .env
`
Add your MONGODB_URI and TWILIO_* credentials to the .env file.

### Step 2: Running the Backend
`ash
npm install
npm run start
`
*(The backend will launch on http://localhost:3009)*

### Step 3: Running the Frontend Dashboard
`ash
cd ../"IRIS Frontend"
npm install
npm run dev
`
*(The dashboard will launch on http://localhost:8080)*

### Step 4: Running the Mobile App
`ash
cd ../iris_mobile
flutter pub get
flutter run
`

---

## 10. Future Enhancements

While IRIS implements a comprehensive cloud, web, and mobile architecture, the following features are planned for future phases:

- **Physical Edge Nodes:** Integration of physical ESP32 microcontrollers with LoRaWAN transmitters to replace the current Virtual Sensor UI.
- **TinyML Hardware Deployment:** Flashing quantized Edge Impulse anomaly detection models directly onto the hardware.
- **Generative AI Triage:** Full Gemini API integration for parsing unstructured community SOS audio reports into structured JSON disaster data.
- **Secure Compute IP:** Upgrading the Vercel architecture to utilize Static IPs for dedicated database tunneling.
