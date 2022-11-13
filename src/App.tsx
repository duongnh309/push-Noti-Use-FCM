import { useEffect } from "react";
import "./App.css";
import { getMessagingToken } from "./firebase";
import logo from "./logo.svg";
function App() {
  useEffect(() => {
    getMessagingToken();
    const channel = new BroadcastChannel("notifications");
    const onMessage = (event: any) => {
      console.log("Receive background", event.data);
    };
    channel.addEventListener("message", onMessage);
    return () => {
      channel.removeEventListener("message", onMessage);
      channel.close();
    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code> Hieu</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
