import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const CustomInfiniteScroll = () => {

    const [currPage, setCurrPage] = useState(1); // storing current page number
    const [prevPage, setPrevPage] = useState(0); // storing prev page number
    const [userList, setUserList] = useState([]); // storing list
    const [wasLastList, setWasLastList] = useState(false); // setting a flag to know the last list

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `https://api.instantwebtools.net/v1/passenger?page=${currPage}&size=10`
            );
            console.log(response.data, response.data.totalPages, "data")
            if (!response.data.data.length) {
                setWasLastList(true);
                return;
            }
            setPrevPage(currPage);
            setUserList([...userList, ...response.data.data]);
        };
        if (!wasLastList && prevPage !== currPage) {
            fetchData();
        }
    }, [currPage, wasLastList, prevPage, userList]);


    const listInnerRef = useRef();
    const onScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            console.log(scrollTop, scrollHeight, clientHeight, "%%")
            if (scrollTop + clientHeight === scrollHeight) {
                setCurrPage(currPage + 1);
            }
        }
    };

    return (
        <>
            <Link to="/">Back to Home</Link>
            <div>
                <div
                    onScroll={onScroll}
                    ref={listInnerRef}
                    style={{ height: "100vh", overflowY: "auto" }}
                >
                    {userList.map((item, index) => {
                        return (
                            <div
                                key={index}
                                style={{
                                    marginTop: "40px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column"
                                }}
                            >
                                <p>Id: {item._id}</p>
                                <p>Name: {item.name}</p>
                                <p>Trips: {item.trips}</p>
                                <p>Airline: {item.airline.map((item, id) => {
                                    return (
                                        <div style={{ padding: "5px" }}>
                                            <div style={{ margin: "5px" }}>
                                                {item.name}
                                                <img src={item.logo} alt="logo" />
                                            </div>
                                        </div>

                                    )
                                })}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}

export default CustomInfiniteScroll