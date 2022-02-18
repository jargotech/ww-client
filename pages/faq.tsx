import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Box, styled } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MediaQuery from "react-responsive";
import Head from "next/head";
import { FaqService } from "../src/services/faq/faq-service";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  const [expanded, setExpanded] = React.useState<string | false>("panel1");

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
      {value === index && <div>{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Faq() {
  // States
  const [value, setValue] = React.useState(0);
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [faqList, setFaqList] = React.useState<any[]>();

  // Variables
  const faqService = new FaqService();

  // Functions
  const _getFaqService = () => {
    const faqData: any = faqService.getAllFaq();
    faqData.then((res: any) => {
      if (res.status == 200) {
        // console.log(res.data.data)
        // #1. getting all Faqs data
        setFaqList(res.data.data);
      }
    });
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const accordionHandleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  function createMarkup(data: any) {
    // return { __html: test.replace('$', '<span>').replace('$', '</span>') };
    return { __html: data || "-" };
  }
  // Effects
  useEffect(() => {
    _getFaqService();
  }, []);

  return (
    <section className="faq-section">
      <Head>
        <title>Wish Wheels | FAQ</title>
      </Head>
      <Container maxWidth="lg">
        <h3 className="faq-section-title">faq</h3>
        <div className="faq-wrapper">
          <MediaQuery minWidth={1100}>
            {/* <MediaQuery query="(max-width: 1024px)"> */}
            <Grid container spacing={2}>
              <Grid item lg={6}>
                <Tabs
                  component="ul"
                  className="faq-list"
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  {faqList &&
                    faqList.map((faq, index) => (
                      <Tab key={index} component="li" label={faq.question} />
                    ))}

                  {/* <Tab component="li" label="Do I need to pay to Instapay even when there is no transaction going on in my business?" />
                                    <Tab component="li" label="What platforms does ACME payment gateway support?" /> */}
                </Tabs>
              </Grid>
              <Grid item lg={6} sx={{ position: "relative" }}>
                <div className="tab-content">
                  {faqList &&
                    faqList.map((faq, index) => (
                      <TabPanel key={index} value={value} index={index}>
                        {/* <h4>Do I need to pay to Instapay even when there is no transaction going on in my business?</h4> */}
                        <h4>{faq.question}</h4>
                        {/* <p>
                                            No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charges in the industry, pay only when you get paid!
                                        </p> */}
                        <p
                          dangerouslySetInnerHTML={createMarkup(faq.answer)}
                        ></p>
                      </TabPanel>
                    ))}

                  {/* <TabPanel value={value} index={1}>
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
                                    </TabPanel> */}
                </div>
              </Grid>
            </Grid>
          </MediaQuery>
          <MediaQuery query="(max-width: 1100px)">
            <div className="faq-accordion-wrapper">
              {faqList &&
                faqList.map((faq, index) => (
                  <Accordion
                    key={`mobile-accordion-${index}`}
                    expanded={expanded === `panel${index}`}
                    onChange={accordionHandleChange(`panel${index}`)}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      {/* <h5>Do I need to pay to Instapay even when there is no transaction going on in my business?</h5> */}
                      <h5>{faq.question}</h5>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="accordion-content">
                        {/* <p>No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charges in the industry, pay only when you get paid!</p> */}
                        <p
                          dangerouslySetInnerHTML={createMarkup(faq.answer)}
                        ></p>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}

              {/* <Accordion expanded={expanded === 'panel2'} onChange={accordionHandleChange('panel2')}>
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
                            </Accordion> */}
            </div>
          </MediaQuery>
        </div>
      </Container>
    </section>
  );
}
