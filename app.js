const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require('https');
const path = require("path");
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/signup.html"))
})

app.post("/", (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let emailName = req.body.emailName;

  console.log(`First Name: ${firstName} Last Name: ${lastName} Email: ${emailName}`);
})

app.listen(port, () => {
  console.log(`Running express server on port: ${port}`);
});

//API Key
//e4694dafc20fc12e1cc1acbb10d48a57-us14

//Audience ID
//f833c63051