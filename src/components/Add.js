import React, { useContext, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { registerApi } from '../service/allApis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { registerContext } from '../employeeContext/ContextShare';





function Add() {
    // to get context
    const { registerData, setRegisterData } = useContext(registerContext)
    // so it become normal usestate 

    //state to hold image data
    const [Image, setImage] = useState('')

    // state to hold error responsee
    const [errorMsg, setErrorMsg] = useState('')


    // state to hold all other input datas enter by user

    const [userData, setUserData] = useState({
        fname: "",
        lname: "",
        email: "",
        gender: "",
        mobile: "",
        status: "",
        location: ""
    })
    //  create an object for useNavigate
    const navigate = useNavigate()


    //functon to update userdata
    const userDetails = (e) => {
        // let value = e.target.value
        // let name = e.target.name
        //destructure >>
        let { value, name } = e.target
        setUserData({ ...userData, [name]: value })



    }
    console.log(userData);


    //create a function to store image
    const setProfile = (e) => {
        setImage(e.target.files[0])
    }
    // console.log(Image);

    //  state to store preview image
    const [preview, setPreview] = useState('')

    useEffect(() => {
        if (Image) {
            setPreview(URL.createObjectURL(Image))
        }

    }, [Image])

    //  create function for handle submit button
    const handelSubmit = async (e) => {


        e.preventDefault()

        //   header - contentType:multipart/form-data
        const headerConfig = {
            "Content-Type": "multipart/form-data"
        }

        //  body form data
        const data = new FormData()

        //  access datas from userData
        const { fname, lname, email, gender, mobile, status, location } = userData

        // toast conditions

        if (fname == "") {
            toast.error('FirstName required')
        }
        else if (lname == "") {
            toast.error('lname required')

        }
        else if (email == "") {
            toast.error('email required')

        }
        else if (gender == "") {
            toast.error('gender required')

        }
        else if (mobile == "") {
            toast.error('mobile required')

        }
        else if (status == "") {
            toast.error('status required')

        }
        else if (Image == "") {
            toast.error('Image required')

        }
        else if (location == "") {
            toast.error('location required')

        }
        else {
            //  add datas in formData
            data.append('user_profile', Image)
            data.append('fname', fname)
            data.append('lname', lname)
            data.append('email', email)
            data.append('gender', gender)
            data.append('mobile', mobile)
            data.append('status', status)
            data.append('location', location)

            //api call
            const response = await registerApi(headerConfig, data)
            console.log(response);
            if (response.status == 200) {
                // alert('Employee added')

                // update context
                setRegisterData(response.data)


                //  navigate to home
                navigate('/')

                //reset userData and Image
                setUserData({
                    ...userData, fname: "",
                    lname: "",
                    email: "",
                    gender: "",
                    mobile: "",
                    status: "",
                    location: ""
                })
                setImage("")

            }
            else {
                // alert('Employee already exist')
                // console.log(response.response.data);
                setErrorMsg(response.response.data)
            }


        }







    }
    const variant = 'danger';


    return (
        <div >
            {errorMsg ?

                <Alert onClose={() => setErrorMsg("")} key={variant} variant={variant} style={{ borderRadius: '12px' }} className='w-50 text-center container mt-1' dismissible>
                    {errorMsg}
                </Alert>
                : ""
            }

            <h1 class="text-center mt-2">Register Employee Details</h1>
            <Form class='container p-5 w-75'>
                <div class='p-2 text-center'>
                    <div class="text-center mt-1 mb-3">
                        <img class="rounded-circle" src={preview ? preview : "https://i.postimg.cc/bYSqXqPP/4974985.png"} alt="" width="150px" height="150px" />
                    </div>
                    <Row>
                        <Col sm={12} md={6} lg={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="First Name"
                                className="mb-3 ">
                                <Form.Control aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm" onChange={userDetails} name="fname" id="first__name" required type="text" placeholder="First Name" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Last Name" className="my-3">
                                <Form.Control onChange={userDetails} required type="text" placeholder="Last Name" name="lname" id="last__name" />
                            </FloatingLabel>
                            <br />
                            <h6>Gender</h6>
                            <Form.Check
                                onChange={userDetails}
                                type="radio"
                                label="Male"
                                name="gender"
                                id="formHorizontalRadios1"
                                value={'male'}
                            />
                            <Form.Check
                                onChange={userDetails}
                                type="radio"
                                label="Female"
                                name="gender"
                                id="formHorizontalRadios2"
                                value={"female"}
                            />
                            <div class="my-3">
                                <label for="formFile" class="form-label">Choose Profile Picture</label>
                                <input onChange={setProfile} class="form-control" type="file" id="formFile" placeholder="" />
                            </div>
                        </Col>
                        <Col sm={12} md={6} lg={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3">
                                <Form.Control onChange={userDetails} required type="email" placeholder="name@example.com" name="email" id="e_mail" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Mobile Number" className="my-3">
                                <Form.Control onChange={userDetails} name="mobile" id="mobile_number" required placeholder="Mobile Number" />
                            </FloatingLabel>
                            <br />
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Select Employee Status</Form.Label>
                                <Form.Select onChange={userDetails} defaultValue="Choose..." name="status">
                                    <option value={''} >Select...</option>
                                    <option value={'active'}>Active</option>
                                    <option value={'inactive'}>Inactive</option>
                                </Form.Select>
                            </Form.Group>
                            <br />
                            <FloatingLabel label="Enter Employee Location" className="my-3">
                                <Form.Control onChange={userDetails} name='location' id="loc" required placeholder="Enter location" />
                            </FloatingLabel>

                        </Col>
                        <div class="text-center mb-5">
                            <button onClick={handelSubmit} type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </Row>

                </div>
            </Form >
            <ToastContainer position="top-center" theme="dark" />
        </div >

    )
}

export default Add