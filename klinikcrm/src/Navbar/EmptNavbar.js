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

const EmptyNavBar =()=>
{ const [openBasic, setOpenBasic] = useState(false);
    if (window.location.pathname === "/"&& sessionStorage.getItem("role")!=="USER"  && sessionStorage.getItem("role")!=="ADMIN") {
        return null;
    }
    return (
        <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>

            </MDBContainer>
        </MDBNavbar>

    )
}

export default EmptyNavBar;
