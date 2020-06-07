import React, { useState, useEffect } from 'react';
import * as Yup from 'yup'

function Form(props){
    const [user, setUser] = useState({name: "", email:"", password:"", terms:false})
    const [errors, setErrors] = useState({name: "", email: "", password:"", terms: ""})
    const [valid, setValid] = useState(false)
    const formSchema = Yup.object().shape({
        name: Yup
            .string()
            .required("Must include name"),
        email: Yup
            .string()
            .email()
            .required("You must include an email"),
        password: Yup
            .string()
            .min(6, "Passwords must be at least 6 characters long")
            .required(),
        terms: Yup
            .boolean()
            .oneOf([true], "You must accept Terms and Conditions")
    })

    function handleChanges(e){
        e.persist();
        Yup.reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(valid =>{
            setErrors({
                ...errors,
                [e.target.name]: ""
            })
        })
        .catch(err =>{
            setErrors({
                ...errors,
                [e.target.name]: err.errors[0]
            })
        });

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() =>{
        formSchema.isValid(user).then(res =>{
            setValid(res);
        })
    }, [user])


    return (
        <div className='form'>
            <form>
                <label htmlFor='name' >Name</label>
                <input type='text' id='name' name='name' onChange={handleChanges}/>
                <span>{errors.name}</span>
                
                <label htmlFor='email' >Email</label>
                <input type='email' id='email' name='email'  onChange={handleChanges}/>
                <span>{errors.email}</span>
                
                <label htmlFor='password' >Password</label>
                <input type='password' id='password' name='password'  onChange={handleChanges}/>
                <span>{errors.password}</span>
                
                <label htmlFor='terms' >Accept Terms of Service</label>
                <input type='checkbox' id='terms' name='terms' checked={user.terms} onChange={handleChanges}/>
                
                
                <label htmlFor='submit' />
                <input type='submit' id='submit' disabled={!valid}/>

            </form>
        </div>
    )
}

export default Form