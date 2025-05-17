import { Stepper, Step, StepLabel, Box } from '@mui/material';

const steps = ['Submitted', 'Assigned', 'Resolved'];

export default function StatusTimeline({ status }: { status: string }) {
  const activeStep = steps.indexOf(status.charAt(0).toUpperCase() + status.slice(1));
  return (
    <Box sx={{ width: '100%', my: 2 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
