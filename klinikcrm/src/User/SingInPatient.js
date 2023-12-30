import React, {useEffect, useState} from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput, MDBRadio
} from 'mdb-react-ui-kit';

import {Button, FormLabel} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function SingInPatient() {

    const nav=useNavigate();

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        username: '',
        password: '',
        phoneNumber: '',
        gender: '',
        birthday: '',
        information: '',
        familyMemberFirstName: '',
        familyMemberLastName: '',
        familyMemberPhoneNumber: '',
        email: '',
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleWindow = () => {
        nav("/")

    };
    useEffect(() => {
        const {
            name, surname, username, password, phoneNumber, birthday, information, gender, email
        } = formData;
        const isAnyFieldEmpty = !name || !surname || !username || !password || !phoneNumber || !gender || !birthday || !information || !email

        setIsButtonDisabled(isAnyFieldEmpty);
    }, [formData]);

    const handleButtonClick = () => {
        const data = {
            firstName: formData.name,
            lastName: formData.surname,
            userName: formData.username,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
            gender: formData.gender.valueOf(),
            birthday: formData.birthday,
            whereDidYouFindUs: formData.information,
            familyMemberFirstName: formData.familyMemberFirstName,
            familyMemberLastName: formData.familyMemberLastName,
            familyMemberPhoneNumber: formData.familyMemberPhoneNumber,
            email: formData.email,
            role:"user"
        }
        fetch('http://localhost:8080/auth/singUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    };
    return (
        <MDBContainer fluid className='p-4'>
            <MDBRow>
                <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
                    <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                        <span className="text-primary">DİL VE KONUŞMA TERAPİSİ</span>
                    </h1>
                </MDBCol>
                <MDBCol md='6'>
                    <MDBCard className='my-5'>
                        <MDBCardBody className='p-5'>
                            <MDBRow>
                                <MDBCol col='6'>
                                    <MDBInput wrapperClass='mb-4' placeholder='*İsim' id='form1' type='text'
                                              name='name'
                                              onChange={handleInputChange}/>
                                </MDBCol>

                                <MDBCol col='6'>
                                    <MDBInput wrapperClass='mb-4' placeholder='*Soyisim' id='form1' type='text'
                                              name='surname'
                                              onChange={handleInputChange}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBInput wrapperClass='mb-4' placeholder='*Kullanıcı Adı' id='form1' type='text'
                                      name='username'
                                      onChange={handleInputChange}/>
                            <MDBInput wrapperClass='mb-4' placeholder='*Şifre' id='form1' type='password'
                                      name='password'
                                      onChange={handleInputChange}/>

                            <MDBInput wrapperClass='mb-4' placeholder='*Telefon Numarası' id='form1'
                                      type='text' name='phoneNumber'
                                      onChange={handleInputChange}
                            />

                            <MDBInput wrapperClass='mb-4' placeholder='*Email' id='form1'
                                      type='email' name='email'
                                      onChange={handleInputChange}
                            />
                            <div className='d-flex mb-4 justify-content-lg-start'>
                                <MDBRow>
                                    <MDBCol><FormLabel>*Cinsiyet</FormLabel></MDBCol>

                                    <MDBCol><MDBRadio id='flexRadioDefault1'
                                                      label='Bayan'
                                                      name='gender'
                                                      value="Bayan"
                                                      onChange={handleInputChange}/></MDBCol>
                                    <MDBCol> <MDBRadio id='flexRadioDefault2'
                                                       label='Bay'
                                                       name='gender'
                                                       value="Bay"
                                                       onChange={handleInputChange}
                                    /></MDBCol>
                                </MDBRow>
                            </div>

                            <MDBInput wrapperClass='mb-4' placeholder='Doğum Tarihi' id='form1'
                                      type='date' name='birthday'
                                      onChange={handleInputChange}/>
                            <MDBInput wrapperClass='mb-4' placeholder='Aile Üyesinin İsmi' id='form1'
                                      type='text' name="familyMemberFirstName" onChange={handleInputChange}/>
                            <MDBInput wrapperClass='mb-4' placeholder='Aile Üyesinin Soyismi' id='form1'
                                      type='text' name="familyMemberLastName" onChange={handleInputChange}/>

                            <MDBInput wrapperClass='mb-4' placeholder='Aile Üyesinin Telefon Numarası' id='form1'
                                      type='text' name="familyMemberPhoneNumber" onChange={handleInputChange}
                            />
                            <MDBInput wrapperClass='mb-4' placeholder='*Bizi nereden buldun' id='form1'
                                      type='text' name='information'
                                      onChange={handleInputChange}/>
                            <Button className='w-100 mb-4 bg-primary' size='md' type="button" value="KAYIT OL"
                                    disabled={isButtonDisabled}
                                    onClick={handleButtonClick}>KAYIT OL</Button>
                            <Button className='w-100 mb-4 bg-primary' size='md' type="button" value="KAYIT OL"

                                    onClick={()=>handleWindow()}>HESABIM VAR</Button>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default SingInPatient;
