'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Paper from '@mui/material/Paper';
import { Container, Row, Col } from 'react-bootstrap';
import { Select } from '@mui/material';
import { FormControl, FormGroup } from '@mui/material';
import { MenuItem } from '@mui/material';
import { InputLabel, TextField, Button, Snackbar, Alert } from '@mui/material';

export default function Add() {
    const [loading, setLoading] = useState(false);
    const [vendors, setVendors] = useState([]);
    const [bearingSizes, setBearingSizes] = useState([]); // Initialize as an empty array
    const [selectedVendor, setSelectedVendor] = useState('');
    const [selectedBearingSize, setSelectedBearingSize] = useState('');
    const [billrate, setBillRate] = useState('');
    const [rate, setRate] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await fetch('http://192.168.0.131:8000/vendors/Bearings');
                const data = await response.json();
                setVendors(data);
            } catch (error) {
                console.error('Error fetching vendors:', error);
                setVendors([]); // Ensure vendors is always an array
                handleError('Error fetching vendors');
            }
        };

        const fetchBearingSizes = async () => {
            try {
                const response = await fetch('http://192.168.0.131:8000/bearings/sizes');
                const data = await response.json();
                setBearingSizes(data); // Set bearingSizes to the fetched data array
            } catch (error) {
                console.error('Error fetching bearing sizes:', error);
                setBearingSizes([]); // Ensure bearingSizes is always an array
                handleError('Error fetching bearing sizes');
            }
        };

        fetchVendors();
        fetchBearingSizes();
    }, []);

    const handleError = (message) => {
        setError(message);
        setSuccess('');
        setOpen(true);
    };

    const handleSuccess = (message) => {
        setError('');
        setSuccess(message);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const addToInventory = async () => {
        if (!rate || !billrate) {
            handleError('Rate and Bill Rate fields are mandatory');
            return;
        }

        setLoading(true);

        try {
            const apiUrl = 'http://192.168.0.131:8000/bearings';
            const requestBody = {
                size: selectedBearingSize,
                vendor_name: selectedVendor,
                rate: parseFloat(rate),
                bill_rate: parseFloat(billrate),
            };

            console.log('Request Body:', requestBody); // Log the request body

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            };

            const response = await fetch(apiUrl, requestOptions);
            console.log('Response Status:', response.status); // Log the response status
            const responseData = await response.json();
            console.log('Response Data:', responseData); // Log the response data

            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to add bearing to inventory');
            }

            // Handle successful response
            handleSuccess('Bearing added to inventory successfully');
        } catch (error) {
            console.error('Error adding bearing to inventory:', error);
            handleError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" color='primary'>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        href="/"
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Add Bearings
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container className='p-5'>
                <Paper className='p-3 mt-5' elevation={5}>
                    <FormGroup>
                        <FormControl fullWidth>
                            <InputLabel id="bearing-size-label">Choose Bearing Size</InputLabel>
                            <Select
                                labelId="bearing-size-label"
                                id="bearing-size-select"
                                value={selectedBearingSize}
                                label="Choose Bearing Size"
                                onChange={(e) => setSelectedBearingSize(e.target.value)}
                            >
                                {bearingSizes.map((size) => (
                                    <MenuItem key={size} value={size}>{size}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className="mt-3">
                            <InputLabel id="vendor-label">Choose Vendor</InputLabel>
                            <Select
                                labelId="vendor-label"
                                id="vendor-select"
                                value={selectedVendor}
                                label="Choose Vendor"
                                onChange={(e) => setSelectedVendor(e.target.value)}
                            >
                                {vendors.map((vendor) => (
                                    <MenuItem key={vendor} value={vendor}>{vendor}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Container className='border mt-3'>
                            <h5 className='mt-2'>Add Cost</h5>
                            <Row className="col-sm-5">
                                <Col className="mt-3 mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Rate"
                                        variant="outlined"
                                        value={rate}
                                        onChange={(e) => setRate(e.target.value)}
                                    />
                                </Col>
                                <Col className="mt-3 mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Bill Rate"
                                        variant="outlined"
                                        value={billrate}
                                        onChange={(e) => setBillRate(e.target.value)}
                                    />
                                </Col>
                            </Row>
                        </Container>
                        <Button className='mb-2 mt-3' onClick={addToInventory} disabled={loading}>
                            Add To Inventory
                        </Button>
                    </FormGroup>
                </Paper>
            </Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={error ? "error" : "success"} sx={{ width: '100%' }}>
                    {error || success}
                </Alert>
            </Snackbar>
        </Box>
    );
}
