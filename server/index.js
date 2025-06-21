const express=require('express');
const modelRoute=require("./routes/modelRoute")
const userRoute=require("./routes/userRoute")
const cors=require("cors")
const dbConnect=require('./config/database')

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // Only allow requests from this origin
    credentials: true, // Allow cookies and credentials
}));


require('dotenv').config()

const port = process.env.PORT || 4000;

app.use(express.json());
app.use("/api/v1/model",modelRoute)
app.use("/api/v1/user",userRoute)

dbConnect();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});