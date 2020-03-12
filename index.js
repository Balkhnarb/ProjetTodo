
const express = require('express')
const mysql = require('mysql2')
const app = express()

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'rtlry',
  database: 'lpdip'
});

app.get('/users',function(req,res){
  connection.query('SELECT * FROM user',function(err,result,fields){
    res.json(result)
  })
})

app.get('/user/:id',function(req,res){
  if(isNaN(req.params.id)){
    let reqsql = 'SELECT * FROM user WHERE id='+req.params.id
    connection.query(reqsql,function(err,result,fields){
      res.json(result)
    })
  }
})

app.get('/', function (req, res) {
  
  let obj = {
    "Nom" : "Jean",
    "Age" : 34
  }

  res.json(obj);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

