'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, Col, Row } from 'react-bootstrap';
import { Card, CardActions, CardContent, CardMedia, Drawer, ListItem, ListItemText, List, ListItemButton, ListItemIcon, Divider } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

export default function Home () {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
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
                        onClick={toggleDrawer(true)}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        PriceWatch
                    </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    <List>
                        <ListItem>
                            <ListItemText>
                                <Typography className="fw-bold">
                                    Inventory Management
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Add/>
                                </ListItemIcon>
                                <ListItemText primary={"Add Item"}></ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ModeEditOutlineIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Update Existing Item"}></ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Close/>
                                </ListItemIcon>
                                <ListItemText primary={"Delete Item"}></ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemText>
                                <Typography className="fw-bold">
                                    Analytics
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                </Drawer>

                <Container className="overflow-auto mt-5">
                    <Col className='p-3'>
                        <Row className="p-1">
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 150 }}
                                    image="/assets/fiberglass.jpeg"
                                    title="fiberglass"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Fiberglass Wire and Sleeve
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Latest rates for fiberglass wires and sleeve
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" href="/fiberglass">View Rates</Button>
                                    <Button size="small" href="/fiberglass/add">Add Fiberglass Items</Button>
                                </CardActions>
                            </Card>
                        </Row>
                        <Row className="p-1">
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 150 }}
                                    image="/assets/bearings.jpeg"
                                    title="bearings"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Bearings
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Latest rates for bearings
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" href="/bearings">View Rates</Button>
                                    <Button size="small" href="/bearings/add">Add Bearings</Button>
                                </CardActions>
                            </Card>
                        </Row>
                        <Row className="p-1">
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 150 }}
                                    image="/assets/pumps.jpeg"
                                    title="motors"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Motors
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Latest rates for submersible motors
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" href="/motors">View Rates</Button>
                                </CardActions>
                            </Card>
                        </Row>
                        <Row className="p-1">
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image="/assets/capacitors.jpeg"
                                    title="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Capacitors
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Latest rate of capacitors
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" href="/capacitors">View Rates</Button>
                                </CardActions>
                            </Card>
                        </Row>
                        <Row className="p-1">
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image="/assets/triplexpapers.jpeg"
                                    title="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Triplex Paper
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Latest prices for triplex papers
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" href="/triplex">View Rates</Button>
                                </CardActions>
                            </Card>
                        </Row>
                    </Col>
                </Container>
        </Box>
    )
}