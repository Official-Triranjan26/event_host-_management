const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
app.use(cors())

const connectDB = require('./config/DBconnection');

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const testRoutes=require("./routes/testRoutes"); 
const ticketRoutes = require("./routes/ticketRoutes")
const generateUploadURL=require("./config/s3")

dotenv.config();
connectDB();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("listining to port");
})

app.use('/api/user',userRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/ticket',ticketRoutes);
app.use('/api/test',testRoutes);
app.get('/s3Url', async (req, res) => {
    const url = await generateUploadURL()
    res.send({url})
})


app.get("*", (req, res) => {
    res.status(404).json({
        success:false,
        message: "This route does no exist",
    });
  });

const PORT = process.env.PORT;

app.listen(4000,console.log(`Server listining on ${PORT}`));