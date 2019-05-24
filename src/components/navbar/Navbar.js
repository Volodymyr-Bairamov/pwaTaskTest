import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import axios from 'axios'
import Loader from 'react-loader-spinner'
import { Redirect } from 'react-router'
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles({
    navBar: {
        height: '35px',
        backgroundColor: '#95DBC8'
    },
    list: {
        width: 250,
    },
    toggleButton: {
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingLeft: '0px',
        height: '35px',
        color: 'white'
    },
    bigAvatar: {
        margin: '10px auto',
        width: 100,
        height: 100,
        border: '3px solid #C1BEC0',
        backgroundColor: 'white',
        ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
            position: 'relative',
            top: '-25px',
            width: 80,
            height: 80,
            margin: '0 auto',
        }
    },
    img: {
        height: 'auto'
    },
    userName: {
        fontWeight: 'normal',
        textAlign: 'center',
        marginTop: 0,
        color: '#456152',
    }
});

function Navbar(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        left: false,
        users: null,
    });



    useEffect((state) => {
        axios.get('https://my-json-server.typicode.com/lazicmladen/FakeServer/users')
            .then(res => { setState({ ...state, users: res.data }) })
            .catch(err => console.log(err))
    }, [])

    if (state.users === null) return (
        <div className={classes.navBar}>
            <div style={{ textAlign: 'center', paddingTop: '50px', margin: '0 auto' }}>
                <Loader type="Triangle" color="#639E85" height="50" width="50" />
            </div>

        </div>)

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const pages = [
        { label: 'Home', link: '/' },
        { label: 'Mearchants', link: '/merchants' }
    ]

    const handleMenuClick = link => {
        return
    }

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                {pages.map((el, index) => (
                    <ListItem button key={el.label} onCLick={el.link => handleMenuClick(el.link)}>
                        <ListItemIcon>{index === 0 ? <HomeIcon /> : <LabelImportantIcon />}</ListItemIcon>
                <ListItemText primary={el.label} />
                    </ListItem>
            ))}
            </List>
        </div >
    );
    return (
        <React.Fragment>
            <div className={classes.navBar}>
                <Button onClick={toggleDrawer('left', true)} className={classes.toggleButton}><MenuIcon /></Button>
                <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                    {sideList('left')}
                </Drawer>
            </div>
            <Avatar alt="user avatar" src={state.users[0].image} classes={{ root: classes.bigAvatar, img: classes.img }} />
            <h2 className={classes.userName}>Welcome {state.users[0].name}</h2>
            <h5 className={classes.userName}>Choose Category For Available Gifts</h5>
        </React.Fragment>
    );
}

export default Navbar;