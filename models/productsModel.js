const pool=require("../db")
require("dotenv").config()

const getProducts=async()=>{
    const query="select * from products"
    const rows=await pool.query(query)
    return rows;
}
const getProduct=async(id)=>{
    const query="select * from products where id =?"
    const row=await pool.query(query, [id])
    return row;
}

const addProducts=async(datos)=>{
    const query="insert into products set ?"
    const rows=await pool.query(query, [datos])
    return rows
}
const deleteProduct=async(datos)=>{
    const query="delete from products where id =?"
    const row=await pool.query(query, [datos])
    return row
}

const modifyProduct=async(datos,id)=>{
      const query="update products set ? where id=?"
    const row=await pool.query(query, [datos, id])
return row
        
}

module.exports={getProducts,addProducts,getProduct,deleteProduct,modifyProduct}