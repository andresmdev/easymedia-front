import React, {useState, useContext} from 'react';
import { 
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav, NavItem, NavLink} from 'reactstrap';
  import { AuthContext } from "../context/AuthContext";
  
export default function Header() {
  const [collapsed, setCollapsed] = useState(false);
  const { signOut } = useContext(AuthContext);

  const toggle = () => setCollapsed(!collapsed);

  return (
    <>
      <Navbar expand="lg" light style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #e5e5e5'
      }}>
        <NavbarBrand href="/">
          <img 
            style={{
              width: '48px',
              height: '48px',
              border: '1px solid #e5e5e5',
              borderRadius: '50%',
              objectFit: 'scale-down'
            }}
            alt="Logo" 
            src={require('./../assets/logo.png')} />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={collapsed} navbar style={{
          justifyContent: 'flex-end'
        }}>
          <Nav className="me-auto" navbar style={{
            display: 'contents'
          }}>
            <NavItem>
              <NavLink href="/create-post"> Create Publication </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/my-posts"> My Publications </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/all-posts"> See All Publication </NavLink>
            </NavItem>
            <NavItem>
              <NavLink 
                style={{ cursor: 'pointer' }}
                onClick={() => signOut()}> Logout </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
}

