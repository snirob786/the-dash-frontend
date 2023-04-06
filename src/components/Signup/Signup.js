import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Card, CardActions, CardContent, CardMedia, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const bgLeft = require("../../assets/images/login-left-bg.png")
const logo = require("../../assets/images/logo.png")
let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
let phoneRegex = /(^(\+88|88)?(01){1}[3456789]{1}(\d){8})$/

const schema = yup.object().shape({
    name: yup.string().required('Full Name is required'),
    username: yup.string().required('Email is required').email('Invalid email').matches(emailRegex, "Must be a valid email"),
    phone: yup.string().required("Phone number is required").matches(phoneRegex, "Must be a valid phone number exp: 01712345678"),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    confirmPassword: yup.string().required("This field is required").oneOf([yup.ref(`password`), null], "Confirm password must be same as password")
});
export const Signup = () => {
    const [credToken, setCredToken] = useState(null)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        let tokenData = localStorage.getItem("accessToken")
        if (tokenData)
            axios.post(`${process.env.REACT_APP_API_BASE_PATH}/jwt-verify`, JSON.stringify({ jwt: tokenData }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(data => {
                    if (data.status == 200) {
                        navigate("/dashboard")
                    }
                })
                .catch(err => {
                    localStorage.clear()
                })
    }, [])

    const onSubmit = (data) => {
        console.log("data: ", data);
        axios.post(`${process.env.REACT_APP_API_BASE_PATH}/signup`, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                // console.log("data: ", data);
                toast.success(data.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                // localStorage.setItem("accessToken", data.data.token)
                // navigate("/dashboard")
            })
            .catch(error => {
                console.error(error);
                toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
    };
    return (
        <>
            {/* <Header></Header> */}
            <div sx={{ maxWidth: "60%" }} className='h-screen flex justify-center items-center'>
                <div>
                    <div className='flex justify-center items-center border-b mb-20'>
                        <Typography gutterBottom variant="h2" component="div">
                            Signup Form
                        </Typography>
                    </div>
                    <Card className="mx-auto flex justify-center items-center shadow-none py-25">
                        <div className='border-b-4 flex justify-between items-center w-5/6'>
                            <div className='login-left w-4/12 py-52 flex justify-center items-center' style={{ backgroundImage: `url(${bgLeft})`, backgroundPosition: "center center", backgroundSize: "cover" }}>
                                <CardMedia
                                    component="img"
                                    className='w-2/6 rounded-full'
                                    alt="green iguana"
                                    image={logo}
                                />
                            </div>
                            <div className='login-right flex justify-center items-center flex-col'>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" className='text-center'> Student Registration </Typography>
                                        <Typography variant="body2" color="text.secondary" className='text-center w-4/6 mx-auto'>
                                            Lizards are a widespread group of squamate reptiles, with over 6,000
                                            species, ranging across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                    <CardActions className='flex flex-col justify-center gap-3'>

                                        <Typography variant="h5" component="h1">Signup</Typography>
                                        <TextField
                                            className='w-2/4'
                                            {...register('name', { required: true })}
                                            label="Full Name*"
                                            variant="outlined"
                                            error={Boolean(errors.name)}
                                            helperText={errors.name?.message}
                                        />
                                        <TextField
                                            className='w-2/4'
                                            {...register('username', { required: true })}
                                            type="email"
                                            label="Email*"
                                            variant="outlined"
                                            error={Boolean(errors.username)}
                                            helperText={errors.username?.message}
                                        />
                                        <TextField
                                            className='w-2/4'
                                            {...register('phone', { required: true })}
                                            type="tel"
                                            label="Phone*"
                                            variant="outlined"
                                            error={Boolean(errors.phone)}
                                            helperText={errors.phone?.message}
                                        />
                                        <TextField
                                            className='w-2/4'
                                            {...register('password')}
                                            type="password"
                                            label="Password*"
                                            variant="outlined"
                                            error={Boolean(errors.password)}
                                            helperText={errors.password?.message}
                                        />
                                        <TextField
                                            className='w-2/4'
                                            {...register('confirmPassword')}
                                            type="password"
                                            label="Confirm Password*"
                                            variant="outlined"
                                            error={Boolean(errors.confirmPassword)}
                                            helperText={errors.confirmPassword?.message}
                                        />

                                        {errors.submit && <Typography>{errors.submit?.message}</Typography>}
                                        <Button type="submit" variant="contained" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Signup</Button>
                                        <Typography>Or</Typography>
                                        <Button variant="contained" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'><a href='/login'>Login</a></Button>
                                    </CardActions>
                                </form>
                            </div>
                        </div>
                    </Card>
                </div>
            </div >
        </>
    )
}
