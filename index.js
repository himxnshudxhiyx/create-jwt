const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Secret key for signing the JWT
const secretKey = 'lkp-key';

// API to generate JWT
app.post('/generate-token', (req, res) => {
    const payload = req.body;
    let token = null;

    // Check if the payload is empty
    if (Object.keys(payload).length > 0) {
        // Generate JWT token
        token = jwt.sign(payload, secretKey, { expiresIn: '30d' });
        
        // Send the token as a response with a 200 status code
        res.status(200).json({ token });
    } else {
        // If payload is empty, send a 400 Bad Request status code
        res.status(400).json({ error: 'Invalid payload. JSON body is required.' });
    }
});

app.post('/decode-token', (req, res) => {
    const { token } = req.body;

    if (!token) {
        // If no token is provided, send a 400 Bad Request status code
        res.status(400).json({ error: 'Token is required.' });
        return;
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, secretKey);

        // Send the decoded data as a response with a 200 status code
        res.status(200).json({ data: decoded });
    } catch (error) {
        // If the token is invalid or expired, send a 401 Unauthorized status code
        res.status(401).json({ message: 'Invalid or expired token.' , error: error});
    }
});



app.listen(port, () => {
    console.log(`JWT API is running on http://localhost:${port}`);
});
