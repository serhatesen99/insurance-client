import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";

const NavScrollExample = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#FFFFFF" }}>
      <Container>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#000000",
              marginRight: "20px",
            }}
          >
            Anlaşmalı Kurumlar
          </Typography>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#000000",
              marginRight: "20px",
            }}
          >
            Hasar İşlemleri
          </Typography>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#000000",
              marginRight: "20px",
            }}
          >
            İletişim
          </Typography>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#000000",
              marginRight: "20px",
            }}
          >
            Seninle Güzel Blog
          </Typography>
          <Button component={Link} to="/teklifAl" sx={{ color: "#000000" }}>
            Teklif Al
          </Button>
          <Button sx={{ color: "#000000" }} onClick={handleClick}>
            Ürünler
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/" onClick={handleClose}>
              Tamamlayıcı Sağlık Sigortası
            </MenuItem>
            <MenuItem component={Link} to="/" onClick={handleClose}>
              Bireysel Emeklilik Sigortası
            </MenuItem>
            <MenuItem component={Link} to="/" onClick={handleClose}>
              Dijital Doktorum
            </MenuItem>
            <MenuItem component={Link} to="/" onClick={handleClose}>
              Kasko Sigortası
            </MenuItem>
            <MenuItem component={Link} to="/" onClick={handleClose}>
              Trafik Sigortası
            </MenuItem>
            <MenuItem component={Link} to="/" onClick={handleClose}>
              Dask Sigortası
            </MenuItem>
            <MenuItem component={Link} to="/teklifAl" onClick={handleClose}>
              Seyahat Sağlık Sigortası
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavScrollExample;
