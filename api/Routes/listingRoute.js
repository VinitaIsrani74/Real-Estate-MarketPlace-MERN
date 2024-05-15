import express from 'express'
import { createListing, deleteListing } from '../Controllers/listingController.js'
import { validateToken } from '../utils/validateUser.js'

const listingRoute = express.Router()

//routes
listingRoute.post('/create',validateToken, createListing)
listingRoute.delete('/delete/:id',validateToken, deleteListing)

export default listingRoute