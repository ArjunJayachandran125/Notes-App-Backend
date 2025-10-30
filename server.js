const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbConnection");
const userRoute = require("./routes/userRoutes");
const notesRoute = require("./routes/notesRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/users', userRoute);
app.use('/api/notes', notesRoute);

app.get("/", (req,res) => {
    res.json({message: "Server running successfully"});
});

app.use(notFound);
app.use(errorHandler);

dbConnect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});