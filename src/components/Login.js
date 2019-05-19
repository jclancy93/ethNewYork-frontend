import React from 'react';
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import { useWeb3Context } from "web3-react";
import { Header, Card, Button, Image, Container } from 'semantic-ui-react'
import styled from 'styled-components'
import connectors from "../connectors";

const StyledHeader = styled(Header)`
  &&& {
    color: white;
    font-size: 32px;
    margin-bottom: 30px;
  }
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  padding-top: 150px;
  background: linear-gradient(rgb(53, 45, 194) 0%, rgb(45, 72, 163) 35%, rgb(0, 136, 255) 100%);
`

const StyledCard = styled(Card)`
  &&& {
    display: inline-flex !important;
    margin: 8px 6px !important;
  }
`

function Login() {
  const context = useWeb3Context();

  if (context.error) {
    console.error("Error!", context.error);
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

  return (
    <React.Fragment>
      <Overlay>
        <Container>
          <StyledHeader>Connect your wallet</StyledHeader>
          <Card.Group>
            { Object.keys(connectors).map(connectorName => (
                <Card>
                  <Card.Content textAlign={'center'}>
                    {connectorName === 'Injected' && <Image  size='mini' src='https://dappvolume.com/img/web3-wallets/metamask-logo.png' />}
                    {connectorName === 'Trezor' && <Image  size='mini' src='https://cdn-images-1.medium.com/max/1200/1*Sek00YxqMdOJp5FsjveZiQ.png' />}
                    {connectorName === 'Ledger' && <Image  size='mini' src='https://pbs.twimg.com/profile_images/915545754084741120/N44_mYZ7_400x400.jpg' />}
                    {connectorName === 'WalletConnect' && <Image  size='mini' src='https://avatars0.githubusercontent.com/u/37784886?s=200&v=4' />}
                    {connectorName === 'Fortmatic' && <Image  size='mini' src='https://avatars1.githubusercontent.com/u/38988377?s=200&v=4' />}
                    <br /> 
                    <br />
                    <Card.Header>{connectorName === 'Injected' ? 'Metamask' : connectorName}</Card.Header>
                    <br />
                    <Button 
                      primary
                      onClick={() => context.setConnector(connectorName)}
                    >
                      Connect
                    </Button>
                  </Card.Content>
                </Card>
            ))}
          </Card.Group>
        </Container>
      </Overlay>
    </React.Fragment>
  );
}

export default Login