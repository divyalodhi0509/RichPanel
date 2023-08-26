const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const collection=require("mongodb")
const tempelatePath=path.join(__dirname,'../tempelates')

app.use(express.json())
app.set("view engine","hbs")
app.set("views",tempelatePath)
app.use(express.urlencoded({extended:false}))


app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/signup",async(req,res)=>{

    const data={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }

   await collection.insertMany([data])

   res.render("home")

})

app.post("/login",async(req,res)=>{

    try{

        const check=await collection.findOne({name:req.body.name})
        if(check.password===req.body.password){
            res.render("home")
        }
        else{
            res.send("word password")
        }
    }

   catch{
    res.send("wrong details")
   }

})

window.addEventListener('load',()=>{

    const params =(new URL(document.location)).searchParams;
    const name= params.get('name');
    const surname= params.get('surname');

    document.getElementById('result-name').innerHTML=name;
    document.getElementById('result-suranme').innerHTML=surname;
})

app.listen(3000,()=>{
    console.log("port Connected!")
})