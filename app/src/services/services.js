import { errorCondition } from "../helper/errorCondition.js"
import { Item, ItemValidation } from "../models/model.js"



export const postItem = async (req, res) => {
    const { error, value } = ItemValidation.validate(req.body)

    errorCondition(error)

    const newItem = new Item(
      req.body
    )
    const addItem = await newItem.save()
    res.status(201).json(addItem)
}


 

export const getItems = async (req, res) => {
  const ItemsListe = await Item.find()
  res.send(ItemsListe)
}


 

export const getItemById = async (req, res) => {
  try {
    const Item = await Item.findById(req.params.id)

    if (!Item) {
      return res.status(404).json({ message: `Item id : ${req.params.id} non trouvé` })
    }
    res.status(200).json(Item)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Une erreur est survenue" });
  }
}

export const deleteItem = async (req, res) => {
    const delItem = await Item.findByIdAndDelete(req.params.id)
    if (!delItem) {
      return res.status(404).Json({ message: "Item non trouvé" })
    }
    res.status(204).end()
}

export const putItem = async (req, res) => {
  try {
    const { error, value } = ItemValidation.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    const majItem = await Item.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      price: req.body.price
    }, { new: true })

    if (!majItem) {
      return res.status(404).json({ message: "Item non trouvé " })
    }
    res.status(200).json(majItem)

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error })
  }
}