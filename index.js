const mysql=require('mysql');
const express=require('express');
var app =express();
const bodyparser=require('body-parser');

app.use(bodyparser.json());


//creating server and connecting with db
var mysqlconnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Password@123",
    database:"nodefirst",
    multipleStatements : true
});
mysqlconnection.connect((error) => {
        if(error) throw error;
        console.log("connected with db !");      
    });

    app.listen(8008,()=>console.log('expresso is running now'));

    //routes
    //get all user
    app.get('/user',(req,res)=>{
        mysqlconnection.query('select * from new_table',(err,result,fields)=>
        {
            if(!err)
            res.send(result);
            else
            console.log(err);
        })
    });

    //get req by id
    app.get('/user/:id',(req,res)=>{
        mysqlconnection.query('select * from new_table where id= ?',[req.params.id],(err,result,fields)=>
        {
            if(!err)
            res.send(result);
            else
            console.log(err);
        })
    });   
    
    //delete the user by id
    app.delete('/user/:id',(req,res)=>{
        mysqlconnection.query('delete from new_table where id= ?',[req.params.id],(err,result,fields)=>
        {
            if(!err)
            res.send('Deleted successfully from db.');
            else
            console.log(err);
        })
    });

    //insert data into db
    app.post('/user',(req,res)=>{
        console.log(req.body);

        let sql = `insert into new_table (name,email,phone,city) 
                   values ('${req.body.name}','${req.body.email}','${req.body.phone}','${req.body.city}')`;
        mysqlconnection.query(sql,(err,result,fields)=>
        {
            if(!err)
            res.send("data inserted");
            else
            res.send(err);
        })
    });

    //update data into db
    app.put('/user/:id',(req,res)=>{
        console.log(req.params.id);

        let sql = `update new_table SET
        name='${req.body.name}',
        email='${req.body.email}',
        phone='${req.body.phone}',
        city='${req.body.city}'
        Where id='${req.body.id}'`;
       
        mysqlconnection.query(sql,(err,result)=>
        {
            if(!err)
            res.send("data updates");
            else
            res.send(err);
        })
    });