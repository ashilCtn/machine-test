import express from 'express';
import apiRouter from './routes/api.js';
import dbRouter from './routes/local.js';
import { connectToDb } from './database/sqlite.js';

//initializing express server
const app = express();

//specifying the routes
app.use('/api', apiRouter);
app.use('/local', dbRouter);





app.get('/', (req, res)=>{
  res.send('Server is listining to port 3000');
})

// tells server to listen to port 3000
app.listen(3000, () => {
  console.log('Server running on port 3000');

  //connect to local sqllite db
  connectToDb();
});
