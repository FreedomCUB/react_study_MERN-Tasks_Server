const UserDB = require('../models/UserDB')
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')


exports.createUser = async (req , res) => {


    // search errors    
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({errors : errors.array()});
    }

    // destructuring
    const {email, password } = req.body;
    

    try {
        // check unique user
        let userdb = await UserDB.findOne({email})

        if ( userdb ){
            return res.status(400).json({msg:'EL Usuario ya eiste'});
        }
        
        //  Create new User
        userdb = new UserDB(req.body);  
        
        // applying hash with bcryptjs
        const salt = await  bcryptjs.genSalt(10);
        userdb.password = await bcryptjs.hash(password, salt)

        // save user
        await userdb.save()

        // Create JWT
        const payload = {
            userdb: {
                id: userdb.id
            }

        };       
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 36000
        }, (error, token)=> {
            if (error) throw error;
             res.json({ token });
        })

         //res.json({msg:'Usuario creado correctamente'});

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');;                
    }
}