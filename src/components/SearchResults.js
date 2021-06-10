import { React, useState, useEffect } from "react";
import { Card, Pagination } from 'react-bootstrap';
import './style.css';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

export default function SearchResults({ results, nPages, query }) {


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageLimit,setPageLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const history = useHistory();


    function Loader() {
        return (
            <div className="spin" style={{ color: 'white', textAlign: 'center', margin: '200px' }}><span className="fas fa-spinner fa-pulse fa-2x"></span></div>
        )
    }


    const changePage = (pageNumber) => {
        
        if(pageNumber === currentPage || nPages === 0){
            return;
        }
        setCurrentPage(pageNumber);
        setLoading(true);
        axios
            .get("http://hn.algolia.com/api/v1/search?query=" + query + "&tags=story&hitsPerPage=10&page="+(pageNumber-1))
            .then((response) => {
                console.log(response.data);
                setData(response.data.hits);
               setLoading(false);

            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }


    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        if (currentPage>=1 && currentPage<=5) {
            start = 0;
        }
        else if (currentPage<=nPages && currentPage>=nPages-4) {
            start = nPages-5;
        }
        

        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };

    const handleClick = (id) =>{
        
        console.log(id);
        history.push("/post/"+id);

    }

    useEffect(() => {
        setData(results);
        if(pageLimit>nPages){
            setPageLimit(nPages);
        }
    }, [results,nPages,pageLimit]);



    return (
        <div className="container" style={{ marginTop: '150px' }}>
            <div className="row mt-2 justify-content-center">

                {
                    loading ? (<Loader />) : data ? data.map((item) => {
                        return (

                            <Card key={item.objectID} className="user-card col-12 m-2 " onClick={()=> handleClick(item.objectID)}>
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
                <Pagination style={{position:'fixed','bottom':0}}>

                    <Pagination.First onClick={() => changePage(1)} />
                    <Pagination.Prev onClick={() => changePage(currentPage-1)} className={`prev ${currentPage === 1 ? 'disabled' : ''}`} />

                    <Pagination.Ellipsis className={currentPage === 1 || nPages<=5? 'hidden' : ''}/>

                    {getPaginationGroup().map((item, index) => (
                        <Pagination.Item
                            key={index}
                            onClick={() => changePage(item)}
                            className={`${currentPage === item ? 'active' : null}`}
                        >
                            <span>{item}</span>
                        </Pagination.Item>
                    ))}

                    <Pagination.Ellipsis className={currentPage === nPages || nPages<=5? 'hidden' : ''}/>

                    <Pagination.Next onClick={() => changePage(currentPage+1)} className={`next ${currentPage === nPages ? 'disabled' : ''}`} />
                    <Pagination.Last onClick={() => changePage(nPages)}/>

                </Pagination>
            </div>
        </div>
    );
}