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
import {useState} from "react";
import {Button} from "react-bootstrap";

const NavBarAdmin =()=>
{ const [openBasic, setOpenBasic] = useState(false);
    if (window.location.pathname === "/"&& sessionStorage.getItem("role")!=="USER"  && sessionStorage.getItem("role")!=="ADMIN") {
        return null;
    }
    const exit = () => {
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("patientId");
        window.location.href="/"
    }
    return (
        <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
                <MDBNavbarBrand href='main'>DİL VE KONUŞMA TERAPİSTİ</MDBNavbarBrand>
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
                            <MDBNavbarLink active aria-current='page' href="patientList">
                                HASTALAR
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink active aria-current='page' href='allReservation'>
                                REZERVASYONLARIM
                            </MDBNavbarLink>
                        </MDBNavbarItem>

                        <MDBNavbarItem>
                            <MDBNavbarLink active aria-current='page' href='blogMain'>BLOG</MDBNavbarLink>
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

export default NavBarAdmin;
