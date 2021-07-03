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
const listPasswords = async (userId) => {
  try{
    let passwords = await Password.findAll({where: {owner: userId}});
    return passwords;
  }catch(err){
    return [];
  }
}

/* Adds a password to the specified userid */
const addPassword = async (userId,password,label) => {
  try{
    await Password.sync();
    let result = await Password.create({
      owner: userId,
      label,
      password
    })
    return {success: true, message: "Password successfully added to database"}
  }catch(err){
    return {success: false, message: 'Database Error'}
  }
}

const editPassword = async (userId,passwordId,password,label) => {
  try{
    await Password.sync();
    let result = await Password.update({
      owner: userId,
      label,
      password
    },{where: {id: passwordId}})
    return {success: true, message: "Password successfully added to database"}
  }catch(err){
    console.log(err);
    return {success: false, message: 'Database Error'}
  }
}

export { listPasswords, listPasswordsWithUsername, addPassword, editPassword};