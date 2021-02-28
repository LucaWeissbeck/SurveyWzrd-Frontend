import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Container, Card, CardActions, CardContent, Typography, Button, Menu, MenuItem, FormControl, Select, InputLabel, CardHeader, FormHelperText} from "@material-ui/core";
import Header from "../Header/Header";
import AssignmentIcon from '@material-ui/icons/Assignment';







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

const useStylesMUI =  makeStyles((theme) =>({
    header:{
        ...theme.typography.h2,
        backgroundColor: theme.palette.secondary.light,
        color: "white",
        textAlign: "center"
    },
    avatar:{
        float: "left"
    }

}))

export default function CreateSurvey(){
    const classes = useStyles();
    const classesMUI = useStylesMUI();

    const [typeQuestion, setTypeQuestion] = React.useState('')

    const typeQuestionHandleChange = (event) =>{
        setTypeQuestion(event.target.value )
    }


    const handleSubmit = event => {
        alert(typeQuestion);
    }
    const age = 16;
    return(
       <React.Fragment>
           <Header></Header>
           <Container>
               <Container maxWidth="sm" style={{marginTop: '15px' }}>
                   <Card className={classes.root}>
                       <CardHeader
                       classes={{root: classesMUI.header}}
                       avatar={<AssignmentIcon fontSize="large" className={classesMUI.avatar}/>}
                       titleTypographyProps={{variant:'h4'}}
                       title="Survey Creator"
                       />
                       <CardContent>
                           <Typography className={classes.pos} color="textSecondary">
                               Create your own personalised Survey!
                           </Typography>

                           <FormControl fullWidth={true}>
                               <InputLabel id="selector-questiontype-label">Survey Type</InputLabel>
                               <Select
                                   fullWidth={true}
                                   labelId="selector-questiontype-label"
                                   id="selector-questiontype"
                                   value={typeQuestion}
                                   onChange={typeQuestionHandleChange}
                               >
                                   <MenuItem value={"SC"}>Single Choice</MenuItem>
                                   <MenuItem value={"MC"}>Multiple Choice</MenuItem>
                               </Select>
                               <FormHelperText>Choose your Survey Type!</FormHelperText>
                           </FormControl>

                       </CardContent>
                       <CardActions>
                           <Button onClick={handleSubmit}>Submit</Button>
                       </CardActions>
                   </Card>
               </Container>
           </Container>
       </React.Fragment>
    )
}

