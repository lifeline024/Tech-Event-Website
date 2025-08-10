import React, { useEffect, useState } from "react";
import axios from "axios";
import RegistrationForm from "../components/RegistrationForm";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Chip,
  Box,
  useTheme,
  useMediaQuery,
  Divider,
  TextField,
  InputAdornment,
  IconButton
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://tech-event-website.onrender.com/api/events");
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredEvents(events);
      return;
    }

    const filtered = events.filter(event => 
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.instructions && event.instructions.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (event.venue && event.venue.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (event.prizeMoney && event.prizeMoney.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  const formatDateTime = (dateTimeString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateTimeString).toLocaleDateString('en-US', options);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "80vh" 
      }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography 
        variant="h2" 
        component="h1" 
        gutterBottom 
        sx={{ 
          fontWeight: 800,
          textAlign: "center",
          mb: 6,
          color: theme.palette.primary.main,
          fontSize: isMobile ? '2.5rem' : '3rem',
          letterSpacing: '0.5px'
        }}
      >
        Upcoming Events
      </Typography>

      {/* Search Bar */}
      <Box sx={{ 
        maxWidth: 600,
        mx: 'auto',
        mb: 6,
        px: isMobile ? 2 : 0
      }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search events by name, venue, or prize..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={clearSearch} size="small">
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              borderRadius: '50px',
              backgroundColor: theme.palette.background.paper,
              boxShadow: theme.shadows[1],
              '&:hover': {
                boxShadow: theme.shadows[2]
              },
              '&.Mui-focused': {
                boxShadow: theme.shadows[3],
                backgroundColor: theme.palette.common.white
              }
            }
          }}
        />
      </Box>

      {filteredEvents.length === 0 ? (
        <Typography variant="h5" align="center" sx={{ py: 4 }}>
          {searchTerm ? 
            "No events match your search. Try different keywords." : 
            "No upcoming events at the moment. Please check back later!"}
        </Typography>
      ) : (
        <Grid 
          container 
          spacing={4} 
          justifyContent="center"
          sx={{ px: isMobile ? 0 : 4 }}
        >
          {filteredEvents.map((event) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              lg={3} 
              key={event._id}
              sx={{ 
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Card sx={{ 
                width: '100%',
                maxWidth: 350,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: "all 0.3s ease",
                '&:hover': {
                  transform: "translateY(-8px)",
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                }
              }}>
                {event.image && (
                  <Box position="relative" sx={{ overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={event.image}
                      alt={event.name}
                      sx={{
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    />
                    <Chip
                      label={`₹${event.entryFee}`}
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        fontWeight: "bold",
                        fontSize: '0.9rem',
                        px: 1.5,
                        py: 1,
                        borderRadius: '8px'
                      }}
                    />
                  </Box>
                )}
                
                <CardContent sx={{ 
                  flexGrow: 1,
                  px: 3,
                  py: 2.5
                }}>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: theme.palette.text.primary,
                      fontSize: '1.4rem',
                      lineHeight: 1.3
                    }}
                  >
                    {event.name}
                  </Typography>
                  
                  <Divider sx={{ my: 1.5 }} />
                  
                  <Box display="flex" alignItems="center" mb={1.5}>
                    <Typography 
                      variant="body2" 
                      sx={{
                        fontWeight: 500,
                        color: theme.palette.text.secondary
                      }}
                    >
                      <strong>Team Size:</strong> {event.teamSize}
                    </Typography>
                    {event.prizeMoney && (
                      <Chip 
                        label={`Prize: ${event.prizeMoney}`} 
                        size="small"
                        sx={{
                          backgroundColor: theme.palette.success.light,
                          color: theme.palette.success.contrastText,
                          ml: 1.5,
                          fontWeight: 600,
                          fontSize: '0.7rem'
                        }}
                      />
                    )}
                  </Box>
                  
                  <Box mb={1.5}>
                    <Typography 
                      variant="body2" 
                      sx={{
                        fontWeight: 500,
                        color: theme.palette.text.secondary
                      }}
                    >
                      <strong>When:</strong> {formatDateTime(event.dateTime)}
                    </Typography>
                  </Box>
                  
                  <Box mb={2}>
                    <Typography 
                      variant="body2" 
                      sx={{
                        fontWeight: 500,
                        color: theme.palette.text.secondary
                      }}
                    >
                      <strong>Where:</strong> {event.venue}
                    </Typography>
                  </Box>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      color: theme.palette.text.secondary,
                      fontSize: '0.9rem',
                      lineHeight: 1.6
                    }}
                  >
                    {event.instructions}
                  </Typography>
                </CardContent>
                
                <Box sx={{ 
                  p: 2.5, 
                  pt: 0,
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => setSelectedEvent(event)}
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      py: 1.5,
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      textTransform: 'none',
                      boxShadow: 'none',
                      '&:hover': {
                        boxShadow: `0 4px 12px ${theme.palette.primary.light}`,
                        transform: 'translateY(-1px)'
                      }
                    }}
                  >
                    Register Now
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={Boolean(selectedEvent)}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : '16px',
            overflow: 'hidden'
          }
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          {selectedEvent && (
            <RegistrationForm
              event={selectedEvent}
              onClose={handleCloseModal}
            />
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Events;
