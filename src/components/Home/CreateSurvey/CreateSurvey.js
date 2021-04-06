import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Container, Card, CardActions, CardContent, Grid, Box, Button, Paper, Tooltip, Input, FormControlLabel, Switch, TextField} from "@material-ui/core";
import AddBoxIcon from '@material-ui/icons/AddBox';
import Header from "../Header/Header";
import {Helmet} from "react-helmet";
import AssignmentIcon from '@material-ui/icons/Assignment';
import {Link} from "react-router-dom";
import AccountBoxIcon from "@material-ui/icons/AccountBox";






export class CreateSurvey extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            checkedA: false,
        };
    }


    handleChange = (event) => {
        this.setState({ checkedA: event.target.checked });
    };



    render() {



        return(
       <React.Fragment>
           <Header header={1}/>
           <Helmet>
               <style>{'body { background-color: #D9DCE1; }'}</style>
           </Helmet>

           <Container>
               <Box p={1}/>

               <Grid container justify = "center">
                   <Box width="70%">
                       <Card>
                           <CardContent>
                               <Input
                                   placeholder="Insert Title..."
                                   fullWidth
                                   disableUnderline={true}
                                   inputProps={{style: {fontSize: 30, color: '#254563'}}} // font size of input text
                                   InputLabelProps={{style: {fontSize: 30, color: '#254563'}}} // font size of input label
                               />
                               <form noValidate autoComplete="off">
                                   <div>
                                       <TextField
                                           id="filled-textarea"
                                           label="Insert survey description here..."
                                           InputProps={{ disableUnderline: true }}
                                           multiline
                                           rows={3}
                                           multiline
                                           fullWidth
                                           variant="filled"
                                       />
                                   </div>
                               </form>
                               <form noValidate autoComplete="off">
                                   <div>
                                       <TextField
                                           id="standard-basic"
                                           label="Question"
                                           fullWidth
                                       />
                                   </div>
                               </form>
                               <Box p={1}/>
                               <form noValidate autoComplete="off">
                                   <div>
                                       <Grid container spacing={0}>
                                           <Grid item sm={1}/>

                                           <Grid item sm={11}>
                                               <TextField
                                                   id="standard-basic"
                                                   label="Answer 1"
                                                   fullWidth
                                               />
                                           </Grid>
                                       </Grid>
                                   </div>
                               </form>
                               <form noValidate autoComplete="off">
                                   <div>
                                       <Grid container spacing={0}>
                                           <Grid item sm={1}/>

                                           <Grid item sm={11}>
                                               <TextField
                                                   id="standard-basic"
                                                   label="Answer 2"
                                                   fullWidth
                                               />
                                           </Grid>
                                       </Grid>
                                   </div>
                               </form>
                               <form noValidate autoComplete="off">
                                   <div>
                                       <Grid container spacing={0}>
                                           <Grid item sm={1}/>

                                           <Grid item sm={11}>
                                               <div>
                                                   <Grid container spacing={1} alignItems="flex-end">
                                                       <Grid item>
                                                           <Tooltip title="Add additional answer">
                                                               <Button component={Link} to="/createsurvey">
                                                                   <AddBoxIcon/>
                                                               </Button>
                                                           </Tooltip>

                                                       </Grid>
                                                       <Grid item>
                                                           <TextField
                                                               disabled
                                                               id="input-with-icon-grid"
                                                               label="Additional Answer"
                                                               fullWidth
                                                               InputProps={{ disableUnderline: true }}
                                                           />
                                                       </Grid>
                                                   </Grid>
                                               </div>

                                           </Grid>
                                       </Grid>
                                   </div>
                               </form>
                               <FormControlLabel
                                   control={<Switch checked={this.state.checkedA} onChange={this.handleChange} name="checkedA" color="primary" />}
                                   label="Allow Several Answers"
                               />
                           </CardContent>
                           <CardActions>
                               <Button variant="contained" component={Link} to="/">
                                   CREATE
                               </Button>
                           </CardActions>
                       </Card>
                   </Box>
               </Grid>
           </Container>
       </React.Fragment>
    )
}
}

