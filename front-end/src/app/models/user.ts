export class User {
    constructor(_id = '', nombre = '', email = '', password = '', estado = false, carrera ='', rol = ''){
        this._id = _id;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.estado = estado;
        this.carrera = carrera;
        this.rol = rol;
    }
    _id: string;
    nombre: string;
    email: string;
    password: string;
    estado: boolean;
    carrera: string;
    rol: string;
}
