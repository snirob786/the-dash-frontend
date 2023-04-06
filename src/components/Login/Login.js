import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Card, CardActions, CardContent, CardMedia, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAuthentication from '../../helpers/useAuth';
const bgLeft = require("../../assets/images/login-left-bg.png")
const logo = require("../../assets/images/logo.png")

const schema = yup.object().shape({
    username: yup.string().required('Email is required').email('Invalid email'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

export const Login = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [user] = useAuthentication()

    useEffect(() => {
        if (user) {
            navigate("/dashboard")
        }
    }, [user])

    const onSubmit = (data) => {
        axios.post(`${process.env.REACT_APP_API_BASE_PATH}/login`, JSON.stringify(data), {
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
                localStorage.setItem("accessToken", data.data.token)
                navigate("/dashboard")
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
                            Login Form
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
                                        <Typography gutterBottom variant="h5" component="div" className='text-center'> Memebrs Login </Typography>
                                        <Typography variant="body2" color="text.secondary" className='text-center w-4/6 mx-auto'>
                                            Lizards are a widespread group of squamate reptiles, with over 6,000
                                            species, ranging across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                    <CardActions className='flex flex-col justify-center gap-3'>

                                        <Typography variant="h5" component="h1">Login</Typography>
                                        <TextField
                                            {...register('username')}
                                            label="Email"
                                            variant="outlined"
                                            error={Boolean(errors.username)}
                                            helperText={errors.username?.message}
                                        />
                                        <TextField
                                            {...register('password')}
                                            type="password"
                                            label="Password"
                                            variant="outlined"
                                            error={Boolean(errors.password)}
                                            helperText={errors.password?.message}
                                        />
                                        {errors.submit && <Typography>{errors.submit?.message}</Typography>}
                                        <Button type="submit" variant="contained" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Login</Button>
                                        <Typography>Or</Typography>
                                        <Button variant="contained" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'><a href='/signup'>Signup</a></Button>
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
