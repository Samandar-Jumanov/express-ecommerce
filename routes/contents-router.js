const contentsController  = require('../controller/contents')
const router = require('express').Router()
const upload = require('../helpers/multer')

router.route('/all')
.get(upload.upload, contentsController.getAllContents)

router.route('/create')
.post(upload.upload , contentsController.makeNewContent)


module.exports = router 