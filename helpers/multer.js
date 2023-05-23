
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
   destination : (request , file , cb) =>{
      cb(null ,'../Images')
   }, 
   filename : (request , file , cb) =>{
    cb(null ,  Date.now() + path.extname(file.originalname))
   }
})

const upload = multer({
    storage : storage,
    limits: {
        fileSize : '1000000'
    },
    fileFilter:(request , file , cb) =>{
        const fileTypes = /jpg|jpeg|png/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(file.originalname)
        if (mimeType || extname){
            cb(null, true )
        }
        return cb('Incorrect values')
    }
}).single('image')

module.exports = {upload }