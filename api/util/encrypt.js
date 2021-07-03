import {createHash} from 'crypto';

const sha512 = (input)=>{
  return createHash('sha512').update(input).digest('base64');
}

const saltPassword = (password, salt) => {
  return sha512(`${salt}${password}`);
}

const randomString = (length) => {
  let chars = 'abddefghijklmnopqrstuvwxyz';
  chars+= chars.toUpperCase() + '0123456789';
  const charList = chars.split('');
  const charListLength = charList.length;
  let out = '';
  for(let i=0;i<length;i++){
    out+= charList[randomInt(charListLength)]
  }
  return out;
}

const randomInt = (max) => {
  return Math.floor(Math.random()*max);
}

export { randomString, saltPassword, sha512 }