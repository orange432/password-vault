import Session from '../models/session.js';
import User from '../models/user.js';
import { saltPassword } from '../util/encrypt.js';
import {v4 as uuidv4} from 'uuid';


const newSession = async (username, password) => {
  try{
    let userdata = await User.findOne({where:{username}})
    if(userdata){
      if(userdata.password!==saltPassword(password,userdata.salt)){
      let session = uuidv4();
      let exists = await Session.findOne({where: {
        id: session
      }})
      if(exists){
        throw "Database error.  Please try again";
      }
      await Session.sync();
      await Session.create({
        id: session,
        username,
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
    return {success: false, session: '',message: err};
  }
}

const authorizeSession = async (session) => {
  try{
    let sessionData = await Session.findOne({where: {session}});
    if(!sessionData){
      throw "Session doesn't exist.";
    }
    if(sessionData.expiry<Date.now()){
      await Session.destroy({where: {session}});
      throw "Session expired";
    }
    return {success: true, user_id: sessionData.user_id};
  }catch(err){
    return {success: false, user_id: 0};
  }
}

export {newSession, authorizeSession};
const SC = {newSession, authorizeSession};
export default SC;