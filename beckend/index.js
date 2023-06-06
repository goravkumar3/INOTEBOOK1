const connecttoMango=require('./db');
const cors=require('cors')
const express = require('express')
connecttoMango();
const app = express()
const port = 5000
app.use(express.json())
app.use(cors());
app.use('/api/auth/',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})