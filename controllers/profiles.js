import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

async function show(req,res){
  try {
    const userProfile = await Profile.findById(req.user.profile).populate(['restaurant','dishesReviewed'])
    res.status(200).json(userProfile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findById(req.params.id)

    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    profile.photo = image.url
    
    await profile.save()
    res.status(201).json(profile.photo)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export { show, addPhoto }
