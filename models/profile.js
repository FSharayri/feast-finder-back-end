import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  isRestaurant: Boolean,
  dishesReviewed: [{ type: Schema.Types.ObjectId, ref: 'Dish' }],
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
