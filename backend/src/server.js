const express = require('express')
const cors = require("cors")
require("dotenv").config();
 const pool = require("./config/database");
 const authRoutes = require("./routes/authRoutes")
const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
const fileRoutes = require("./routes/fileRoutes");
const notesRoutes = require("./routes/notesRoutes")
app.use("/api/files", fileRoutes);
app.use("/api/notes",notesRoutes)
app.get("/",(req,res)=>{
    res.json({
        message:"LinkPad is running",
    });
})

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.json({
      status: "OK",
      database: "connected",
    });
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: "ERROR",
      database: "disconnected",
    });
  }
});

app.use('/api/auth',authRoutes)

app.listen(PORT, () => {
  console.log(`LinkPad server running on port ${PORT}`);
});