const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
let TextAnalyzer = require('./models/textAnalyzer.js');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const uri = process.env.ATLAS_URI;
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/textAnalyzer';

mongoose.connect(dbUrl, { useNewUrlParser: true });
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
// );
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// const exercisesRouter = require('./routes/exercises');
// const usersRouter = require('./routes/users');

// app.use('/exercises', exercisesRouter);
// app.use('/users', usersRouter);

app.post('/save', async (req, res) => {
    let newText = new TextAnalyzer( req.body );
    // console.log(newText);
    await newText.save();
})

app.get('/texts', async (req, res) => {
  TextAnalyzer.find()
    .then(textAnalyzer => res.json(textAnalyzer))
    .catch(err => res.status(400).json('Error: ' + err));
})
if (process.env.NODE_ENV == "production") {
  app.use(express.static("frontend/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  })
}

app.listen(port, () => {
    // console.log(`Server is running on port: ${port}`);
});
