const db = require('../models');
const User = db.User;


exports.getUser = async (req,res)=> {
    const {id} = req.params;

    const user = await User.findOne({
        where: {
            id,
        }
    });

    if(!user){
        return res.status(400).send({
            message: `No user found with the id ${id}`
        })
    }

    return res.send(user)
}

exports.createUser = async (req,res)=> {
    const {userName,firstName,lastName,address,email,password} = req.body;

    if(!userName||!firstName||!lastName||!address||!email||!password ){
        return res.status(400).send({
            message: `you missed any required data`
        })
    }

    let userNameExists = await User.findOne({
        where:{
            userName
        }
    })

    if(userNameExists){
        return res.status(400).send({
            message: `A user with the username ${userName} already exists`
        })
    }

    try{
        let newUser = await User.create({
            userName,
            firstName,
            lastName,
            address,
            email,
            password
        });
        return res.send(newUser)
    }catch(err){
        return res.status(500).send({
            message: `Error: ${err.message}`
        })
    }

    
}