const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const RobotModel = require('../models/userModel')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/', function (req, res, next) {
    RobotModel.getUserByUsername(req.query.username)
        .then(function (data) {
            data.skill0 = data.skills[0];
            data.skill1 = data.skills[1];
            data.skill2 = data.skills[2];
            data.type = "Edit User: " + req.query.username;
            res.render("editUser", data)
        })
        .catch(function (error) {
            console.log("Error fetching user by username ", error)
        })
})
router.post('/', function (req, res, next) {
    var updateData = {
        username: req.body.username,
        name: req.body.name,
        avatar: req.body.avatar,
        email: req.body.email,
        university: req.body.university,
        job: req.body.job,
        company: req.body.company,
        skills: [req.body.skill0, req.body.skill1, req.body.skill2],
        phone: req.body.phone,
        address: {
            street_num: req.body.street_num,
            street_name: req.body.street_name,
            city: req.body.city,
            state_or_province: req.body.state_or_province,
            country: req.body.country
        }
    }
        RobotModel.updateUser(req.body.username, updateData)
        .then(function (data) {
            console.log('updated!', data)
            res.render('user', data)
        })
        .catch(function (error) {
            console.log("Error not able to update user", error)
        })
})
router.get('/addUser', function(req,res,next){
    res.render('editUser',{type:"Add User"})
})
router.get('/delete', function(req, res, next){
    RobotModel.deleteUser(req.query.username)
    .then(function(){
        console.log("User deleted");
        res.redirect('/');  
    })
    .catch(function(error){
        console.log("Error deleting user", error)
    })
})
module.exports = router;
