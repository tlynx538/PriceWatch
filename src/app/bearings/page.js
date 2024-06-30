'use client'
import * as React from 'react';
import {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Paper from '@mui/material/Paper';
import {Container, Row, Col } from 'react-bootstrap';
import {Select} from '@mui/material';
import {FormControl, FormGroup} from '@mui/material';
import {MenuItem} from '@mui/material';
import {InputLabel,TextField, Button} from '@mui/material';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@mui/material'


export default function Bearings() {
    const [loading, setLoading] = useState(false);
    const [vendors, setVendors] = useState([]);
    const [bearingSizes, setBearingSizes] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState('');
    const [selectedBearingSize, setSelectedBearingSize] = useState('');
    const [bearingData, setBearingData] = useState(null);
    const [discount, setDiscount] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await fetch('http://192.168.0.131:8000/vendors/Bearings');
                const data = await response.json();
                setVendors(data);
            } catch (error) {
                console.error('Error fetching vendors:', error);
                setVendors([]); // Ensure vendors is always an array
            }
        };

        const fetchBearingSizes = async () => {
            try {
                const response = await fetch('http://192.168.0.131:8000/bearings/sizes');
                const data = await response.json();
                setBearingSizes(data);
            } catch (error) {
                console.error('Error fetching bearing sizes:', error);
                setBearingSizes([]); // Ensure bearingSizes is always an array
            }
        };

        fetchVendors();
        fetchBearingSizes();
    }, []);


    const calculate = async () => {
        setLoading(true);

        try {
            const apiUrl = `http://192.168.0.131:8000/bearings/${selectedBearingSize}/${selectedVendor}`;
            const requestOptions = {
                method: 'GET', 
                headers: { 'Content-Type': 'application/json' },
            };

            const response = await fetch(apiUrl, requestOptions);
            const responseData = await response.json();
            console.log(responseData[0]);

            let finalRate = responseData[0].rate;
            let finalBillRate = responseData[0].bill_rate;

            if (quantity > 0) {
                finalRate *= quantity;
                //finalBillRate *= quantity;
            }

            if (discount > 0) {
                finalRate -= (finalRate * discount / 100);
                //finalBillRate -= (finalBillRate * discount / 100);
            }

            setBearingData({
                responseData,
                finalRate,
                finalBillRate
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    return(
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
            <ArrowBackIcon/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Bearings
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
                        <h5 className='mt-2'>Cost Calculator</h5>
                        <Row>
                            <Col className="mt-3 mb-3">
                                <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label-discount">Discount</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label-discount"
                                            id="demo-simple-select-discount"
                                            value={discount}
                                            label="Discount"
                                            onChange={(e) => setDiscount(e.target.value)}
                                            >
                                            <MenuItem value={0}>0</MenuItem>
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={20}>20</MenuItem>
                                            <MenuItem value={25}>25</MenuItem>
                                            <MenuItem value={30}>30</MenuItem>
                                            <MenuItem value={35}>35</MenuItem>
                                            <MenuItem value={40}>40</MenuItem>
                                        </Select>
                                </FormControl>
                            </Col>
                            <Col className="mt-3 mb-3">
                                <TextField
                                    id="outlined-basic"
                                    label="Quantity"
                                    variant="outlined"
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value ? parseInt(e.target.value) : 1)}
                                />
                            </Col>
                        </Row>
                        <Button className='mb-2' onClick={calculate} disabled={loading}>Calculate</Button>
                    </Container> 
                    {bearingData && (
                        <Container className='border mt-3 p-3'>
                            <Row>
                            <Col>
                                <h6>Price</h6>
                                <h3>{bearingData.finalRate}</h3>
                            </Col>
                            <Col>
                                <h6>Bill Rate</h6>
                                <h3>{bearingData.finalBillRate}</h3>
                            </Col>
                            </Row>
                            <Row className="overflow mt-3 border">
                                <h5 className='mt-2'>Historical Prices</h5>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650}} aria-label="Simple-Table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Size</TableCell>
                                            <TableCell align="right">Rate</TableCell>
                                            <TableCell align="right">Bill Rate</TableCell>
                                            <TableCell align="right">Date Added</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {bearingData.responseData.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="right">{row.size}</TableCell>
                                            <TableCell align="right">{row.rate}</TableCell>
                                            <TableCell align="right">{row.bill_rate}</TableCell>
                                            <TableCell align="right">{row.date_added}</TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                </TableContainer>
                            </Row>
                        </Container>
                    )}
                </FormGroup>
            </Paper>
        </Container>
        </Box>
    )
}