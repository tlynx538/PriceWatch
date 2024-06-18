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

export default function add(){
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
                Add Bearings
            </Typography>
            </Toolbar>
        </AppBar>
        </Box>
    )
}