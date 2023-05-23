const express = require('express');
const bodyParser = require('body-parser');
const db = require('./helpers/database')
const userRouter = require('./routes/users-router')
const contentRouter = require('./routes/contents-router')
const app = express();

app.use(bodyParser.json());
app.use('/users', userRouter)
app.use('/contents', contentRouter)



//static images 

app.use(express.static('./Images'))
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
});

