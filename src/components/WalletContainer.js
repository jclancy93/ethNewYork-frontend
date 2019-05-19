import React from 'react';
import axios from 'axios';
import { Header, Card, Loader } from 'semantic-ui-react'
import { ResponsiveLine } from '@nivo/line'
import Positions from './Positions';
import Assets from './Assets';

const data = [
  {
    "id": "Ethereum",
    "data": [
      {
        "x": "Today",
        "y": 279
      },
      {
        "x": "Year 1",
        "y": 281
      },
      {
        "x": "Year 2",
        "y": 286
      },
      {
        "x": "Year 3",
        "y": 296
      },
      {
        "x": "Year 4",
        "y": 310
      },
      {
        "x": "Year 5",
        "y": 330
      },
      {
        "x": "Year 6",
        "y": 355
      },
      {
        "x": "Year 7",
        "y": 400
      },
      {
        "x": "Year 8",
        "y": 480
      },
      {
        "x": "Year 9",
        "y": 580
      },
      {
        "x": "Year 10",
        "y": 700
      },
      {
        "x": "Year 11",
        "y": 850
      }
    ]
  }
]

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
        const restOfYears = Array(19).fill().map((e, i) => ({ x: `Year ${i + 1}`, y: parseFloat(asset.balance) * ((1 + parseFloat(asset.lendRate)) ** (i + 1)) }))
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
                <Card.Content>
                <Card.Header style={{ fontSize: '28px' }}>Expected compounding interest over time</Card.Header>
                <Card.Meta>Stack <s>sats</s> wei</Card.Meta>
                <div style={{ height: '400px' }}>
                <ResponsiveLine
                  data={this.state.graphData}
                  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                  xScale={{ type: 'point' }}
                  yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
                  axisTop={null}
                  axisRight={null}
                  axisLeft={{
                      orient: 'left',
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: 'Amount of Tokens',
                      legendOffset: -40,
                      legendPosition: 'middle'
                  }}
                  colors={{ scheme: 'category10' }}
                  pointSize={10}
                  pointColor={{ theme: 'background' }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'serieColor' }}
                  pointLabel="y"
                  pointLabelYOffset={-12}
                  useMesh={true}
                  legends={[
                      {
                          anchor: 'bottom-right',
                          direction: 'column',
                          justify: false,
                          translateX: 100,
                          translateY: 0,
                          itemsSpacing: 0,
                          itemDirection: 'left-to-right',
                          itemWidth: 80,
                          itemHeight: 20,
                          itemOpacity: 0.75,
                          symbolSize: 12,
                          symbolShape: 'circle',
                          symbolBorderColor: 'rgba(0, 0, 0, .5)',
                          effects: [
                              {
                                  on: 'hover',
                                  style: {
                                      itemBackground: 'rgba(0, 0, 0, .03)',
                                      itemOpacity: 1
                                  }
                              }
                          ]
                      }
                  ]}
              />
                </div>
                </Card.Content>
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
