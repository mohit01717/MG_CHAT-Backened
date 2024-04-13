const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
app.use(cors());
app.get('/', (req, res) => {
  res.sendFile(path.resolve('users.json'));
}); 

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})