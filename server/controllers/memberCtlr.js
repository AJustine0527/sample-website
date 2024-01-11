import Member from '../models/member'
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

export function register(body, res) {

    const checkUsername = function () {
        return new Promise(function (resolve, reject) {
            let rgx = new RegExp("^" + body.username + "$", "i")
            Member.findOne({ username: rgx }).exec((err, result) => {
                if (result) {
                    reject({ name: "Username already exists" })
                } else {
                    resolve()
                }
            })
        })
    }

    const checkMobile = function () {
        return new Promise(function (resolve, reject) {
            let rgx = new RegExp("^" + body.mobile_number + "$", "i")
            Member.findOne({ mobile_number: rgx }).exec((err, result) => {
                if (result) {
                    reject({ name: "Mobile number already exists" })
                } else {
                    resolve()
                }
            })
        })
    }

    const checkEmail = function () {
        return new Promise(function (resolve, reject) {
            let rgx = new RegExp("^" + body.email_address + "$", "i")
            Member.findOne({ email_address: rgx }).exec((err, result) => {
                if (result) {
                    reject({ name: "Email address already exists" })
                } else {
                    resolve()
                }
            })
        })
    }

    const saveNewMember = function () {
        return new Promise(function (resolve, reject) {
            hashString(body.password, (err, hashedPwd) => {
                if (hashedPwd) {
                    let obj = {
                        ...body,
                        date_registered: moment().toDate(),
                        full_name: body.first_name + (body.middle_name?" "+body.middle_name+" ":" ") + body.last_name,
                        password: hashedPwd
                    }
                    const newMember = new Member(obj)
                    newMember.save((err, result) => {
                        member = result
                        resolve()
                    })
                } else {
                    reject(err)
                }
            })
        })
    }

    checkUsername()
        .then(checkMobile)
        .then(checkEmail)
        .then(saveNewMember)
        .then(() => {
            res.json({ status: 1 })
        })
        .catch((error) => {
            console.log(error)
            res.json({ status: 0, message: error.name })
        })
}

export function login(body, res) {

    var member = null

    const checkEmail = function () {
        return new Promise(function (resolve, reject) {
            let rgx = new RegExp(body.username, "i")
            Member.findOne({ username: rgx })
                .populate({path: "referror_id", select: "full_name account_type"})
                .exec((err, result) => {
                    if (result) {
                        member = result
                        resolve()
                    } else {
                        reject({ name: "Invalid email address/password" })
                    }
                })
        })
    }

    const checkPassword = function () {
        return new Promise(function (resolve, reject) {
            verifyHash(member.password, body.password, (err, isMatch) => {
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
            const token = jwt.sign({ id: member._id, email_address: member.email_address, password: member.password }, 'WINE-TIME', { expiresIn: 432000 });
            let userdata = member
            delete userdata.password
            res.json({ status: 1, userdata: userdata, token: token })
        })
        .catch((error) => {
            console.log(error)
            res.json({ status: 0, message: error.name })
        })
}