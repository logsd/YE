export interface JwtResponseI {
    dataUser:{
        _id: string,
        nombre: string,
        email: string,
        accessToken: string,
        expiresIn: string,
        rol: string,
        estado:boolean,
    }
}
