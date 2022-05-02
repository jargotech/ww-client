/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AppleShareIcon from "../../public/apple-share-icon.svg";
import logo from "../../public/wishwheels-logo.svg";
import { useEffect } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function InstallPWAModel({ open, setOpen }: any) {
  // const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="add-to-home-screen-popup">
          <img src={logo.src} className="site-logo" alt="" />
          <h3>Install Wish Wheels</h3>
          <p>
            Install this application on your homescreen for a better experience.
          </p>
          <p className="text-small">
            Tap
            <img
              src={AppleShareIcon.src}
              className="share-icon-img"
              alt="Add to homescreen"
            />
            then &quot;Add to Home Screen&quot;
          </p>
          <button
            className="uk-button button-minimal"
            onClick={() => {
              localStorage.setItem("installPrompt", JSON.stringify(true));
              handleClose();
            }}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
