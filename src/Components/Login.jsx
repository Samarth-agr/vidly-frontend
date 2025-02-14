import React, { useRef, useState } from 'react'
import NavBar from './NavBar'
import Joi, { abort } from 'joi-browser' //js library for validation.
import { login } from '../../services/authService'
import { toast, ToastContainer } from 'react-toastify'
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {

    //const username = useRef() // we can you this but it is immutable. It simply access the ref to dom element. Therefore it is not prefer to use.

    const navigate = useNavigate();

    const [data , setData] = useState({
        username :'',
        password :''
    })
    const [error,setError] = useState({
        username:'',
        password:'',
    })
    const schema = {
        username: Joi.string().min(3).max(100).required().label("Username"),
        password: Joi.string().required().label("Password"),
    }

    function validate(){
        const ValidateError = Joi.validate(data, schema , {abortEarly : false})
        if(!ValidateError.error){
            setError({})
            return true
        }

        const newError = {}

        ValidateError.error.details.forEach(err => {
            newError[err.path[0]] = err.message
        });
        setError(newError)
        return false
        // const newError = {username:'' , password:''}
        // if(data.password === ''){
        //     newError.password = 'Password is required'
        // }
        // if(data.username === ''){
        //     newError.username = 'Username is required'
        // }
        // setError(newError)
        // return !newError.username && !newError.password 
    }

    async function handelSubmit(e){
        e.preventDefault();
        if(validate()){
            try{
            await login(data);  // we have a parameter data so we are destructuring that to make it available in local storage
            toast.success("Login Successfully");
            window.location = '/'
            }
            catch(ex){
                if(ex.response && ex.response.status == 400){
                    toast.error("Invalid Username or Password")
                }
            }
        }
    }

    function handelChange(e){
        const account = {...data}
        account[e.target.name] = e.target.value
        setData(account)
    }
  return (
    <>
    <ToastContainer/>
    <NavBar/>
    <h1 className='m-2 p-3'>Login</h1>
    <form onSubmit={handelSubmit}>
        <div className='m-2 p-3'>
            <label htmlFor='username' className='form-label'>Username</label>
            <input type='text' id='username' className='form-control w-25' autoFocus onChange={handelChange} value={data.username} name='username'></input>
            {error.username && <div className='alert alert-danger w-25'>{error.username}</div>}
        </div>
        <div className='m-2 p-3'>
            <label htmlFor='Password' className='form-label'>Password</label>
            <input type='text' id='Password' className='form-control w-25' onChange={handelChange} value={data.password} name='password'></input>
            {error.password && <div className='alert alert-danger w-25'>{error.password}</div>}
        </div>
        <button className='btn btn-primary m-4'>Submit</button>
    </form>

    <div className="m-2 p-3 d-flex align-items-center">
     <p className="mb-0 me-2">Don't have an account?</p>
        <NavLink className="nav-link" to="/register" style={{ textDecoration: 'underline' }}>Register</NavLink>
    </div>

    </>
  )
}

export default Login
