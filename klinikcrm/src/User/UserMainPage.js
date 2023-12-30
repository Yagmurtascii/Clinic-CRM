import {MDBCardImage, MDBCol, MDBContainer, MDBNavbarItem, MDBNavbarLink, MDBRow} from "mdb-react-ui-kit";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {Button, Image} from "react-bootstrap";
import {useEffect, useState} from "react";


function UserMainPage() {
    const navigate = useNavigate();



    const [patient, setPatient] = useState([]);
    console.log(sessionStorage.getItem("token"))
    useEffect(() => {
        fetchUserInfo(sessionStorage.getItem("token"))
    }, []);

    const fetchUserInfo = async (token) => {
        await fetch("http://localhost:8080/patients/user", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },

        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Yanıt yok");
                }
                return response.json();
            })
            .then((data) => {
                setPatient([data]);
                console.log([data][0].id)
                sessionStorage.setItem("patientId",[data][0].id)
                console.log(sessionStorage.getItem("patientId"))
                sessionStorage.setItem("role",[data][0].role)
                console.log(sessionStorage.getItem("role"))
            })
            .catch((error) => {
                console.error("Error:", error.message);
            });
    }

    const handleOnClick = () => {
        console.log("basıldı.")
        navigate("/profile",{state:{patientData:patient}})
    }

    const handleOnClickRes = () => {
        navigate("/reservation", { state: { patientData: patient } })
    }
    return(
        <>

                <MDBContainer className="h-100 w-100 ">
                    <MDBRow className="mb-2" >
                        <MDBCol sm={7} className=" p-4">
                            <h4 >DİL VE KONUŞMA TERAPİSİ</h4>
                            <MDBCardImage
                                src="Images/main.jpg"
                                alt="Main Image"
                                className="rounded-start w-100 mb-4 mt-4"
                            />

                            <h5 >
                                Dil ve konuşma terapisi, bireylerin dil, konuşma, iletişim ve ses bozuklukları ile ilgilenen bir
                                rehabilitasyon alanıdır. Bu terapi, iletişim becerilerini geliştirmek, konuşma bozukluklarını düzeltmek
                                ve ses kalitesini artırmak amacıyla kullanılır. Ayrıca, dil ve konuşma terapisi, dil gelişim bozuklukları,
                                konuşma gelişim bozuklukları, afazi, artikülasyon bozuklukları,
                                kekemelik gibi çeşitli dil ve konuşma sorunlarına yönelik müdahaleleri içerir.

                            </h5>
                        </MDBCol>
                        <MDBCol></MDBCol>
                        <MDBCol sm={4}>
                            <MDBRow className=" mb-3  text-end ">
                                <MDBCol sm={12}>
                                    <Button onClick={()=>handleOnClick()}>
                                        <FontAwesomeIcon icon={faUser} />
                                    </Button>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="bg-primary p-5 justify-content-center  ">
                                <MDBCol sm={10} >

                                    <h4 className="text-white">BLOG</h4>
                                    <p className="text-start" style={{fontSize:"18px"}}>Farklı Yaş Gruplarına Odaklanan Bölümler:
                                        Yazı, farklı yaş gruplarındaki bireyler için dil ve konuşma terapisinin önemini vurgular. Okuyucular, çocuklardan yetişkinlere kadar
                                        her yaşta bireyin bu terapiden nasıl faydalanabileceğini öğrenirler.</p>

                                </MDBCol>

                                <MDBCol sm={8} className="text-center mt-2" >
                                    <Link className=" text-light" to="/blog"> Daha fazlası için tıkla...</Link>

                                </MDBCol>

                            </MDBRow>

                            <MDBRow className="bg-primary mt-3 p-5 justify-content-center ">
                                <MDBCol sm={10} >
                                    <h4 className="text-white">REZERVASYON</h4>
                                    <p className="text-start" style={{fontSize:"18px"}}>Farklı Yaş Gruplarına Odaklanan Bölümler:
                                        Yazı, farklı yaş gruplarındaki bireyler için dil ve konuşma terapisinin önemini vurgular. Okuyucular, çocuklardan yetişkinlere kadar
                                        her yaşta bireyin bu terapiden nasıl faydalanabileceğini öğrenirler.</p>

                                </MDBCol>


                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
        </>
    )
}

export default UserMainPage;
//                                <MDBCol sm={10}  className="text-center mt-2 ">
//                                     <Link className=" text-light" to={handleOnClickRes()}> Daha fazlası için tıkla...</Link>
//                                 </MDBCol>
