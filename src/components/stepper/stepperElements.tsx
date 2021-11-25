import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { Box } from '@mui/system';
import zIndex from '@mui/material/styles/zIndex';

export const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 8px)',
        right: 'calc(50% + px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#640E27',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#640E27',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#C4C4C4',
        borderTopWidth: 1,
        borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
        color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#C4C4C4',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        ...(ownerState.active && {
            color: '#640E27',
            '& .QontoStepIcon-circle': {
                backgroundColor: '#640E27 !important',
            },

        }),
        '& .QontoStepIcon-completedIcon': {
            backgroundColor: '#640E27',
            width: 12,
            height: 12,
            borderRadius: '50%'
        },
        '& .QontoStepIcon-circle': {
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#C4C4C4',
        },
    }),
);

export function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed || active ? (
                <div className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}


// export default function CustomizedSteppers() {
//     return (
//         <Box sx={{ maxWidth: '200px' }}>
//             <Stepper activeStep={1} connector={<QontoConnector />}>
//                 {steps.map((label) => (
//                     <Step key={label}>
//                         <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
//                     </Step>
//                 ))}
//             </Stepper>
//         </Box>

//     );
// }
