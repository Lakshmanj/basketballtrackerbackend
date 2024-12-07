const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(cors());



router.get('/scores', async (req, res) => {
    try {
        const { league, season, team, date } = req.query;

        
        console.log('Received query:', { league, season, team, date });

        const response = await axios.get('https://v1.basketball.api-sports.io/games', {
            headers: {
                'x-apisports-key': process.env.API_KEY,
                'x-apisports-host': 'v1.basketball.api-sports.io'
            },
            params: {
                league,
                season,
                team,
                date,
            },
        });

        
        console.log('External API response:', response.data);

        res.json(response.data.response); 
    } catch (error) {
        console.error('Error fetching scores from external API:', error.message);
        res.status(500).json({ error: 'Failed to fetch scores', details: error.message });
    }
});



module.exports = router;
