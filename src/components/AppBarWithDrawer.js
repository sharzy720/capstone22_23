import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
// import DetailsDrawer from "./DetailsDrawer";

const pages = ['Graph Settings'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenDrawer = (event) => {
        handleCloseNavMenu();
        return <React.Fragment key={'right'}>
                <Button onClick={toggleDrawer('right', true)}>{'right'}</Button>
                <Drawer
                    anchor={'right'}
                    open={state['right']}
                    onClose={toggleDrawer('right', false)}
                >
                    {list('right')}
                </Drawer>
            </React.Fragment>;
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    return (
        <AppBar position="static">
            <Container maxWidth="80vw">
                <Toolbar disableGutters>
                    {/*<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />*/}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Elliptic Dataset Visualization
                    </Typography>

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
                                <MenuItem key={page} onClick={handleOpenDrawer}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/*<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />*/}
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
                        Elliptic Dataset Visualization
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleOpenDrawer}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/*<Box sx={{ flexGrow: 0 }}>*/}
                    {/*    <Tooltip title="Open settings">*/}
                    {/*        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>*/}
                    {/*            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />*/}
                    {/*        </IconButton>*/}
                    {/*    </Tooltip>*/}
                    {/*    <Menu*/}
                    {/*        sx={{ mt: '45px' }}*/}
                    {/*        id="menu-appbar"*/}
                    {/*        anchorEl={anchorElUser}*/}
                    {/*        anchorOrigin={{*/}
                    {/*            vertical: 'top',*/}
                    {/*            horizontal: 'right',*/}
                    {/*        }}*/}
                    {/*        keepMounted*/}
                    {/*        transformOrigin={{*/}
                    {/*            vertical: 'top',*/}
                    {/*            horizontal: 'right',*/}
                    {/*        }}*/}
                    {/*        open={Boolean(anchorElUser)}*/}
                    {/*        onClose={handleCloseUserMenu}*/}
                    {/*    >*/}
                    {/*        {settings.map((setting) => (*/}
                    {/*            <MenuItem key={setting} onClick={handleCloseUserMenu}>*/}
                    {/*                <Typography textAlign="center">{setting}</Typography>*/}
                    {/*            </MenuItem>*/}
                    {/*        ))}*/}
                    {/*    </Menu>*/}
                    {/*</Box>*/}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;