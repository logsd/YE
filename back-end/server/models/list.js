const mongoose = require('mongoose');
const {Schema} = mongoose;
const ListSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim : true,
        unique: true
        },
    descripcion: {
        type: String,
        trim : true,
        required: true
    },
    foto: {
        type: String,
         trim : true,
        },
    votos: {type: Number,
        trim : true,
        required: true},
},{
    timestamps: true
});

ListSchema.statics ={
    create : function (data, cb){
        const list = new this(data);
        list.save(cb);
    }
}

module.exports = mongoose.model('List', ListSchema);