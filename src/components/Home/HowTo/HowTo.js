import React from 'react';
import Header from "../Header/Header";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@material-ui/core";


export class HowTo extends React.Component {

    render() {

        return (
            <React.Fragment>
                <div style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL
                    + "/assets/background.png"})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh',
                    width: '100vw'
                }}>
                    <Header header={2}/>

                    <div>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>How to create a survey?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Creating a survey using the Survey WZRDs tool is simple. All you need to do is click on the ‘CREATE SURVEY’ button in the navigation bar and fill out the form.
                                    <br/>
                                    The title should be a short precise description of the surveys topic.
                                    <br/>
                                    Enter your companies name in the top right corner to show it in the embedded survey.
                                    <br/>
                                    In the grey box underneath the title you can enter a more detailed description. Here you can tell your survey participants more information about the survey.
                                    <br/>
                                    Now to the most important part: Enter your survey question in the question field.
                                    <br/>
                                    Below the question you can enter the possible answer options (max. 45 words per answer). You must provide a minimum of 2 and maximum of 8 answer options. To add more answers, just click on the "+". Vice versa, to remove answers, click on the "-".
                                    <br/>
                                    Per default, the survey participants can choose only one out of all provided answers. If you want to allow several answers, click on the toggle so that it gets blue.
                                    <br/>
                                    Using a date picker, you can choose an expiry date for your survey. After this date, the survey will be disabled.
                                    <br/>
                                    And lastly, all you need to do is hit the ‘create’ button and you have successfully created a new survey!
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>How to embed a survey in your website</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    After creating a survey, you can click on the ‘OVERVIEW’ button in the navigation bar. You should now see all surveys that you have created.
                                    <br/>
                                    Click on the share button in the upper right corner of the survey you want to embed and copy the iframe. It should look something like this:
                                    <br/>
                                    <br/>
                                    &lt;iframe&gt;src="http://api.tutorialfactory.org:8088/survey?id=7"&lt;/iframe&gt;
                                    <br/>
                                    <br/>
                                    Now, go to your website, and place the iframe element in your html document wherever you desire.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>How to access the results of a survey</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    After creating a survey, you can click on the ‘OVERVIEW’ button in the navigation bar. You should now see all surveys that you have created.
                                    <br/>
                                    Click on ‘evaluate’ in the lower left corner. The result card shows how many of all participants have voted for each answer option. On the card in the middle you can see the total count of all participants. The information card provides you with the survey title, question, description, and whether multiple answer options are allowed or not.
                                    <br/>
                                    The detailed graph shows you how the participants voted on different dates. The last card shows the countries from where your participants have voted. The most common country is placed in the middle of the donut chart.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>How to delete a survey</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    After creating a survey, you can click on the ‘OVERVIEW’ button in the navigation bar. You should now see all surveys that you have created.
                                    <br/>
                                    Click on the trash can button to delete the survey. Now, you should not be able to see the survey in the overview anymore.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>How to log out of your account</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    To log out of your account just click on the ‘LOGOUT’ button in the navigation bar.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>

                </div>
            </React.Fragment>

        )
    }
}
