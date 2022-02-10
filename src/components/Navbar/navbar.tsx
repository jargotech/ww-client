/* eslint-disable react-hooks/exhaustive-deps */
import {
  Container,
  Chip,
  Avatar,
  Box,
  Modal,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Logo from "../../../public/wishwheels-logo.svg";
import Link from "next/link";
import { LocationChip } from "../Navbar/navbarElement";
import { useRouter } from "next/router";
import Authenticate from "../authenticate/authenticate";
import OtpAuthentication from "../authenticate/otp-authentication";
import { OtpService } from "../../services/user/otpService";
import { AuthenticationService } from "../../services/user/authenticationService";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import AuthContext from "../../context/AuthContext";

export default function Navbar() {
  // State
  const [isActive, setIsActive] = useState(false);
  const [navbarScroll, setNavbarScroll] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState<any>();
  const [verifedOtp, setVerifedOtp] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [jwt, setJwt] = useLocalStorage("jwt", null);

  // Context
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  // Variable
  const router = useRouter();
  const otpService = new OtpService();
  const authenticationService = new AuthenticationService();
  const accountMenu = Boolean(anchorEl);

  // functions
  const handleSidebar = () => {
    setIsActive(!isActive);
    if (!isActive) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  };
  const ScrollBackground = () => {
    // console.log(window.scrollY);
    if (window.scrollY >= 85) {
      setNavbarScroll(true);
    } else {
      setNavbarScroll(false);
    }
  };
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  // const handleOpen = () => setOpen(true);
  const handleOpen = () => {
    setAuthenticated(true);
    setOpen(true);
  };
  const handleClose = () => {
    setAuthenticated(false);
    setOpen(false);
  };

  const _generateOtp = (payload: any) => {
    const generateOtpData = otpService.generateOtp(payload);
    generateOtpData.then((res: any) => {
      if (res.status == 200) {
        console.log(res?.data?.data);
        console.log(res?.data?.message);
      }
    });
  };
  const _verifyOtp = (otp: any, loggedInData: any) => {
    const payload = {
      emailId: loggedInData.emailId,
      otp: otp,
    };
    const userSingInData = {
      phoneNumber: loggedInData.phoneNumber,
    };
    const verifyOtpData = otpService.verifyOtp(payload);
    verifyOtpData.then((res: any) => {
      if (res.status == 200) {
        console.log(res?.data?.message);
        if (res?.data?.message == "OTP Verifed") {
          _userSignIn(userSingInData);
          setVerifedOtp(true);
          // console.log(userSingInData);
        }
      }
    });
  };
  const _userSignIn = (payload: any) => {
    const userSingInData = authenticationService.userSignIn(payload);
    userSingInData.then((res: any) => {
      if (res.status == 200) {
        const jwtData = {
          firstName: res?.data?.firstName,
          userId: res?.data?.id,
          accessToken: res?.data?.accessToken,
        };
        // localStorage.setItem('jwt', JSON.stringify(jwtData));
        setJwt(jwtData);
        console.log(jwtData);
        // let userNameData = JSON.parse(localStorage.getItem('jwt') || '')
        // setUserName(userNameData.firstName)
        console.log();
        // setLoggedIn(true);
        handleClose();
      }
    });
  };

  const _userSignUp = (payload: any) => {
    const userSingInData = authenticationService.userSignUp(payload);
    userSingInData.then((res: any) => {
      // if (!res.data.error) {
      //     console.log(res.data.data);
      // }
      if (res.data.message != "Invalid") {
        console.log(res.data.data);
      } else {
        return "error";
      }
    });
  };

  const verifyAuth = () => {
    if (localStorage.getItem("jwt")) {
      // go to your dashboard or home route
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    // stay on this route since the user is not authenticated
  };

  const sellcar = () => {
    if (localStorage.getItem("jwt")) {
      // setAuthenticated(false);
      router.push({
        pathname: "/sell-car",
      });
    } else {
      // setAuthenticated(true);
    }
    router.push({
      pathname: "/sell-car",
    });
  };
  const accountMenuHandleClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const accountMenuHandleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandle = () => {
    // localStorage.setItem('jwt', 'null')
    setJwt(null);
    setAnchorEl(null);
  };

  const displayUserName = () => {
    let userName = localStorage.getItem("jwt");
    if (userName) {
      return JSON.parse(userName)?.firstName;
    } else {
      return "";
    }
  };

  // UseEffect
  useEffect(() => {
    ScrollBackground();
    window.addEventListener("scroll", ScrollBackground);
    verifyAuth();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      console.log(userName);
    }
  }, [loggedIn]);

  useEffect(() => {
    verifyAuth();
  }, [jwt]);

  return (
    <>
      <div className={isActive ? "backdrop" : ""}></div>
      <header
        id="header"
        className={
          navbarScroll
            ? "site-header is-active"
            : router.pathname == "/404"
            ? "site-header fixed"
            : "site-header"
        }
      >
        <Container maxWidth="lg">
          <div className="site-header-wrapper">
            <Link href="/">
              <a className="site-brand">
                <Image src={Logo} alt="siteLogo" width={50} height={50} />
                <h1>Wish Wheels</h1>
              </a>
            </Link>

            <div className="flex-box">
              <button
                className={
                  isActive ? "btn-nav-toggler is-active" : "btn-nav-toggler"
                }
                onClick={handleSidebar}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              <div
                className={
                  isActive
                    ? "header-links-wrapper is-active"
                    : "header-links-wrapper"
                }
              >
                <nav className="site-nav">
                  <ul className="list-style-none">
                    <li>
                      <a
                        onClick={sellcar}
                        className={
                          router.pathname == "/sell-car" ? "is-active" : ""
                        }
                      >
                        Sell Car
                        {/* {JSON.stringify(authenticated)} */}
                      </a>
                    </li>
                    <li>
                      <Link href="/car-collection">
                        <a
                          className={
                            router.pathname == "/car-collection"
                              ? "is-active"
                              : ""
                          }
                        >
                          Buy Car
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq">
                        <a
                          className={
                            router.pathname == "/faq" ? "is-active" : ""
                          }
                        >
                          FAQ
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/about-us">
                        <a
                          className={
                            router.pathname == "/about-us" ? "is-active" : ""
                          }
                        >
                          About Us
                        </a>
                      </Link>
                    </li>
                    <li></li>
                  </ul>
                </nav>
              </div>
              {loggedIn && loggedIn ? (
                <Box>
                  <IconButton onClick={accountMenuHandleClick}>
                    <Avatar
                      sx={{
                        bgcolor: "orange",
                        textTransform: "uppercase",
                      }}
                      alt={displayUserName()}
                      src="/broken-image.jpg"
                    />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={accountMenu}
                    onClose={accountMenuHandleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={accountMenuHandleClose}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={accountMenuHandleClose}>
                      My account
                    </MenuItem>
                    <MenuItem onClick={logoutHandle}>Logout</MenuItem>
                  </Menu>
                </Box>
              ) : (
                <IconButton onClick={handleOpen}>
                  <Avatar src="/broken-image.jpg" />
                </IconButton>
              )}
            </div>
          </div>
        </Container>
      </header>
      <Modal
        open={authenticated}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="authenticate-wrapper">
          <Authenticate
            generateOtp={_generateOtp}
            verifyOtp={_verifyOtp}
            userSignIn={_userSignIn}
            userSingUp={_userSignUp}
          />
        </Box>
      </Modal>
    </>
  );
}
