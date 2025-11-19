const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbConnection");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();
app.use(express.json());

const PORT = process.env.PORT ? process.env.PORT : 5000;

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

app.use(notFound);
app.use(errorHandler);

dbConnect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});