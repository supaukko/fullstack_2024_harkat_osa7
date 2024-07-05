const mongoose = require('mongoose')

const isValidString = (value) => {
  return value !== null && value !== undefined && value !== ''
}

/**
 * Blogin skeema, riippuvuus useriin
 * Mongoosen populate-funktion toiminnallisuus perustuu siihen, että
 * on viitteiden "tyypit" on määritelty olioiden Mongoose-skeemaan
 * ref-kentän avulla
 */
const blogSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    validate: {
      validator: isValidString,
      message: 'Invalid title'
    }
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: isValidString,
      message: 'Invalid URL'
    }
  },
  votes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: {
    type: [Object],
    default: []
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
