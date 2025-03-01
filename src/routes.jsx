import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";
import { useNavigate, useLocation } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import GroupIcon from '@mui/icons-material/Group';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LogoutIcon from '@mui/icons-material/Logout';
import BusinessIcon from '@mui/icons-material/Business';
import AssessmentIcon from '@mui/icons-material/Assessment';
import "./App.css"

const drawerWidth = 280;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    display: "flex",
    margin: "0px",
    height: "100vh",
    justifyContent: 'start',
    boxSizing: "border-box",
    alignItems: 'start',
    backgroundColor: 'var(--primary-color)',
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);


export const ProtectedRoute = () => {
  const { isAuthenticated, loading, logout, user } = useAuth();

  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;

  const [currentPage, setCurrentPage] = useState(0)
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return <Box sx={{ display: 'flex' }}>

    <Drawer sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex', // Add Flexbox display
        flexDirection: 'column', // Set vertical direction
        justifyContent: 'space-between', // Justify content vertically
        background: "var(--secondary-color)",
      },
    }}
      variant="persistent"
      anchor="left"
      open={open}
      onClose={toggleDrawer(false)}>
      <div className="nav-wrapper">



        <div className="logo-hiddebtn">
          <img className="nav-logo" src="./logo_semillero_1.svg" alt="logo-semillero" />
          <IconButton onClick={toggleDrawer(false)} /* sx={{ border: '1px solid white' }} */>
            <ChevronLeftIcon sx={{ color: 'white' }} />
          </IconButton>
        </div>

        <div>
          <h3>
            SISTEMA PNSC
          </h3>

          <div className="separator">

          </div>
        </div>

        <div className="Navlinks">
          <button className={currentPage == 0? "selected-page" : ""} onClick={() => {navigate(`/schedule`); setCurrentPage(0)}}>
            <CalendarMonthIcon fontSize="small" />
            Programar Actividad
          </button>
          <button className={currentPage == 1? "selected-page" : ""} onClick={() => {navigate(`/visits`); setCurrentPage(1)}}>
            <DirectionsBusIcon fontSize="small" />
            Cargar Actividad
          </button>
          {
            user.role.role === 5 ?
              "" :
              <button className={currentPage == 2? "selected-page" : ""} onClick={() => {navigate(`/users`); setCurrentPage(2)}}>
                <GroupIcon fontSize="small" />
                Usuarios
              </button>
          }

          {
            user.role.role <= 2 ?
              <>
                <button className={currentPage == 3? "selected-page" : ""} onClick={() => {navigate(`/activities`); setCurrentPage(3)}}>
                  <LightbulbIcon fontSize="small" />
                  Categorías
                </button>
                <button className={currentPage == 4? "selected-page" : ""} onClick={() => {navigate(`/entity`); setCurrentPage(4)}}>
                  <BusinessIcon fontSize="small" />
                  Entes
                </button>
              </>
              : ""
          }

          <button className={currentPage == 5? "selected-page" : ""} onClick={() => {navigate(`/reports`); setCurrentPage(5)}}>
            <AssessmentIcon fontSize="small" />
            Reportes
          </button>
          <button  onClick={() => logout()}>
            <LogoutIcon fontSize="small" />
            Salir
          </button>
        </div>
      </div>

    </Drawer>
    <Main open={open} sx={{ display: 'flex', overflow: 'auto' }}>
      <Button onClick={toggleDrawer(true)} sx={{ ...(open && { display: 'none' }) }}>
        <MenuIcon />
      </Button>
      <div style={{ flexGrow: "1", backgroundColor: "var(--primary-color)", boxSizing: "border-box", height: "100vh" }}>
        <Outlet />
      </div>

    </Main>
  </Box>
};