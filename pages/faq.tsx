import { Accordion, AccordionDetails, AccordionSummary, Container, Grid, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import { Box, styled } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MediaQuery from 'react-responsive'


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div >
                    {children}
                </div>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Faq() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const accordionHandleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
    return (
        <section className="faq-section">
            <Container maxWidth="lg">
                <h3>faq</h3>
                <div className="faq-wrapper">
                    <MediaQuery minWidth={1100}>
                        {/* <MediaQuery query="(max-width: 1024px)"> */}
                        <Grid container spacing={2}>
                            <Grid item lg={6}>
                                <Tabs component="ul" value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab component="li" label="What is a Payment Gateway?" />
                                    <Tab component="li" label="Do I need to pay to Instapay even when there is no transaction going on in my business?" />
                                    <Tab component="li" label="What platforms does ACME payment gateway support?" />
                                </Tabs>
                            </Grid>
                            <Grid item lg={6} sx={{ position: 'relative' }}>
                                <div className="tab-content">
                                    <TabPanel value={value} index={0}>
                                        <h4>What is a Payment Gateway?</h4>
                                        <p>
                                            No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charges in the industry, pay only when you get paid!
                                        </p>
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <h4>Do I need to pay to Instapay even when there is no transaction going on in my business?</h4>
                                        <p>
                                            No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charges in the industry, pay only when you get paid!
                                        </p>
                                    </TabPanel>
                                    <TabPanel value={value} index={2}>
                                        <h4>Does ACME provide international payments support?</h4>
                                        <p>
                                            No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charges in the industry, pay only when you get paid!
                                        </p>
                                    </TabPanel>
                                </div>
                            </Grid>
                        </Grid>
                    </MediaQuery>
                    <MediaQuery query="(max-width: 1100px)">
                        <div className="faq-accordion-wrapper">
                            <Accordion expanded={expanded === 'panel1'} onChange={accordionHandleChange('panel1')}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <h5>Do I need to pay to Instapay even when there is no transaction going on in my business?</h5>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="accordion-content">
                                        <p>No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charges in the industry, pay only when you get paid!</p>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel2'} onChange={accordionHandleChange('panel2')}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <h5>What is a Payment Gateway?</h5>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="accordion-content">
                                        <p>No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charges in the industry, pay only when you get paid!</p>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel3'} onChange={accordionHandleChange('panel3')}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <h5>Does ACME provide international payments support?</h5>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="accordion-content">
                                        <p>No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charges in the industry, pay only when you get paid!</p>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </MediaQuery>

                </div>
            </Container>

        </section>
    )
}
