import { styled } from "@mui/system";
import Autocomplete from "@mui/material/Autocomplete";
import { Chip } from "@mui/material";
import { TextField } from "@mui/material";

export const StyledAutoComplete = styled(Autocomplete)`
  border-radius: 4px 4px 0px 0px;
  & fieldset {
    border: none;
  }
  & input {
    color: #000 !important;
  }
  & input::placeholder {
    color: #000 !important;
  }
`;
export const StyledTextField = styled(TextField)`
  background: rgba(33, 33, 33, 0.08);
  border-radius: 4px 4px 0px 0px;
  & fieldset {
    border: none;
  }
  font-size: 16px;
  letter-spacing: 0.15px;
  input {
    color: #000 !important;
    // padding-right:0px !important;
    // padding-left:0px !important;
  }
  input::placeholder {
    color: #000 !important;
  }
`;

export const PrimaryChips = styled(Chip)`
  background: #640e27;
  padding: 5px 7px;
  font-family: var(--primary-font);
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;

  @media (max-width: 576px) {
    font-size: 12px;
  }

  & .MuiChip-deleteIcon {
    color: #fff !important;
    @media (max-width: 576px) {
      font-size: 16px;
    }
  }
`;
