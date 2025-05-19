import React, { useState } from 'react';
import { Button, Box, Stepper, Step, StepLabel, Typography, Paper, TextField, Stack, Alert, Dialog } from '@mui/material';
import { Link } from 'react-router-dom';
import ComplaintForm from '../components/ComplaintForm';

const steps = ['Describe Complaint', 'Privacy & Contact', 'Review & Submit'];

export default function ComplaintPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [complaintData, setComplaintData] = useState<any>({});
  const [shareContact, setShareContact] = useState<null | boolean>(null);
  const [contactData, setContactData] = useState({ name: '', email: '', phone: '' });
  const [showThankYou, setShowThankYou] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Handlers for complaint form (assume ComplaintForm accepts onChange/onContinue)
  const handleComplaintContinue = (data: any) => {
    setComplaintData(data);
    setShowThankYou(true);
    setTimeout(() => {
      setShowThankYou(false);
      setActiveStep(1);
    }, 1200);
  };

  const handleContactChoice = (choice: boolean) => {
    setShareContact(choice);
    setShowThankYou(true);
    setTimeout(() => {
      setShowThankYou(false);
      setActiveStep(choice ? 1.5 : 2); // 1.5: show contact form, 2: review
    }, 1200);
  };

  const handleContactContinue = () => {
    setActiveStep(2);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // Submit logic here
  };

  // Step content rendering
  let stepContent;
  if (activeStep === 0) {
    stepContent = (
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6" gutterBottom>Report an Issue</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Please select a category below. If your choice isn't mentioned, click <b>Custom</b> and type your own. We appreciate your input in helping us improve our community!
        </Typography>
        <ComplaintForm onContinue={handleComplaintContinue} />
      </Paper>
    );
  } else if (activeStep === 1) {
    stepContent = (
      <Paper sx={{ p: 3, mt: 2, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>Thank you for describing your complaint!</Typography>
        <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
          Would you like to share your contact information? <br/>
          <b>We value your privacy</b> and will never misuse your data.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button variant="contained" color="primary" onClick={() => handleContactChoice(true)}>
            Yes, share my contact
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => handleContactChoice(false)}>
            No, continue anonymously
          </Button>
        </Stack>
      </Paper>
    );
  } else if (activeStep === 1.5) {
    stepContent = (
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6" gutterBottom>Contact Information</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Please provide your contact information below. <br />This will help us follow up with you if needed. Your info will only be used for this purpose—thank you for your trust!
        </Typography>
        <Stack spacing={2}>
          <TextField label="Name" name="name" value={contactData.name} onChange={handleContactChange} fullWidth />
          <TextField label="Email" name="email" value={contactData.email} onChange={handleContactChange} fullWidth />
          <TextField label="Phone" name="phone" value={contactData.phone} onChange={handleContactChange} fullWidth />
        </Stack>
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleContactContinue}>
            Continue
          </Button>
        </Stack>
      </Paper>
    );
  } else if (activeStep === 2) {
    stepContent = (
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6" gutterBottom>Review & Confirm</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Please review your submission below. If you need to make changes, click <b>Edit</b>. When you're ready, click <b>Confirm & Submit</b>.
        </Typography>
        <Box sx={{ bgcolor: '#f8f8f8', p: 2, borderRadius: 2, mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>Complaint Details</Typography>
          <Stack spacing={1}>
            <Typography><b>Category:</b> {complaintData.category}</Typography>
            <Typography><b>Subcategory:</b> {complaintData.subcategory}</Typography>
            <Typography><b>Issue:</b> {complaintData.issue}</Typography>
            <Typography><b>Description:</b> {complaintData.detail}</Typography>
            <Typography><b>Privacy:</b> {complaintData.privacy ? 'Public (visible on map)' : 'Private'}</Typography>
          </Stack>
          {shareContact && (
            <>
              <Typography variant="subtitle2" sx={{ mt: 2 }} gutterBottom>Contact Info</Typography>
              <Stack spacing={1}>
                <Typography><b>Name:</b> {contactData.name}</Typography>
                <Typography><b>Email:</b> {contactData.email}</Typography>
                <Typography><b>Phone:</b> {contactData.phone}</Typography>
              </Stack>
            </>
          )}
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" color="secondary" onClick={() => setActiveStep(0)}>
            Edit
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Confirm & Submit
          </Button>
        </Stack>
      </Paper>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 540, mx: 'auto', mt: 4 }}>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/citizen"
        sx={{ mb: 2 }}
      >
        Go to Dashboard
      </Button>
      <Stepper activeStep={activeStep === 1.5 ? 1 : Math.floor(activeStep)} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label, idx) => (
          <Step key={label} completed={activeStep > idx}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {showThankYou && (
        <Box sx={{ mb: 2 }}>
          <Alert severity="success" onClose={() => setShowThankYou(false)}>
            {activeStep === 0 ? 'Thank you for your input. Please proceed to the next step.' : 'Thank you!'}
          </Alert>
        </Box>
      )}
      {!showThankYou && stepContent}
      {submitted && (
        <Dialog open>
          <Paper sx={{ p: 4, minWidth: 340, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>🎉 Complaint Submitted!</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Your complaint has been <b>successfully received</b> and submitted to the government agency in charge.<br />
              <b>We appreciate your effort</b> in making our community better!<br />
              You can now track the progress of your complaint, file a new one, or return to your dashboard.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 3 }}>
              <Button variant="contained" color="primary" component={Link} to="/citizen">
                Go to Dashboard
              </Button>
              <Button variant="outlined" color="primary" component={Link} to="/track">
                Track Complaint
              </Button>
              <Button variant="text" color="secondary" onClick={() => {
                setActiveStep(0);
                setComplaintData({});
                setShareContact(null);
                setContactData({ name: '', email: '', phone: '' });
                setSubmitted(false);
              }}>
                New Complaint
              </Button>
            </Stack>
          </Paper>
        </Dialog>
      )}
    </Box>
  );
}
