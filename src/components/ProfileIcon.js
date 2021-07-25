import { Hidden, IconButton, ListItem, makeStyles } from '@material-ui/core'
import { Avatar } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Box from '@material-ui/core/Box';
import { Grid, Paper } from '@material-ui/core';
import { List } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { LOGOUT, store } from '../store'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    listItem: {
        '&:hover': {
            backgroundColor: '#f2f2f2',
            cursor: 'pointer'
        }
    }
}))

function ProfileIcon(props) {
    const history = useHistory();
    const [name, setName] = useState();

    useEffect(() => {
        if (store.getState().firstName && store.getState().lastName) {
            setName(store.getState().firstName + '' + store.getState().lastName)
        }
    }, [])

    const handleLogOut = () => {
        store.dispatch({ type: LOGOUT })
        if (!store.getState().token && !store.getState().login) {
            history.replace('/login');
        }
    }

    const classes = useStyles();


    return (
        <div>

            <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                    <div>
                        <IconButton size="small" {...bindTrigger(popupState)}>

                            <ListItem>
                                <Hidden smDown>
                                    <span style={{ paddingRight: '20px' }}>{name}</span>
                                </Hidden>
                                <Avatar alt={name} src="../assets/profilePic.svg" />
                            </ListItem>
                        </IconButton>
                        <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Box>
                                <Paper >
                                    <Grid container >
                                        <Grid>
                                            <List style={{ padding: '20px' }}>
                                                <ListItem divider className={classes.listItem}>
                                                    <ListItemText primary="Log out" onClick={handleLogOut} />
                                                </ListItem>
                                            </List>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Box>
                        </Popover>
                    </div>
                )}
            </PopupState>
        </div>
    )
}



export default ProfileIcon;
