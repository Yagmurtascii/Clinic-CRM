import {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import * as emailjs from "emailjs-com";
import {validMail} from "../OtherFunctions/CheckParameters";
import {Link} from "react-router-dom";

function Password() {

    const style = {
        marginTop: 250,
    }
    const [email, setEmail] = useState("");
    const [isSend, setIsSend] = useState(false);
    const [messages, setMessage] = useState("");
    const sendMail = (password, mail) => {
        emailjs.init("6sUrSTVn2rJ1wTjWN");
        var templateParams = {
            to_email: mail,
            to_name: 'Dil ve Konuşma Terapisti',
            password: password,
            message_html: {password}
        };

        emailjs.send('service_n8dkp3k', 'template_sdwdopl', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });
    }

    const handleSubmit = () => {
        if (!email) {
            setMessage("Lütfen geçerli bir mail adresi girin.");
            return;
        }
        let password = (Math.random() + 1).toString(36).substring(6);
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        fetch("http://localhost:8080/patients/checkMail", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 404) {
                        // Handle the case where email does not exist in the database
                        setMessage("Girdiğiniz mail adresi mevcut değil.");
                    } else {
                        throw new Error("Yanıt yok");
                    }
                } else {
                    setIsSend(true);
                    sendMail(password, email);
                    setMessage("Şifre başarıyla gönderildi.");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const mailHandleOnChange = (e) => {
        setEmail(e.target.value);
        validMail(email, "mail")

    }
    return (
        <div>
            <Container className="w-75 text-center" style={style}>
                <Row>

                    <Col>
                        <Form>
                            <Form.Control onChange={mailHandleOnChange}
                                          className="mb-1"
                                          id="mail"
                                          type="text"
                                          value={email}
                                          placeholder="mail adresiniz girin"
                            />
                            <p className="text-center text-danger fl-1">{messages}</p>
                        </Form>
                        <Button className="mb-2" id="button" onClick={() => handleSubmit()}>Yeni şifre gönder </Button>
                        <Col>

                            <Button variant="danger">
                                <Link className="text-decoration-none text-light" to="/">Login ekranına
                                    dön</Link>
                            </Button>
                        </Col>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Password;
