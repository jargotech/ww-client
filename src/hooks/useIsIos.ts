import { add } from "date-fns";
import moment from "moment";
import React, { useState, useEffect } from "react";

export default function useIsIOS() {
  // States
  const [isIOS, setIsIOS] = useState<any>({});

  //   Variables

  //   Functions
  const checkForIOS = () => {
    let wn: any;
    wn = window.navigator;
    if (wn.standalone) {
      return false;
    }
    const today = moment().add(1, "days").toDate();
    const lastPrompt = moment(localStorage.getItem("installPrompt"));
    const days = moment(today).diff(lastPrompt, "days");
    const ua = window.navigator.userAgent;
    const isIPad = !!ua.match(/iPad/i);
    const isIPhone = !!ua.match(/iPhone/i);
    const isIOS = isIPad || isIPhone;
    // const isSafari = isIOS && webkit && !ua.match(/CriOS/i);
    const prompt = (isNaN(days) || days > 30) && isIOS;
    if (prompt && "localStorage" in window) {
      localStorage.setItem("installPrompt", JSON.stringify(today));
    }

    return { isIOS, prompt };
  };

  useEffect(() => {
    setIsIOS(checkForIOS());
    // return () => console.log("CLEANUP INSTALL PROMPT", isIOS);
  }, []);

  return isIOS;
}
