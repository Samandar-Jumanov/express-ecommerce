const HttpError = require('../helpers/err')
const db = require('../helpers/database')
const path = require('path')

exports.getAllContents = async (request, response, next) => {
  try {
    const allContents = await db.Contents.findAll({});
    response.json({ contents: allContents });
  } catch (error) {
    next(new HttpError(error, 500));
  }
};



exports.makeNewContent = async (request , response , next ) =>{
  try {
    const { title , userId } = request.body;
    const image = request.file.path
    const user = await db.Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const content = await db.Contents.create({ title, image,  userId });
    response.json(content);
  } catch (err) {
    next(err);
  }
}

