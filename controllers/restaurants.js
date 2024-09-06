import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'
import { Restaurant } from '../models/restaurant.js'

async function create(req, res) {
  try {
    console.log(req.user.profile)
    req.body.owner = req.user.Profile
    const restaurant = await Restaurant.create(req.body)
    console.log(restaurant)
    const profile = await Profile.findById(req.user.profile)
    profile.restaurant = restaurant
    await profile.save()
    restaurant.owner = profile._id
    res.status(201).json(restaurant)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

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
  index,
  create,
  
}