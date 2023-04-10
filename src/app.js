const path=require("path")
const express=require('express')
const hbs=require('hbs')
const geocode=require("./utils/geocode")
const forecast=require("./utils/forcast")
const app = express()
const port=process.env.PORT || 3000

//define path for express
const publicDirectoryPath=path.join(__dirname,"../public")
const viewPath=path.join(__dirname,"../templates/views")
const partialpath=path.join(__dirname,"../templates/partials")

//set handlebars engine and view locations
app.set("view engine","hbs")
app.set("views",viewPath)
hbs.registerPartials(partialpath)

//setup statc directory to serve
app.use(express.static(publicDirectoryPath))


app.get("",(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:"Riham"

    })
})

app.get("/about",(req,res)=>{
    res.render('about',{
        title:"About Page",
        name:"Riham"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        helpText:"This is some helpfull text.",
        title:"Help page",
        name : "Riham"
    })
})

app.get("/weather",(req,res)=>{

    if(!req.query.address) {
        return res.send({
            error:"No Address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,label}={})=> {
        if(error) {
            return  res.send({
                error
            })
        }
        forecast(latitude,longitude, (error, forecastdata) => {
           if(error){
            return res.send({
                error
            })
           }
           res.send({
            forecast:forecastdata,
            address:label,
            location:req.query.address
        })
          })
    
    })
   
})


app.get("/products",(req,res)=>{
    if(!req.query.search) {
       return res.send({
            error:"Please provide search term."
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get("/help/*",(req,res)=>{
    res.render("errorPage",{
        title:"404",
        message:"Help article not found",
        name:"Riham"
    })
})

app.get("*",(req,res)=>{
    res.render("errorPage",{
        title:"404",
        message:" page is not found",
        name:"Riham"
    })
})

app.listen(port,()=>{
    console.log("server running on port "+port)
})


// console.log(__dirname)
// //console.log(__filename)