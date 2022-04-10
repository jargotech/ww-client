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
  Alert,
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
import CloseIcon from "@mui/icons-material/Close";

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
  const [authenticationError, setAuthenticationError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [otpModal, setOptModal] = useState(false);
  const [sendOtp, setSendOtp] = useState<any>();
  const [closeNavbar, setCloseNavbar] = useState<any>(false);
  const [succesLoggedIn, setSuccessLoggedIn] = useState<any>(false);

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

  const closeMenu = () => {
    setIsActive(false);
    document.body.classList.remove("overflow-hidden");
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
    setSendOtp(null);
    setAuthenticationError(null);
  };
  const handleClose = () => {
    setAuthenticated(false);
    setOpen(false);
    setSendOtp(null);
    setAuthenticationError(null);
  };

  // This Function if for generating otp
  const _userSignUp = async (payload: any) => {
    setSendOtp(null);
    setLoading(true);
    try {
      const signUpApiCall = await authenticationService.userSignUp(payload);
      if (!signUpApiCall.data.error) {
        // const signUpData = {
        //   userData: payload?.emailId,
        // };
        console.log(signUpApiCall.data);
        // _generateOtp(signUpData);
        setSendOtp("true");
        setLoading(false);
      } else {
        setAuthenticationError(signUpApiCall.data.message);
        setLoading(false);
        setSendOtp(null);
      }
    } catch (error: any) {
      console.log(error);
      console.log(error?.request);
      let errorResponse = JSON.parse(error?.request?.response);
      console.log(errorResponse?.message);
      setAuthenticationError(errorResponse?.message);
      setLoading(false);
      setSendOtp(null);
    }
  };

  const _generateOtp = async (payload: any) => {
    setOptModal(false);
    setLoading(true);
    try {
      const generateOtpData = await otpService.generateOtp(payload);
      console.log(generateOtpData);
      if (!generateOtpData?.data?.error) {
        setOptModal(true);
        setLoading(false);
      } else {
        setOptModal(false);
        setAuthenticationError(generateOtpData?.data?.error);
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error?.request);
      let errorResponse = JSON.parse(error?.request?.response);
      console.log(errorResponse?.message);
      setAuthenticationError(errorResponse?.message);
      setLoading(false);
      setOptModal(false);
    }
  };

  // This Funtion is for verify otp
  const _verifyOtp = async (otp: any, loggedInData: any) => {
    setLoading(true);
    const payload = {
      userData: loggedInData?.userData,
      otp: otp,
    };
    try {
      const verifyOtpApiCall = await otpService.verifyOtp(payload);
      setSuccessLoggedIn(false);
      if (!verifyOtpApiCall.data.error) {
        console.log(verifyOtpApiCall);
        setJwt(verifyOtpApiCall.data.data);
        setOptModal(false);
        handleClose();
        setLoading(false);
        setSuccessLoggedIn(true);
      } else {
        setAuthenticationError(verifyOtpApiCall.data.message);
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      console.log(error?.request);
      let errorResponse = JSON.parse(error?.request?.response);
      console.log(errorResponse?.message);
      setAuthenticationError(errorResponse?.message);
      setLoading(false);
    }
    setTimeout(() => {
      setSuccessLoggedIn(false);
    }, 3000);
  };

  const verifyAuth = () => {
    if (localStorage.getItem("jwt")) {
      // go to your dashboard or home route
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      checkThePageIsRistricated();
    }
    // stay on this route since the user is not authenticated
  };

  const sellcar = () => {
    if (localStorage.getItem("jwt")) {
      setAuthenticated(false);
      router.push({
        pathname: "/sell-car",
      });
      closeMenu();
      // console.log("closing...");
    } else {
      setAuthenticated(true);
    }
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

  const checkThePageIsRistricated = () => {
    if (router.pathname == "/sell-car") {
      router.push("/");
    }
    if (router.pathname == "/book-car") {
      router.push("/");
    }
    if (router.pathname == "/history") {
      router.push("/");
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
      {succesLoggedIn && (
        <Alert
          className="success-login-popup"
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSuccessLoggedIn(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          You have successfully logged.
        </Alert>
      )}

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
                    : closeNavbar
                    ? "header-links-wrapper close-navbar"
                    : "header-links-wrapper"
                }
              >
                <nav className="site-nav">
                  <ul className="list-style-none">
                    <li>
                      <a
                        onClick={sellcar}
                        className={
                          router.pathname == "/sell-car"
                            ? "cursor-pointer is-active "
                            : "cursor-pointer"
                        }
                      >
                        Sell Car
                        {/* {JSON.stringify(authenticated)} */}
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          router.push({
                            pathname: "/car-collection",
                          });
                          closeMenu();
                        }}
                        className={
                          router.pathname == "/car-collection"
                            ? "cursor-pointer is-active"
                            : "cursor-pointer"
                        }
                      >
                        Buy Car
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          router.push({
                            pathname: "/faq",
                          });
                          closeMenu();
                        }}
                        className={
                          router.pathname == "/faq"
                            ? "cursor-pointer is-active"
                            : "cursor-pointer"
                        }
                      >
                        FAQ
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          router.push({
                            pathname: "/about-us",
                          });
                          closeMenu();
                        }}
                        className={
                          router.pathname == "/about-us"
                            ? "cursor-pointer is-active"
                            : "cursor-pointer"
                        }
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          router.push({
                            pathname: "/contact-us",
                          });
                          closeMenu();
                        }}
                        className={
                          router.pathname == "/contact-us"
                            ? "cursor-pointer is-active"
                            : "cursor-pointer"
                        }
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              {loggedIn && loggedIn ? (
                <Box>
                  <IconButton onClick={accountMenuHandleClick}>
                    <Avatar
                      className="name-avatar"
                      title={displayUserName()}
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
                    <MenuItem
                      onClick={() => {
                        router.push("/history");
                        setAnchorEl(null);
                      }}
                    >
                      History
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
            userSignUp={_userSignUp}
            generateOtp={_generateOtp}
            verifyOtp={_verifyOtp}
            authenticationError={authenticationError}
            setAuthenticationError={setAuthenticationError}
            loading={loading}
            otpModal={otpModal}
            sendOtp={sendOtp}
          />
        </Box>
      </Modal>
    </>
  );
}
