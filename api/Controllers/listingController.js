import listingModel from "../Models/listingModel.js"
import { errorHandler } from "../utils/error.js"

//create listing

export const  createListing = async (req, res, next) =>{
    try {
        const listing = await listingModel.create(req.body)
        return res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}

export const  deleteListing = async (req, res, next) =>{
   
        const listing = await listingModel.findById(req.params.id)
        if(!listing){
            return next(errorHandler(404, "Listing not found!"))
        }

        if(req.user.id !== listing.userRef){
            return next(errorHandler(401, "You can only delete your own listings!")) 
        }

        try {
            await listingModel.findByIdAndDelete(req.params.id)   
            res.status(200).json("Listing deleted successfully")
    } catch (error) {
        next(error)
    }
}