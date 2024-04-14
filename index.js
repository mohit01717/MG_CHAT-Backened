const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { users } = require('./users');

app.use(cors());


app.get('/', (req, res) => {
  res.json(users);
}); 



app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})