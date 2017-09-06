import React from 'react';

import { Container } from 'reactstrap';

const Footer = (props) => {
  return (
    <footer className={`footer ${props.className}`}>
      <Container fluid>
        kommandr.com © {new Date().getFullYear()} |{' '}
        <a href="https://github.com/kommandr/kommandr/issues/new" target="_blank">report bugs</a> |{' '}
        <a href="https://github.com/kommandr/kommandr" target="_blank">source code</a> |{' '}
        <a href="#">privacy</a> |{' '}
        <a href="#">terms</a> |{' '}
        <a href="#">contact us</a> |{' '}
      </Container>
    </footer>
  )
}

export default Footer;
