const express = require('express');
const auth = require('../middleware/auth');

// Get router
const router = express.Router();

// Root post endpoint
router.post('/', auth, (req, res) => {

    // Data that gets returned when the test/setup endpoint test runs on IFTTT.
    res.status(200).json({
        data: {
            samples: {
                actions: {
                    sendsms: {
                        sender: 'Jan',
                        body: 'De man',
                        receiver: '0031612345678',
                        token: 'FakeTestKey'
                    },
                    send_voice_message:{
                        sender: 'Jan',
                        body: 'De man',
                        receiver: '0031612345678',
                        language:'nl-NL',
                        token: 'FakeTestKey'
                    }
                }
            }
        },
        code: 200
    });
});

// Export these endpoints
module.exports = router;