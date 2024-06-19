'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Paper from '@mui/material/Paper';
import { Container, Row, Col } from 'react-bootstrap';
import { FormControlLabel } from '@mui/material';
import {Select} from '@mui/material';
import {FormControl, FormGroup} from '@mui/material';
import {MenuItem} from '@mui/material';
import {InputLabel, Checkbox, TextField, Button} from '@mui/material';

export default function bearings() {
    const bearing_size = 0
    const handleChange = () => {
        console.log("Chosen value")
    }
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
                Fiberglass Wire and Sleeve
            </Typography>
            </Toolbar>
        </AppBar>

        <Container className='p-5'>
            <Paper className='p-3 mt-5' elevation={5}>
                <FormGroup>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose Product Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        //value={bearing_size}
                        label="Choose Product Type"
                        // onChange={handleChange}
                        >
                        <MenuItem value={"Wire"}>Wire</MenuItem>
                        <MenuItem value={"Slew"}>Sleeve</MenuItem>
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
                                            // value={bearing_size}
                                            label="Discount"
                                            // onChange={handleChange}
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
                                <TextField id="outlined-basic" label="Quantity" variant="outlined" />
                            </Col>
                        </Row>
                        <Button className='mb-2'>Calculate</Button>
                    </Container> 
                    <Container className='border mt-3 p-3'>
                            <Row>
                                <Col>
                                    <h6>Price</h6> 
                                    <h3>56</h3>
                                </Col>
                                <Col>
                                    <h6>Bill Rate</h6>
                                    <h3>54.60</h3>
                                </Col>
                            </Row>
                        </Container>
                </FormGroup>
            </Paper>
        </Container>
        </Box>
    )
}