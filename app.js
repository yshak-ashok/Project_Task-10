const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.json());

// Route
const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);

// Error Handling
const errorHandler = require('./middleware/errorHandler')
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running port at: ${PORT}`);
});
