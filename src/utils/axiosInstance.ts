import axios from "axios";
import dayjs from "dayjs";
// import { APIURL } from "./constant";
// import { userJwtData, xAccessToken } from "./jwt";
import jwt_decode from "jwt-decode";
import { APIURL } from "../config/apiConfig";
import { userJwtData, xAccessToken } from "./getAccessToken";

let xAccessTokenKey = xAccessToken() && xAccessToken();
let userData: any = userJwtData() && userJwtData();
const axiosInstance = axios.create({
  baseURL: APIURL,
  headers: {
    "x-access-token": xAccessTokenKey,
  },
});

axiosInstance.interceptors.request.use(async (req: any) => {
  xAccessTokenKey = xAccessToken() && xAccessToken();
  req.headers["x-access-token"] = xAccessTokenKey;

  const user: any = xAccessTokenKey && jwt_decode(xAccessTokenKey);
  const isExpired = user && dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (isExpired) {
    console.log(userData);

    try {
      const refreshApiData = await axios.get(
        `${APIURL}/admin/refreshToken/${userData}`
      );
      if (!refreshApiData.data.error) {
        if (userData) {
          userData["accessToken"] = refreshApiData.data.data;
          localStorage.setItem("jwt", JSON.stringify(userData));
        }
      }
    } catch (error) {}
  }
  return req;
});

export default axiosInstance;
