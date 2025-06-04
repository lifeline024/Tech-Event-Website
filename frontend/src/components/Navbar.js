import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthModal from './AuthModal';
import { 
  AppBar, Toolbar, Typography, Button, 
  IconButton, Menu, MenuItem, Box, 
  Avatar, Divider, Badge
} from '@mui/material';
import { 
  Menu as MenuIcon,
  AccountCircle,
  ExitToApp,
  Home,
  School,
  AdminPanelSettings,
  ContactMail,
  Notifications
} from '@mui/icons-material';

function Navbar() {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authtoken"));
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Sync auth state with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setAuthToken(localStorage.getItem("authtoken"));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    setAuthToken(null);
    handleMenuClose();
    navigate("/");
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
        <AccountCircle sx={{ mr: 1 }} /> My Profile
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ExitToApp sx={{ mr: 1 }} /> Logout
      </MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => { navigate('/'); handleMenuClose(); }}>
        <Home sx={{ mr: 1 }} /> Home
      </MenuItem>
      <MenuItem onClick={() => { navigate('/courses'); handleMenuClose(); }}>
        <School sx={{ mr: 1 }} /> Courses
      </MenuItem>
      {authToken && (
        <MenuItem onClick={() => { navigate('/adminpanel'); handleMenuClose(); }}>
          <AdminPanelSettings sx={{ mr: 1 }} /> Admin
        </MenuItem>
      )}
      <MenuItem onClick={() => { navigate('/contact'); handleMenuClose(); }}>
        <ContactMail sx={{ mr: 1 }} /> Contact
      </MenuItem>
      {!authToken ? (
        <MenuItem onClick={() => { setShowAuthModal(true); handleMenuClose(); }}>
          <AccountCircle sx={{ mr: 1 }} /> Login / Register
        </MenuItem>
      ) : (
        <MenuItem onClick={handleLogout}>
          <ExitToApp sx={{ mr: 1 }} /> Logout
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'background.paper', color: 'text.primary', boxShadow: 'none', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Left side - Brand and desktop nav */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Zenith
            </Typography>

            {/* Desktop Navigation - only visible on larger screens */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <Button
                component={Link}
                to="/"
                startIcon={<Home />}
                sx={{ color: location.pathname === '/' ? 'primary.main' : 'inherit' }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/courses"
                startIcon={<School />}
                sx={{ color: location.pathname === '/courses' ? 'primary.main' : 'inherit' }}
              >
                Courses
              </Button>
              {/* {authToken && (
                <Button
                  component={Link}
                  to="/adminpanel"
                  startIcon={<AdminPanelSettings />}
                  sx={{ color: location.pathname === '/adminpanel' ? 'primary.main' : 'inherit' }}
                >
                  Admin
                </Button>
              )} */}
              <Button
                component={Link}
                to="/contact"
                startIcon={<ContactMail />}
                sx={{ color: location.pathname === '/contact' ? 'primary.main' : 'inherit' }}
              >
                Contact
              </Button>
            </Box>
          </Box>

          {/* Right side - Auth and mobile menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {authToken && (
              <>
                {/* <IconButton size="large" color="inherit">
                  <Badge badgeContent={4} color="error">
                    <Notifications />
                  </Badge>
                </IconButton> */}
                <IconButton
  size="large"
  edge="end"
  aria-label="account of current user"
  aria-controls={menuId}
  aria-haspopup="true"
  onClick={handleProfileMenuOpen}
  color="inherit"
  sx={{ ml: 1 }}
>
  <Avatar
    alt="User"
    src="https://img.icons8.com/color/96/user-male-circle--v1.png"
    sx={{ width: 36, height: 36 }}
  />
</IconButton>
              </>
            )}

            {!authToken && (
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button
                  variant="outlined"
                  onClick={() => setShowAuthModal(true)}
                  startIcon={<AccountCircle />}
                  sx={{ ml: 1 }}
                >
                  Login / Register
                </Button>
              </Box>
            )}

            {/* Mobile menu button */}
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}

export default Navbar;