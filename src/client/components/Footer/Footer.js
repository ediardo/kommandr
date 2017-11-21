import React from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

const Footer = props => {
  return (
    <footer className="footer fixed-bottom">
      <Container fluid>
        kommandr.com © {new Date().getFullYear()} |{' '}
        <a href="https://github.com/kommandr/kommandr/issues/new" target="_blank">report bugs</a> |{' '}
        <a href="https://github.com/kommandr/kommandr" target="_blank">source code</a> |{' '}
        <Link to="/privacy">privacy</Link> |{' '}
        <Link to="/terms">terms & legal</Link> |{' '}
        <Link to="/contact">contact</Link>
      </Container>
    </footer>
  )
}

export default Footer;