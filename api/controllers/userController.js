import asyncHandler from '../middleware/asyncHandler.js'

// @desc    Get users
// @route   GET /api/users
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ]

  return res.status(200).json({ users })
})

export { getUsers }
