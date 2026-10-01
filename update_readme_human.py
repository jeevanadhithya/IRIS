import sys

content = '''<div align="center">

<img src="iris_mobile/assets/images/iris_logo.png" alt="IRIS Logo" width="190" style="border-radius: 24px; box-shadow: 0 8px 24px rgba(0,0,0,0.12);" />

# I R I S
**Intelligent Resilient Infrastructure & Safety**

*A smart environmental monitoring network built to detect disasters early and actually save lives.*

[![Frontend](https://img.shields.io/badge/Web%20Dashboard-React%2018%20%7C%20Vite%20%7C%20Cesium%203D-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Mobile](https://img.shields.io/badge/Mobile%20App-Flutter%203.13+-02569B?style=for-the-badge&logo=flutter&logoColor=white)](https://flutter.dev)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express%20%7C%20Serverless-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![SIH 2026](https://img.shields.io/badge/SIH%202026-PS--26178-brightgreen?style=for-the-badge)](https://sih.gov.in)

<br/>

| 🌐 **Live Web Dashboard** | ⚙️ **Live Backend API** | 📱 **Android App (APK)** | 📁 **Demo Assets** |
|:---:|:---:|:---:|:---:|
| [**Frontend App**](https://iris-frontend-sih.vercel.app/) | [**API Server**](https://iris-backend-sih.vercel.app/) | [**Download Release**](https://github.com/jeevanadhithya/IRIS/releases/tag/v1.0.0) | [**Google Drive**](https://drive.google.com/drive/folders/1S2ui2_ELrqhOKkWcbbIvXsx56H7OcEDZ?usp=drive_link) |

</div>

---

## What is IRIS?

Hey everyone! We built IRIS for the **Smart India Hackathon 2026 (Problem Statement SIH26178)**. 

Right now, when a disaster strikes in India (like a flash flood or a forest fire), the warning systems rely heavily on big, centralized infrastructure. If the internet or power goes down locally, people don't get warned in time. 

IRIS changes that. We use a network of cheap, solar-powered ESP32 sensors that run AI right on the device (TinyML). If they detect something crazy—like water levels rising too fast—they immediately ping our cloud network. From there, our system triggers automated phone calls and text messages (via Twilio) to locals in the danger zone, and maps out exactly what's happening on a 3D dashboard for the authorities.

Basically: **Sense ⟶ Analyze ⟶ Predict ⟶ Warn ⟶ Guide ⟶ Respond**.

---

## 🧑‍⚖️ How to test the app (For Evaluators)

We set up live demo accounts so you can jump right in and see how the platform works without dealing with signups.

### 1. The Web Dashboard (For Authorities)
Head over to the [Live Web Dashboard](https://iris-frontend-sih.vercel.app/) and log in using:
- **Email:** dmin@iris.gov.in
- **Password:** Admin2026!

**Things to try:**
- Click on the **3D Digital Twin** tab.
- Use the drawing tool to draw a boundary on the map.
- Click **Generate 3D Twin** to watch it pull actual 3D building data and rivers from OpenStreetMap right into the browser.
- Run a disaster simulation to see how flooding affects that specific terrain.

### 2. The Mobile App (For Citizens)
Grab the APK from our [Releases page](https://github.com/jeevanadhithya/IRIS/releases/tag/v1.0.0) and install it on an Android phone or emulator.
- The app automatically logs you in as a citizen. 
- Make sure to give it GPS permissions!
- **How to test the alerts:** While you have the mobile app open, go to the Admin Web Dashboard and trigger a disaster event directly over your current GPS location.
- Within seconds, our backend will do the math, realize you are in the danger zone, and you'll receive a live Twilio voice call and SMS warning you about the hazard!

*(If you ever need to log into the app manually, use citizen@iris.gov.in and Citizen2026!)*

---

## 🛠️ How we built it

We split the project into a few different pieces so it scales easily:

- **Frontend Dashboard:** Built with React, Vite, and Material UI. We used Cesium.js to render the heavy 3D maps in the browser.
- **Mobile App:** Written in Flutter so it works on both Android and iOS. It tracks your location in the background to know if you're near a disaster.
- **Backend API:** A Node.js and Express server that we hosted on Vercel as a Serverless function. It handles all the heavy lifting, math calculations, and talks to our MongoDB database.
- **Alerts System:** We hooked up Twilio's Studio Flows to handle sending out automated, regional-language text messages and text-to-speech phone calls.
- **Hardware (Simulated):** ESP32 microcontrollers and Raspberry Pi hubs running TinyML models for edge detection.

---

## Running it locally

If you want to spin the whole project up on your own machine instead of using our live links, it's pretty straightforward.

1. Clone the repo.
2. Rename .env.example to .env and drop in your own Twilio and MongoDB keys.
3. Use Docker to boot up the web side:
   `ash
   docker-compose up -d --build
   `
4. For the mobile app, go into the iris_mobile folder and run:
   `ash
   flutter pub get
   flutter run
   `

<div align="center">
  <i>Built by Team Tech Titens for SIH 2026</i>
</div>
'''

with open('README.md', 'w', encoding='utf-8') as f:
    f.write(content)
