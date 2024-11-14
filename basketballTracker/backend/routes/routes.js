const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(cors());

router.get('/scores', authenticateToken, async (req, res) => {
    try {
        const response = await axios.get('https://v1.basketball.api-sports.io/games', {
            headers: {
                'x-apisports-key': process.env.API_KEY,
                'Authorization': req.header('Authorization'),
            },
            params: {
                date: req.query.date || new Date().toISOString().split('T')[0],
                league: req.query.league || '123',
                season: req.query.season || '2024-2025',
                team: req.query.team,
                gameType: req.query.gameType,
            },
        });

        const games = response.data.response;
        res.json(games);
    } catch (error) {
        console.error('Error fetching scores:', error.message);
        if (error.response) {
            res.status(error.response.status).json({
                error: 'Failed to fetch live scores',
                details: error.response.data,
            });
        } else {
            res.status(500).json({
                error: 'Failed to fetch live scores',
                details: error.message,
            });
        }
    }
});

module.exports = router;
