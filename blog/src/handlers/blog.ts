import prisma from '../db'

export const createBlogPost = async function (req, res) {
  const { title, body } = req.body

  const blogPost = await prisma.blogPost.create({
    data: {
      body,
      title,
      authorId: req.user.id,
    },
  })

  console.log(blogPost)

  res.status(201).json({ data: blogPost })
}

export const getAllPosts = async function (req, res) {
  const blogPosts = await prisma.blogPost.findMany()

  res.status(200).json({ data: blogPosts })
}

export const getPost = async function (req, res) {
  const post = await prisma.blogPost.findUnique({
    where: {
      id: req.params.id,
    },
  })

  if (!post) {
    res.status(404).json({ message: 'This post does not exist' })
    return
  }

  res.status(200).json({ data: post })
}

export const deletePost = async function (req, res) {
  console.log(req.params.id, req.user.id)
  try {
    const deletedPost = await prisma.blogPost.delete({
      where: {
        id_authorId: {
          id: req.params.id,
          authorId: req.user.id,
        },
      },
    })

    res.status(204).json({ data: deletedPost })
  } catch (err) {
    if (err.code === 'P2025') {
      res
        .status(403)
        .json({ message: 'You are not authorized to delete this post' })
    } else {
      res
        .status(500)
        .json({ message: 'Something went wrong, please try again' })
    }
  }
}

export const editBlogPost = async function (req, res) {
  if (!req.body.body && !req.body.title) {
    res.status(400).json({ message: 'Empty request' })
  }

  const data = {} as { body: string | undefined; title: string | undefined }
  if (req.body.body) {
    data.body = req.body.body
  }
  if (req.body.title) {
    data.title = req.body.title
  }

  const blogPost = await prisma.blogPost.update({
    where: {
      id_authorId: {
        id: req.params.id,
        authorId: req.user.id,
      },
    },
    data,
  })

  res.status(200).json({ data: blogPost })
}
