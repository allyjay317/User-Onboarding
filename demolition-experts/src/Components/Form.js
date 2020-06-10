import React, { useState, useEffect } from 'react';
import * as Yup from 'yup'
import axios from 'axios'

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
        validateContent(e)

        setUser({
            ...user,
            [e.target.name]: e.target.name === 'terms' ?
                e.target.checked :
                e.target.value
        });
    }

    function validateContent(e){
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
    }
    function submitUser(e){
        e.preventDefault();
        axios.post('https://reqres.in/api/users', user)
        .then(res =>{
            console.log(res);
            props.add(res.data)
            setUser({name: "", email:"", password:"", terms:false})
        })

        
    }

    useEffect(() =>{
        formSchema.isValid(user).then(res =>{
            setValid(res);
        })
    }, [user])


    return (
        <div className='form'>
            <form onSubmit={submitUser}>
                <label htmlFor='name' >Name
                <input type='text' id='name' name='name' onChange={handleChanges} value={user.name}/>
                <span>{errors.name}</span>
                </label>
                
                <label htmlFor='email' >
                    Email
                <input type='email' id='email' name='email'  onChange={handleChanges} value={user.email}/>
                <span>{errors.email}</span>
                </label>
                
                <label htmlFor='password' >Password
                <input type='password' id='password' name='password'  onChange={handleChanges} value={user.password}/>
                <span>{errors.password}</span>
                </label>
                
                <label htmlFor='terms' >Accept Terms of Service
                <input type='checkbox' id='terms' name='terms' checked={user.terms} onChange={handleChanges}/>
                </label>
                
                
                <label htmlFor='submit'>
                <button type='submit' id='submit' disabled={!valid} onSubmit={submitUser}>Create Account</button>
                </label>

            </form>
        </div>
    )
}

export default Form