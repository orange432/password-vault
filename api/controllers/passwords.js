import Password from '../models/password.js';
import User from '../models/user.js';

/* Lists all the passwords for a specified username */
const listPasswordsWithUsername = async (username) => {
  try{
    // Get userid
    let user = await User.findOne({where: {username}});
    if(user){
      let passwords = await Password.findAll({where: {owner: user.id}})
      return passwords;
    }else{
      throw "User doesn't exist"
    }
  }catch(err){
    return false;
  }
}

/* Lists all the passwords for a specified user id */
const listPasswords = async (userid) => {
  try{
    let passwords = await Password.findAll({where: {owner: userid}});
    return passwords;
  }catch(err){
    return false;
  }
}

/* Adds a password to the specified userid */
const addPassword = async (userid,password,label) => {
  
}

export { listPasswords, listPasswordsWithUsername};