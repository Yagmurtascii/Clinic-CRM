import React, {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import { MDBCol, MDBRow} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import BlogCreate from "./BlogCreate";
import {POSTS_URL} from "../helpers/constants";

function BlogMainComponent() {

    const [posts, setPosts] = useState([])
    const [isUpdate, setIsUpdate] = useState(false);
    const [data, setData] = useState()

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:8080/posts/');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
            alert('Error fetching posts');
        }
    };
    const handleDelete = async (postId) => {

        console.log("postId" + postId)
        //fetch(POSTS_URL)

        await fetch(`http://localhost:8080/posts/${postId}`,
            {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},

            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Yanıt yok");
                }
                fetchPosts();
            })
    };

    const handleUpdate = async (postId) => {
            console.log("postId" + postId)
            await fetch(`http://localhost:8080/posts/:${postId}`,
                {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},

                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Yanıt yok");
                    }
                    fetchPosts();
                    return response.json();

                })
                .then((data) => {
                    setData(data);
                    setIsUpdate(true)

                })

        };

    useEffect(() => {
        if(isUpdate)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        fetchPosts();
    }, [isUpdate]);

    return (
        <div className="m-5">
            {sessionStorage.getItem("role")==="USER" || sessionStorage.getItem("role")!=="ADMIN" ? <h4>NOT FOUND</h4> : <>
            {isUpdate &&<BlogCreate post={data}></BlogCreate>}
            <MDBRow className="mt-5 mb-5 ">
                <MDBCol sm="10">
                    <h2>BLOG YAZILARIM</h2>
                </MDBCol>
                <MDBCol >
                    <Link className="flex-lg-wrap btn btn-primary w-100 p-2 justify-content-lg-between" to={"/blogCreate"} type="button">
                      <FontAwesomeIcon icon={faPlus}/>YENİ YAZI OLUŞTUR
                        </Link>
                </MDBCol>
            </MDBRow>

            <Table>
                <thead>
                <tr>
                    <th>İÇERİK</th>
                    <th>SİL</th>
                    <th>DÜZENLE</th>
                </tr>
                </thead>

                <tbody className="m-4">
                {posts.map((post) => (
                    <tr key={post.id}>
                        <td dangerouslySetInnerHTML={{__html: post.content}}/>
                        <td><Button onClick={()=>handleDelete(post.id)}>Sil</Button></td>
                        <td><Button onClick={()=>handleUpdate(post.id)}>Düzenle</Button></td>
                    </tr>

                ))}
                </tbody>
            </Table></>}
        </div>
    )
}

export default BlogMainComponent;
