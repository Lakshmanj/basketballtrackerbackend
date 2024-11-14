require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes'); 
const authRoutes = require('./routes/auth'); 
const connectDB = require('./db'); 

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes); 
app.use('/api', routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
