import express from "express";
import { getBrandKit, getBrandKits, deleteBrandKit, postBrandKit } from "../controllers/brandKitControllers.js";
import { checkJwt } from "../middlewares/checkJwt.js";
import { upload } from "../config/multer.js";
export const brandKitRouter = express.Router()


brandKitRouter.post('/', checkJwt, upload.single('logo'), postBrandKit)

brandKitRouter.get('/', checkJwt, getBrandKits)

brandKitRouter.get('/:id', checkJwt, getBrandKit)

brandKitRouter.delete('/:id', checkJwt, deleteBrandKit)