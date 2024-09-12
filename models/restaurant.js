import mongoose from 'mongoose'

const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: {
    type: String, 
    required: true,
  },
  dishes:[{ 
    type: Schema.Types.ObjectId, 
    ref: 'Dish' 
  }],
  cuisine:{
    type: String,
    required: true,
    enum: [ "American", "Brazilian", "Caribbean",
      "Cajun and Creole", "Chinese", "Filipino",
      "French", "Greek", "Indian", "Italian",
      "Japanese", "Korean", "Lebanese", "Mediterranean",
      "Mexican", "Middle Eastern", "Peruvian", "Spanish",
      "Thai", "Vietnamese", "Other"
    ]
  },
  owner: { 
    type: Schema.Types.ObjectId, 
    ref: 'Profile'
  },
  license: {
    type:Number,
    required:true
  },
  licenseState:  {
    type:String,
    required:true
  },
  photo: String,
  zipcode: Number,
},{
  timestamps: true,
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export { Restaurant }
