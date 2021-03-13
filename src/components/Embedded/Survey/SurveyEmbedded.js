import React from 'react';
import {
    Container,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    CardHeader,
    Card,
    CardContent, CardActions, Typography, Button
} from "@material-ui/core";
import { Alert }from '@material-ui/lab';
import Header from "../../Home/Header/Header";



export class SurveyEmbedded extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ipAddress: null,
            continent: null,
            country: null,
            city: null,
        };
    }


    async componentDidMount(){
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        this.setState({
            ipAddress: data.ip,
            continent: data.continent_code,
            country: data.country_name,
            city: data.city,
            voted: false

        })
        console.log(data);
        }

    buttonOnClick = () =>{
        if(localStorage.getItem('ID')){
            this.setState({voted: true});
        }
        else{
            localStorage.setItem('ID', '299');
            this.props.switch();
        }
    };

    render() {
        return (
            <React.Fragment>
                <Container>
                    <Container maxWidth="m" style={{marginTop: '15px' }}>
                        <Card>
                            <CardHeader
                                titleTypographyProps={{variant:'h5' }}
                                avatar={
                                    <img src={"./assets/survey_wzrd_logo_ideas.svg"} style={{width: "180px"}}/>
                                }
                                title="By: CompanyName"
                                style={{backgroundColor: "#254563", color: 'white', height: "35px", textAlign: "right"}}>
                            </CardHeader>
                            <CardContent>
                                <CardActions>
                                    <FormControl component="fieldset">
                                        <Typography variant="h5" component="h2">
                                           What ice-cream flavour do you prefer?
                                        </Typography>
                                        <Typography style={{marginBottom: 12}} color="textSecondary">
                                            Please choose one of the following below:
                                        </Typography>
                                            <RadioGroup aria-label="gender" name="gender1" value={"female"} >
                                                <FormControlLabel value="1" control={<Radio />} label="Vanilla" />
                                                <FormControlLabel value="2" control={<Radio />} label="Chocolate" />
                                                <FormControlLabel value="3" control={<Radio />} label="Strawberry" />
                                            </RadioGroup>
                                    </FormControl>
                                </CardActions>
                                <CardActions>
                                    <Button  variant="contained" style={{backgroundColor: "#c4b1c9", color: "white"}} onClick={this.buttonOnClick} >
                                        SEND
                                    </Button>
                                </CardActions>
                            </CardContent>
                            {this.state.voted === true &&
                                <Alert severity="warning">You cannot vote twice!</Alert>
                            }
                            <div style={{backgroundColor: "#254563", height: "10px"}}/>
                        </Card>
                    </Container>
                </Container>
            </React.Fragment>


        )
    }

}
