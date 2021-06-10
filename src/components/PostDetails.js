import { React, useState, useEffect } from "react";
import { Card } from 'react-bootstrap';
import './style.css';
import axios from 'axios';


export default function PostDetails(props) {

    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);
    
    function Loader() {
        return (
            <div className="spin" style={{ color: 'blue', textAlign: 'center', margin: '200px' }}><span className="fas fa-spinner fa-pulse fa-2x"></span></div>
        )
    }

    const fetchData = () => {
        setLoader(true);
        axios
            .get("http://hn.algolia.com/api/v1/items/" + props.match.params.id)
            .then((response) => {
                console.log(response.data);
                // setSearchData(response.data);
                setTimeout(function () { setLoader(false); }, 500);

            })
            .catch((error) => {
                console.log(error);
            });
    }

    


    
    useEffect(() => {
        console.log(props.match.params.id)

        fetchData();
        // setData(results);
        // if(pageLimit>nPages){
        //     setPageLimit(nPages);
        // }
    }, [props.match.params.id]);



    return (
        <div className="container" style={{ marginTop: '150px' }}>
            <p>HELLO</p>
            <div className="row mt-2 justify-content-center">

                {
                    loader ? (<Loader />) : data ? data.map((item) => {
                        return (

                            <Card key={item.objectID} className="user-card col-12 m-2 ">
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>{new Date(item.created_at).toLocaleDateString()}</Card.Text>

                                    <Card.Text style={{ width: "50%", margin: 'auto', 'overflow': 'hidden', 'whiteSpace': 'nowrap', 'textOverflow': 'ellipsis' }}>
                                        <a href={item.url}>{item.url}</a>
                                    </Card.Text>

                                    <Card.Text>{"Author : " + item.author + "  |  Points : " + item.points + "  |  Comments : " + item.num_comments}</Card.Text>

                                </Card.Body>
                            </Card>
                        )
                    }) : ""
                }
          
            </div>
        </div>
    );
}