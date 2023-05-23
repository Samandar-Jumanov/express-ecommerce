const HttpError = require('../helpers/err');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.TOKEN_KEY;
const db = require('../helpers/database')

exports.userSignup = async (request, response, next) => {
  try {
    const {  password, email } = request.body;
    const Dbuser = await db.Users.findOne({where : {email}});
    if (Dbuser) {
      return next(new HttpError('You already have an account', 406));
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await db.Users.create({  email,password : hashedPassword })
    await newUser.save()
    const token = await jwt.sign({ user: newUser.id }, secret, { expiresIn: '1h' });
    response.json({ "userId": newUser.id, "token": token });
  } catch (error) {
    console.error(error);
    return next(new HttpError('Could not create user', 500));
  }
};


exports.signIn = async (request , response , next ) =>{
    const {email , password } = request.body 
    const user = await db.Users.findOne({ where : {email}})
    const validPassword = await bcrypt.compare(password , user.password)
    if(!user){
        return next(new HttpError('Canot find user ', 404))
    }

    if (!validPassword){
      return next(new HttpError('Invalid password '), 404)
    }

    try{
        const token = jwt.sign({ user : user.id } , secret , {expiresIn: '1h'})
        response.json({"userId" : user.id , "token" : token})
    }catch(err){
     return next(new HttpError('Interval server error', 500))
    }
}



exports.getUserById = async (request, response, next) => {
  const userId = request.params.uid;
  const validUser = await db.Users.findByPk(userId)
  try {
    // const validUser = await User
    if (!validUser) {
      console.error(`User with ID ${userId} not found`);
      return next(new HttpError('Cannot find user', 404));
    }
    console.log(`Found user with ID ${userId}:`, validUser);
    response.json({ validUser });
  } catch (error) {
    console.error(`Error getting user with ID ${userId}:`, error);
    return next(new HttpError('Could not get user', 500));
  }
  }