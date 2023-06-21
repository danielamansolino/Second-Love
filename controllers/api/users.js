const User = require('../../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcrypt')

async function create(req, res) {
    //baby steps -> this was used to test our front end form api call functionality 
    // res.json({
    //     user: {
    //         name: req.body.name,
    //         email: req.body.email
    //     }
    // })
    try {
        // Add the user to the database
        const user = await User.create(req.body);
        // token will be a string
        const token = createJWT(user);
        console.log('this is the roken in sigup', token)
        // we can use res.json to send back just a string
        // The client code needs to take this into consideration
        res.json(token);
      } catch (err) {
        // Client will check for non-2xx status code 
        // 400 = Bad Request
        res.status(400).json(err);
      }

}

//function to log in a user
async function login(req,res) {
    try {
        //find the user in the db
        const user = await User.findOne({ email: req.body.email })
        //throw an error if they're not found
        if (!user) throw new Error()
        //compare the password(using bcrypt)
        const match = await bcrypt.compare(req.body.password, user.password)
        // log them in if there is a match (create the token)
        if (match) {
            const token = createJWT(user)
            res.json(token)
        } else {
            throw new Error()
        }
        
    } catch {
        res.status(400).json('Bad Credentials')

    }
}


//////////////// Helper Functions ////////////////

// this is called whenever we need to create a web token 
function createJWT(user) {
    return jwt.sign(
      // data payload
      { user },
      process.env.SECRET,
      { expiresIn: '24h' }
    );
  }

//////////////////////////////////////////////////

module.exports = {
    create,
    login
}