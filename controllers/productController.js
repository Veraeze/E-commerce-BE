import { v2 as cloudinary } from "cloudinary"
import prodectModel from "../models/productModel.js"

// add product
const addProduct = async (req, res) => {

    try {
        const {name, description, price, category, subCategory, colors, bestseller} = req.body
        
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item)=> item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'})
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            price: Number(price),
            image: imagesUrl,
            category,
            subCategory,
            colors: JSON.parse(colors),
            bestseller: bestseller === "true" ? true : false,
            date: Date.now()
        }

        console.log(productData);
        const product = new prodectModel(productData);
        await product.save()
        
        
        res.json({success:true, message: "product added"})

    } catch (error) {
        console.log(error);
        
        res.json({success:false, message:error.message})
    }

}

// list product
const listProduct = async (req, res) => {

}
// remove product
const removeProduct = async (req, res) => {

}
// view product
const singleProduct = async (req, res) => {

}

export {addProduct, listProduct, removeProduct, singleProduct}