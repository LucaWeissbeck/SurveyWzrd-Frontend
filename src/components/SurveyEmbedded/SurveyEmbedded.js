import React from 'react';
import {
    Container,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    Card,
    CardContent, CardActions, Typography, Button
} from "@material-ui/core";
import Header from "../Home/Header/Header";

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
            city: data.city

        })
        console.log(data);
        }

    render() {
        const value = 'female';


        return (
            <Container>
                <Header></Header>
                <Container maxWidth="sm" style={{marginTop: '15px' }}>
                    <Card>
                        <CardContent>
                            <CardActions>
                                <FormControl component="fieldset">
                                    <Typography variant="h5" component="h2">
                                        How many cars in your household?
                                    </Typography>
                                    <Typography style={{marginBottom: 12}} color="textSecondary">
                                        Please choose your quantity below!
                                    </Typography>
                                        <RadioGroup aria-label="gender" name="gender1" value={value} >
                                            <FormControlLabel value="1" control={<Radio />} label="1" />
                                            <FormControlLabel value="2" control={<Radio />} label="2" />
                                            <FormControlLabel value="3" control={<Radio />} label="3" />
                                        </RadioGroup>
                                </FormControl>
                            </CardActions>
                            <CardActions>
                                <Button  variant="contained" color="primary" onClick={this.getClientIp} >
                                    Submit
                                </Button>
                            </CardActions>
                            <p>
                                {"IP:" + this.state.ipAddress + " Continent:" + this.state.continent + " Country:" + this.state.country + " City:" + this.state.city}
                            </p>
                        </CardContent>
                    </Card>
                </Container>
            </Container>


        )
    }

}
