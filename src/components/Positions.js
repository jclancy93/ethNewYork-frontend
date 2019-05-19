import React from 'react';
import axios from 'axios';
import { Card, Image } from 'semantic-ui-react'

const longToFixed = string => parseFloat(string).toFixed(3);
const percentToFixed = string => (parseFloat(string) * 100).toFixed(2)


export class Positions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Card.Group>
        { this.props.positions.map((position, index) => (
          ( position.type === 'loan' ) ?
            (
            <Card fluid key={index} >
              <Card.Content>
                <Image src={`https://defitracker.io/img/${position.protocol}.svg`} size='small' />
                <Card.Description>Balance: { longToFixed(position.amount) }</Card.Description>
                <Card.Description>Rate: { percentToFixed(position.interest) }%</Card.Description>
              </Card.Content>
            </Card>
            )
          :
            (
              <Card fluid key={index} >
                <Card.Content>
                  <Image src={`https://defitracker.io/img/${position.protocol}.svg`} size='small' />
                  <Card.Description>Debt: { longToFixed(position.amount) }</Card.Description>
                  <Card.Description>Collateral: { longToFixed(position.collateral) }</Card.Description>
                  <Card.Description>Ratio: { longToFixed(position.ratio) }</Card.Description>
                  <Card.Description>Liquidation Price: ${ longToFixed(position.liquidationPrice) }</Card.Description>
                  <Card.Description>Interest: { percentToFixed(position.interest)  }%</Card.Description>
                </Card.Content>
              </Card>
            )
        ))
        }
      </Card.Group>
    )
  }

}

export default Positions;
