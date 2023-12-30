import React, {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";


function MyReservation({patient}) {
    const [data, setData] = useState([])
    console.log(sessionStorage.getItem("patientId"))

    const handleAllReservations = async () => {
        await fetch(`http://localhost:8080/reservations/${sessionStorage.getItem("patientId")}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(response => response.json())
            .then(data => {
                setData(data);
                console.log(data)
                console.log("Get isteği başarıyla tamamlandı:", data);
            })
            .catch(error => {
                console.error("Get isteği sırasında bir hata oluştu:", error);
            });
    }

    useEffect(() => {
        handleAllReservations();
    }, []);


    console.log(patient)

    const handleDelete = async (id) => {

        console.log("postId" + id)
        await fetch(`http://localhost:8080/reservations/${id}`,
            {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},

            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Yanıt yok");
                }
                handleAllReservations();
            })
    };
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    const checkDate = (date) => {
        if(new Date(date) < new Date())
        {

            return "rgba(255,0,69,0.56)"
        }
        else if((new Date(date) -new Date())>=(100*60*60*24) &&
            (new Date(date) -new Date())<=(100*60*60*24*3)) {

            return "rgba(14,143,29,0.82)"
        }
        else
            return ""
    }

    return (
        <div className="m-5">
            {sessionStorage.getItem("role")!=="USER" || sessionStorage.getItem("role")==="ADMIN" ? <h4>NOT FOUND</h4> : <>
            <Table striped bordered>
                <thead>
                <tr>
                    <th>TARİH</th>
                    <th>ZAMAN</th>
                    <th>İPTAL</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index} >
                        <td style={{ backgroundColor:checkDate(item.dueDate) }}> {item.dueDate} </td>
                        <td style={{ backgroundColor:checkDate(item.dueDate) }}>{item.time}</td>
                        <td ><Button onClick={() => handleDelete(item.id)}
                                     disabled={new Date(item.dueDate) < new Date()}
                                     className="w-100"
                        style={{backgroundColor:checkDate(item.dueDate)}}>İptal Et</Button></td>
                    </tr>
                ))}

                </tbody>
            </Table></>}
        </div>
    )
}

export default MyReservation;
