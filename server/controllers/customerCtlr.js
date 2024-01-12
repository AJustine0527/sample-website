import Customer from '../models/customer'
import moment from "moment"

const _ = require('lodash')
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

function hashString(str, cb) {
    argon2.hash(str).then((hash) => {
        cb(false, hash)
    })
        .catch((error) => {
            console.log(error)
            cb(error, "")
        })
}

function verifyHash(hash, str, cb) {
    argon2.verify(hash, str)
        .then((value) => {
            cb(false, value)
        })
        .catch((error) => {
            cb(error, "")
        })
}

export function signUp(body, res) {

    const checkEmail = function () {
        return new Promise(function (resolve, reject) {
            let rgx = new RegExp("^" + body.email_address + "$", "i")
            Customer.findOne({ email_address: rgx }).exec((err, result) => {
                if (result) {
                    reject({ name: "Email address already exists" })
                } else {
                    resolve()
                }
            })
        })
    }

    const saveNewCustomer = function () {
        return new Promise(function (resolve, reject) {
            hashString(body.password, (err, hashedPwd) => {
                if (hashedPwd) {
                    let obj = {
                        ...body,
                        date_signup: moment().toDate(),
                        password: hashedPwd
                    }
                    const newCustomer = new Customer(obj)
                    newCustomer.save((err, result) => {
                        resolve()
                    })
                } else {
                    reject(err)
                }
            })
        })
    }

    checkEmail()
        .then(saveNewCustomer)
        .then(() => {
            res.json({ status: 1 })
        })
        .catch((error) => {
            console.log(error)
            res.json({ status: 0, message: error.name })
        })
}

export function login(body, res) {

    let customer = null

    const checkEmail = function () {
        return new Promise(function (resolve, reject) {
            let rgx = new RegExp(body.email_address, "i")
            Customer.findOne({ email_address: rgx })
                .exec((err, result) => {
                    if (result) {
                        customer = result
                        resolve()
                    } else {
                        reject({ name: "Invalid email address/password" })
                    }
                })
        })
    }

    const checkPassword = function () {
        return new Promise(function (resolve, reject) {
            verifyHash(customer.password, body.password, (err, isMatch) => {
                if (isMatch) {
                    resolve()
                } else {
                    reject({name: "Invalid email address/password"});
                }
            })
        })
    }


    checkEmail()
        .then(checkPassword)
        .then(() => {
            const token = jwt.sign({ id: customer._id, email_address: customer.email_address, password: customer.password }, 'WINE-TIME', { expiresIn: 432000 });
            let userdata = customer
            delete userdata.password
            res.json({ status: 1, userdata: userdata, token: token })
        })
        .catch((error) => {
            console.log(error)
            res.json({ status: 0, message: error.name })
        })
}

export function getInfo(id, res) {

    let userdata = null

    const getCustomerInfo = function () {
        return new Promise(function (resolve, reject) {
            Customer.findById(id)
                .exec((err, result) => {
                    userdata = result
                    resolve()
                })
        })
    }
    
    getCustomerInfo()
        .then(() => {
            delete userdata.password
            res.json({ status: 1, userdata: userdata })
        })
        .catch((error) => {
            console.log(error)
            res.json({ status: 0, message: error.name })
        })
}

export function updateInfo(body, res) {

    let userdata = body

    const checkEmail = function () {
        return new Promise(function (resolve, reject) {
            let rgx = new RegExp("^" + body.email_address + "$", "i")
            Customer.findOne({ email_address: rgx, _id:{$ne: body._id} })
                .exec((err, result) => {
                    if (result) {
                        reject({ name: "Email address already exists" })
                    } else {
                        resolve()
                    }
                })
        })
    }

    const updateCustomerInfo = function () {
        return new Promise(function (resolve, reject) {
            let params = {
                first_name: body.first_name,
                last_name: body.last_name,
                email_address: body.email_address
            }
            Customer.findByIdAndUpdate(body._id, params)
                .exec((err, result) => {
                    userdata = result
                    resolve()
                })
        })
    }
    
    checkEmail()
        .then(updateCustomerInfo)
        .then(() => {
            delete userdata.password
            res.json({ status: 1, userdata: userdata })
        })
        .catch((error) => {
            console.log(error)
            res.json({ status: 0, message: error.name })
        })
}