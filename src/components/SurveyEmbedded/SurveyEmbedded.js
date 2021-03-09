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

export class SurveyEmbedded extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            userAddress: null
        };
        this.getLocation = this.getLocation.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
    }

    getLocation = () =>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
            alert(this.state.latitude +""+ this.state.longitude)
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    getCoordinates = (position) =>{
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }
    handleLocationError = (error) =>{
        switch(error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.")
                break;
            default:
                alert("An unknown error occurred.")
        }
    }

    render() {
        const value = 'female';


        return (
            <Container>
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
                                <Button  variant="contained" color="primary" onClick={this.getLocation} >
                                    Submit
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Container>
            </Container>


        )
    }

}
