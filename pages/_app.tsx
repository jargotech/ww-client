import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { AppProps } from "next/app";
import Layout from "../src/layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../src/theme";
import AuthContext from "../src/context/AuthContext";
import React, { useEffect, useState } from "react";

// const outerTheme = createTheme({
//   typography:{
//     fontFamily: 'SF Compact Display',
//   }
// });

function MyApp({ Component, pageProps }: AppProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [installButton, setInstallButton] = useState<any>(false);
  const [isIos, setIsIos] = useState<any>(true);
  const [hidePopup, setHidePopup] = useState<any>(false);

  const installApp = async () => {
    console.log("clicked");

    if (!installPrompt) return false;
    installPrompt.prompt();
    let outcome = await installPrompt.userChoice;
    if (outcome.outcome == "accepted") {
      console.log("App Installed");
    } else {
      console.log("App not installed");
    }
    // Remove the event reference
    setInstallPrompt(null);
    // Hide the button
    setInstallButton(false);
  };

  const hide = () => {
    setHidePopup(true);
  };

  // Effects
  useEffect(() => {
    console.log("Listening for Install prompt");
    window.addEventListener("beforeinstallprompt", (e) => {
      // For older browsers
      e.preventDefault();
      console.log("Install Prompt fired");
      setInstallPrompt(e);
      // See if the app is already installed, in that case, do nothing
      if (
        window.matchMedia &&
        window.matchMedia("(display-mode: standalone)").matches
      ) {
        return false;
      }
      // Set the state variable to make button visible
      setInstallButton(true);
    });
  }, []);

  useEffect(() => {
    if (window.navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
      setIsIos(true);
    } else {
      setIsIos(false);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
        <Layout>
          <Component {...pageProps} />
          {isIos ? (
            true ? (
              <div
                // className="add-to-home-screen"
                className={
                  !hidePopup ? "add-to-home-screen" : "add-to-home-screen hide"
                }
              >
                <button onClick={installApp} className="btn-secondary">
                  Add to Home Screen
                </button>
                <span
                  className="closebtn"
                  onClick={(e: any) => {
                    e.preventDefault();
                    hide();
                  }}
                >
                  &times;
                </span>
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </Layout>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
