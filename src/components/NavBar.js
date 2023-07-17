import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaMusic } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import React,{ useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import './NavBar.css';


function NavBar({ setSearch , setFinal , setMusic  , final , search , choice , setChoice}) {
  const space = '\u0020';
  useEffect(()=>{
    fetchData();
  },[final,choice]);
  
const fetchData = async ()=>{
  const url = `https://spotify-web2.p.rapidapi.com/search/?q=+${final}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '17ac8d79a6msh57ba0abcf5b37fcp18fe18jsn203b6e493a17',
		'X-RapidAPI-Host': 'spotify-web2.p.rapidapi.com'
	}
};
try {
	const response = await fetch(url, options);
	const result = await response.json();
  
  const musicItem = result[choice].items;
  setMusic(musicItem);
} catch (error) {
	console.error(error);
}
};
  function handleClick(e){
    setFinal(search);
  }
  
  
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#"><FaMusic />{' '}Spice</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="/">Home</Nav.Link>
                  <NavDropdown title="Account" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                      <NavDropdown.Divider />
                        <NavDropdown.Item href='/signup'>
                          Signup
                        </NavDropdown.Item>
                  </NavDropdown>
              </Nav>
          
        <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  value={search} 
                  onChange={(e)=>setSearch(e.target.value)}
                  className="me-2"
                  aria-label="Search"
                />
            <Dropdown >
              <Dropdown.Toggle variant="dark"  id="dropdown-basic" >
                  {choice}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={(e)=>setChoice('albums')}>albums</Dropdown.Item>
                <Dropdown.Item onClick={(e)=>setChoice('playlists')}>playlists</Dropdown.Item>
                <Dropdown.Item onClick={(e)=>setChoice('artists')}>artists</Dropdown.Item>
                <Dropdown.Item onClick={(e)=>setChoice('episodes')}>episodes</Dropdown.Item>
                <Dropdown.Item onClick={(e)=>setChoice('shows')}>podcasts</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {}
            <Button variant="outline-dark" onClick={handleClick}>Search</Button> 
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default NavBar;