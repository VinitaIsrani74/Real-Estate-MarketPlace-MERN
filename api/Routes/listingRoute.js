import express from 'express'
import { createListing, deleteListing, updateListing } from '../Controllers/listingController.js'
import { validateToken } from '../utils/validateUser.js'

const listingRoute = express.Router()

//routes
listingRoute.post('/create',validateToken, createListing)
listingRoute.delete('/delete/:id',validateToken, deleteListing)
listingRoute.post('/update/:id',validateToken, updateListing)

export default listingRoute