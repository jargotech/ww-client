// export const xAccessToken = typeof window !== 'undefined' ? JSON.stringify(localStorage.getItem('jwt')) : null ;
// export const xAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxN2FkZjRiNGUwMzhmYjg5MjczZjZlMyIsImlhdCI6MTYzOTY3NjM1NiwiZXhwIjoxNjM5NzYyNzU2fQ.B4iW-0dhRyx-F5jtVNsVJq98shXb0-BX3nf_eJ_0PSs" ;
export const xAccessToken = (): string => {
  let user = "";
  let token = "";
  if (typeof window !== "undefined") {
    if (localStorage) {
      user = localStorage.getItem("jwt") || "";
      console.log(user);

      if (user) {
        token = JSON.parse(user).accessToken;
      }
    }
    console.log(token);
  }
  return token;
};

export const userJwtData = (): string => {
  let user = "";
  let data: any = "";
  if (typeof window !== "undefined") {
    if (localStorage) {
      user = localStorage.getItem("jwt") || "";
      if (user) {
        data = JSON.parse(user).id;
      }
    }
  }

  return data;
};
