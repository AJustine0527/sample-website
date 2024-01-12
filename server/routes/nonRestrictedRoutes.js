import express from 'express'
import * as customerCtlr from '../controllers/customerCtlr'

var nonRestrictedRoutes = express.Router()

nonRestrictedRoutes.post("/customer/signup", function (req, res) {
    customerCtlr.signUp(req.body, res)
})

nonRestrictedRoutes.post("/customer/login", function (req, res) {
    customerCtlr.login(req.body, res)
})

export default nonRestrictedRoutes;