# 💻 Local Environment Setup

## 1. Backend (`IRIS Backend`)
```bash
cd "IRIS Backend"
npm install
```
Create `.env` file in the root of the backend:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/iris
JWT_SECRET=supersecret_sih2026
```
Run the server:
```bash
npm run dev 
# or node server.js
```

## 2. Frontend (`IRIS Frontend`)
```bash
cd "IRIS Frontend"
npm install
```
Create `.env` file in the root of the frontend:
```env
VITE_API_URL=http://localhost:5000
VITE_CESIUM_TOKEN=your_cesium_ion_token_here
```
Run the development server:
```bash
npm run dev
```

## 3. Mobile (`iris_mobile`)
Ensure the Flutter SDK is installed and your emulator/device is connected.
```bash
cd iris_mobile
flutter pub get
flutter run
```

## 4. DMS (`DMS`)
```bash
cd DMS
npm install
```
Create `.env` file in the root of the DMS folder:
```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=whatsapp:+14155238886
```
Run the microservice:
```bash
node index.js
```
