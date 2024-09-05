import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'




async function index(req, res) {
  try {
    const restaurants = await Restaurant.find({}).populate(['dishes', 'owner']).sort({createdAt:'desc'})
    res.status(200).json(restaurants)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  index
}