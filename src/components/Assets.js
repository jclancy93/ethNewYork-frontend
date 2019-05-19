import React from 'react';
import axios from 'axios';
import { Card, Image, Button } from 'semantic-ui-react'

const longToFixed = string => parseFloat(string).toFixed(2);
const percentToFixed = string => (parseFloat(string) * 100).toFixed(2)


export class Positions extends React.Component {
  render() {
    console.log(this.props.assets)
    return(
      <Card.Group>

        <Card fluid>
        { this.props.assets.map((asset, index) => (
            ( parseFloat(asset.balance) > 0) && 
              (
                <Card.Content key={index} style={{ display: 'flex', flexDirection: 'row', height: '80px', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Image src={`https://raw.githubusercontent.com/TrustWallet/tokens/master/tokens/${asset.contractAddress}.png`} size='tiny' style={{ height: '32px', width: '32px', marginRight: '12px' }} />
                  <Card.Header style={{ display: 'flex', alignItems: 'center', width: '100px' }}>{ asset.name }</Card.Header>
                  <Card.Description>{longToFixed(asset.balance)} {asset.symbol}</Card.Description>
                  <Card.Description>${longToFixed(asset.price)}</Card.Description>
                  <Card.Description>${longToFixed(asset.price * asset.balance)}</Card.Description>
                  <Button primary>Earn  { percentToFixed(asset.lendRate) }% @ { asset.lendProtocol }</Button>
                  <Button secondary>Borrow  { percentToFixed(asset.borrowRate) }% @ { asset.borrowProtocol }</Button>
                </Card.Content>
              )
        ))
        }
        </Card> 
      </Card.Group>
    )
  }

}

export default Positions;
