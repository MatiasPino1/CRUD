const express=require("express")
require("dotenv").config()
const app=express()
const path=require("path")
const fileupload=require("express-fileupload")
const routeIndex=require("./router/index")
const port=process.env.PORT
const hbs=require("hbs")
app.set("view engine","hbs")
hbs.registerPartials(path.join(__dirname,"./views/partials"))


app.use(fileupload({
    useTempFiles : true,
    tempFileDir : "/tmp/"
}));
app.use(express.static(path.join(__dirname,"./public")))
app.use(express.urlencoded({extended:false}))

app.use("/",routeIndex)



app.listen(port,(err=>{
    err?console.log("Ha ocurrido un error al iniciar el servidor"):console.log(`Servidor corriendo en http://localhost:${port}`)
}))
