import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


const port = process.env.PORT;


const app = express();

app.use(cors({ credentials: true, origin: process.env.LOCAL_HOST, }));

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Welcome to familyShare home backend!");
});


app.listen(port, () => {
  console.log(`listening on port ${port}`)
});