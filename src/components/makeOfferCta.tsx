/* eslint-disable @next/next/no-img-element */
import { Container } from "@mui/material";
import React, { useContext } from "react";
import SiteButton from "./Button";
import { useRouter } from "next/router";
import Fuel from "../../public/fuel.svg";
import Gauge from "../../public/gauge.svg";
import User from "../../public/user.svg";
import AuthContext from "../context/AuthContext";
import { currencyFormatter } from "../utils/currecyFormatter";

export default function MakeOfferCta({ carId, carData }: any) {
  // States

  // Variable
  const router = useRouter();

  // Context
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  // Function
  const makeOffer = () => {
    if (localStorage.getItem("jwt")) {
      setAuthenticated(false);
      router.push({
        pathname: "/book-car",
        query: { carId: carId },
      });
    } else {
      setAuthenticated(true);
    }
  };

  // Effects
  return (
    <div className="make-offer-cta">
      <Container maxWidth="lg">
        <div className="flex-container">
          <div className="car-description-detail">
            <h5>{(carData && carData?.name) || "-"}</h5>
            <div className="car-meta-deatil">
              <ul>
                <li>
                  <img src={Fuel.src} alt="fuel" />
                  <span>{(carData && carData?.fuelType) || "-"}</span>
                </li>
                <li>
                  <img src={Gauge.src} alt="km driven" />
                  <span>{(carData && carData?.kmDriven) || "-"}</span>
                </li>
                <li>
                  <img src={User.src} alt="ownership" />
                  <span>{(carData && carData?.ownerShip) || "-"}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="car-price-detail">
            <h4 className="car-price">
              {currencyFormatter(carData && carData?.maxPrice) || "-"}
            </h4>
            <SiteButton text="Make Offer" arrow={true} onClick={makeOffer} />
          </div>
        </div>
      </Container>
    </div>
  );
}
