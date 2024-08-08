import express from 'express'
import {createUser,deleteUser,getUsers,loginUser, logoutUserController, updateUserById} from '../controllers/userController.js'
import { userAuthentication } from '../middleWare/userJwtAuth.js'

const router = express()

router.post('/createuser', createUser)


router.post('/login', loginUser) //create and send
router.post('/updateuser/:id',userAuthentication, updateUserById) // receive and verify
router.get('/getusers',userAuthentication, getUsers) // receive and verify
router.delete('/deleteuser/:id',userAuthentication, deleteUser) // receive and verify
router.get("/logout",userAuthentication,logoutUserController) // delete and logout
 


export default router






