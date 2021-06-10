import SearchResults from './SearchResults';
import { Navbar, Button, Form, FormControl } from 'react-bootstrap';
import { useState, useRef } from 'react';
import axios from 'axios';


export default function Home() {

    const [loader, setLoader] = useState(false);
    const [searchData, setSearchData] = useState();
    const inputRef = useRef(null);

    function Loader() {
        return (
            <div className="spin" style={{ color: 'white', textAlign: 'center', margin: '200px' }}><span className="fas fa-spinner fa-pulse fa-2x"></span></div>
        )
    }

    const handleClick = (event) => {
        event.preventDefault();
        console.log(inputRef.current?.value);
        setLoader(true);
        axios
            .get("http://hn.algolia.com/api/v1/search?query=" + inputRef.current?.value + "&tags=story&hitsPerPage=10&page=0")
            .then((response) => {
                console.log(response.data);
                setSearchData(response.data);
                setTimeout(function () { setLoader(false); }, 500);

            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <div className="container" style={{ marginTop: '150px' }}>
            <header>
                <Navbar className="nav" variant="dark" fixed="top">

                    <Navbar.Brand href="/" style={{ fontSize: '25px', fontFamily: "cursive" }}>Hacker News</Navbar.Brand>

                    <Form inline onSubmit={handleClick}>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" ref={inputRef} required />
                        <Button style={{ margin: 'auto' }} onClick={handleClick}>Search</Button>
                    </Form>

                    <p style={{ marginTop: "20px", fontSize: "22px", color: "white" }}>Total Results : {searchData ? searchData.nbHits : 0}</p>
                </Navbar>
            </header>



            {loader ? (<Loader />) : searchData && <SearchResults results={searchData.hits} nPages={searchData.nbPages} query={inputRef.current?.value} />}

        </div>
    );
}