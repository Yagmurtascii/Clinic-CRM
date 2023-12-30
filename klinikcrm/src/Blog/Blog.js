import React, {useEffect, useState} from "react";
import {Button, Card, CardBody, CardGroup, CardSubtitle, CardText, Col, Row} from "react-bootstrap";
import data from "bootstrap/js/src/dom/data";
import BlogPage from "./BlogPage";
import {Link} from "react-router-dom";
import '../App.css';
import {getFirstThreeSentences} from "../OtherFunctions/Functions";
function Blog() {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isRead, setIsRead] = useState(false)
    const [data, setData] = useState(null)

    useEffect(() => {
        fetchPosts()
    }, []);


    const handleShowClick = async (postId) => {
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
                return response.json();
            })
            .then((data) => {
                setData(data)

                setSelectedPost({
                    ...data,
                    content: getFirstThreeSentences(data.content),
                });
                console.log(selectedPost.content)
                setIsRead(true)

            })
            .catch((error) => {
                console.error("Error:", error.messages);
            })
    };



    const fetchPosts = async () => {
        try {
            const response = await fetch("http://localhost:8080/posts/");
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    return (
        <div>
            {sessionStorage.getItem("role")!=="USER" || sessionStorage.getItem("role")==="ADMIN" ? <h4>NOT FOUND</h4> : <>
            {isRead===false &&(
                <Row xs={1} md={2} lg={4} className="g-4">
                    {posts.map((post) => (
                        <Col key={post.id}>
                            <Card className="m-3">
                                <Card.Body>
                                    <Card.Text className="card-content" dangerouslySetInnerHTML={{ __html: getFirstThreeSentences(post.content) }} />
                                    <Button onClick={() =>  handleShowClick(post.id)}>
                                        Daha fazlası için oku
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {isRead && <BlogPage selectedPost={data}></BlogPage>}</>}

        </div>

    );
}

export default Blog;
