const List = require('../models/list');
const listCtrl = {};

listCtrl.getLists = async (req,res) => {
    const lists = await List.find();
    res.json(lists);
}

listCtrl.createList = async (req,res) => {
 
    const newList ={
        nombre : req.body.nombre,
        descripcion : req.body.descripcion,
        foto : req.body.foto,
        votos : req.body.votos
    };

    List.create (newList, (err, list)=>{

        if(err && err.code === 11000)return res.status(409).send('La lista ya existe!')
        if(err) return res.status(500).send('Server error');
        
        const dataList ={
            nombre : list.nombre,
            votos : list.votos,
        }

        // response

        res.send({list, dataList})
    })
}

listCtrl.getList = async (req,res) => {
    const list = await List.findById(req.params.id);
    res.json(list);
}

listCtrl.editList = async (req,res) => {
    const { id } = req.params;
    const list = {
        nombre:  req.body.nombre,
        descripcion:  req.body.descripcion,
        foto:  req.body.foto,
        votos:  req.body.votos,
    }
    await List.findByIdAndUpdate(id , { $set: list}, { new: true});
    res.json({
        status: 'list updated'
    });
}

listCtrl.deleteList = async (req,res) => {
 await List.findByIdAndRemove(req.params.id)
 res.json({ status: 'list Deleted' });
}

module.exports = listCtrl;