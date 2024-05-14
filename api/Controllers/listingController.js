import listingModel from "../Models/listingModel.js"

//create listing

export const  createListing = async (req, res, next) =>{
    try {
        const listing = await listingModel.create(req.body)
        return res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}