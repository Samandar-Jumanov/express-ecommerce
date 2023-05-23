const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.auth = async (request, response, next) => {
  const authorization = request.headers['authorization']
  const token = authorization && authorization.split(' ')[1]
  const validToken = token !== null
  if (validToken) {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY)
      request.user = decoded.user
      next()
    } catch (err) {
      return response.status(401).send('Invalid token')
    }
  } else {
    return response.status(401).send('Token not provided')
  }
}
