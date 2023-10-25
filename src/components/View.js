import React, { useEffect, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import './view.css';
import { useParams } from 'react-router-dom';
import { getEmployee } from '../service/allApis';
import { BASE_URL } from '../service/base_url';



function View() {
    //state to store single user data
    const [user, setUser] = useState({})

    const { id } = useParams()

    const getUser = async () => {
        const { data } = await getEmployee(id)
        console.log(data);
        setUser(data)

    }
    console.log(user);

    useEffect(
        () => {
            getUser()
        },
        [])


    return (
        <div id="view__body">
            {user ?
                < div className="container mt-5">
                    <Row>
                        <Col sm={12} md={6} lg={6}>
                            <div class="img__div">
                                <img width="350px" src={`${BASE_URL}/uploads/${user.profile}`} alt="" />
                            </div>
                        </Col>
                        <Col sm={12} md={6} lg={6}>

                            <ListGroup >
                                <ListGroup.Item className="my-2 text-capitalize"> <span>Full Name:  {user.fname + " " + user.lname}</span>  </ListGroup.Item>
                                <ListGroup.Item className="my-2 text-capitalize"> <span>Status: {user.status}</span> </ListGroup.Item>
                                <ListGroup.Item className="my-2"> <span>Mobile Number : {user.mobile}</span> </ListGroup.Item>
                                <ListGroup.Item className="my-2"> <span>Email : {user.email}</span> </ListGroup.Item>
                                <ListGroup.Item className="my-2 text-capitalize"><span>Gender : {user.gender}</span></ListGroup.Item>
                                <ListGroup.Item className="my-2 text-capitalize"><span>Location : {user.location}</span></ListGroup.Item>

                            </ListGroup>

                        </Col>
                    </Row>

                </div> : "No Employee"}
        </div>
    )
}

export default View