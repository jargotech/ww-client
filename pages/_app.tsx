import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { AppProps } from "next/app";
import Layout from "../src/layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../src/theme";
import AuthContext from "../src/context/AuthContext";
import React, { useEffect, useState } from "react";
import useIsIOS from "../src/hooks/useIsIos";
import InstallPWAModel from "../src/hooks/installPWA";
import Script from "next/script";

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
  const [openModel, setOpenModel] = useState<any>(false);

  // Variables
  // const { prompt, isIOS } = useIsIOS();
  const hide = () => {
    setHidePopup(true);
  };

  // Effects
  // useEffect(() => {
  //   console.log("Listening for Install prompt");
  //   window.addEventListener("beforeinstallprompt", (e) => {
  //     // For older browsers
  //     e.preventDefault();
  //     console.log("Install Prompt fired");
  //     setInstallPrompt(e);
  //     // See if the app is already installed, in that case, do nothing
  //     if (
  //       window.matchMedia &&
  //       window.matchMedia("(display-mode: standalone)").matches
  //     ) {
  //       return false;
  //     }
  //     // Set the state variable to make button visible
  //     setInstallButton(true);
  //   });
  // }, []);

  useEffect(() => {
    let installed = localStorage.getItem("installPrompt");
    console.log(installed);
    if (installed === "true") {
      setIsIos(false);
    } else if (window.navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
      setIsIos(true);
    } else {
      setIsIos(false);
    }
  }, []);

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id="googleAnalytic" strategy="lazyOnload">
        {`
window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-SM7H9X2PXT');
                `}
      </Script>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
          <Layout>
            <Component {...pageProps} />
            {isIos && (
              <div
                // className="add-to-home-screen"
                className={
                  !hidePopup ? "add-to-home-screen" : "add-to-home-screen hide"
                }
              >
                <button
                  onClick={() => setOpenModel(true)}
                  className="btn-secondary"
                >
                  Add to Home Screen
                </button>
                <span
                  className="closebtn"
                  onClick={(e: any) => {
                    e.preventDefault();
                    localStorage.setItem("installPrompt", JSON.stringify(true));
                    hide();
                  }}
                >
                  &times;
                </span>
                <InstallPWAModel open={openModel} setOpen={setOpenModel} />
              </div>
            )}
          </Layout>
        </AuthContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
