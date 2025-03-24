import Joi from "joi";
import mongoose from "mongoose";

const item = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  price: {
    type: Number,
    required: true
  }
})

const Item = mongoose.model('objet', item)

const ItemValidation = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'string.empty': 'Le nom de l\'objet est obligatoire'
    }),
  price: Joi.number()
    .required()
    .messages({
      'price.number': 'Le prix doit être un nombre',
      'number.empty': 'Le prix est obligatoire'
    })
})

export { Item, ItemValidation }