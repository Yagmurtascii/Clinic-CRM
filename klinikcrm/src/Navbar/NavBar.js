import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
} from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {useState} from "react";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

const NavBar =()=>
{ const [openBasic, setOpenBasic] = useState(false);

    const exit = () => {
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("patientId");
      window.location.href="/"
    }

    return (
        <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
                <MDBNavbarBrand href='/main'>DİL VE KONUŞMA TERAPİSTİ</MDBNavbarBrand>
                <MDBNavbarToggler
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setOpenBasic(!openBasic)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>

                <MDBCollapse navbar open={openBasic}>
                    <MDBNavbarNav className='ms-auto mb-2 mb-lg-0'>

                        <MDBNavbarItem>
                            <MDBNavbarLink active aria-current='page' href='reservation'>
                                REZERVASYON AL
                            </MDBNavbarLink>
                        </MDBNavbarItem>

                        <MDBNavbarItem>
                            <MDBNavbarLink active aria-current='page' href='myReservation'>
                                REZERVASYONLARIM
                            </MDBNavbarLink>
                        </MDBNavbarItem>

                        <MDBNavbarItem>
                            <MDBNavbarLink active aria-current='page' href='blog'>BLOG</MDBNavbarLink>
                        </MDBNavbarItem>

                        <MDBNavbarItem className="align-content-end justify-content-end text-end bg-white">
                            <Button className="bg-light text-black border-0 " onClick={()=>exit()}>ÇIKIŞ YAP</Button>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>

    )
}

export default NavBar;
