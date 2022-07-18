const express=require("express")
const app=express()
const fileupload=require("express-fileupload")
const routeIndex=require("./router/index")
const PORT=3030;
const hbs=require("hbs")
const path=require("path")
app.set("view engine","hbs")
hbs.registerPartials(path.join(__dirname,"./views/partials"))


app.use(fileupload({
    useTempFiles : true,
    tempFileDir : "/tmp/"
}));
app.use(express.static(path.join(__dirname,"./public")))
app.set("views",path.join(__dirname,"./views"))
app.use(express.urlencoded({extended:false}))

app.use("/",routeIndex)



app.listen(PORT,(err=>{
    err?console.log("Ha ocurrido un error al iniciar el servidor"):console.log(`Servidor corriendo en http://localhost:${PORT}`)
}))
