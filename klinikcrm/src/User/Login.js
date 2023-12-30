import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
} from "mdb-react-ui-kit";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import UserMainPage from "./UserMainPage";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [messages, setMessages] = useState("");
    const [keepValue, setKeepValue] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // New state

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    useEffect(() => {
        sessionStorage.setItem("role","");
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault()
        await fetch("http://localhost:8080/auth/singin", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    userName: username,
                    password: password,
                }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Yanıt yok");
                }
                return response.json();
            })
            .then((data) => {
                if (Object.keys(data).length === 0) {
                    setMessages("Kullanıcı adı veya şifre yanlış");
                    setPassword("");
                    setUsername("");
                } else {
                    setKeepValue([data][0].token);
                    setIsLoggedIn(true)
                    console.log([data][0].token)
                    sessionStorage.setItem("token", [data][0].token)
                    console.log(sessionStorage.getItem("token"))
                }
            })
            .catch((error) => {
                console.error("Error:", error.message);
            });
    };


    if (isLoggedIn) {
        window.location.href="/main"
    }

    return (
        <>
            <MDBContainer className="my-3">
                <MDBCard>
                    <MDBRow className="g-0">
                        <MDBCol md="6">
                            <MDBCardImage
                                src="Images/login.png"
                                alt="login form"
                                className="rounded-start w-100"
                            />
                        </MDBCol>

                        <MDBCol md="6">
                            <MDBCardBody className="d-flex flex-column">
                                <h5>{messages}</h5>
                            </MDBCardBody>
                            <MDBCardBody className="d-flex flex-column">
                                <form onSubmit={handleSubmit}>
                                    <MDBInput
                                        onChange={handleUsernameChange}
                                        wrapperClass="mb-4"
                                        placeholder="Kullanıcı Adı"
                                        id="formControlLg"
                                        type="text"
                                        size="lg"
                                        value={username}
                                    />
                                    <MDBInput
                                        onChange={handlePasswordChange}
                                        wrapperClass="mb-4"
                                        placeholder="Şifre"
                                        id="formControlLg"
                                        type="password"
                                        size="lg"
                                        value={password}
                                    />
                                    <MDBBtn
                                        type="submit"
                                        className="mb-4 px-5 "
                                        color="dark"
                                        size="lg"
                                    > GİRİŞ

                                    </MDBBtn>


                                </form>

                                <Link to="/password" className="m-1 text-primary">
                                    Şifremi Unuttum
                                </Link>
                                <p className="mb-5 pb-lg-2" style={{color: "#393f81"}}>
                                    Hesabın yok mu?
                                    <Link to="/signIn" className="m-1" style={{color: "#393f81"}}>
                                        Kayıt Ol
                                    </Link>
                                </p>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            </MDBContainer>
        </>

    );
}

export default Login;
