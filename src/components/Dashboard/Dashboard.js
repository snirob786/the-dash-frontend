import React from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'

export const Dashboard = () => {
    return (
        <>
            <Header></Header>
            <div>Dashboard</div>
            <Outlet></Outlet>
        </>
    )
}
