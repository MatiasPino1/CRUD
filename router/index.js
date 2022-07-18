const express=require("express")
const router=express.Router()
const productsModel=require("../models/productsModel")
const cloudinary=require("cloudinary").v2
const util=require("util")
const uploader=util.promisify(cloudinary.uploader.upload)
const destroy=util.promisify(cloudinary.uploader.destroy)


router.get("/",async(req,res)=>{
const product=await productsModel.getProducts()
const data=product.map((row)=>{
    const imageURL=cloudinary.url(row.image,
        {width:100
            ,height:100
            ,crop:"fill",
        })
        return{...row,imageURL}
})
console.log(product)
    res.render("index",{data})
})
router.get("/addItem",(req,res)=>{
    res.render("addItem")
})

router.post("/addItem",async(req,res)=>{
let imageFile=req.files.imageFile
const img_id=(await uploader(imageFile.tempFilePath)).public_id


productsModel.addProducts({...req.body,image:img_id})

res.redirect("/")
})

router.get("/handleEdit/:id",async (req,res)=>{
const row=await productsModel.getProduct(req.params.id)
const product={
    id:row[0].id,
    name:row[0].name,
    origin:row[0].origin,
    description:row[0].description,
    intensity:row[0].intensity,
    price:row[0].price,
    presentation:row[0].presentation,
    image:row[0].image
}
res.render("editItem",{product})
})

router.get("/deleteProduct/:id",async (req,res)=>{
    const row=await productsModel.getProduct(req.params.id)
    await destroy(row[0].image)
    await productsModel.deleteProduct(req.params.id)
    res.redirect("/")
})

router.post("/editProduct/:id",async(req,res)=>{
    const{id,name,origin,description,intensity,price,presentation,image}=req.body;
    let img_id=null
    if(!req.files){
img_id=req.body.prevImage
}
else{
    const row=await productsModel.getProduct(req.params.id)
    await destroy(row[0].image)
    const imageFile=req.files.imageFile
    img_id=(await uploader(imageFile.tempFilePath)).public_id
}
const data={
    id:req.body.id,
    name:req.body.name,
    origin:req.body.origin,
    description:req.body.description,
    intensity:req.body.intensity,
    price:req.body.price,
    presentation:req.body.presentation,
    image:img_id
}
    await productsModel.modifyProduct(data,req.params.id)
    res.redirect("/")
})
module.exports=router