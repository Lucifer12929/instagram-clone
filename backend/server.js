
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Pusher from "pusher";
import dbModel from "./dbModel.js";



const app = express();
const port = process.env.PORT || 8080;
const pusher = new Pusher({
    appId: "1277995",
    key: "1fba199755fa9857740a",
    secret: "5a13834e468aa49b466a",
    cluster: "ap2",
    useTLS: true
  });

app.use(express.json());
app.use(cors());

const connection_url='mongodb+srv://admin:OyxuCWdack2TUzzB@cluster0.qe3sf.mongodb.net/instaDB?retryWrites=true&w=majority';

mongoose.connect(connection_url,{
   
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open',()=>{
    console.log("Db connected");
    const changeStream = mongoose.connection.collection("posts").watch();
    changeStream.on('change',(change)=>{
        console.log('Chanege')
        console.log(change)

        if(change.operationType==='insert'){
            console.log('***Image Uploaded***')

            const postDetails=change.fullDocument;
            pusher.trigger('posts','inserted',{
                user:postDetails.user,
                caption:postDetails.caption,
                image:postDetails.image
            })
        }else{
            console.log('Error triggering Pusher')
        }
    })
})
app.get("/",(req,res)=>{
    res.status(200).send("Hello World")
});

app.post("/upload",(req,res)=>{
   const body=req.body;
   dbModel.create(body,(err,data)=>{
       if(err){
           res.status(500).send(err);
       }
       else{
           res.status(201).send(data);
       }
   });

});
app.get('/sync',(req,res)=>{
    dbModel.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    })
})
app.listen(port,()=>{
    console.log(`listening port:${port}`)
});
