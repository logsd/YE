const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123';
const userCtrl = {};

userCtrl.getUsers = async (req,res) => {
    const users = await User.find();
    res.json(users);
}

userCtrl.createUser = async (req,res) => {
    
    const newUser ={
        nombre : req.body.nombre,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password),
        estado : req.body.estado,
        carrera : req.body.carrera,
        rol : req.body.rol
    };

    User.create (newUser, (err, user)=>{
        if(err && err.code === 11000)return res.status(409).send('El email ya existe!')
        if(err) return res.status(500).send('Server error');
        const expiresIn = 24 * 60 * 60 ;
        const accessToken = jwt.sign({_id: user._id},
        SECRET_KEY,{
            expiresIn: expiresIn
        });
        const dataUser ={
            nombre : user.nombre,
            email : user.email,
            rol: user.rol,
            estado: user.estado,
            accessToken: accessToken,
            expiresIn: expiresIn
        }

        // response

        res.send({user, dataUser})
    })
}

userCtrl.getUser = async (req,res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}

userCtrl.editUser = async (req,res) => {
    const { id } = req.params;
    const user = {
        nombre:  req.body.nombre,
        email:  req.body.email,
        password:  req.body.password,
        estado:  req.body.estado,
        carrera:  req.body.carrera,
        rol: req.body.rol
    }
    await User.findByIdAndUpdate(id , { $set: user}, { new: true});
    res.json({
        status: 'success'
    });
}

userCtrl.deleteUser = async (req,res) => {
 await User.findByIdAndRemove(req.params.id)
 res.json({ status: 'user Deleted' });
}

userCtrl.loginUser = async (req,res) => {
const userData ={
    email: req.body.email,
    password: req.body.password
}
User.findOne({email:userData.email}, (err, user)=>{
    if(err) return res.status(500).send('Server error!');
    if(!user){
        //email no existe
        res.status(409).send({message: 'Something is wrong'});
    } else {
        const resultPassword = bcrypt.compareSync(userData.password, user.password)
        if(resultPassword ){
            const expiresIn = 24 * 60 * 60 ;
            const accessToken = jwt.sign({_id: user._id}, SECRET_KEY, {expiresIn: expiresIn});
            const dataUser ={
                _id : user._id,
                nombre : user.nombre,
                email : user.email,
                rol: user.rol,
                estado: user.estado,
                accessToken: accessToken,
                expiresIn: expiresIn
            }
        res.send({dataUser})
        } else {
            //password wrong
            res.send(409).send({message: 'Something is wrong'});
        }
    }
})
}



module.exports = userCtrl;