import prisma from '../db'

export const createComment = async function (req, res) {
  const { comment } = req.body
  const {blogId} = req.params

  const commentRes = await prisma.comment.create({
    data: {
      comment,
      blogId,
      authorId: req.user.id,
    },
  })

  console.log(commentRes)

  res.status(201).json({ data: commentRes })
}

export const getAllComments = async function (req, res) {
  const blogPost = await prisma.blogPost.findMany({
    where: {
      id: req.params.blogId
    },
    include: {
      Comment: true
    }
  })

  const data = blogPost.map(post => post.Comment)

  res.status(200).json({ data })
}

export const getComment = async function (req, res) {
  const comment = await prisma.comment.findUnique({
    where: {
      id: req.params.id,
    },
  })

  if (!comment) {
    res.status(404).json({ message: 'This comment does not exist' })
    return
  }

  res.status(200).json({ data: comment })
}

export const deleteComment = async function (req, res) {
  console.log(req.params.id, req.user.id)
  try {
    const deletedComment = await prisma.comment.delete({
      where: {
        id_authorId: {
          id: req.params.id,
          authorId: req.user.id,
        },
      },
    })

    res.status(204).json({ data: deletedComment })
  } catch (err) {
    if (err.code === 'P2025') {
      res
        .status(403)
        .json({ message: 'You are not authorized to delete this comment' })
    } else {
      res
        .status(500)
        .json({ message: 'Something went wrong, please try again' })
    }
  }
}

export const editComment = async function (req, res) {
  const {comment} = req.body

  const blogPost = await prisma.comment.update({
    where: {
      id_authorId: {
        id: req.params.id,
        authorId: req.user.id,
      },
    },
    data: {
      comment
    },
  })

  res.status(200).json({ data: comment })
}
