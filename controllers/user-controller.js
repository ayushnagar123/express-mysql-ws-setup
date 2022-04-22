const { User } = require('../models')

exports.index = async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({users});
  } catch(error) {
    return res.status(500).json({message: 'Internal server error', error});
  }
}

exports.create = async (req, res, next) => {
  try {
    const { name, email, password, make_admin: makeAdmin } = req.body;
    let user;
    if(makeAdmin){
      user = await User.create({name, email, password, role: 'admin'});
    } else {
      user = await User.create({name, email, password});
    }
    return res.status(201).json({user});
  } catch (error) {
    return res.status(500).json({message: 'Internal server error', error});
  }
}

exports.getUserByUUID = async (req, res, next) => {
  try {
    const uuid = req.params.uuid;
    const user = await User.findOne({ where: { uuid } });
    if(user){
      return res.status(200).json({user});
    } else {
      return res.status(404).json({message:'user not found'});
    }
  } catch(error) {
    return res.status(500).json({message: 'Internal server error', error});
  }
}

exports.deleteUserByUUID = async (req, res, next) => {
  try {
    const uuid = req.params.uuid;
    const user = await User.findOne({ where: { uuid } });
    if(user){
      await user.destroy();
      return res.status(200).json({message: 'user deleted'});
    } else {
      return res.status(404).json({message:'user not found'});
    }
  } catch(error) {
    return res.status(500).json({message: 'Internal server error', error});
  }
}
