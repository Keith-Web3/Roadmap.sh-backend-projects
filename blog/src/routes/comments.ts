import express from 'express'
import { body } from 'express-validator'

import { protect, validatePayload } from '../modules/middleware'
import {
  createComment,
  deleteComment,
  editComment,
  getAllComments,
  getComment,
} from '../handlers/comments'

import blogRoute from './blog'

const router = express.Router({ mergeParams: true })
blogRoute.use(':/blogId/comment', router)

router.get('/', getAllComments)
router.get('/:id', getComment)

router.use(protect)

router.post('/', body('comment').isString(), validatePayload, createComment)
router
  .route('/:id')
  .delete(deleteComment)
  .put(body('comment').isString(), editComment)

export default router
