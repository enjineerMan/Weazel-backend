const io = require("socket.io")(3002);
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');

const app = express();
const port = 5000;

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false })
// io.on("connection", socket => {
//   // either with send()
//   socket.send("Hello!");

//   // or with emit() and custom event names
//   socket.emit("greetings", "Hey!", { "ms": "jane" }, Buffer.from([4, 3, 3, 1]));

//   // handle the event sent with socket.send()
//   socket.on("message", (data) => {
//     console.log(data);
//   });

//   // handle the event sent with socket.emit()
//   socket.on("salutations", (elem1, elem2, elem3) => {
//     console.log(elem1, elem2, elem3);
//   });
// });

app.get('/emails', (req, res) => {
  var data = fs.readFileSync('emails.txt', 'utf8');
  arr = data.substring(0, data.length-1).split(',');
  console.log(req.query.msg);
  // if(arr.includes(req.body.msg)){
  //   res.send(200);
  // }else{
  //   res.send(404);
  // }
})
app.post('/logins', jsonParser, (req, res) => {
  var arr = [];
  var data = fs.readFileSync('emails.txt', 'utf8');
    //console.log("current data");
  arr = data.substring(0, data.length-1).split(',');
  // console.log(arr);
  // console.log(req.body.msg);
  if(!arr.includes(req.body.msg)){
    fs.appendFile('emails.txt', req.body.msg + ",", err => {
      console.log("append");
      if(err){
        console.error(err);
        return;
      }
    });
    res.send("success!");
  }else{
    res.send("There's already an account with that email.")
  }



  //console.log(req.body.msg);
  // send back response for whether email exists
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})