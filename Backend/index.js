import  express, { urlencoded }  from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./db/connectDB.js";
import {router} from "./Route/user.route.js"
dotenv.config({})
import companyroute from "./Route/company.route.js"
import jobroute from "./Route/job.route.js"
import applicationroute from "./Route/application.route.js"


const app = express();

// app.get("/home",(req,res) => {
//     return res.status(200).json({
//     message:"I am from Backend",
//     seccess:true
// })
// })


//middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, // Corrected 'Credentials' to 'credentials'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization'
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000




app.listen(PORT , () => {
    connectDB()
    console.log(`Server running at port ${PORT}`);
})

app.use("/api/v1/user",router);
app.use("/api/v1/company",companyroute)
app.use("/api/v1/job",jobroute)
app.use("/api/v1/application",applicationroute)
