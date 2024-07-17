const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
app.use(cors())

const connectDB = require('./config/DBconnection');

const userRoutes = require('./routes/userRoutes');
const testRoutes=require("./routes/testRoutes");

dotenv.config();
connectDB();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("listining to port");
})

app.use('/api/user',userRoutes);
app.use('/api/test',testRoutes);


app.get("*", (req, res) => {
    res.status(404).json({
        success:false,
        message: "This route does no exist",
    });
  });

const PORT = process.env.PORT;

app.listen(4000,console.log(`Server listining on ${PORT}`));