import React, {useEffect, useState} from 'react';
import {Button, Table} from "react-bootstrap";

function AdminReservation(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        hadleFetch();
    }, []);
    const hadleFetch = async () => {
        await fetch("http://localhost:8080/reservations/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },

        })
            .then(response => response.json())
            .then(data => {
                setData(data);
                console.log(data)
                console.log("POST isteği başarıyla tamamlandı:", data);
            })
            .catch(error => {
                console.error("POST isteği sırasında bir hata oluştu:", error);
            });
    };

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
            {sessionStorage.getItem("role")==="USER" || sessionStorage.getItem("role")!=="ADMIN"  ? <h4>NOT FOUND</h4> : <>
            <Table striped bordered>
                <thead>
                <tr>
                    <th>TARİH</th>
                    <th>ZAMAN</th>

                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td style={{backgroundColor: checkDate(item.dueDate)}}> {item.dueDate} </td>
                        <td style={{backgroundColor: checkDate(item.dueDate)}}>{item.time}</td>

                    </tr>
                ))}

                </tbody>
            </Table></>}
        </div>

    );
}

export default AdminReservation;
