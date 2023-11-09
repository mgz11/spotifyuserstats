import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  const prevCodeRef = useRef();
  useEffect(() => {
    // Send post request if the code is different from the current one
    // This fixes the issue where it was sending two requests with the same code
    if (code && code !== prevCodeRef.current) {
      axios
        .post("http://localhost:5000/login", {
          code,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          setExpiresIn(res.data.expiresIn);

          // Gets rid of code in the URL
          window.history.pushState({}, null, "/");
        })
        .catch(() => {
          // Handle error
          window.location = "/";
        });
    }

    prevCodeRef.current = code;
  }, [code]);

  useEffect(() => {
    // Don't do anything if there is no refresh token or expires in
    if (!refreshToken || !expiresIn) return;

    // Request a refresh token one minute before the access token expires
    const interval = setInterval(() => {
      axios
        .post("http://localhost:5000/refresh", {
          refreshToken,
        })
        .then((res) => {
          console.log(res.data);
          console.log("SUCCESS");
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
          // Gets rid of code in the URL
          window.history.pushState({}, null, "/");
        })
        .catch(() => {
          // Handle error
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
