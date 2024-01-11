import express from 'express'
import * as memberCtlr from '../controllers/memberCtlr'

var nonRestrictedRoutes = express.Router()

nonRestrictedRoutes.post("/member/register", function (req, res) {
    memberCtlr.register(req.body, res)
})

nonRestrictedRoutes.post("/member/login", function (req, res) {
    memberCtlr.login(req.body, res)
})

export default nonRestrictedRoutes;