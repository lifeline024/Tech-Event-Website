import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  InputAdornment,
  IconButton
} from "@mui/material";
import {
  Payment as PaymentIcon,
  CheckCircle as CheckCircleIcon,
  QrCode as QrCodeIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Receipt as ReceiptIcon,
  AttachMoney as AttachMoneyIcon,
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon
} from "@mui/icons-material";

function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    referenceId: "",
    amount: ""
  });
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    referenceId: false,
    amount: false
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(response.data);
        setFormData(prev => ({ ...prev, amount: response.data.price }));
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
    fetchCourse();
  }, [id]);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email format";
        }
        break;
      case "phone":
        if (!value.trim()) {
          error = "Phone is required";
        } else if (!/^\d{10}$/.test(value)) {
          error = "Invalid phone number";
        }
        break;
      case "referenceId":
        if (!value.trim()) error = "Transaction ID is required";
        break;
      case "amount":
        if (!value || isNaN(value)) error = "Invalid amount";
        break;
      default:
        break;
    }
    return error;
  };

  const validateForm = (step) => {
    const newErrors = {};
    let isValid = true;

    if (step === 0) {
      ["name", "email", "phone"].forEach(field => {
        const error = validateField(field, formData[field]);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      });
    } else if (step === 1) {
      ["referenceId", "amount"].forEach(field => {
        const error = validateField(field, formData[field]);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      });
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    const error = validateField(field, formData[field]);
    setErrors({ ...errors, [field]: error });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validate field if it's been touched before
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleNext = () => {
    if (validateForm(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(activeStep)) return;
    
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/bookings", {
        ...formData,
        course: course.title
      });
      setOpenDialog(true);
    } catch (err) {
      console.error(err);
      setErrors({ ...errors, submit: "Booking failed. Please try again." });
    }
    setLoading(false);
  };

  const steps = ["Course Details", "Payment", "Confirmation"];

  if (!course) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>Loading course details...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Card sx={styles.card}>
        <Box sx={styles.header}>
          <Typography variant="h4" sx={styles.title}>
            Course Enrollment
          </Typography>
          <Typography variant="subtitle1" sx={styles.subtitle}>
            Complete your booking in just a few steps
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel sx={styles.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <CardContent>
          {activeStep === 0 && (
            <Box sx={styles.stepContent}>
              <Box sx={styles.courseInfo}>
                <Avatar src={course.image} sx={styles.courseImage} variant="rounded" />
                <Box>
                  <Typography variant="h5">{course.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {course.description}
                  </Typography>
                  <Box sx={styles.courseDetails}>
                    <Typography variant="body2">
                      <strong>Duration:</strong> {course.duration}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                      ₹{course.price}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ mb: 2 }}>Your Information</Typography>
              
              <TextField
                fullWidth
                name="name"
                label="Full Name"
                variant="outlined"
                margin="normal"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur("name")}
                error={!!errors.name}
                helperText={errors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                name="email"
                label="Email"
                variant="outlined"
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                name="phone"
                label="Phone Number"
                variant="outlined"
                margin="normal"
                value={formData.phone}
                onChange={handleChange}
                onBlur={() => handleBlur("phone")}
                error={!!errors.phone}
                helperText={errors.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}

          {activeStep === 1 && (
            <Box sx={styles.stepContent}>
              <Typography variant="h6" sx={{ mb: 2 }}>Payment Method</Typography>
              
              <Box sx={styles.paymentMethod}>
                <QrCodeIcon sx={styles.qrIcon} />
                <Typography variant="body1" sx={styles.paymentText}>
                  Scan the QR code below to make payment
                </Typography>
              </Box>

              <Box sx={styles.qrContainer}>
                <img
                  src="/qr_img.jpg"
                  alt="QR Code"
                  style={styles.qrImage}
                />
                <Typography variant="caption" display="block" sx={styles.qrCaption}>
                  Scan & Pay
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <TextField
                fullWidth
                name="referenceId"
                label="Transaction ID"
                variant="outlined"
                margin="normal"
                value={formData.referenceId}
                onChange={handleChange}
                onBlur={() => handleBlur("referenceId")}
                error={!!errors.referenceId}
                helperText={errors.referenceId}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ReceiptIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                name="amount"
                label="Amount Paid"
                variant="outlined"
                margin="normal"
                value={formData.amount}
                onChange={handleChange}
                onBlur={() => handleBlur("amount")}
                error={!!errors.amount}
                helperText={errors.amount}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}

          {activeStep === 2 && (
            <Box sx={styles.stepContent}>
              <Box sx={styles.confirmationBox}>
                <CheckCircleIcon sx={styles.successIcon} />
                <Typography variant="h6" sx={styles.confirmationTitle}>
                  Confirm Your Details
                </Typography>
              </Box>

              <Box sx={styles.detailsContainer}>
                <Typography variant="subtitle1" sx={styles.detailLabel}>Course:</Typography>
                <Typography variant="body1">{course.title}</Typography>
                
                <Typography variant="subtitle1" sx={styles.detailLabel}>Name:</Typography>
                <Typography variant="body1">{formData.name}</Typography>
                
                <Typography variant="subtitle1" sx={styles.detailLabel}>Email:</Typography>
                <Typography variant="body1">{formData.email}</Typography>
                
                <Typography variant="subtitle1" sx={styles.detailLabel}>Phone:</Typography>
                <Typography variant="body1">{formData.phone}</Typography>
                
                <Typography variant="subtitle1" sx={styles.detailLabel}>Amount Paid:</Typography>
                <Typography variant="body1">₹{formData.amount}</Typography>
              </Box>

              {errors.submit && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {errors.submit}
                </Typography>
              )}
            </Box>
          )}

          <Box sx={styles.actions}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBackIcon />}
              sx={styles.backButton}
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                endIcon={loading ? <CircularProgress size={24} /> : <PaymentIcon />}
                sx={styles.submitButton}
              >
                {loading ? "Processing..." : "Complete Booking"}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={styles.nextButton}
                disabled={Object.keys(errors).some(key => errors[key])}
              >
                Next
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={styles.dialogTitle}>
          <Box sx={styles.dialogHeader}>
            <CheckCircleIcon color="success" sx={styles.dialogIcon} />
            <Typography variant="h6">Booking Confirmed!</Typography>
          </Box>
          <IconButton
            aria-label="close"
            onClick={() => {
              setOpenDialog(false);
              navigate("/");
            }}
            sx={styles.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Thank you for choosing <strong>Zenith</strong>! 🎉
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Your course materials will be sent to your email within 1 hour.
            </Typography>
            <Typography variant="body1">
              For any enquiries, please don't hesitate to contact us.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={styles.dialogActions}>
          <Button
            variant="contained"
            onClick={() => {
              setOpenDialog(false);
              navigate("/contact");
            }}
            sx={styles.contactButton}
          >
            Contact Us
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setOpenDialog(false);
              navigate("/");
            }}
          >
            Back to Home
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    p: 3,
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  card: {
    maxWidth: 800,
    width: "100%",
    borderRadius: 3,
    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
  },
  header: {
    textAlign: "center",
    pt: 4,
    pb: 2,
    backgroundColor: "primary.main",
    color: "white",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
  },
  title: {
    fontWeight: "bold",
  },
  subtitle: {
    opacity: 0.9,
  },
  stepper: {
    px: 3,
    pt: 2,
    pb: 0,
  },
  stepContent: {
    px: 2,
    py: 3,
  },
  courseInfo: {
    display: "flex",
    gap: 3,
    alignItems: "center",
    mb: 3,
  },
  courseImage: {
    width: 100,
    height: 100,
  },
  courseDetails: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mt: 2,
  },
  paymentMethod: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    mb: 2,
  },
  qrIcon: {
    fontSize: 24,
    color: "primary.main",
  },
  paymentText: {
    fontWeight: 500,
  },
  qrContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    my: 3,
  },
  qrImage: {
    width: 200,
    height: 200,
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "8px",
    backgroundColor: "white",
  },
  qrCaption: {
    mt: 1,
    color: "text.secondary",
  },
  confirmationBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mb: 3,
  },
  successIcon: {
    fontSize: 60,
    color: "success.main",
    mb: 2,
  },
  confirmationTitle: {
    fontWeight: "bold",
  },
  detailsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: "16px",
    mt: 3,
  },
  detailLabel: {
    fontWeight: "bold",
    color: "text.secondary",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    pt: 3,
  },
  backButton: {
    textTransform: "none",
  },
  nextButton: {
    textTransform: "none",
    px: 4,
  },
  submitButton: {
    textTransform: "none",
    px: 4,
  },
  dialogTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #e0e0e0",
    pb: 2,
  },
  dialogHeader: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  dialogIcon: {
    fontSize: 30,
    mr: 1,
  },
  closeButton: {
    color: "text.secondary",
  },
  dialogActions: {
    px: 3,
    py: 2,
    borderTop: "1px solid #e0e0e0",
  },
  contactButton: {
    textTransform: "none",
  },
};

export default BookingForm;