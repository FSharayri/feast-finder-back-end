import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  photo: String,
  isRestaurant: Boolean,
  dishesReviewed: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Dish' 
  }],
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
