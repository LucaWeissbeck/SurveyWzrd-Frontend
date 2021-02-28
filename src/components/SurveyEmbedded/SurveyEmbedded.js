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
                                <Button  variant="contained" color="primary" >
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

