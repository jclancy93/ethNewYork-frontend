import React from 'react';
import axios from 'axios';
import { Header, Card, Loader } from 'semantic-ui-react'
import { ResponsiveLine } from '@nivo/line'
import Positions from './Positions';
import Graph from './Graph';
import Assets from './Assets';

export class WalletContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };
  }

  fetchData = async (address) => {
    const response = await axios.get(`http://localhost:8080/wallets/${this.props.address}`);
    return response.data;
  };

  generateGraphData = (assets) => {
    const assetsWithBalance = assets.filter(asset => parseFloat(asset.balance) > 0);
    const graphData = [];
    assetsWithBalance.forEach((asset, index) => {
        // asset
        graphData.push({ id: asset.name, data: [ { x: "Today", y: asset.balance  } ]  })
        const restOfYears = Array(20).fill().map((e, i) => ({ x: `Year ${i + 1}`, y: parseFloat(asset.balance) * ((1 + parseFloat(asset.lendRate)) ** (i + 1)) }))
        graphData[index].data.push(...restOfYears);
    });
    console.log(assetsWithBalance, graphData)
    return graphData;
  }

  async componentDidMount() {
    const data = await this.fetchData(this.props.address);
    const graphData = this.generateGraphData(data.assets);
    this.setState({
      data,
      graphData: graphData,
    });
  }

  render() {
    return(
      <React.Fragment>
        { Object.keys(this.state.data).length > 1 ?
            <React.Fragment>
              <Card fluid>
                <Graph graphData={this.state.graphData} />
              </Card>
              <Header size='large'>Positions</Header>
              <Positions positions={this.state.data.positions}></Positions>
              <Header size='large'>Assets</Header>
              <Assets assets={this.state.data.assets}></Assets>
            </React.Fragment>
          :
          <React.Fragment>
            <Card fluid>
              <div style={{ height: '400px' }}>
                <Loader active />
              </div>
            </Card>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }

}

export default WalletContainer;
