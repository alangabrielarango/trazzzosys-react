import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/authSlice';

const NavigationMenu: React.FC = () => {
  const [catalogsAnchorEl, setCatalogsAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [transactionsAnchorEl, setTransactionsAnchorEl] =
    useState<null | HTMLElement>(null);
  const username = useSelector((state: RootState) => state.auth.username);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/login');
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (
    setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>
  ) => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setCatalogsAnchorEl(null);
    setTransactionsAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 0, paddingRight: 2 }}
          onClick={() => handleNavigate('/')}
        >
          Trazzo S.A
        </Typography>
        {username ? (
          <Box sx={{ flexGrow: 1 }}>
            <Button
              color="inherit"
              onClick={(e) => handleMenuOpen(e, setCatalogsAnchorEl)}
              endIcon={<ArrowDropDownIcon />}
            >
              Catálogos
            </Button>
            <Menu
              anchorEl={catalogsAnchorEl}
              open={Boolean(catalogsAnchorEl)}
              onClose={() => handleMenuClose(setCatalogsAnchorEl)}
            >
              <MenuItem onClick={() => handleNavigate('/contactos')}>
                Contactos
              </MenuItem>
              <Divider/>
              <MenuItem onClick={() => handleNavigate('/empresas')}>
                Empresas
              </MenuItem>
              <MenuItem onClick={() => handleNavigate('/cuentas')}>
                Cuentas
              </MenuItem>
              <Divider/>
              <MenuItem onClick={() => handleNavigate('/categorias')}>
                Categorías
              </MenuItem>
              <MenuItem onClick={() => handleNavigate('/subcategorias')}>
                Subcategorías
              </MenuItem>
              <Divider/>
              <MenuItem onClick={() => handleNavigate('/usuarios')}>
                Usuarios
              </MenuItem>
            </Menu>

            <Button
              color="inherit"
              onClick={(e) => handleMenuOpen(e, setTransactionsAnchorEl)}
            >
              Transacciones
            </Button>
            <Menu
              anchorEl={transactionsAnchorEl}
              open={Boolean(transactionsAnchorEl)}
              onClose={() => handleMenuClose(setTransactionsAnchorEl)}
            >
              {/* Add submenu items for Transactions here */}
            </Menu>
          </Box>
        ) : null}
        {username ? (
          <>
            <Typography variant="h6" sx={{ paddingRight: 2 }}>
              {username}
            </Typography>
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{ marginLeft: 'auto' }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            color="inherit"
            onClick={() => handleNavigate('/login')}
            sx={{ marginLeft: 'auto' }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationMenu;
