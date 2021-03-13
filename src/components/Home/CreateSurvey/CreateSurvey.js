import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Container, Card, CardActions, CardContent, Typography, Button, Menu, MenuItem, FormControl, FormHelperText, Select, InputLabel, CardHeader, TextField, StepIcon} from "@material-ui/core";
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
    mainCard: {
        backgroundColor: '#00b0ff'
    },
    contentCard:{
        padding: '10px'
    },
    contentCard2:{
        padding: '10px',
        marginTop: '10px'
    },
    stepIcon:{
        float:'right'
    },
    cardMainAction:{
        backgroundColor: '#ffc400'
    }
});

const useStylesMUI =  makeStyles((theme) =>({
    header:{
        ...theme.typography.h2,
        backgroundColor: '#ffc400',
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

    const [typeQuestion, setTypeQuestion] = React.useState('');
    const [question, setQuestion] = React.useState('');

    const typeQuestionHandleChange = (event) =>{
        setTypeQuestion(event.target.value);
    }

    const questionHandleChange = (event) =>{
        setQuestion(event.target.value);
    }


    const handleSubmit = event => {
        alert(typeQuestion + question);
    }
    const age = 16;
    return(
       <React.Fragment>
           <Header header={1}/>
           <Container>
               <Container maxWidth="sm" style={{marginTop: '15px' }}>
                   <Card className={classes.root}>
                       <CardHeader
                       classes={{root: classesMUI.header}}
                       avatar={<AssignmentIcon fontSize="large" className={classesMUI.avatar}/>}
                       titleTypographyProps={{variant:'h4'}}
                       title="Survey Creator"
                       subheader="Create your own personalised Survey!"
                       />
                       <CardContent className={classes.mainCard}>
                           <Card className={classes.contentCard}>
                               <div className={classes.stepIcon}>
                                   <StepIcon icon={1} active={typeQuestion !== ''} fontSize="large"></StepIcon>
                               </div>
                               <Typography className={classes.pos} color="textSecondary">
                                   Please choose your Survey Type!
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
                               </FormControl>
                           </Card>
                           <Card className={classes.contentCard2}>
                               <div className={classes.stepIcon}>
                                   <StepIcon icon={2} active={question.length > 0 && question.includes('?')} fontSize="large"></StepIcon>
                               </div>
                               <Typography color="textSecondary">
                                   Enter a Survey Question!
                               </Typography>
                               <FormControl fullWidth={true}>
                                   <TextField id="standard-basic" label="Survey Question"  onChange={questionHandleChange} />
                                   <FormHelperText>Must include a "?"</FormHelperText>
                               </FormControl>
                           </Card>

                       </CardContent>
                       <CardActions className={classes.cardMainAction}>
                           <Button style={{left: '82%'}} variant="contained" color="primary" onClick={handleSubmit} disabled={!(question.length > 0 && typeQuestion !== '' && question.includes('?'))}>Submit</Button>
                       </CardActions>
                   </Card>
               </Container>
           </Container>
       </React.Fragment>
    )
}

