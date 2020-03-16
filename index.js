
const express = require('express')
const mysql = require('mysql2')
var bodyParser = require("body-parser");
const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'rtlry',
  database: 'lpdip'
});

app.get('/todos',function(req,res){
  connection.query('SELECT * FROM todo',function(err,result,fields){
    res.json(result)
  })
})

app.post('/todos',function(req,res){
  connection.query("INSERT INTO todo (label,isDone) VALUES (?,?)",[req.body.label,req.body.isDone],function(err,result,fields){
    res.send(err+result+fields)
  })
})

app.put('/todos/:id',function(req,res){
  connection.query("UPDATE todo SET label=?,isDone=? WHERE id = ?",[req.body.label,req.body.isDone,req.params.id],function(err,result,fields){
    res.send(result)
  })
})

app.delete('/todos/:id',function(req,res){
  connection.query('DELETE FROM todo WHERE id = ?',[req.params.id],function(err,result,fields){
    res.json(result)
  })
})

app.get('/', function (req, res) {
  res.send('hello, go on route /todos for the list')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

