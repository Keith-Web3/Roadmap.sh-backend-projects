import express from 'express'

import { protect, validatePayload } from '../modules/middleware'
import {
  createBlogPost,
  deletePost,
  editBlogPost,
  getAllPosts,
  getPost,
} from '../handlers/blog'
import { body } from 'express-validator'

const router = express.Router()

router.get('/', getAllPosts)
router.get('/:id', getPost)

router.use(protect)

router.post(
  '/',
  body('title').isString(),
  body('body').isString(),
  validatePayload,
  createBlogPost
)
router
  .route('/:id')
  .delete(deletePost)
  .put(
    body('title').optional().isString().trim(),
    body('body').optional().isString().trim(),
    editBlogPost
  )

export default router
