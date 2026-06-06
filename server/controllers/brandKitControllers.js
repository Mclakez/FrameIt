import { BrandKit } from "../models/Brandkit.js";
import { cloudinary } from '../config/cloudinary.js';

export async function postBrandKit(req, res) {
    const userId = await req.user.id

    try {
        const {brandName} = req.body
        if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' })
    }

    const logoUrl = req.file.path
    const cloudinaryId = logoUrl.split('/').slice(-2).join('/').split('.')[0]

    const brandkit = await BrandKit.create({
        user: userId,
        brandName,
        logoUrl,
        cloudinaryId

    })

    res.json({
      message: 'Logo uploaded successfully',
      logoUrl: brandkit.logoUrl,
      brandkit
    })
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}


export async function getBrandKits(req, res) {
    const userId = await req.user.id
    
    try{
        const brandKits = await BrandKit.find({user: userId}).sort({createdAt: -1})
        res.status(200).json({brandKits})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}


export async function getBrandKit(req, res) {
    const { id } = req.params
        
    try {
        const brandKit = await BrandKit.findById(id)
            if(!brandKit) {
        res.status(404).json({message: "Brandkit not found"})
        return
    }

    if(brandKit.user.toString() !== req.user.id) {
        return res.status(401).json({message: "Not Authorized"})
    }

    res.status(200).json({brandKit})

    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}


export async function deleteBrandKit(req, res) {
    const { id } = req.params
    const brandKit = await BrandKit.findById(id)

    try {
        if(!brandKit) {
        res.status(404).json({message: "Brandkit not found"})
        return
    }

    if(brandKit.user.toString() !== req.user.id) {
        return res.status(401).json({message: "Not Authorized"})
    }

    const deletedBrandKit = await BrandKit.findByIdAndDelete(id)
    await cloudinary.uploader.destroy(deletedBrandKit.cloudinaryId)
    res.status(200).json({message: "Brandkit successfully deleted"})
    } catch (error) {
        res.status(500).json({message:"Server error", error: error.message})
    }
}