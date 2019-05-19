import React from 'react';
import {
  Container,
  Header,
  Menu,
} from 'semantic-ui-react'
import Web3Provider, { Web3Consumer } from 'web3-react';
import connectors from './../connectors';
import Layout from './Layout';
import WalletContainer from './WalletContainer';
import Login from './Login';
import 'semantic-ui-css/semantic.min.css';

const App = () => (
  <Layout>
  <div style={{ background: 'rgb(53,45,194)', background: 'linear-gradient(180deg, rgba(53,45,194,1) 0%, rgba(45,72,163,1) 35%, rgba(0,136,255,1) 100%)', position: 'absolute', width: '100%', height: '300px', top: '0', left: '0', zIndex: '-1'}}></div>
    <Web3Provider connectors={connectors} libraryName="ethers.js">
      <Web3Consumer>
        {web3Context => {
          const { active, connectorName, account, networkId } = web3Context;
          return (
            (active && account) ?
            (
              <WalletContainer address={account} />
            ) : 
            (
              <Login />
            )
          );
        }}
      </Web3Consumer>
    </Web3Provider>
  </Layout>
)

export default App;
