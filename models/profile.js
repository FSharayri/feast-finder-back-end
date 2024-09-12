import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  photo: String,
  isRestaurant: {
    type: Boolean,
    default: false,
  },
  restaurant: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Restaurant',
    default: null,
  }],
  dishesReviewed: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Dish' 
  }],
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
