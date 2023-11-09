import "./App.css";
import Homepage from "./Components/homepage";
import Login from "./Components/login";

// Check if the user is logged into a valid session (state)
const state = new URLSearchParams(window.location.search).get("state");

function App() {
  // Conditially render page based on if the session is valid
  return state ? <Homepage /> : <Login />;
}

export default App;
