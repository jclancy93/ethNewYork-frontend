import React from 'react';
import {
  Container,
  Header,
  Image,
  Menu,
} from 'semantic-ui-react';
import logo from '../assets/upwards.png';

const Layout = (props) => (
    <React.Fragment>
    <Menu style={{ background: 'transparent' }}>
      <Container>
        <Menu.Item as='a' header>
          <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
          <Header style={{ color: 'white', marginTop: 0 }} >Project Alloy</Header>
        </Menu.Item>
        <Menu.Item as='a' style={{ color: 'white' }}>Home</Menu.Item>
      </Container>
    </Menu>

    <Container style={{ marginTop: '30px' }}>
        { props.children }
    </Container>
  </React.Fragment>
);

export default Layout