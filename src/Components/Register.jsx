import React, { useRef, useState } from 'react'
import NavBar from './NavBar'
import Joi from 'joi-browser' //js library for validation.
import { register } from '../../services/userService'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { NavLink, useNavigate } from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate()

    const [data , setData] = useState({
        email :'',
        password :'',
        name:'',
        username:''
    })
    const [error,setError] = useState({
        email:'',
        password:'',
        name:'',
        username:''
    })
    const schema = {
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().min(5).required().label("Password"),
        name: Joi.string().required().label("Name"),
        username: Joi.string().required().label("Username")
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
        console.log(newError)
        setError(newError)
        return false
    }

    async function handelSubmit(e){
        e.preventDefault();
        if(validate()){
            try{
                console.log(data)
                await register(data);
                toast.success("User Registered Successfully")
                navigate('/login')
            }
            catch(ex){
               if(ex.response && ex.response.status == 400){
                toast.error("User Aldready Exist");
               } 
               else{
                toast.error("Unexpected Error Occur")
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
    <h1 className='m-2 p-3'>Register</h1>
    <form onSubmit={handelSubmit}>
        <div className='m-2 p-3'>
            <label htmlFor='email' className='form-label'>Email</label>
            <input type='text' id='email' className='form-control w-25' autoFocus onChange={handelChange} value={data.email} name='email'></input>
            {error.email && <div className='alert alert-danger w-25'>{error.email}</div>}
        </div>
        <div className='m-2 p-3'>
            <label htmlFor='Password' className='form-label'>Password</label>
            <input type='text' id='Password' className='form-control w-25' onChange={handelChange} value={data.password} name='password'></input>
            {error.password && <div className='alert alert-danger w-25'>{error.password}</div>}
        </div>
        <div className='m-2 p-3'>
            <label htmlFor='Userame' className='form-label'>Username</label>
            <input type='text' id='Username' className='form-control w-25' onChange={handelChange} value={data.username} name='username'></input>
            {error.username && <div className='alert alert-danger w-25'>{error.username}</div>}
        </div>
        <div className='m-2 p-3'>
            <label htmlFor='Name' className='form-label'>Name</label>
            <input type='text' id='Name' className='form-control w-25' onChange={handelChange} value={data.name} name='name'></input>
            {error.name && <div className='alert alert-danger w-25'>{error.name}</div>}
        </div>
        <button className='btn btn-primary m-4' >Submit</button>
    </form>

    <div className="m-2 p-3 d-flex align-items-center">
     <p className="mb-0 me-2">Already have an account?</p>
        <NavLink className="nav-link" to="/login" style={{ textDecoration: 'underline' }}>Login</NavLink>
    </div>
    </>
  )
}

export default Register
