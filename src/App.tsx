import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { dAppClient } from "./helpers/constants";
import { BeaconEvent } from "@airgap/beacon-sdk";
import { useEffect, useState } from "react";
// import { TEZOS_COLLECT_WALLET } from "./helpers/constants";

function App() {
  const [activeAddress, setActiveAddress] = useState("");
  const onConnectWallet = async () => {
    if (activeAddress) alert(activeAddress);
    else {
      await dAppClient.requestPermissions();
      const result = await dAppClient.getActiveAccount();
      setActiveAddress(result?.address || "");
    }
  };

  useEffect(() => {
    const getActiveAccounts = async () => {
      const _activeAddress = await dAppClient.getActiveAccount();
      if (_activeAddress?.address) {
        // If defined, the user is connected to a wallet.
        // You can now do an operation request, sign request, or send another permission request to switch wallet
        // console.log("Already connected:", _activeAddress?.address);

        // You probably want to show the address in your UI somewhere.
        setActiveAddress(_activeAddress?.address);
        // console.log(activeAddress);
      }
    };
    getActiveAccounts();
  }, []);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={onConnectWallet}>
          {activeAddress || "Connect Wallet"}
        </button>
        <br />
        <button
          onClick={async () => {
            await dAppClient.disconnect();
          }}
        >
          Disconnect Wallet
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
