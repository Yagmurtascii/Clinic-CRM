import React, {useState} from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import tr from 'date-fns/locale/tr';
import {MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import {useLocation} from "react-router-dom";



function Reservation() {
    const {state} = useLocation();
    const patientData = state?.patientData || null;
    console.log(patientData)
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState()

    const checkdate = (day) => {
        return day.getDay() !== 6 && day.getDay() !== 0;
    }
    const customStyle = {
        width: "23em",
        height: "23em",
    };

    function formatDateForSql(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const currentDate = new Date();
    const sqlFormattedDate = formatDateForSql(currentDate);
    console.log(sqlFormattedDate);
    const handleReservationSubmit = async () => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const date1= `${year}-${month}-${day}`;

        const times=(date.getHours()+":" +date.getMinutes())
        console.log(times);

        await fetch("http://localhost:8080/reservations/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                dueDate:date1,
                time:times,
                patientId:sessionStorage.getItem("patientId")
            })
        })
            .then(response =>{
                window.location.href="/myReservation"
                return response.json();
            })


            .then(data => {
                console.log("POST isteği başarıyla tamamlandı:", data);

            })
            .catch(error => {
                console.error("POST isteği sırasında bir hata oluştu:", error);
            });
    };

    return (
        <div className="bg-primary text-center justify-content-center m-5 p-5">
            {sessionStorage.getItem("role")!=="USER" || sessionStorage.getItem("role")==="ADMIN" ? <h4>NOT FOUND</h4> : <>
            <MDBContainer fluid className='p-4'>
                <MDBRow>
                    <MDBCol md='8' className='text-center text-md-start d-flex flex-column justify-content-center'>
                        <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                            <span className="text-white">DİL VE KONUŞMA TERAPİSİ</span>
                        </h1>
                        <p className="p-3 m-2 display-6">Dil ve konuşma terapisi rezervasyon ekranı, bireylerin
                            terapi seanslarına kolayca erişim sağlamalarını
                            ve randevu taleplerini yönetmelerini sağlayan kullanıcı dostu bir platform sunar.</p>
                    </MDBCol>
                    <MDBCol md='4' className='text-center text-md-start d-flex flex-column justify-content-center'>
                        <h4 className="text-white">Rezervasyon Al</h4>
                        <DatePicker
                            showIcon
                            size="lg"
                            style={customStyle}
                            selected={date}
                            onChange={(date) => {
                                setDate(date);
                                console.log("Seçilen Tarih ve Saat:", date);
                            }}
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date()}
                            locale={tr}
                            filterDate={checkdate}
                            showTimeSelect
                            minTime={new Date(0, 0, 0, 8, 30)}
                            maxTime={new Date(0, 0, 0, 18, 0)}

                        />

                    </MDBCol>
                    <button onClick={handleReservationSubmit}>Rezervasyonu Gönder</button>
                </MDBRow>
            </MDBContainer></>}
        </div>
    );

}
export default Reservation;
