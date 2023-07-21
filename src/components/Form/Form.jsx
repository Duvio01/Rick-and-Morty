import { useState } from "react";
import { validate } from "./Validation";
import style from './form.module.css'
import imagen from '../Images/login.gif'

const Form = ({login}) => {

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        setUserData({...userData, [event.target.name]:event.target.value})
        setErrors(validate({...userData, [event.target.name]:event.target.value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        login(userData)
    }

    return (
        <div className={style.container}>
            <div className={style.divImg}>
            <img src={imagen} alt="Imagen Logo"/>
            <form onSubmit={handleSubmit}>
                <div className={style.fields}>
                    <label>Email</label>
                    <input style={{border: errors.email ? '3px solid red' : ''}} type="email" name="email" key="email" onChange={handleChange} value={userData.email} placeholder="Email..." />
                    {
                        errors.email ? (
                            <p>{errors.email}</p>
                        ) : null
                    }
                </div>
                <div className={style.fields}>
                    <label>Password</label>
                    <input style={{border: errors.password ? '3px solid red' : ''}} type="password" name="password" autoComplete="on" onChange={handleChange} value={userData.password} key="password" />
                    {
                        errors.password ? (
                            <p>{errors.password}</p>
                        ) : null
                    }
                </div>
                <div className={style.divButton}>
                    <button className={style.buttonSubmit} type="submit">Log in</button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default Form;
