import React from 'react';
import {
  Container,
  Header,
  Image,
  Menu,
} from 'semantic-ui-react';
import logo from '../assets/logo.svg';

const Layout = (props) => (
    <React.Fragment>
    <Menu style={{ background: 'transparent' }}>
      <Container>
        <Menu.Item as='a' header>
          <Image size='mini' src='https://lh3.googleusercontent.com/lJVEU24a3ybedlZQHMhILVWOmXIAAUGIWsOOPG8uqnEE-18Va7vyxoBsg2IetqtTf8pc=s180-rw' style={{ marginRight: '1.5em' }} />
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