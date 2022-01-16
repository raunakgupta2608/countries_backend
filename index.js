const express = require('express')
const app = express()
const port = 8080

const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const path = require('path');
var cors = require('cors')

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,          
  optionSuccessStatus:200
}
app.use(cors(corsOptions)) 

app.use(express.static(path.join(__dirname, "static")))
app.use('/', require(path.join(__dirname, "routes/countries.js")));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});