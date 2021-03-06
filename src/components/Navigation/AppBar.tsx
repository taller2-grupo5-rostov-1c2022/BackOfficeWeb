import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { Menu as MenuIcon } from "@material-ui/icons";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { withAuthUser, useAuthUser } from "next-firebase-auth";
import { logOut } from "../../client/auth";
import styles from "./Nav.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

const NavLink = ({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const isActive = currentRoute.startsWith(url);

  return (
    <Link href={url}>
      <a className={styles.NavLink} aria-selected={isActive}>
        {children}
      </a>
    </Link>
  );
};

const ResponsiveAppBar = () => {
  const authUser = useAuthUser();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages = [
    {
      label: "Users",
      url: "/users/users",
    },
    {
      label: "Content",
      url: "/content/songs",
    },
    {
      label: "Payments",
      url: "/payments/transactions",
    },
    {
      label: "Metrics",
      url: "/metrics/users",
    },
  ];
  const settings = [
    {
      label: "Profile",
      url: "/users/user?uid=" + authUser?.id,
    },
    {
      label: "Logout",
      onClick: () => {
        console.log("Logout");
        logOut();
      },
    },
  ];

  if (!authUser?.id) return <></>;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/">
            <a>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                <Image src="/logo.png" alt="logo" width={50} height={50} />
              </Typography>
            </a>
          </Link>

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
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(({ label, url }, i) => (
                <MenuItem key={i} onClick={handleCloseNavMenu}>
                  <Link href={url}>
                    <a>
                      <Typography textAlign="center">{label}</Typography>
                    </a>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Image src="/logo.png" alt="logo" width={50} height={50} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ label, url }, i) => (
              <NavLink url={url} key={i}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 0, color: "white", display: "block" }}
                >
                  {label}
                </Button>
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={authUser?.displayName ?? "admin"}
                  src={authUser?.photoURL ?? ""}
                />
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
              {settings.map(({ label, onClick, url }, i) => (
                <MenuItem key={i} onClick={handleCloseUserMenu}>
                  {onClick ? (
                    <Typography textAlign="center" onClick={onClick}>
                      {label}
                    </Typography>
                  ) : (
                    <Link href={url}>
                      <a>
                        <Typography textAlign="center">{label}</Typography>
                      </a>
                    </Link>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default withAuthUser()(ResponsiveAppBar);
