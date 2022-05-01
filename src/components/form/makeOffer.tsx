import React, { useEffect } from "react";
import { Alert } from "@mui/material";
import RupeeLogo from "../../../public/rupee.svg";
import Image from "next/image";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import NumberFormat from "react-number-format";
import { convertToNum, currencyFormatter } from "../../utils/currecyFormatter";
// import MaskedInput from 'react-text-mask'

export default function MakeOffer(props: any) {
  // States

  // Variable
  const { formik, carInfo, childtoParent } = props;
  const minPrice = carInfo[0]?.Car_Detail.minPrice;
  const maxPrice = carInfo[0]?.Car_Detail.maxPrice;

  // Function

  // const changeDisableButton = (value:any)=>{
  //     childtoParent(value);
  // }

  // Effects
  // useEffect(() => {
  //   childtoParent(formik.values.makeOffer);
  // }, [formik.values.makeOffer]);

  return (
    <div>
      <label htmlFor="">How much would you like to buy this car for</label>
      <div className="moneyFeild-group">
        <span>₹</span>
        <NumberFormat
          className="moneyFeild"
          name="makeOffer"
          value={formik.values.makeOffer}
          onChange={formik.handleChange}
          id="input-with-icon-adornment"
          placeholder={currencyFormatter(maxPrice?.toString())?.replace(
            "₹",
            ""
          )}
          thousandSeparator
          thousandsGroupStyle="lakh"
          isNumericString
        />
      </div>
      {/* {convertToNum(formik?.values?.makeOffer) !== 0 &&
      convertToNum(formik?.values?.makeOffer) ? (
        convertToNum(formik?.values?.makeOffer) > maxPrice &&
        convertToNum(formik?.values?.makeOffer) ? (
          <Alert
            sx={{
              display: "inline-flex",
              alignItems: "center",
              padding: "5px 10px",
              "& .MuiAlert-message": {
                padding: "5px 0px !important",
              },
            }}
            severity="info"
          >
            Overpriced, we&apos;ll not charge more.
          </Alert>
        ) : convertToNum(formik?.values?.makeOffer) == maxPrice &&
          convertToNum(formik?.values?.makeOffer) ? (
          <Alert
            sx={{
              display: "inline-flex",
              alignItems: "center",
              padding: "5px 10px",
              "& .MuiAlert-message": {
                padding: "5px 0px !important",
              },
            }}
            iconMapping={{
              success: <SentimentSatisfiedAltIcon fontSize="inherit" />,
            }}
          >
            High chance of acceptance!
          </Alert>
        ) : (
          // : convertToNum(formik?.values?.makeOffer) < minPrice &&
          //   convertToNum(formik?.values?.makeOffer) ? (
          //   <Alert
          //     severity="warning"
          //     sx={{
          //       display: "inline-flex",
          //       alignItems: "center",
          //       padding: "5px 10px",
          //       "& .MuiAlert-message": {
          //         padding: "5px 0px !important",
          //       },
          //     }}
          //     iconMapping={{
          //       warning: <SentimentVeryDissatisfiedIcon fontSize="inherit" />,
          //     }}
          //   >
          //     Oops! Too low offer.
          //   </Alert>
          // )
          <></>
        )
      ) : (
        <></>
      )} */}
    </div>
  );
}
