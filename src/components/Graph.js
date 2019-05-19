import React from 'react';
import { Header, Card, Loader } from 'semantic-ui-react'
import { ResponsiveLine } from '@nivo/line'

const Graph = (props, state) => (
  <React.Fragment>
    { props.graphData.length > 0 && <Card.Content>
    <Card.Header style={{ fontSize: '28px' }}>Expected compounding interest over time</Card.Header>
    <Card.Meta>Stack <s>sats</s> wei</Card.Meta>
    <div style={{ height: '400px' }}>
    <ResponsiveLine
      data={props.graphData}
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
  }
  {  props.graphData.length === 0 &&
    <Card.Content>
      <div style={{ height: '400px' }}>
        <Header>Not enough data :(</Header>
      </div>
    </Card.Content>
  }
  </React.Fragment>
);

export default Graph;