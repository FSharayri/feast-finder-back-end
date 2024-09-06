import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'
import { Restaurant } from '../models/restaurant.js'

async function create(req, res) {
  try { 
    req.body.owner = req.user.profile
    const restaurant = await Restaurant.create(req.body)
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

async function show(req, res) {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId).populate()
    res.status(200).json(restaurant)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function update(req, res) {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.restaurantId, req.body, {new: true}).populate()
    res.status(200).json(restaurant)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deleteRestaurant(req, res){
  try{
    const restaurant = await Restaurant.findByIdAndDelete(req.params.restaurantId)
    const profile = await Profile.findById(req.user.profile)
    console.log(profile.restaurant)
    // profile.restaurant.remove({_id: req.params.restaurantId}) // TODO delete restaurant's dishes
    profile.restaurant = null
    await profile.save()
    res.status(200).json(restaurant)
  }catch(error){
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  index,
  create,
  show,
  update,
  deleteRestaurant as delete,
}