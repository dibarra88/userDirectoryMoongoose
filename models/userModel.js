const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const url = 'mongodb://localhost:27017/LinkedIn4Bots'
mongoose.connect(url);

const robotSchema = new mongoose.Schema({
    id: { type: Number },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    avatar: { type: String, default:null },
    email: { type: String, default:null },
    university: { type: String, default:null },
    job: { type: String, default:null },
    company: { type: String, default:null },
    skills: [],
    phone: { type: String , default:null},
    address: {
        street_num: { type: String, default:null },
        street_name: { type: String , default:null},
        city: { type: String, default:null },
        state_or_province: { type: String, default:null },
        country: { type: String, default:null }
    }
})

robotSchema.statics.getAllUsers = function (callback) {
    return this.find();
}
robotSchema.statics.getUserByUsername = function (userName, callback) {
    return this.findOne({ username: userName });
}
robotSchema.statics.updateUser = function(userName, updateData, callback){
    var query = {username: userName};
   return this.findOneAndUpdate(query, updateData, {new:true, upsert:true})   
}
robotSchema.statics.deleteUser = function(userName, callback){
    var query = {username: userName};
    console.log("trying to remove this---", userName)
    return this.findOneAndRemove(query);
}
robotSchema.query.country = function (country, callback) {
    return this.where({ "address.country": country });
};
robotSchema.query.skill = function (skill, callback) {
    return this.where({ skills: skill });
}
robotSchema.query.employed = function(employed, callback){
     let query = employed ? { company: { $not: { $type: 10 } } } : {company:null}
     return this.where(query);
}

const RobotModel = mongoose.model('users', robotSchema)

module.exports = RobotModel;