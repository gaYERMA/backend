const express = require('express');
const app = express();
const fs = require('fs');
const fse = require('fs-extra');
var cors = require('cors')

app.use(express.json(), cors());


function creatfile2(uname, content) {
  //fse.outputFile('user/'+uname+'/'+fname, content)
  fse.outputFile('user/' + uname + '/main.json', content, err => { if (err) { console.log(err); } else { console.log('The file has been saved!'); } })
}
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
function nukeusers(die) {
  //  fs.rmSync('users/'+die+'/main.json', { recursive: true, force: true });
  fs.rmSync('user/' + die, { recursive: true, force: true });

}

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
} //stackoverflow https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript


//
app.post('/v1/makeuser/', function(req, res) {
  const { usrname } = req.body;
  UserCreate(usrname)
  res.send({ usrLoction: "user/" + usrname + "/main.json" });
});
app.delete('/v1/deleteUser/', function(req, res) {
  const { id } = req.body;
  nukeusers(id);
  res.send(`user ${id} has bye bye`);
});


app.get('/Com/makeuser/:UserId/', (req, res) => {
  UserCreate(req.params.UserId)
  res.send({ usrLoction: "user/" + req.params.UserId + "/main.json" });
})

app.get('/Com/deleteUser/:UserIds/', function(req, res) {
  nukeusers(req.params.UserIds);
  res.send('Delete record with' + req.params.UserIds);
});



//app.get('/v1/lookup/cuser', (req, res) => {const {cuser} = req.params;res.send(cuser)})

app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})


app.listen(3000, () => {
  console.log('server started');
  console.log('')
});