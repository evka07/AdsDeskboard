import { Nav, Navbar, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { checkIfLoggedIn } from '../../../redux/usersRedux';

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);
  const user = useSelector(state => checkIfLoggedIn(state));

  return (
    <Navbar
      expanded={expanded}
      expand='lg'
      className={`${styles.navigation} text-white`}>
      <Container>
        <Navbar.Brand className='me-auto mx-2'>LocalAds</Navbar.Brand>
        <Navbar.Toggle
          onClick={() => setExpanded(expanded ? false : 'expanded')}
          aria-controls='responsive-navbar-nav'
        />
        <Navbar.Collapse className='justify-content-end'>
          <Nav className='ms-auto mx-2'>
            <Nav.Link
              className={styles.link}
              onClick={() => setExpanded(false)}
              as={NavLink}
              to='/'>
              Home
            </Nav.Link>
            {user === null && (
              <Nav.Link
                className={styles.link}
                onClick={() => setExpanded(false)}
                as={NavLink}
                to='/login'>
                Sign in
              </Nav.Link>
            )}
            {user === null && (
              <Nav.Link
                className={styles.link}
                onClick={() => setExpanded(false)}
                as={NavLink}
                to='/register'>
                Sign up
              </Nav.Link>
            )}
            {user !== null && (
              <Nav.Link as={NavLink} to='/ads/add'>
                Create ad
              </Nav.Link>
            )}
            {user !== null && (
              <Nav.Link
                className={styles.link}
                onClick={() => setExpanded(false)}
                as={NavLink}
                to='/logout'>
                Sign out
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
