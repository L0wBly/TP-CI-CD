import express from 'express'
import { deleteItem, getItemById, getItems, postItem, putItem } from '../services/services.js'


const router = express.Router()

router.post('/Items',postItem)
router.get('/Items', getItems)
router.get('/Items/:id', getItemById)
router.delete('/Items/:id', deleteItem)
router.put('/Items/:id', putItem)

export default router