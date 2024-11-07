// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { UserRouter } = require('./routes/user');
const { AdminRouter } = require('./routes/admin');
const { connectDB } = require('./config/db');
const { CompanyRouter } = require('./routes/company');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["https://mern-api-frontend-one.vercel.app/"], // Adjust as needed for your frontend
  methods: ['POST', 'Get'],
  credentials: true
}));
app.use(cookieParser());
app.use('/api', UserRouter);

app.use('/api/admin', AdminRouter); // Prefix the admin routes with /api/admin

app.use('/api/', CompanyRouter)

// Connect to the database and start the server
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });
});

app.get('/', (req, res) => {
  res.send("hello world")
})
