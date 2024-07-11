const User = require('../models/user');

const test = (req, res) => {
  res.json('test is working');
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      // check if name was entered
      return res.json({
        error: 'Name is required',
      });
    }

    if (!password || password.length < 8) {
      // check if password is good
      return res.json({
        error: 'Password must be at least 8 characters long',
      });
    }

    const exist = await User.findOne({ email }); // check if email is valid
    if (exist) {
      return res.json({
        error: 'Email is already in use',
      });
    }

    const user = await User.create({
      // create new user
      name,
      email,
      password,
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

module.exports = {
  test,
  registerUser,
};
