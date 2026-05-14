import Contact from '../models/Contact.js'
import { validationResult } from 'express-validator'

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res, next) => {
  try {
    // Check validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      })
    }

    const { name, email, message } = req.body

    // Create contact entry
    const contact = await Contact.create({
      name,
      email,
      message,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    })

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        createdAt: contact.createdAt,
      },
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get all contacts (Admin)
// @route   GET /api/contact
// @access  Private (would require auth in production)
export const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .select('-__v')

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single contact (Admin)
// @route   GET /api/contact/:id
// @access  Private
export const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id).select('-__v')

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      })
    }

    res.status(200).json({
      success: true,
      data: contact,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Mark contact as read (Admin)
// @route   PUT /api/contact/:id/read
// @access  Private
export const markAsRead = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true, runValidators: true }
    )

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Contact marked as read',
      data: contact,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete contact (Admin)
// @route   DELETE /api/contact/:id
// @access  Private
export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}
