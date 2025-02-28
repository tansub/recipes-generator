import { Router } from 'express'
import {
    createPost,
    // getAll,
    getById,
    getMyPosts,
    removePost,
    updatePost,
} from '../controllers/posts.js'
import { checkAuth } from '../utils/checkAuth.js'
const router = new Router()

// create post
router.post('/', checkAuth, createPost)

// get posts
// router.get('/', getMyPosts)

// get post by id
router.get('/:id', getById)

// update post
router.put('/:id', checkAuth, updatePost)

// get posts
router.get('/user/me', checkAuth, getMyPosts)

// remove post
router.delete('/:id', checkAuth, removePost)


export default router