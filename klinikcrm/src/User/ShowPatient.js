import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faSearch} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

function ShowPatient() {
    const [formData, setFormData] = useState([]);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getData();
        handleSearch()
    }, []);

    const getData = async () => {
        try {
            const response = await fetch("http://localhost:8080/patients/");
            const data = await response.json();
            setFormData(data);
            console.log(formData)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const handleSearch = () => {
        const filteredData = formData.filter(
            (item) =>
                item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFormData(filteredData);

    };

    useEffect(() => {
        console.log("formData:", formData);
    }, [formData]); // formData değiştiğinde loglama yap
    return (
        <div className="m-5">
            {sessionStorage.getItem("role")==="USER" || sessionStorage.getItem("role")!=="ADMIN" ? <h4>NOT FOUND</h4> : <>
            <Row className="mb-5">
                <Col sm="1" >
                    <FontAwesomeIcon icon={faSearch} size="3x"/>
                </Col>
                <Col sm="11">
                    <Form inline>
                        <Form.Control
                            id="form"
                            type="text"
                            placeholder="İsme göre ara"
                            className="mr-sm-2 w-100"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Form>
                </Col>

            </Row>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>İSİM</th>
                    <th>SOYİSİM</th>
                    <th>DOĞUM TARİHİ</th>
                    <th>CİNSİYET</th>
                    <th>NUMARA</th>
                    <th>AİLE ÜYESİ İSİM</th>
                    <th>AİLE ÜYESİ SOYİSİM</th>
                    <th>AİLE ÜYESİ NUMARA</th>
                    <th>BİZİ NEREDEN BULDUN</th>

                </tr>
                </thead>
                <tbody>
                {formData.map((item, index) => (
                    item.role !== "ADMIN" && (
                        <tr key={index}>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            {item.password !== null && <td>{item.password}</td>}
                            <td>{item.birthday}</td>
                            <td>{item.gender}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.familyMemberFirstName}</td>
                            {item.familyMemberLastName !== null && <td>{item.familyMemberLastName}</td>}
                            {item.familyMemberPhoneNumber !== null && <td>{item.familyMemberPhoneNumber}</td>}
                            {item.whereDidYouFindUs !== null && <td>{item.whereDidYouFindUs}</td>}
                            {item.email !== null && <td>{item.email}</td>}
                        </tr>
                    )
                ))}

                </tbody>
            </Table></>}
        </div>
    );
}

export default ShowPatient;
