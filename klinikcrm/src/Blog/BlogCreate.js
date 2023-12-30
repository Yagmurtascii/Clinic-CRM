import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {Button, Nav, Tab, Tabs} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import '../App.css';

function BlogCreate({post}) {
    const [editorData, setEditorData] = useState('');
    useEffect(() => {
        if (post && post.content) {
            setEditorData(post.content);
        } else {
            setEditorData("");
        }
    }, [post]);
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
    };
    const handleSave = async () => {
        try {
            let url = "http://localhost:8080/posts/"
            let method = "POST"
            if (post && post.id) {
                await fetch('http://localhost:8080/posts/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: post.id,
                        content: editorData
                    }),
                });
                window.location.href = "/blogMain"
            } else {
                await fetch('http://localhost:8080/posts/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({content: editorData}),
                });
                window.location.href = "/blogMain"
            }


        } catch (error) {
            console.error('Error saving post:', error);
            alert('Error saving post');
        }
    };


    return (

        <div className="justify-content-center m-5">
            {sessionStorage.getItem("role")==="USER" || sessionStorage.getItem("role")!=="ADMIN" ? <h4>NOT FOUND</h4> : <>
            <Tabs
                defaultActiveKey="home"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="home" title="Editör">
                    <CKEditor
                        editor={ClassicEditor}
                        data={editorData}
                        onChange={handleEditorChange}
                    />
                </Tab>
                <Tab eventKey="preview" title="Görünüm">
                    <div>
                        <div dangerouslySetInnerHTML={{__html: editorData}}/>
                    </div>
                    <Button onClick={handleSave} className="mt-5">
                        KAYDET
                    </Button>
                </Tab>

            </Tabs></>}


        </div>


    )
}

export default BlogCreate;
