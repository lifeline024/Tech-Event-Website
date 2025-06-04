import React, { useState } from "react";
import axios from "axios";
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
} from "@mui/material";
import {
  Email,
  Lock,
  Phone,
  Visibility,
  VisibilityOff,
  Close,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

function Login({ onClose }) {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [message, setMessage] = useState({ text: "", severity: "info" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage({ text: "", severity: "info" });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      form
    );

    console.log("Login Response:", res.data);

    setMessage({ text: res.data.message, severity: "success" });

    // Save auth token
    localStorage.setItem("authtoken", res.data.token || "true");

    // ✅ Correctly save user email
    const userEmail = res.data.email || res.data.user?.email;
    if (userEmail) {
      localStorage.setItem("userEmail", userEmail);
    } else {
      console.warn("Email not found in login response.");
    }

    setTimeout(() => {
      onClose();
      window.location.reload();
    }, 1500);
  } catch (err) {
    setMessage({
      text: err.response?.data?.message || "Login failed",
      severity: "error",
    });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Typography variant="h5" sx={styles.title}>
          Welcome Back
        </Typography>
        <IconButton onClick={onClose} sx={styles.closeButton}>
          <Close />
        </IconButton>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={styles.subtitle}>
        Please enter your credentials to login
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          name="identifier"
          label="Email or Mobile"
          placeholder="Enter email or mobile number"
          value={form.identifier}
          onChange={handleChange}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {form.identifier.includes("@") ? <Email /> : <Phone />}
              </InputAdornment>
            ),
          }}
          sx={styles.input}
        />

        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          type={showPassword ? "text" : "password"}
          name="password"
          label="Password"
          placeholder="Enter your password"
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

        <Typography
          variant="body2"
          sx={styles.forgotPassword}
          onClick={() => {
            /* Add forgot password functionality */
          }}
        >
          Forgot password?
        </Typography>

        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={isLoading}
          sx={styles.submitButton}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>

        <Divider sx={styles.divider}>or</Divider>

        <Button
          fullWidth
          variant="outlined"
          sx={styles.socialButton}
          startIcon={
            <Box
              component="img"
              src="/google-icon.png"
              sx={styles.socialIcon}
            />
          }
        >
          Continue with Google
        </Button>

        <Fade in={message.text !== ""}>
          <Alert severity={message.severity} sx={styles.alert}>
            {message.text}
          </Alert>
        </Fade>
      </Box>

      <Typography variant="body2" sx={styles.footer}>
        Don't have an account? <span style={styles.link}>Sign up</span>
      </Typography>
    </Box>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "450px",
    backgroundColor: "background.paper",
    borderRadius: "12px",
    padding: "32px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  },
  title: {
    fontWeight: "bold",
    color: "primary.main",
  },
  closeButton: {
    color: "text.secondary",
  },
  subtitle: {
    mb: 3,
  },
  form: {
    width: "100%",
  },
  input: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
    },
  },
  forgotPassword: {
    textAlign: "right",
    mt: 1,
    mb: 2,
    color: "primary.main",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  submitButton: {
    mt: 2,
    mb: 2,
    py: 1.5,
    borderRadius: "8px",
    textTransform: "none",
    fontSize: "1rem",
  },
  divider: {
    my: 3,
    color: "text.secondary",
  },
  socialButton: {
    mb: 2,
    py: 1.5,
    borderRadius: "8px",
    textTransform: "none",
    borderColor: "divider",
    color: "text.primary",
  },
  socialIcon: {
    width: "20px",
    height: "20px",
  },
  alert: {
    mb: 2,
  },
  footer: {
    textAlign: "center",
    mt: 2,
    color: "text.secondary",
  },
  link: {
    color: "primary.main",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login;
