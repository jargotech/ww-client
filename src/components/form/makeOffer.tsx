import React, { useEffect } from "react";
import {
  Alert,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import RupeeLogo from "../../../public/rupee.svg";
import Image from "next/image";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import NumberFormat from "react-number-format";
import { convertToNum } from "../../utils/currecyFormatter";
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
  useEffect(() => {
    childtoParent(formik.values.makeOffer);
  }, [formik.values.makeOffer]);

  return (
    <div>
      {/* <p>minPrice: {minPrice}</p> */}
      {/* <p>maxPrice: {maxPrice}</p> */}
      {/* <FormControl variant="standard"> */}
      {/* <InputLabel className="bold-label" htmlFor="input-with-icon-adornment">
                    How much would you like  to buy this car for
                </InputLabel> */}
      {/* <MaskedInput
                    // mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                    mask={[/[1-9]/, /\d/, ',', /\d/, /\d/, ',', /\d/, /\d/, /\d/]}
                    name="makeOffer"
                    value={formik.values.makeOffer}
                    onChange={formik.handleChange}
                    id="input-with-icon-adornment"
                    placeholder="59,00,000"
                startAdornment={
                    <InputAdornment position="start">
                        <Image src={RupeeLogo} width={10} height={16} alt="rupeelogo" />
                    </InputAdornment>
                }
                /> */}
      <label htmlFor="">How much would you like to buy this car for</label>
      <div className="moneyFeild-group">
        <span>₹</span>
        <NumberFormat
          className="moneyFeild"
          name="makeOffer"
          // type='number'
          value={formik.values.makeOffer}
          onChange={formik.handleChange}
          id="input-with-icon-adornment"
          placeholder="59,00,000"
          thousandSeparator
          thousandsGroupStyle="lakh"
          isNumericString
        />
      </div>

      {/* {convertToNum(formik.values.makeOffer)} */}
      {/* <Input
                    name="makeOffer"
                    type='number'
                    value={formik.values.makeOffer}
                    onChange={formik.handleChange}
                    id="input-with-icon-adornment"
                    placeholder="59,00,000"
                    startAdornment={
                        <InputAdornment position="start">
                            <Image src={RupeeLogo} width={10} height={16} alt="rupeelogo" />
                        </InputAdornment>
                    }
                /> */}

      {/* </FormControl> */}
      {convertToNum(formik?.values?.makeOffer) !== 0 &&
      convertToNum(formik?.values?.makeOffer) ? (
        convertToNum(formik?.values?.makeOffer) > maxPrice &&
        convertToNum(formik?.values?.makeOffer) ? (
          // <p className="success-text">Overpriced, we&apos;ll not charge more.</p>
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
        ) : convertToNum(formik?.values?.makeOffer) >= minPrice &&
          convertToNum(formik?.values?.makeOffer) ? (
          // <p className="success-text">Good Deal</p>

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
        ) : convertToNum(formik?.values?.makeOffer) < minPrice &&
          convertToNum(formik?.values?.makeOffer) ? (
          // <p className="error-text">Oops! Too low offer.</p>
          <Alert
            severity="warning"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              padding: "5px 10px",
              "& .MuiAlert-message": {
                padding: "5px 0px !important",
              },
            }}
            iconMapping={{
              warning: <SentimentVeryDissatisfiedIcon fontSize="inherit" />,
            }}
          >
            Oops! Too low offer.
          </Alert>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </div>
  );
}
