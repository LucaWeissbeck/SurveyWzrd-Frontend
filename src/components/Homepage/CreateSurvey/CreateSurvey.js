import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Container, Card, CardActions, CardContent, Typography, Button, Menu, MenuItem} from "@material-ui/core";
import Header from "../Header/Header";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function CreateSurvey(){
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
       <React.Fragment>
           <Header></Header>
           <Container>
               <Container maxWidth="sm" style={{marginTop: '15px' }}>
                   <Card className={classes.root}>
                       <CardContent>
                           <Typography variant="h5" component="h2" >
                               Create your Survey!
                           </Typography>
                           <Typography className={classes.pos} color="textSecondary">
                               Select your type of Survey:
                           </Typography>


                           <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                               Open Menu
                           </Button>
                           <Menu
                               id="simple-menu"
                               anchorEl={anchorEl}
                               keepMounted
                               open={Boolean(anchorEl)}
                               onClose={handleClose}>
                               <MenuItem onClick={handleClose}>SingleChoice</MenuItem>
                               <MenuItem onClick={handleClose}>Multiple Choice</MenuItem>
                           </Menu>





                           <Typography variant="body2" component="p">
                               well meaning and kindly.
                               <br />
                               {'"a benevolent smile"'}
                           </Typography>
                       </CardContent>
                       <CardActions>
                           <Button size="small">Learn More</Button>
                       </CardActions>
                   </Card>
               </Container>
           </Container>
       </React.Fragment>
    )
}
