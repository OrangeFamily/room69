import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import s from './Header.module.scss'

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = open => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box sx={{ width: 250 }}>
      <List>
        <ListItem button component="a" href="https://misteram.com.ua/chernigov/orangebar" target="_blank" rel="noreferrer">
          <ListItemText primary="ДОСТАВКА" />
        </ListItem>
        <ListItem button component="a" href="tel:+380939179177">
          <ListItemText primary="+38 093 91 79 177" />
        </ListItem>
        <ListItem button component="a" href="https://www.instagram.com/room69.restaurant?igsh=NHp4Mnk4bWdycWp0" target="_blank" rel="noreferrer">
          <ListItemText primary="Instagram" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Логотип */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Restaurant Name
          </Typography>

          {/* Навігація для великих екранів */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Button
              color="inherit"
              href="https://misteram.com.ua/chernigov/orangebar"
              target="_blank"
              rel="noreferrer"
            >
              ДОСТАВКА
            </Button>
            <Button color="inherit" href="tel:+380939179177">
              +38 093 91 79 177
            </Button>
            <Button color="inherit" href="https://www.instagram.com/room69.restaurant?igsh=NHp4Mnk4bWdycWp0" 
              target="_blank" 
              rel="noreferrer" 
              className={s.link}>
                <img src={require('./img/inst.png')} alt="" className={s.icon} />
            </Button>
          </Box>

          {/* Іконка меню для мобільних */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer для мобільного меню */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Header;
