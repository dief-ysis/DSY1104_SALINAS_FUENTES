import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  MenuItem,
  Badge
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const pages = [
  { name: 'Inicio', path: '/' },
  { name: 'Productos', path: '/productos' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contacto', path: '/contacto' }
];

const Navigation = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleNavigate = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate('/');
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo - Versión desktop */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            HUERTO HOGAR
          </Typography>

          {/* Menú móvil */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.path} onClick={() => handleNavigate(page.path)}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo - Versión móvil */}
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            HUERTO HOGAR
          </Typography>

          {/* Menú desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.path}
                onClick={() => handleNavigate(page.path)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Carrito y perfil */}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton 
              color="inherit" 
              onClick={() => navigate('/carrito')}
              sx={{ mr: 2 }}
            >
              <Badge badgeContent={cartItemsCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {user ? (
              <>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.name} src="/static/images/avatar/2.jpg" />
                </IconButton>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Cerrar sesión</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                color="inherit"
                onClick={() => navigate('/login')}
              >
                Iniciar sesión
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;