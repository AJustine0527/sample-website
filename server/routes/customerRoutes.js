import express from 'express'
import * as customerCtlr from '../controllers/customerCtlr'
let jwt = require('jsonwebtoken');

var customerRoutes = express.Router()

customerRoutes.use(function (req, res, next) {
	if (req.headers && req.headers.authorization) {
		var token = req.headers.authorization;
		jwt.verify(token, 'WINE-TIME', function (err, decoded) {
			if (err) {
				return res.json({ status: 0, message: "InvalidToken" });
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.status(403).send({
			status: 0,
			message: 'No token provided.'
		});
	}
});

customerRoutes.get("/customer/info/get/:id", function (req, res) {
    customerCtlr.getInfo(req.params.id, res)
})

customerRoutes.put("/customer/info/update", function (req, res) {
    customerCtlr.updateInfo(req.body, res)
})

customerRoutes.put("/customer/password/update", function (req, res) {
    customerCtlr.changePassword(req.body, res)
})

export default customerRoutes;