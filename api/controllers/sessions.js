import Session from '../models/session.js';
import User from '../models/user.js';
import { saltPassword } from '../util/encrypt.js';
import {v4 as uuidv4} from 'uuid';

/* Starts a new session if the login is successful */
const newSession = async (username, password) => {
  try{
    console.log(password);
    await Session.sync();
    await User.sync();
    let userdata = await User.findOne({where:{username}})
    if(userdata){
      if(userdata.password===saltPassword(password,userdata.salt)){
        let session = uuidv4();
        let exists = await Session.findOne({where: {
          id: session
        }})
        if(exists){
          throw "Database error.  Please try again";
        }
        console.log(session);
        await Session.create({
          id: session,
          user_id: userdata.id,
          expiry: Date.now()+15*60*1000
        })
        return {success: true, session, message: "Login Successful!"};
    }else{
      throw "Invalid password!"
    }
    }else{
      throw "Username doesn't exist."
    }
    
  }catch(err){
    console.log(err);
    return {success: false, session: '',message: err};
  }
}

/* Checks if session is valid */
const authorizeSession = async (session) => {
  try{
    let sessionData = await Session.findOne({where: {id: session}});
    if(!sessionData){
      throw "Session doesn't exist.";
    }
    if(sessionData.expiry<Date.now()){
      await Session.destroy({where: {id: session}});
      throw "Session expired";
    }
    return {success: true, user_id: sessionData.user_id};
  }catch(err){
    console.log(err);
    return {success: false, user_id: 0};
  }
}

/* Deletes the session */
const deleteSession = async (session) => {
  try{
    Session.sync()
    await Session.destroy({where: {id: session}})
    return {success: true, message: "Logout successful"};
  }catch(err){
    console.log(err);
    return {success: false, message: "Something went wrong, please try again."}
  }
}

export {newSession, authorizeSession, deleteSession};