import React from 'react';
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
} from 'semantic-ui-react'
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import Web3Provider, { useWeb3Context, Web3Consumer } from "web3-react";
import { ethers } from "ethers";
import logo from './logo.svg';
import connectors from "./connectors";
import './App.css';
import 'semantic-ui-css/semantic.min.css'

const App = () => (
  <Web3Provider connectors={connectors} libraryName="ethers.js">
  <div>
    <Menu inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
          Project Alloy
        </Menu.Item>
        <Menu.Item as='a'>Home</Menu.Item>
      </Container>
    </Menu>

    <Container text style={{ marginTop: '7em' }}>
      <Header as='h1'>Semantic UI React Fixed Template</Header>
      <MyComponent/>
    </Container>
  </div>
  </Web3Provider>
)

function MyComponent() {
  const context = useWeb3Context();

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

  console.log(context.error)

  return (
    <React.Fragment>
      <h1>web3-react Demo</h1>

      <Web3ConsumerComponent />

      {context.error && (
        <p>An error occurred, check the console for details.</p>
      )}

      { !context.active && 
        <React.Fragment>
          <h4>Choose a wallet</h4>
          { Object.keys(connectors).map(connectorName => (
            <button
              key={connectorName}
              onClick={() => context.setConnector(connectorName)}
            >
              Activate {connectorName}
            </button>
          ))}
          <br />
          <h4>Choose an alternate connection method</h4>
          <button
            key={'Hardcoded'}
            onClick={() => console.log('Should send API request here')}
          >
            ETH address
          </button>   
        </React.Fragment>  
      }

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

function Web3ConsumerComponent() {
  return (
    <Web3Consumer>
      {context => {
        const { active, connectorName, account, networkId } = context;
        return (
          active && (
            <React.Fragment>
              <p>Active Connector: {connectorName}</p>
              <p>Account: {account || "None"}</p>
              <p>Network ID: {networkId}</p>
            </React.Fragment>
          )
        );
      }}
    </Web3Consumer>
  );
}

export default App
