import express from 'express'
import mongoose from 'mongoose'
import ejs from 'ejs'
import bodyParser from 'body-parser'

const app=express()
app.set("view engine","ejs")

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

//to connect to mongodb through mongosh
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB",{
    useNewUrlParser:true
})

const articleSchema=new mongoose.Schema({
    title:String,
    content:String
})

const Article=mongoose.model("Article",articleSchema)

const krisha=new Article({
    title:"Krisha",
    content:"Patel"
})
// krisha.save()
const bella=new Article({
    title:"bella",
    content:"singhania"
})
// bella.save()

const vish=new Article({
    title:"vish",
    content:"ahuja"
})
// vish.save()

//angela told this method but it is showing error that artice.find() does not accept any call back
//so use the below code to get all objects

//Tjis three methods can be done on all the data of the database and not on the specific one

// app.get("/articles",async (req,res)=>{
//     try{
//       const data=await Article.find()
//       console.log(data)
//       res.send(data)
//     }
//     catch(err){
//         console.log(err)
//     }
// })

// app.post("/articles",(req,res)=>{
//     try{
//     const newArticle= new Article({
//          title:req.body.title,
//          content:req.body.content
       
//     })
//     res.send(newArticle)
//     newArticle.save()
// }
// catch(err){
//     console.log(err)
//     res.send(err)
// }
// })

// app.delete("/articles",async(req,res)=>{
//     try{
//        const krisha= await Article.deleteMany()
//        res.send(krisha)
//         console.log(krisha)
//     }
//     catch(err){
//         res.send(err)
//     }
// })

//---------Chaning all the above three methods as it uses only one route which is "/articles"

app.route("/articles")
.get(async(req,res)=>{
    try{
        const krisha=await Article.find()
        console.log(krisha)
        res.send(krisha)

    }
    catch(err){
        res.status(500).send("There is an error",err)
        console.log(err)
        
    }
})
.post((req,res)=>{
    try{
      const katrina=new Article({
        title:req.body.title,
        content:req.body.content
      })
      katrina.save()
      res.send(katrina)
      console.log(katrina)
    }
    catch(err){
        res.status(500).send("There is an error",err)
    }
})
.delete(async (req,res)=>{
    try{
      const vickey= await Article.deleteMany()
      res.send(vickey)
      console.log("Successully deleted",vickey)
    }
    catch(err){
        res.send("There is an error",err)
    }
})

//------------------Resquest Targeting a specific Record------------

app.route("/articles/:Reqtitle")
.get(async(req,res)=>{
    try{
     const kiara=await Article.findOne({title:req.params.Reqtitle})
     res.send(kiara)
     console.log(kiara)
    }
    catch(err){
        res.send("There is an error",err)
        console.log("There is an error",err)
    }
})
//if there is space in title or content like virat kohli then use %20 in url to show space
.put(async(req,res)=>{
    try{
      const kriti=await Article.updateOne({
        title:req.params.Reqtitle
      },{
        title:req.body.title,
        content:req.body.content
      }
      
      )
      res.status(200).send("Success")
      console.log(kriti)
    }
    catch(err){
        res.status(500).send("There is an error")
        console.log("There is an error",err)
    }
})
.patch(async(req,res)=>{
    try{
       const vish= await Article.updateOne({
        title:req.params.Reqtitle
       },{
        $set:{title:req.body.title,content:req.body.content}
       })
       res.send(vish)
       console.log(vish)
    }
    catch(err){
        res.status(500).send("There is an err")
        console.log(err)
    }
})
.delete(async(req,res)=>{
    try{
   const alia= await Article.deleteOne({
    title:req.params.Reqtitle
   })
   res.send(alia)
   console.log(alia)
}catch(err){
   res.status(500).send("There is an error")
   console.log(err)
}
})

app.listen(3000,()=>{
    console.log("Listening at 3000")
})