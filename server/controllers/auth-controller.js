const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
  res.json('test is working');
};

const registerUser = async (req, res) => { // register new user endpoint
  try {
    const { name, email, password } = req.body;
    // check if name was entered
    if (!name) {
      return res.json({
        error: 'Name is required',
      });
    }
    // check if password is good
    if (!password || password.length < 8) {
      return res.json({
        error: 'Password must be at least 8 characters long',
      });
    }
    // check if email is valid
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: 'Email is already in use',
      });
    }

    const hashedPassword = await hashPassword(password); // hash password
    const user = await User.create({       // create new user in database
      name,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

// const login = (req, res) => {
//   const { email, password } = req.body;

//   if (email === 'a@gmail.com' && password === 'a') {
//     res.json({message: 'Login successful!'});
//   } else {
//     res.status(401).json({message: 'Login failed! -- Invalid email or password'});
//   }
// }


const loginUser = async (req, res) => { // login user endpoint
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: 'No user with this email exists'
      })
    }

    // check if passwords match
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign({ email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token
          //  { httpOnly: true }
          ).json(user) // set cookie with token, httpOnly --means cookie is not accessible via JS, only headers
      })
    }
    if (!match) {
      return res.json({
        error: 'Password is incorrect'
      })
    }
  } catch (error) {
    console.log(error);
  }
}

const getProfile = (req, res) => {
  const {token} = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    })
  } else {
    res.json(null);
  }
}

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile
};
