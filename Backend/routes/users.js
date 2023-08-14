var express = require('express');
var router = express.Router();
var { client, collection } = require('../config/dbConfig')
var { hashPassword, hashCompare, createToken, validate } = require('../common/auth')

// Get all users
router.get('/', async (req, res) => {
  await client.connect()
  try {
    let allUsers = await collection.find().toArray()
    res.status(200).send(allUsers)
  }
  catch (error) {
    res.status(500).send({ message: 'Internal server error', error })
  }
  finally {
    client.close()
  }
});

// user login
router.get('/login', async (req, res) => {
  await client.connect()
  try {
    let user = await collection.aggregate([{ $match: { email: req.query.email } }]).toArray()
    if (user.length) {
      let passwordCheck = await hashCompare(req.query.password, user[0].password)
      if (passwordCheck) {
        let token = createToken({ name: user[0].name, email: user[0].email })
        res.status(200).send({ message: 'Login successful', userData: user, tokenData: token })
      }
      else {
        res.status(400).send({ message: 'Invalid login credentials' })
      }
    }
    else {
      res.status(400).send({ message: 'Invalid login credentials' })
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal server error', error })
  }
  finally {
    client.close()
  }
});

// user signup
router.post('/signup', async (req, res) => {
  await client.connect()
  try {
    let user = await collection.aggregate([{ $match: { email: req.body.email } }]).toArray()
    if (user.length) {
      res.status(400).send({ message: "Email address already exist" })
    }
    else {
      const userInfo = await collection.aggregate([{ $sort: { userId: -1 } }]).toArray()
      if (userInfo.length) {
        req.body.userId = userInfo[0].userId + 1
      }
      else {
        req.body.userId = 1
      }
      let hashedPassword = await hashPassword(req.body.password)
      req.body.password = hashedPassword
      await collection.insertOne(req.body)
      res.status(201).send({ message: 'Signup successful', data: req.body })
    }
  }
  catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Internal server error', error })
  }
  finally {
    client.close()
  }
})

// delete user
router.delete('/delete', async (req, res) => {
  await client.connect()
  try {
    let user = await collection.deleteOne({ userId: parseInt(req.query.userId) })
    res.status(200).send({ message: 'User successfully deleted', data: user })
  }
  catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal server error', error })
  }
  finally {
    client.close()
  }
});

// update user
router.put('/update', async (req, res) => {
  await client.connect()
  try {
    let user = await collection.updateOne({ userId: parseInt(req.query.userId) }, { $set: req.body })
    res.status(200).send({ message: 'User information successfully updated', data: user })
  }
  catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal server error', error })
  }
  finally {
    client.close()
  }
});

module.exports = router;
