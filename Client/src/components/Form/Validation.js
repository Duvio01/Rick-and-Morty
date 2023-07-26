export function validate(userData){
    let errors = {}
    const emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)
    const passwordRegex = new RegExp(/^(?=\w*\d)\S{6,10}$/)

    if(userData.email === '') {
        errors.email = 'El campo email no puede estar vacio'
    }else if(userData.email.length > 35) { errors.email= 'El campo no puede ser mayor a 35 caracteres'
    }else if(!emailRegex.test(userData.email)) errors.email = 'No es un email valido'

    if(!passwordRegex.test(userData.password)) errors.password = `La contraseña tiene que tener al menos un número. 
    La contraseña tiene que tener una longitud entre 6 y 10 caracteres.`

    return errors
}