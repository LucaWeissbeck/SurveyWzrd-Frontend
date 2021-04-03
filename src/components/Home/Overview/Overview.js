import React from 'react';
import Header from "../Header/Header";
import * as surveyService from "../../../services/overview/overview-service";
import {
    Container,
    Grid,
    Card,
    CardHeader,
    IconButton,
    CardMedia,
    CardActions,
    Button,
    ButtonGroup,
    CardContent,
    Typography
} from "@material-ui/core";
import ShareIcon from '@material-ui/icons/Share';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {Helmet} from "react-helmet";

export class Overview extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            allSurveys: [],
        }
    }

    componentDidMount() {
        surveyService.getAllSurveys()
            .then((res) =>{
                this.setState({allSurveys: res.data})
            })
            .catch(err => console.log(err));
    }


    render(){
        return(
            <React.Fragment>
                <Header header={0}/>
                <Helmet>
                    <style>{'body { background-color: #d4d7dd; }'}</style>
                </Helmet>
                {console.log(this.state.allSurveys)}
                <Container>
                    <Grid container spacing={6} style={{marginTop: "10px"}}>
                        {this.state.allSurveys.map((survey) => (
                            <Grid item xs = {4}>
                                <Card raised={true} style={{height: "100%", display: "flex", flexDirection:"column", flexShrink: 0}}>
                                    <CardHeader
                                        title={survey.name}
                                        action={
                                            <IconButton>
                                                <ShareIcon />
                                            </IconButton>
                                        }
                                    />
                                    <CardMedia/>
                                    <CardContent style={{display: "flex", flex: 1}}>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {survey.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button color="primary">Auswerten</Button>
                                        <Button color="primary">Bearbeiten</Button>
                                        <Button color="primary">Vorschau</Button>
                                        <IconButton>
                                            <DeleteOutlineIcon/>
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>

            </React.Fragment>
        )
    }
}
