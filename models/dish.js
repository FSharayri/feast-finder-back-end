import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
  comment: String,
  rating: {
    type: Number,
    required: true
  },
  photo: String
  },{
  timestamps: true,
})

const dishSchema = new Schema({
  owner: { 
    type: Schema.Types.ObjectId, 
    ref: 'Profile' 
  },
  name: {
    type: String,
    required: true
  },
  photo: String,
  restaurant: { 
    type: Schema.Types.ObjectId, 
    ref: 'Restaurant'
  },
  cost: Number,
  reviews: [reviewSchema],
},{
  timestamps: true,
})

const Dish = mongoose.model('Dish', dishSchema)

export { Dish }
