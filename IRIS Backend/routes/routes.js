const express = require('express');
const router = express.Router();
const callController = require('../controllers/callController');

router.post('/calluser', callController.callUser);

// Mobile App & Frontend Telemetry API
router.get('/telemetry', (req, res) => {
    res.json({
        riverStage: 4.95,
        riverThreshold: 5.50,
        rainfall: 92.1,
        porePressure: 45.2,
        aqi: 110,
        timestamp: new Date().toISOString(),
        status: 'high'
    });
});

module.exports = router;
