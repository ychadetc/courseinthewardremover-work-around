const express = require('express');
const app = express();
const port = 9000;
const cors = require('cors');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '',
    port:'',
    user: '',
    password: '',
    database: ''
    
  })

  app.use(cors());

  var bodyParser = require("body-parser");

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(bodyParser.json());

app.listen(port, ()=> console.log("server is online"));

app.get("/courseInTheWard", (req, res)=>{
    
    var sql = `select hcrsward.enccode, hperson.hpercode, CONCAT(hperson.patfirst," ",hperson.patmiddle," ",hperson.patlast) AS fullname, hcrsward.crseward, hcrsward.tmetake, hcrsward.dtetake, hcrsward.entryby, CONCAT(hpersonal.lastname,", ", hpersonal.firstname," ",hpersonal.middlename) as employee 
 from hcrsward inner join hperson on hcrsward.hpercode = hperson.hpercode inner join hpersonal on hcrsward.entryby = hpersonal.employeeid`;
    
    connection.query(sql, (err, rows)=>{
         res.send({ciw:rows})
    });

});

app.post("/DeleteCrse", (req, res)=>{

    var tmetake = new Date(req.body.tmetake);
    console.log(tmetake);

    var sql_delete = `delete from hcrsward where tmetake = ?`;

    connection.query(sql_delete, [tmetake], (err, rows)=>{

        res.send({message:"Course in the ward deleted"})
        
        

      

      });

    });

  app.post("/UpdateCrse", (req, res)=>{

    var tmetake = new Date(req.body.oldTime); //old time

    var dtetake = new Date(req.body.newTime); //new time

    console.log(tmetake);
    console.log(dtetake);
    
    var updatesqldte = `update hcrsward set dtetake = ? where tmetake = ?`;
    
    var updatesqltme = `update hcrsward set tmetake = ? where dtetake = ?`;

    connection.query(updatesqldte, [dtetake, tmetake], (err, rows)=>{

      connection.query(updatesqltme, [dtetake, dtetake], (err, rows1)=>{

        res.send({message:"Course in the ward updated"});

      });

            

    });
  });

    


