import User from '../models/user.js';
import { saltPassword,randomString } from '../util/encrypt.js';

/* Creates a user */
const createUser = async (username,password)=>{
  try{
    if(password.length<5 || username.length<5){
      throw 'Username and Password must be at least 5 characters';
    }
    await User.sync()
    let exists = await User.findOne({where: {username}})
    if(exists){
      throw 'Username already exists';
    }
    let salt = randomString(16);
    
    await User.create({
      username,
      password: saltPassword(password,salt),
      salt
    })
    return {success: true, message: "User created successfully"};
  }catch(err){
    return {success: false, message: err};
  }
  
}

const getUserId = async (username) => {
  let user = await User.findOne({where:{username}});
  return (user)?user.id:false;
}

const getUserDetails = async (userid) => {
  let user = await User.findOne({where:{id: userid}});
  return user;
}

export {createUser}