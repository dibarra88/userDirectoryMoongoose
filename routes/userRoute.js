const express = require('express')
const router = express.Router()
const RobotModel = require('../models/userModel')

router.get("/", function (req, res, next) {
    RobotModel.getAllUsers()
        .then(function (data) {
            res.render('index', { users: data })
        })
        .catch(function (error) {
            console.log("Error fetching users: ", error)
        })
})
router.get("/user/:username", function (req, res, next) {
    RobotModel.getUserByUsername(req.params.username)
        .then(function (data) {
            res.render("user", data)
        })
        .catch(function (error) {
            console.log("Error fetching user by username ", error)
        })
})
router.get("/country/:country", function (req, res, next) {
    RobotModel.find().country(req.params.country)
        .then(function (data) {
            console.log(data)
            res.render('index', { users: data })
        })
        .catch(function (error) {
            console.log("Error fetching users by country: ", error)
        })
})
router.get("/skills/:skills", function (req, res, next) {
    RobotModel.find().skill(req.params.skills)
        .then(function (data) {
            console.log(data)
            res.render('index', { users: data })
        })
        .catch(function (error) {
            console.log("Error fetching users by skill: ", error)
        })
})
router.get("/employed", function(req,res,next){
    RobotModel.find().employed(true)
        .then(function (data) {
            console.log(data)
            res.render('index', { users: data })
        })
        .catch(function (error) {
            console.log("Error fetching users by employment status: ", error)
        })
})
router.get("/unemployed", function(req,res,next){
    RobotModel.find().employed(false)
        .then(function (data) {
            console.log(data)
            res.render('index', { users: data })
        })
        .catch(function (error) {
            console.log("Error fetching users by unemployment status: ", error)
        })
})

module.exports = router;
