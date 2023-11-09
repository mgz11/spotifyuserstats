import React from "react";

// Redirect user to Spotify authorization page
const handleLogin = () => {
  window.location.href = AUTH_URL;
};

// Generate a random string that is used to create the state variable (obtained from Spotify documentation)
function generateRandomString(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// Used to create a valid session id
let state = generateRandomString(16);

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=dbec15ad30154427ad0efcbdb3d78cfe&response_type=code&redirect_uri=http://localhost:5173/&state=${state}&scope=user-read-private%20user-read-email%20user-top-read&show_dialog=true`;

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-roboto">
        See Your Top Artists / Tracks On Spotify!
      </h1>
      <button
        onClick={handleLogin}
        className="py-3 px-12 rounded bg-spotify-green font-roboto font-medium mt-5"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
