var express = require("express");
var app = express();
//var db = require("./db");
const config = require("./config");
var bodyParser = require('body-parser');
const uri = 'mongodb+srv://koushikkn1810:6T542j8TaMPHLjXq@cluster0.q3at5zf.mongodb.net/?retryWrites=true&w=majority';

const { MongoClient } = require('mongodb');
const client = new MongoClient(uri);
var col;

app.use(bodyParser.json());


app.listen(4000, async() => {
    await client.connect();
    const dbName = "book_details";
    const collection = "manage_book_details";

    const connsctToDb = client.db(dbName);
         col = connsctToDb.collection(collection);

    console.log("Server running on port 4000");
   });


    




app.get("/api/listBooks", async(req, res, next) => {
    
    
   
    try{
        
        console.log("connected",req.query);
        

        const totalData = await col.find({}).toArray();

        console.log(totalData);

        if(totalData.length>0){
            let data = {
                statuscode :200,
                data :totalData
            }

            res.send(data);
        }else{

            let data = {
                statuscode :203,
                data :'No record found.'
            }

            res.send(data);

        }
        


    }catch{
        let data={
            statuscode:500,
            data :"Exception in listing books api"
        }

        res.send(data);
    }

   
   });

   app.get("/api/getBookDetails", async(req, res, next) => {
    
    
    if(req.query.id==undefined || !req.query.id){
            
        let data = {
            statuscode :400,
            data :'Id is mandatory.'
        }

        res.send(data);
    }
    
   
    try{
        
        if(req.query!=null && req.query!=undefined && req.query.id){
        console.log("connected",req.query);
        

        const totalData = await col.findOne({id:req.query.id});

        console.log(totalData);

        if(totalData){
            let data = {
                statuscode :200,
                data :totalData
            }

            res.send(data);
        }else{

            let data = {
                statuscode :203,
                data :'No record found.'
            }

            res.send(data);

        }
    }
        


    }catch{
        let data={
            statuscode:500,
            data :"Exception in listing books api"
        }

        res.send(data);
    }

   
   });


   app.post("/api/insertBook", async(req, res) => {
    
   
    
    try{
        let data = req.body;
        console.log("data",req.body)
        
        if((data.id ==undefined || data.id == null) || (data.name ==undefined || data.name == null) ||
        (data.author ==undefined || data.author == null)){
            let outPutData = {
                statuscode:400,
                data : "Please pass the required field, i.e id,name and author"
            }

            res.send(outPutData);
        }else{

        let insertData={
            id:data.id,
            name:data.name,
            author:data.author
        }
        
        const insertedResult = await col.insertOne(insertData);
        console.log(insertedResult);
        if(insertedResult.acknowledged==true){
            let data={
                statuscode:200,
                data :"Inserted successfully."
            }

            res.send(data);
        }else{
            let data={
                statuscode:500,
                data :"Unable to insert data to database"
            }

            res.send(data);

        }
    }
        


    }catch{
        let data={
            statuscode:500,
            data :"Exception in insert books api"
        }

        res.send(data);
        
    }

   
   });


   app.post("/api/updateBook", async(req, res) => {
    
   
    
    try{
        let data = req.body;
        console.log("data",req.body)
        
        if((data.id ==undefined || data.id == null) || (data.name ==undefined || data.name == null)){
            let outPutData = {
                statuscode:400,
                data : "Please pass the required field, i.e id,name"
            }

            res.send(outPutData);
        }else{

        const filter = {id:data.id}
        const update = {
            $set:{
                name :data.name
            }
        }
        
        const updatedResult = await col.updateOne(filter,update);
        console.log(updatedResult);
        if(updatedResult.acknowledged==true && updatedResult.matchedCount>0){
            let data={
                statuscode:200,
                data :"Updated successfully."
            }

            res.send(data);
        }else{
            let data={
                statuscode:203,
                data :"No record found for the given id"
            }

            res.send(data);

        }
    }
        


    }catch{
        let data={
            statuscode:500,
            data :"Exception in insert books api"
        }

        res.send(data);
        
    }

   
   });


   app.delete("/api/deleteBook", async(req, res, next) => {
    
    
   
    try{
        
        console.log("connected");
       
        if(req.query.id==undefined || !req.query.id){
            
            let data = {
                statuscode :400,
                data :'Id is mandatory.'
            }

            res.send(data);
        }
    else{
        

        const deletedData = await col.deleteOne({id:req.query.id});

        console.log(deletedData);

        if(deletedData.deletedCount>0){
            let data = {
                statuscode :200,
                data :"Data deleted successfully"
            }

            res.send(data);
        }else{

            let data = {
                statuscode :203,
                data :'No record deleted for the given id'
            }

            res.send(data);

        }
    }
        


    }catch{
        let data={
            statuscode:500,
            data :"Exception in insert delete api"
        }

        res.send(data);
    }

   
   });

