import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, TextField, 
  Select, MenuItem, Button, Dialog, 
  DialogActions, DialogContent, DialogTitle, 
  IconButton, CircularProgress, Snackbar, Alert 
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Save as SaveIcon, 
  Cancel as CancelIcon,
  Add as AddIcon
} from '@mui/icons-material';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    role: 'user',
    password: '',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const backendURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendURL}/api/users`);
      setUsers(res.data);
    } catch (error) {
      showSnackbar('Failed to fetch users', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleEditClick = (user) => {
    setEditingId(user._id);
    setFormData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      address: user.address || '',
      role: user.role,
      password: '',
    });
  };

  const handleAddClick = () => {
    setFormData({
      name: '',
      email: '',
      mobile: '',
      address: '',
      role: 'user',
      password: '',
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`${backendURL}/api/users/${id}`);
      showSnackbar('User deleted successfully');
      fetchUsers();
    } catch {
      showSnackbar('Delete failed', 'error');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${backendURL}/api/users/${editingId}`, formData);
        showSnackbar('User updated successfully');
      } else {
        await axios.post(`${backendURL}/api/users`, formData);
        showSnackbar('User added successfully');
      }
      setEditingId(null);
      setOpenDialog(false);
      fetchUsers();
    } catch (error) {
      showSnackbar(error.response?.data?.message || 'Operation failed', 'error');
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>User Management</h2>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleAddClick}
          style={styles.addButton}
        >
          Add User
        </Button>
      </div>

      {loading ? (
        <div style={styles.loading}>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper} style={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user._id} hover>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.mobile}</TableCell>
                  <TableCell>{user.address || '-'}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell align="center">
                    <IconButton 
                      color="primary" 
                      onClick={() => handleEditClick(user)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => handleDelete(user._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Edit Dialog */}
      <Dialog open={editingId !== null} onClose={() => setEditingId(null)}>
        <DialogTitle>Edit User</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent style={styles.dialogContent}>
            <TextField
              margin="dense"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              label="Mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
            />
            <Select
              margin="dense"
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
              style={styles.select}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
            <TextField
              margin="dense"
              label="New Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              helperText="Leave blank to keep current password"
            />
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setEditingId(null)} 
              color="secondary"
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              color="primary"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent style={styles.dialogContent}>
            <TextField
              margin="dense"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              label="Mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
            />
            <Select
              margin="dense"
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
              style={styles.select}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
            <TextField
              margin="dense"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setOpenDialog(false)} 
              color="secondary"
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              color="primary"
              startIcon={<SaveIcon />}
            >
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  title: {
    color: '#3f51b5',
    margin: 0,
  },
  addButton: {
    textTransform: 'none',
    borderRadius: '8px',
  },
  tableContainer: {
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: '40px',
  },
  dialogContent: {
    paddingTop: '8px',
    minWidth: '400px',
  },
  select: {
    marginTop: '16px',
    marginBottom: '8px',
  },
};

export default UserManagement;