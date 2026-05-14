import express from 'express'
import { body } from 'express-validator'
import {
  submitContact,
  getContacts,
  getContact,
  markAsRead,
  deleteContact,
} from '../controllers/contact.controller.js'

const router = express.Router()

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10 })
    .withMessage('Message must be at least 10 characters')
    .isLength({ max: 2000 })
    .withMessage('Message cannot exceed 2000 characters'),
]

// Routes
router.post('/', contactValidation, submitContact)
router.get('/', getContacts)
router.get('/:id', getContact)
router.put('/:id/read', markAsRead)
router.delete('/:id', deleteContact)

export default router
