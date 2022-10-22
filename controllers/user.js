const { User, Thought } = require('../models')

module.exports = {
    getUsers(req, res) {
        User.find().then(userData => res.json(userData)).catch(err => res.status(err))
    },

    getUser(req, res) {
        User.findOne({
            _id: req.params.userId
        }).then(userData => res.json(userData)).catch(err => res.status(err))
    },
    createUser(req, res){
        User.create(req.body).then(userData => res.json(userData)).catch(err => res.status(err))
    },

    updateUser(req, res){

    }

}