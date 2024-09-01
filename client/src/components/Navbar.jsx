/** @jsxImportSource @emotion/react */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { css } from "@emotion/react";
import { useDispatch } from "react-redux";
import { changeComponent } from "../features/ComponentSlice";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const pages = ["Songs", "Upload"];
const settings = ["Favorites", "Uploads", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const cookie = new Cookies();
  const token = cookie.get("user_token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    cookie.remove("user_token");
    navigate("/signIn");
  };

  // Emotion CSS Styles
  const navLinkStyle = css`
    text-decoration: none;
    color: #fff;
  `;

  return (
    <AppBar position="static" sx={{ background: "#08192D" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src="/music icon.png" alt="music logo" css={logo} />
            ADDIS-MUSIX
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    dispatch(changeComponent(page));
                    handleCloseNavMenu();
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ADDIS-MUSIX
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleCloseUserMenu();

                  // Check if the page is "Upload"
                  if (page === "Upload") {
                    if (token === true && token !== "undefined") {
                      dispatch(changeComponent("Upload"));
                    } else {
                      alert(
                        "🎶 No login, No song upload! Let's get you in the groove! 🎤"
                      );
                      return;
                    }
                  } else {
                    dispatch(changeComponent(page));
                  }
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <p css={navLinkStyle}>{page}</p>
              </Button>
            ))}
          </Box>

          {token === true && token != "undefined" ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Profile" src="/Tumblr.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu();
                      if (setting === "Logout") {
                        handleLogout();
                      } else {
                        dispatch(changeComponent(setting));
                      }
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <a href="/signIn">
              <Button css={buttonStyle}>Sign In</Button>
            </a>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
const buttonStyle = css`
  position: relative;
  display: inline-block;
  padding: 7px 20px;
  background-color: #fd7019;
  color: #fff;
  border-radius: 7px;
  font-size: 16px;
  text-transform: uppercase;
  overflow: hidden;
  z-index: 1;
  cursor: pointer;
  transition: background-color 0.3s ease;
  transition: 0.8s ease;
  box-shadow: 1px -1px 10px 4px #fd7019;

  &:hover {
    box-shadow: 1px -1px 10px 4px #fff;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(to right, #ff0000, #ff7f00, #0000ff, #4b0082);
    border-radius: 8px;
    animation: scrollBorder 3s linear infinite;
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
    z-index: -1;
  }

  @keyframes scrollBorder {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
`;

const logo = css`
  width: 30px;
  margin-right: 10px;
`;
export default Navbar;
