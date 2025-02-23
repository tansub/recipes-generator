import { Router } from "express";
import {register, login, getMe} from '../controllers/auth.js'
import { checkAuth } from "../utils/checkAuth.js";
const router = new Router()

// registration
router.post('/register',register)

// login
router.post('/login',login)

// get me
router.post('/getme', checkAuth, getMe)

export default router