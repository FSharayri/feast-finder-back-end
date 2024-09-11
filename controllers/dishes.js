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
    const profile = await Profile.findById(req.user.profile)
    if (profile.isRestaurant){
      // TODO make sure body has a restaurant in it
      const dish = await Dish.create(req.body)
      const profile = await Profile.findById(req.user.profile)
      dish.owner = profile
      res.status(201).json(dish)
    }else {
      res.status(401).json({ err: "This Profile is not a restaurant profile" })
    }
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

async function show(req, res) {
  try {
    const dish = await Dish.findById(req.params.dishId).populate(['restaurant','owner','reviews.owner'])
    res.status(200).json(dish)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function update(req, res) {
  try {
    const dish = await Dish.findById(req.params.dishId)
    if(dish.owner._id.equals(req.user.profile)){
      const updatedDish = await Dish.findByIdAndUpdate(req.params.dishId, req.body, {new: true}).populate(['restaurant','owner','reviews.owner'])
      res.status(200).json(updatedDish)
    } else{
      res.status(401).json({ err: "You are not the owner of this dish" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deleteDish(req, res){
  try{
    const dish = await Dish.findById(req.params.dishId)
    if(dish.owner._id.equals(req.user.profile)){
      const deletedDish = await Dish.findByIdAndDelete(req.params.dishId)
      res.status(200).json(deletedDish)
    }else{
      res.status(401).json({ err: "You are not the owner of this dish" })
    }
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

async function updateReview(req, res) {
  try {
    const dish = await Dish.findById(req.params.dishId) 
    const review = dish.reviews.id(req.params.reviewId)
    if (review.owner._id.equals(req.user.profile)){
      review.rating = req.body.rating    
      review.comment = req.body.comment
      review.photo = req.body.photo
      await dish.save()
      res.status(200).json(dish)
    }else{
      res.status(401).json({ err: "You are not the owner of this review" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
async function deleteReview(req,res){
	try{
    const dish = await Dish.findById(req.params.dishId)
    const review = dish.reviews.id(req.params.reviewId)
    if (review.owner._id.equals(req.user.profile)){
      dish.reviews.remove({_id : req.params.reviewId})
      await dish.save()
      res.status(200).json(dish) 
    }else{
      res.status(401).json({ err: "You are not the owner of this review" })
    }
	}catch(error){
		res.status(500).json(error)
	}
}
async function addDishPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const dish = await Dish.findById(req.params.dishId)

    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.params.dishId}` }
    )
    dish.photo = image.url
    
    await dish.save()
    res.status(201).json(dish.photo)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export {
  create,
  update,
  index,
  show,
  deleteDish as delete,
  createReview,
  updateReview,
  deleteReview,
  addDishPhoto,
}