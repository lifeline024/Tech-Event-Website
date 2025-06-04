import React, { useState } from 'react';
import axios from 'axios';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Divider, 
  IconButton, 
  InputAdornment,
  Alert,
  Fade,
  CircularProgress,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { 
  Person, 
  Email, 
  Phone, 
  Lock, 
  Visibility, 
  VisibilityOff,
  Home,
  Close
} from '@mui/icons-material';

function Signup({ onClose, switchToLogin }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    address: '',
  });
  const [message, setMessage] = useState({ text: '', severity: 'info' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage({ text: '', severity: 'info' });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form);
      setMessage({ text: res.data.message, severity: 'success' });
      
      setTimeout(() => {
        switchToLogin();
      }, 1500);
    } catch (err) {
      setMessage({ 
        text: err.response?.data?.message || 'Error occurred', 
        severity: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const steps = ['Personal Info', 'Contact Details', 'Complete'];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
              sx={styles.input}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              type="password"
              name="password"
              label="Password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={styles.input}
            />
          </>
        );
      case 1:
        return (
          <>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              name="email"
              label="Email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              sx={styles.input}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              name="mobile"
              label="Mobile Number"
              placeholder="Enter your mobile number"
              value={form.mobile}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
              sx={styles.input}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              name="address"
              label="Address"
              placeholder="Enter your address"
              value={form.address}
              onChange={handleChange}
              multiline
              rows={3}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Home />
                  </InputAdornment>
                ),
              }}
              sx={styles.input}
            />
          </>
        );
      case 2:
        return (
          <Box sx={styles.reviewContainer}>
            <Typography variant="h6" sx={styles.reviewTitle}>
              Review Your Information
            </Typography>
            <Box sx={styles.reviewItem}>
              <Typography variant="subtitle2">Full Name:</Typography>
              <Typography>{form.name}</Typography>
            </Box>
            {form.email && (
              <Box sx={styles.reviewItem}>
                <Typography variant="subtitle2">Email:</Typography>
                <Typography>{form.email}</Typography>
              </Box>
            )}
            {form.mobile && (
              <Box sx={styles.reviewItem}>
                <Typography variant="subtitle2">Mobile:</Typography>
                <Typography>{form.mobile}</Typography>
              </Box>
            )}
            {form.address && (
              <Box sx={styles.reviewItem}>
                <Typography variant="subtitle2">Address:</Typography>
                <Typography>{form.address}</Typography>
              </Box>
            )}
            <Typography variant="body2" color="text.secondary" sx={styles.note}>
              Note: You must provide at least email or mobile to register.
            </Typography>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Typography variant="h5" sx={styles.title}>
          Create Account
        </Typography>
        <IconButton onClick={onClose} sx={styles.closeButton}>
          <Close />
        </IconButton>
      </Box>

      <Stepper activeStep={activeStep} alternativeLabel sx={styles.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
        {getStepContent(activeStep)}

        <Fade in={message.text !== ''}>
          <Alert severity={message.severity} sx={styles.alert}>
            {message.text}
          </Alert>
        </Fade>

        <Box sx={styles.actions}>
          {activeStep !== 0 && (
            <Button
              variant="outlined"
              onClick={handleBack}
              sx={styles.backButton}
            >
              Back
            </Button>
          )}
          {activeStep < steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={styles.nextButton}
              disabled={
                (activeStep === 0 && (!form.name || !form.password)) ||
                (activeStep === 1 && !form.email && !form.mobile)
              }
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              type="submit"
              disabled={isLoading}
              sx={styles.submitButton}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Complete Registration'
              )}
            </Button>
          )}
        </Box>
      </Box>

      <Typography variant="body2" sx={styles.footer}>
        Already have an account?{' '}
        <span style={styles.link} onClick={switchToLogin}>
          Login
        </span>
      </Typography>
    </Box>
  );
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: 'background.paper',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
  },
  title: {
    fontWeight: 'bold',
    color: 'primary.main',
  },
  closeButton: {
    color: 'text.secondary',
  },
  stepper: {
    mb: 4,
  },
  form: {
    width: '100%',
  },
  input: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
    },
    '& .MuiInputBase-multiline': {
      alignItems: 'flex-start',
    },
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: 3,
  },
  backButton: {
    borderRadius: '8px',
    textTransform: 'none',
  },
  nextButton: {
    borderRadius: '8px',
    textTransform: 'none',
  },
  submitButton: {
    borderRadius: '8px',
    textTransform: 'none',
    py: 1.5,
  },
  alert: {
    mb: 2,
  },
  footer: {
    textAlign: 'center',
    mt: 3,
    color: 'text.secondary',
  },
  link: {
    color: 'primary.main',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  reviewContainer: {
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: '8px',
    p: 2,
    mb: 2,
  },
  reviewTitle: {
    mb: 2,
    color: 'primary.main',
  },
  reviewItem: {
    display: 'flex',
    justifyContent: 'space-between',
    mb: 1.5,
  },
  note: {
    mt: 2,
    fontStyle: 'italic',
  },
};

export default Signup;