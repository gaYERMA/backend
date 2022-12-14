const express = require('express');
const app = express();
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path')
var cors = require('cors')
app.use(express.json(), cors());

/**
 * this make a user folder, output user data as json file
 * @param {*} uname 
 * @param {*} content 
 */
function creatfile2(uname, content) {
  fse.outputFile('user/' + uname + '/main.json', content, err => { if (err) { console.log(err); } else { console.log('The file has been saved!'); } })
}

/**
 * make a user
 * @param {*} op1 
 */
function UserCreate(op1) {
  let user = {
    name: op1,
    Createdtime: Date(),
    rUID: makeid(20),
    ISbaned: "0",
    IsAdmin: "0",
  };
  var bro = JSON.stringify(user);
  creatfile2(op1, bro)
}

/**
 * delete user from database
 * @param {*} die 
 */
function nukeusers(die) {
  //  fs.rmSync('users/'+die+'/main.json', { recursive: true, force: true });
  fs.rmSync('user/' + die, { recursive: true, force: true });

}

/**
 * Return json for the user.
 * @param {*} user 
 * @returns 
 */
function readuser(user) {
  return fs.readFileSync('./user/' + user + '/main.json');
}

//stackoverflow https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
/**
 * this function make random stirng for id with 
 * @param {*} length 
 * @returns 
 */
function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
} 


//#region rest endpoint 
app.post('/v1/makeuser/', function (req, res) {
  const { usrname } = req.body;
  UserCreate(usrname)
  res.send({ usrLoction: "user/" + usrname + "/main.json" });
});

app.delete('/v1/deleteUser/', function (req, res) {
  const { id } = req.body;
  nukeusers(id);
  res.send("user" + id + 'has bye bye');
});


app.get('/Com/makeuser/:UserId/', (req, res) => {
  UserCreate(req.params.UserId)
  res.send({ usrLoction: "user/" + req.params.UserId + "/main.json" });
})

app.get('/Com/deleteUser/:UserIds/', function (req, res) {
  nukeusers(req.params.UserIds);
  res.send('Delete record with' + req.params.UserIds);
});

app.get('/Com/Readusers/:userId4/', (req, res) => {
  res.send(readuser(req.params.userId4));
})
//#endregion 



app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})


app.listen(3000, () => {
  console.log('server started');
  console.log('')
});