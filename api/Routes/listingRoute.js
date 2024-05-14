import express from 'express'
import { createListing } from '../Controllers/listingController.js'
import { validateToken } from '../utils/validateUser.js'

const listingRoute = express.Router()

//routes
listingRoute.post('/create',validateToken, createListing)

export default listingRoute