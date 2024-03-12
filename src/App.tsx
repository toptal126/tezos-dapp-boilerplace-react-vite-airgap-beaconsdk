import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { dAppClient } from "./helpers/constants";
import { useEffect, useState } from "react";
// import { TEZOS_COLLECT_WALLET } from "./helpers/constants";

function App() {
  const [activeAddress, setActiveAddress] = useState("");
  const [refreshedAt, setRefreshedAt] = useState(new Date());
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
      setActiveAddress(_activeAddress?.address || "");
    };
    getActiveAccounts();
  }, [refreshedAt]);
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
            setRefreshedAt(new Date());
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
