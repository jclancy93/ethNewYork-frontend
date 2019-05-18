import * as React from "react";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import { useWeb3Context, Web3Consumer } from "web3-react";
import { ethers } from "ethers";

function MyComponent() {
  const context = useWeb3Context();

  console.log(context);

  if (context.error) {
    console.error("Error!");
  }

  if (context.active && context.connectorName === "WalletConnect") {
    if (!context.account) {
      WalletConnectQRCodeModal.open(
        context.connector.walletConnector.uri,
        () => {}
      );
    } else {
      try {
        WalletConnectQRCodeModal.close();
      } catch {}
    }
  }

  const [transactionHash, setTransactionHash] = React.useState();

  function sendTransaction() {
    const signer = context.library.getSigner();

    signer
      .sendTransaction({
        to: ethers.constants.AddressZero,
        value: ethers.utils.bigNumberify("0")
      })
      .then(({ hash }) => {
        setTransactionHash(hash);
      });
  }

  return (
    <React.Fragment>
      <h1>web3-react Demo</h1>
      <h3>(latest)</h3>

      <Web3ConsumerComponent />

      {context.error && (
        <p>An error occurred, check the console for details.</p>
      )}

      {Object.keys(connectors).map(connectorName => (
        <button
          key={connectorName}
          disabled={context.connectorName === connectorName}
          onClick={() => context.setConnector(connectorName)}
        >
          Activate {connectorName}
        </button>
      ))}

      <br />
      <br />

      {(context.active || (context.error && context.connectorName)) && (
        <button onClick={() => context.unsetConnector()}>
          {context.active ? "Deactivate Connector" : "Reset"}
        </button>
      )}

      {context.active && context.account && !transactionHash && (
        <button onClick={sendTransaction}>Send Dummy Transaction</button>
      )}

      {transactionHash && <p>{transactionHash}</p>}
    </React.Fragment>
  );
}