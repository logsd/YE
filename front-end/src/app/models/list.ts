export class List {
    constructor(_id = '', nombre = '', descripcion = '', foto = '', votos = 0){
        this._id = _id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.foto = foto;
        this.votos = votos;
    }
    _id: string;
    nombre: string;
    descripcion: string;
    foto: string;
    votos: number;
}