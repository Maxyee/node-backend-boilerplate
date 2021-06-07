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


exports.deleteUser = async (req, res) => {
    const { id } = req.body;
    if (!id) {
      return res.status(400).send({
        message: 'Please provide a id for the user you are trying to delete!',
      });
    }
  
    const user = await User.findOne({
      where: {
        id,
      },
    });
  
    if (!user) {
      return res.status(400).send({
        message: `No user found with the id ${id}`,
      });
    }
  
    try {
      await user.destroy();
      return res.send({
        message: `User ${id} has been deleted!`,
      });
    } catch (err) {
      return res.status(500).send({
        message: `Error: ${err.message}`,
      });
    }
};
  


exports.updateUser = async (req,res)=> {
    const {userName,firstName,lastName,address,email,password} = req.body;
    const { id } = req.params;

    const user = await User.findOne({
        where: {
          id,
        },
    });

    if (!user) {
        return res.status(400).send({
          message: `No user found with the id ${id}`,
        });
    }

    try {
        if (userName) {
          user.username = userName;
        }
        if (firstName) {
          user.firstName = firstName;
        }

        if (lastName) {
            user.lastName = lastName;
        }

        if (address) {
            user.address = address;
        }

        if (email) {
            user.email = email;
        }
        if (password) {
            user.password = password;
        }
    
        user.save();
        return res.send({
          message: `User ${id} has been updated!`,
        });
      } catch (err) {
        return res.status(500).send({
          message: `Error: ${err.message}`,
        });
    }
 
}


