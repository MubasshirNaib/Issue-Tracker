import React, { useState, useEffect } from "react";
import { editUserAtom, userAtom, personAtom } from "../Recoil/RecoilState";
import { useRecoilState } from "recoil";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import axios from "axios";

const CRUD = () => {
  const [users, setUsers] = useRecoilState(userAtom);
  const [person, setPerson] = useRecoilState(personAtom);
  const [open, setOpen] = useState(false);
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [Phone, setPhone] = useState("");
  const [userId, setUserId] = useState(null);
  const data = {
    userName: UserName,
    email: Email,
    userProfile: {
      address: Address,
      phone: Phone,
    },
  };
 
  const [isEditing, setIsEditing] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://localhost:7068/api/UserAPI");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Create a new user
  const handleCreateUser = async () => {
    try {
      console.log(data);
      await axios.post("https://localhost:7068/api/UserAPI", data);
      setOpen(false);
      fetchUsers();
      setSnackBarMessage("User created successfully!");
      setSnackBarOpen(true);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Update an existing user
  const handleUpdateUser = async () => {
    try {
      await axios.put(`https://localhost:7068/api/UserAPI/${userId}`, data);
      setPerson(data);
      setOpen(false);
      fetchUsers();
      setSnackBarMessage("User updated successfully!");
      setSnackBarOpen(true);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete a user
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://localhost:7068/api/UserAPI/${userId}`);
      fetchUsers();
      setSnackBarMessage("User deleted successfully!");
      setSnackBarOpen(true);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Open the dialog in create mode
  const handleCreateDialog = () => {
    //  setEditUser({ userId: '', userName: '', email: '' });
    setIsEditing(false);
    setOpen(true);
  };

  // Open the dialog in edit mode
  const handleEdit = (user) => {
    // setEditUser(user);
    setUserName(user.userName);
    setEmail(user.email);
    setAddress(user.userProfile.address);
    setPhone(user.userProfile.phone);
    setUserId(user.userId);
    setIsEditing(true);
    setOpen(true);
  };
 const handleGetPerson = async() =>{
    try {
        const response = await axios.get(`https://localhost:7068/api/UserAPI/${userId}`);

        setPerson(response.data);
        console.log(person);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
 }
  // Close the dialog
  const handleCloseDialog = () => {
    setOpen(false);
    setIsEditing(false);
    // setEditUser({ userId: '', userName: '', email: '' });
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    handleGetPerson();
  }, [userId,UserName,Email,Address,Phone]);
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleCreateDialog}>
        Add New User
      </Button>
      <div style={{ display: "flex", justifyContent: "center" }}>All Data</div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.userProfile.address}</TableCell>
                <TableCell>{user.userProfile.phone}</TableCell>

                <TableCell>
                  <Button color="primary" onClick={() => handleEdit(user)}>
                    Edit
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => handleDeleteUser(user.userId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: "flex", justifyContent: "center" }}>specific data Data</div>
      <TextField
            label="User Id"
            name="userId"
            value={userId}
            onChange={(e) => {
                setUserId(e.target.value);
            }}
            fullWidth
            margin="normal"
          />
          <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow key={person.userId}>
                <TableCell>{person.userId}</TableCell>
                <TableCell>{person.userName}</TableCell>
                <TableCell>{person.email}</TableCell>
                <TableCell>{person.userProfile?.address}</TableCell>
                <TableCell>{person.userProfile?.phone}</TableCell>

                <TableCell>
                  <Button color="primary" onClick={() => handleEdit(person)}>
                    Edit
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => handleDeleteUser(person.userId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* Dialog for creating or editing users */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? "Edit User" : "Create User"}</DialogTitle>
        <DialogContent>
          <TextField
            label="User Name"
            name="userName"
            value={UserName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={Email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={Address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            fullWidth
            margin="normal"
          />{" "}
          <TextField
            label="Phone"
            name="phone"
            value={Phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={isEditing ? handleUpdateUser : handleCreateUser}
            color="primary"
          >
            {isEditing ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for showing success or error messages */}
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackBarOpen(false)}
        message={snackBarMessage}
      />
    </div>
  );
};

export default CRUD;
