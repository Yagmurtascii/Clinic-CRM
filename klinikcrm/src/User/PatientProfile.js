import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage, MDBInput,
} from 'mdb-react-ui-kit';
import {Button} from "react-bootstrap";
import React, {useState} from 'react';
import {checkLengthPassword, validMail} from "../OtherFunctions/CheckParameters";
import {Link, useLocation, useNavigate} from "react-router-dom";
import MyReservation from "../Reservation/MyReservation";

export default function ProfilePage() {
    const {state} = useLocation();
    const patientData = state && state.patientData ? state.patientData : null;
    const [isUpdate, setIsUpdate] = useState(true)
    const [messages, setMessage] = useState("");
    const [mailMessages, setMailMessages] = useState("");

    console.log(patientData)
    const [patient, setPatient] = useState({
        id: sessionStorage.getItem("patientId"),
        firstName: patientData[0].firstName,
        lastName: patientData[0].lastName,
        userName: patientData[0].username,
        gender: patientData[0].gender,
        password: patientData[0].password,
        phoneNumber: patientData[0].phoneNumber,
        email: patientData[0].email,
        familyMemberFirstName: patientData[0].familyMemberFirstName,
        familyMemberLastName: patientData[0].familyMemberLastName,
        familyMemberPhoneNumber: patientData[0].familyMemberPhoneNumber,
        role: patientData[0].role
    });

    const handleUpdate = () => {
        setIsUpdate(true)
        fetch('http://localhost:8080/patients/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patient),
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 400) {
                        // Handle the case where email does not exist in the database
                        setMessage("Yeni şifrenizin uzunluğu en az 6 karakter içermelidir.");
                    } else
                        setMessage("")
                    if (response.status === 404) {
                        setMailMessages("Girdiğiniz mail adresi geçerli değil.");
                    }
                } else {

                    setMailMessages("")
                    setMessage("")
                }

                return response.json();

            })
            .then(data => {
                console.log('Patient updated successfully:', data);
                // İsteğin başarılı olması durumunda ek işlemleri gerçekleştirebilirsiniz.
            })
            .catch(error => {
                console.error('Error updating patient:', error);
                // Hata durumunda gerekli işlemleri gerçekleştirebilirsiniz.
            });
    };
    const buttonCheck = () => {
        setIsUpdate(false);

    }
    const handleInputChange = (e) => {
        if (!isUpdate) {

            setPatient({
                ...patient,
                [e.target.name]: e.target.value,
            });

            if (e.target.name === 'email') {
                const message = validMail(e.target.value, 'email');
                if (message)
                    setPatient({
                        ...patient,
                        [e.target.name]: e.target.value,
                    });
                else
                    console.log(message)
            }

            if (e.target.name === 'password') {

                const message = checkLengthPassword(e.target.value, 'password');
                if (message)
                    setPatient({
                        ...patient,
                        [e.target.name]: e.target.value,
                    });
                else
                    console.log(message)

            }
        }
    };


    const convertToDateFormat = (dateString) => {
        // Örnek: 2023-01-01 formatındaki tarihi JavaScript Date objesine çevirme
        const dateObject = new Date(dateString);
        return dateObject.toISOString().split('T')[0]; // YYYY-MM-DD formatında çıktı alınır
    };
    return (
        <section>

                <MDBContainer className="py-5">
                    <MDBRow>
                        <MDBCol lg="4">
                            <MDBCard className="mb-4">
                                <MDBCardBody className="text-center">
                                    {patientData[0].gender === 'Bayan' ? (
                                        <MDBCardImage
                                            src="Images/womanProfile.png"
                                            alt="avatar"
                                            className="rounded-circle"
                                            style={{width: '150px'}}
                                            fluid
                                        />
                                    ) : (
                                        <MDBCardImage
                                            src="Images/manProfile.png"
                                            alt="avatar"
                                            className="rounded-circle"
                                            style={{width: '150px'}}
                                            fluid
                                        />
                                    )}
                                    <p className="text-muted mb-1">{patient.firstName + " " + patient.lastName}</p>
                                    <div className="d-flex justify-content-center mb-2">
                                        <Button onClick={() => buttonCheck()}>Bilgilerimi Düzenle</Button>
                                    </div>
                                    {isUpdate === false && <>
                                        <div className="d-flex justify-content-center">
                                            <Button onClick={() => handleUpdate()}>Kaydet</Button>
                                        </div>
                                    </>}

                                </MDBCardBody>

                            </MDBCard>

                        </MDBCol>
                        <MDBCol lg="8">
                            <MDBCard className="mb-4">
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Hasta Ad</MDBCardText>
                                        </MDBCol>

                                        <MDBCol sm="9">
                                            <MDBInput wrapperClass='mb-4' id='firstName' type='text'
                                                      name='firstName' value={patient.firstName}
                                                      disabled={isUpdate}
                                                      onChange={handleInputChange}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Hasta Soyad</MDBCardText>
                                        </MDBCol>

                                        <MDBCol sm="9">
                                            <MDBInput wrapperClass='mb-4' id='lastName' type='text'
                                                      name='lastName' value={patient.lastName} disabled={isUpdate}
                                                      onChange={handleInputChange}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Kullanıcı Adı</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBInput wrapperClass='mb-4' id='username' type='text'
                                                      name='username' value={patientData[0].username} disabled={true}
                                            />
                                        </MDBCol>
                                        <MDBCol sm="3">
                                            <MDBCardText>Şifre</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBInput wrapperClass='mb-1' id='password' type='text'
                                                      name='password' value={patient.password} disabled={isUpdate}
                                                      onChange={handleInputChange}
                                            />
                                            <p className="text-start text-danger fl-1">{messages}</p>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                    </MDBRow>
                                    <hr/>
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Doğum Tarihi</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBInput wrapperClass='mb-4' id='birthday' type='date'
                                                      name='birthday'
                                                      value={convertToDateFormat(patientData[0].birthday)}
                                                      disabled={true}
                                                      onChange={handleInputChange}
                                            />
                                        </MDBCol>
                                        <MDBCol sm="3">
                                            <MDBCardText>Cinsiyet</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBInput wrapperClass='mb-4' id='gender' type='text'
                                                      name='gender'
                                                      value={patientData[0].gender}
                                                      disabled={true}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Telefon Numarası</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBInput wrapperClass='mb-4' id='phoneNumber' type='number'
                                                      name='phoneNumber' value={patientData[0].phoneNumber} disabled={isUpdate}
                                                      onChange={handleInputChange}
                                            />
                                        </MDBCol>

                                        <MDBCol sm="3">
                                            <MDBCardText>Email</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBInput wrapperClass='mb-4' id='email' type='text'
                                                      name='email' value={patientData[0].email} disabled={isUpdate}
                                                      onChange={handleInputChange}
                                            />
                                            <p className="text-start text-danger fl-1">{mailMessages}</p>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Aile Üyesinin Ad </MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBInput wrapperClass='mb-4' id='familyMemberFirstName' type='text'
                                                      name='familyMemberFirstName' value={patient.familyMemberFirstName}
                                                      disabled={isUpdate}
                                                      onChange={handleInputChange}
                                            />
                                        </MDBCol>
                                        <MDBCol sm="3">
                                            <MDBCardText>Aile Üyesinin Soyad</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBInput wrapperClass='mb-4' id='familyMemberLastName' type='text'
                                                      name='familyMemberLastName' value={patient.familyMemberLastName}
                                                      disabled={isUpdate}
                                                      onChange={handleInputChange}
                                            />
                                        </MDBCol>
                                        <MDBCol sm="3">
                                            <MDBCardText>Aile Üyesinin Telefon Numarası</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBInput wrapperClass='mb-4' id='familyMemberPhoneNumber' type='text'
                                                      name='familyMemberPhoneNumber'
                                                      value={patientData[0].familyMemberPhoneNumber} disabled={isUpdate}
                                                      onChange={handleInputChange}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Bizi Nereden Buldunuz?</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBInput wrapperClass='mb-4' id='findUs' type='text'
                                                      name='findUs' value={patientData[0].whereDidYouFindUs}
                                                      disabled={true}

                                            />
                                        </MDBCol>
                                    </MDBRow>

                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
        </section>
    );
}
