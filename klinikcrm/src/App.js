import './App.css';
import SingInPatient from "./User/SingInPatient";
import Login from "./User/Login";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ShowPatient from "./User/ShowPatient";
import ProfilePage from "./User/PatientProfile";
import Reservation from "./Reservation/Reservation";
import Password from "./User/PasswordPage";
import BlogCreate from "./Blog/BlogCreate";
import NavBar from "./Navbar/NavBar";
import Blog from "./Blog/Blog";
import BlogPage from "./Blog/BlogPage";
import BlogMainComponent from "./Blog/BlogMainComponent";
import UserMainPage from "./User/UserMainPage";
import MyReservation from "./Reservation/MyReservation";
import NavBarAdmin from "./Navbar/NavbarAdmin";
import EmptyNavBar from "./Navbar/EmptNavbar";
import AdminReservation from "./Reservation/AdminReservation";
import {useEffect, useState} from "react";

const router = createBrowserRouter([

    {
        path: "/",
        element: <Login></Login>
    },
    {
        path: "/signIn",
        element: <SingInPatient></SingInPatient>
    },
    {
        path: "/patientList",
        element: <ShowPatient></ShowPatient>
    },

    {
        path: "/profile",
        element: <ProfilePage></ProfilePage>
    },
    {
        path: "/reservation",
        element: <Reservation></Reservation>
    },
    {
        path: "/password",
        element: <Password></Password>
    },
    {
        path: "/blogCreate",
        element: <BlogCreate></BlogCreate>
    },
    {
        path: "/blog",
        element: <Blog></Blog>
    },
    {
        path: "/blogPage",
        element: <BlogPage></BlogPage>
    },
    {
        path: "/blogMain",
        element: <BlogMainComponent></BlogMainComponent>
    },
    {
        path: "/main",
        element: <UserMainPage></UserMainPage>
    } ,
    {
        path: "/myReservation",
        element: <MyReservation></MyReservation>
    },
    {
        path: "/allReservation",
        element: <AdminReservation></AdminReservation>
    }
]);
console.log("Current Path:"+ window.location.pathname
);




function App() {
    const [isSessionTrue, setIsSessionTrue] = useState(false)
    useEffect(() => {
        setIsSessionTrue(true)
    }, [sessionStorage.getItem("role")]);

    return (
        <div className="App">
            {isSessionTrue &&
                <>{sessionStorage.getItem("role")==="USER" ? <NavBar></NavBar> :
                    sessionStorage.getItem("role")==="ADMIN"?  <NavBarAdmin></NavBarAdmin>:
                        <EmptyNavBar></EmptyNavBar>}</>}
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
