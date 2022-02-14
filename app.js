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

  const data = {
    member: [{
      email_address: emailName,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  }

  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/f833c63051";

  const options = {
    method: "POST",
    auth: "aDayur1:e4694dafc20fc12e1cc1acbb10d48a57-us14"
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.send("Successfully subscribed");
    } else {
      res.sendFile(path.join(__dirname + "/failer.html"));
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failer", (req, res) => {
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Running express server on port: ${port}`);
});

//API Key
//e4694dafc20fc12e1cc1acbb10d48a57-us14

//Audience ID
//f833c63051