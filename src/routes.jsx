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

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    display: "flex",
    height: "auto",
    justifyContent: 'start',
    alignItems: 'start',
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
        background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 25%, rgba(215,216,219,1) 27%, rgba(185,186,192,1) 30%)",
      },
    }}
      variant="persistent"
      anchor="left"
      open={open}
      onClose={toggleDrawer(false)}>
      <div>

        <IconButton onClick={toggleDrawer(false)}>
          <ChevronLeftIcon />
        </IconButton>

        <div>
          <img className="nav-logo" src="./logo_semillero_1.svg" alt="logo-semillero" />
        </div>

        <div className="Navlinks">
          <button className="navlink" onClick={() => navigate(`/schedule`)}>
            <CalendarMonthIcon fontSize="small" />
            Agendar Visita
          </button>
          <button onClick={() => navigate(`/visits`)}>
            <DirectionsBusIcon fontSize="small" />
            Actividades Realizadas
          </button>
          <button onClick={() => navigate(`/users`)}>
            <GroupIcon fontSize="small" />
            Usuarios
          </button>
          {
            user.role.role <= 2 ?
              <>
                <button onClick={() => navigate(`/activities`)}>
                  <LightbulbIcon fontSize="small" />
                  Actividades Lúdicas
                </button>
                <button onClick={() => navigate(`/entity`)}>
                  <BusinessIcon fontSize="small" />
                  Entes
                </button>
              </>
              : ""
          }

          <button onClick={() => navigate(`/reports`)}>
            <AssessmentIcon fontSize="small" />
            Reportes
          </button>
          <button onClick={() => logout()}>
            <LogoutIcon fontSize="small" />
            Salir
          </button>
        </div>
      </div>
      <div>
        <img className="navbar-img" src="inagenSB_Semillero__02.png" alt="navbar-img" />
      </div>
    </Drawer>
    <Main open={open}>
      <Button onClick={toggleDrawer(true)} sx={{ ...(open && { display: 'none' }) }}>
        <MenuIcon />
      </Button>
      <div style={{ flexGrow: "1" }}>
        <Outlet />
      </div>

    </Main>
  </Box>
};