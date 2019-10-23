import express, {Request,Response} from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Oeuvre from "./model/oeuvre.model";

export default class Server{
constructor(private port:number){}

public start(){
    const app=express();
    app.use( bodyParser.json());
    const uri = "mongodb://localhost:27017/Artiste";
    mongoose.connect(uri,(err)=>{
        if(err) console.log(err);
        else console.log("Mongo Data base connected successfuly");
    });
    //app.use(serveStatic("public"));
    app.get("/oeuvres",(req:Request,resp:Response)=>{
        let p:number=parseInt(req.query.page || 1);
        let size:number=parseInt(req.query.size || 2)
        Oeuvre.paginate({},{page:p, limit:size },(err,oeuvres)=>{
            if(err) resp.status(500).send(err)
            else resp.send(oeuvres)
        })
    });
    app.get("/oeuvres-search",(req:Request,resp:Response)=>{
        let p:number=parseInt(req.query.page || 1);
        let size:number=parseInt(req.query.size || 2);
        let cat:string=req.query.cat || "";
        Oeuvre.paginate({categorie:{$regex:".*(?i)"+cat+".*"}},{page:p, limit:size },(err,oeuvres)=>{
            if(err) resp.status(500).send(err)
            else resp.send(oeuvres)
        })
    });
    app.get("/oeuvres/:id",(req:Request,resp:Response)=>{
        Oeuvre.findById(req.params.id,(err,oeuvre)=>{
            if(err) resp.status(500).send(err)
            else resp.send(oeuvre)
        })
    });
    app.post("/oeuvres",(req:Request,resp:Response)=>{
        let oeuvre = new Oeuvre(req.body);
        oeuvre.save(err=>{
           if(err) resp.status(500).send;
           else resp.send(oeuvre);
        });
    });
    app.put("/oeuvres/:id",(req:Request,resp:Response)=>{
        Oeuvre.findByIdAndUpdate(req.params.id,req.body,(err,oeuvre)=>{
            if(err) resp.status(500).send;
            else resp.send("modification avec succès");
        });  
    });
    app.listen(this.port,()=>{
        console.log("server demmaré avec succes: "+ this.port);
    })
}
}