import { React, useState, useEffect } from "react";
import { Card } from 'react-bootstrap';
import './style.css';
import axios from 'axios';
import Collapsible from 'react-collapsible';



export default function PostDetails(props) {

    const [data, setData] = useState();
    const [children, setChildren] = useState([]);
    const [loader, setLoader] = useState(false);
    
    const options = { year: 'numeric', month: 'long', day: "numeric", hour: 'numeric', minute: 'numeric' };

    function Loader() {
        return (
            <div className="spin" style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}><span className="fas fa-spinner fa-pulse fa-2x"></span></div>
        )
    }

    const fetchData = () => {
        setLoader(true);
        axios
            .get("http://hn.algolia.com/api/v1/items/" + props.match.params.id)
            .then((response) => {
                // console.log(response.data);
                setData(response.data);
                setChildren(response.data.children);
                setLoader(false)

            })
            .catch((error) => {
                console.log(error);
            });
    }

    function Comment({ comment }) {
        return (
            <div style={{ textAlign: 'left' }}>
                <u>{comment.author + " | " + new Date(comment.created_at).toLocaleDateString([], options)}</u>
                <p dangerouslySetInnerHTML={{ __html: comment.text }}></p>
                <Collapsible
                    trigger={<p style={{ cursor: "pointer", textAlign: 'left' }}>{"Comments : " + comment.children.length}</p>}
                    transitionTime={200}
                >

                    <div style={{ 'padding': '0px 10px 0px 10px' }}>
                        {comment.children.length > 0 ? <Comments comments={comment.children} /> : ""}
                    </div>

                </Collapsible>
                {/* {comment.children.length > 0 && <Comments comments={comment.children} />} */}
            </div>
        )
    }


    function Comments({ comments }) {
        console.log("CHILD : " + comments);
        return (
            <ul>
                {
                    comments.length > 0 ? comments.map((c) => {
                        return <li><Comment key={c.id} comment={c} /></li>

                    }) : ""
                }
            </ul>
        )
    }



    useEffect(() => {

        fetchData();

    }, [props.match.params.id]);



    return (
        <div className="container">


            <h1 style={{ color: 'white', marginTop: "30px" }} className="row justify-content-center">{data ? data.title : ""}</h1>
            <h4 style={{ color: 'white', marginTop: "20px" }} className="row justify-content-center">{data ? 'Points : ' + data.points : ""}</h4>
            <h4 style={{ color: 'white', marginTop: "20px" }} className="row justify-content-center">{data && children ? 'Comments - ' + children.length : ""}</h4>
            <div className="row mt-2 justify-content-center">

                {
                    loader ? (<Loader />) : children ? children.map((item) => {
                        return (

                            <Card key={item.id} className="col-12 m-2 ">
                                <Card.Text style={{ "textAlign": 'left' }}>{item.author + " | " + new Date(item.created_at).toLocaleDateString([], options)}</Card.Text>
                                <hr style={{ margin: 0 }} />
                                <Card.Text style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: item.text }}></Card.Text>

                                <Collapsible
                                    trigger={<p style={{ cursor: "pointer", textAlign: 'left' }}>{"Comments : " + item.children.length}</p>}
                                    transitionTime={200}
                                >

                                    <div style={{ 'padding': '0px 30px 0px 30px' }}>
                                        {item.children.length > 0 ? <Comments comments={item.children} /> : ""}
                                    </div>

                                </Collapsible>


                            </Card>
                        )
                    }) : ""
                }

            </div>
        </div>
    );
}