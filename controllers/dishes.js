import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'
import { Restaurant } from '../models/restaurant.js'
import { Dish } from '../models/dish.js'

async function index(req, res) {
  try {
    const dishes = await Dish.find({}).populate(['restaurant', 'owner']).sort({createdAt:'desc'})
    res.status(200).json(dishes)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function create(req, res) {
  try { 
    req.body.owner = req.user.profile
    
    const dish = await Dish.create(req.body)
    const profile = await Profile.findById(req.user.profile)
    
    dish.owner = profile
    res.status(201).json(dish)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

async function show(req, res) {
  try {
    const dish = await Dish.findById(req.params.dishId).populate()
    res.status(200).json(dish)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function update(req, res) {
  try {
    const dish = await Dish.findByIdAndUpdate(req.params.dishId, req.body, {new: true}).populate()
    res.status(200).json(dish)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deleteDish(req, res){
  try{
    const dish = await Dish.findByIdAndDelete(req.params.dishId)
    res.status(200).json(dish)
  }catch(error){
    console.log(error)
    res.status(500).json(error)
  }
}

async function createReview(req, res) {
  try {
    req.body.owner = req.user.profile 
    const dish = await Dish.findById(req.params.dishId)
    dish.reviews.push(req.body)
    await dish.save()
    const newReview = dish.reviews.at(-1)
    const profile = await Profile.findById(req.user.profile)
    newReview.owner = profile
    res.status(201).json(newReview)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  create,
  update,
  index,
  show,
  deleteDish as delete,
  createReview 
}