const mongoose = require('mongoose');
const {Schema} = mongoose;
const UserSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim : true,
    },
    email: {
        type: String,
        required: true,
        trim : true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim : true,
    },
    estado: {
        type: Boolean,
        required: true,
        trim : true
    },
    carrera: {
        type: String,
        required: true,
        trim : true
    }, 
    rol: {
        type: String,
        required: true,
        trim : true
    }, 
    
},{
    timestamps: true
});

UserSchema.statics ={
    create : function (data, cb){
        const user = new this(data);
        user.save(cb);
    },
    login : function (query, cb){
    this.find(query, cb);
    }
}


module.exports = mongoose.model('User', UserSchema);