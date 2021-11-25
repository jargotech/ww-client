import { Box, Stepper, Step, StepLabel } from '@mui/material'
import React from 'react'
import { QontoConnector, QontoStepIcon } from './stepperElements'

export default function StyledStepper({ activeStep, steps }: any) {
    return (
        <Box sx={{ maxWidth: '200px', marginBottom: '10px' }}>
            <Stepper activeStep={activeStep} connector={<QontoConnector />} >
                {
                    steps.map((step: any, index: number) => (
                        <Step key={index}>
                            <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
                        </Step>
                    ))
                }
            </Stepper>
        </Box>
    )
}
