import AdbIcon from '@mui/icons-material/Adb';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from '../../../helpers/useAuth';
const logo = require("../../../assets/images/logo.png")

const pages = [
    {
        title: "Home",
        slug: ""
    },
    {
        title: "Dashboard",
        slug: "dashboard"
    },
    // {
    //     title: "Pricing",
    //     slug: "pricing"
    // },
    // {
    //     title: "Blog",
    //     slug: "blog"
    // }
];
const settings = [
    {
        title: 'Profile',
        slug: "profile"
    },
    {
        title: 'Account',
        slug: "account"
    },
    {
        title: 'Dashboard',
        slug: "dashboard"
    }
];
const notLoggedInSettings = [
    {
        title: "Sign Up",
        slug: "signup"
    },
    {
        title: "Login",
        slug: "login"
    }
];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [currentMenu, setCurrentMenu] = useState("Home")
    const navigate = useNavigate()
    let [user, setUser, token, setToken, isLoading, refresh, setRefresh, isLoggedIn, setIsLoggedIn] = useAuth();

    // useEffect(() => {
    //     if (user) {
    //         setIsLoggedIn(true)
    //     }
    //     else {
    //         setIsLoggedIn(false)
    //     }
    // }, [user])

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        console.log("button clicked");
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const setUrlHandler = (page) => {
        setCurrentMenu(page.title)
        navigate(`/${page.slug}`)
    }

    const handleUserDetails = (settingPage) => {
        navigate(`/${settingPage}`)
    }

    return (
        <AppBar position="static" className='shadow-[0px_0px_20px_0px__rgba(0,0,0,0.65)] bg-customBluishSecondary'>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <a href='/'><img className='w-12 rounded-lg cursor-pointer' src={logo} alt="logo" /></a>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.slug} onClick={() => {
                                    handleCloseNavMenu()
                                    setUrlHandler(page)
                                }}>
                                    <Typography textAlign="center">{page.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Desctop Menu */}
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                className={`${page.title == currentMenu ? " active-menu" : " text-customPrimary"}`}
                                key={page.title}
                                onClick={() => {
                                    handleCloseNavMenu()
                                    setUrlHandler(page)
                                }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton className='bg-white hover:bg-white' onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                                <Typography className='text-customSecondary w-10 hover:text-customSecondary' textAlign="center" variant='h4'>R</Typography>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {
                                isLoggedIn ? settings.map((setting, index) => (
                                    <MenuItem key={index} onClick={() => { handleUserDetails(setting.slug) }}>
                                        <Typography textAlign="center">{setting.title}</Typography>
                                    </MenuItem>
                                ))
                                    :
                                    notLoggedInSettings.map((setting, index) => (
                                        <MenuItem key={index} onClick={() => { handleUserDetails(setting.slug) }}>
                                            <Typography textAlign="center">{setting.title}</Typography>
                                        </MenuItem>
                                    ))
                            }

                            {isLoggedIn ? <MenuItem onClick={() => {
                                setIsLoggedIn(false)
                                localStorage.clear()
                                setUser(null)
                                setRefresh(true)
                                navigate("/login")
                            }}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem> : ""}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default ResponsiveAppBar;
