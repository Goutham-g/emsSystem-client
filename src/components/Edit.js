import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { editEmployee, getEmployee } from '../service/allApis';
import { BASE_URL } from '../service/base_url';
import { updateContext } from '../employeeContext/ContextShare';



function Edit() {
    // state to hold existing img
    const [existingImg, setExistImg] = useState("")
    //access data of single employee
    const { id } = useParams()
    // console.log(id);
    //use the context
    const { updateData, setUpdate } = useContext(updateContext)

    // 
    const getEmployeeData = async () => {
        let { data } = await getEmployee(id)
        setUserData(data)
        // setImage(data.profile)
        setExistImg(data.profile)

    }
    useEffect(
        () => {
            getEmployeeData()
        }
        , [])


    //state to hold image data
    const [Image, setImage] = useState("")




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
    // console.log(userData);


    //create a function to store image
    const setProfile = (e) => {
        setImage(e.target.files[0])
    }
    // console.log(Image);

    //  state to store preview image
    const [preview, setPreview] = useState('')
    const pramas
        =

        useEffect(() => {
            if (Image) {
                //if user input new image then reset the existing image
                setExistImg("")

                setPreview(URL.createObjectURL(Image))
            }

        }, [Image])

    //  create function for handle submit button
    const handleEdit = async (e) => {


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
        else if (Image == "" && existingImg == "") {
            toast.error('Image required')

        }
        else if (location == "") {
            toast.error('location required')

        }
        else {
            // //  add datas in formData
            Image ? data.append('user_profile', Image) : data.append('user_profile', existingImg)
            data.append('fname', fname)
            data.append('lname', lname)
            data.append('email', email)
            data.append('gender', gender)
            data.append('mobile', mobile)
            data.append('status', status)
            data.append('location', location)
            // console.log(data);

            //api call
            const response = await editEmployee(id, headerConfig, data)

            if (response.status == 200) {



                //update context
                setUpdate(response.data)


                //  navigate to home
                navigate('/')

                //     //reset userData and Image
                //     setUserData({
                //         ...userData, fname: "",
                //         lname: "",
                //         email: "",
                //         gender: "",
                //         mobile: "",
                //         status: "",
                //         location: ""
                //     })
                //     setImage("")

            }
            else {
                alert('Update error')
                // console.log(response.response.data);
                // setErrorMsg(response.response.data)
            }


        }







    }
    const variant = 'danger';


    return (
        <div >


            <h1 class="text-center mt-2">Edit Employee Details</h1>
            <Form class='container p-5 w-75'>
                <div class='p-2 text-center'>
                    <div class="text-center mt-1 mb-3">
                        <img class="rounded-circle" src={preview ? preview : `${BASE_URL}/uploads/${existingImg}`} alt="" width="150px" height="150px" />
                    </div>
                    <Row>
                        <Col sm={12} md={6} lg={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="First Name"
                                className="mb-3 ">
                                <Form.Control aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm" onChange={userDetails} name="fname" value={userData.fname} id="first__name" required type="text" placeholder="First Name" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Last Name" className="my-3">
                                <Form.Control onChange={userDetails} required type="text" placeholder="Last Name" value={userData.lname} name="lname" id="last__name" />
                            </FloatingLabel>
                            <br />
                            <h6>Gender</h6>
                            <Form.Check
                                onChange={userDetails}
                                checked={userData.gender == 'male' ? true : false}//for fill radio button
                                type="radio"
                                label="Male"
                                name="gender"
                                id="formHorizontalRadios1"
                                value={'male'}
                            />
                            <Form.Check
                                onChange={userDetails}
                                checked={userData.gender == 'female' ? true : false}
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
                                <Form.Control onChange={userDetails} required type="email" placeholder="name@example.com" value={userData.email} name="email" id="e_mail" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Mobile Number" className="my-3">
                                <Form.Control onChange={userDetails} name="mobile" value={userData.mobile} id="mobile_number" required placeholder="Mobile Number" />
                            </FloatingLabel>
                            <br />
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Select Employee Status</Form.Label>
                                <Form.Select value={userData.status} onChange={userDetails} defaultValue="Choose..." name="status">
                                    <option value={''} >Select...</option>
                                    < option value={'active'}>Active</option>
                                    <option value={'inactive'}>Inactive</option>
                                </Form.Select>
                            </Form.Group>
                            <br />
                            <FloatingLabel label="Enter Employee Location" className="my-3">
                                <Form.Control onChange={userDetails} value={userData.location} name='location' id="loc" required placeholder="Enter location" />
                            </FloatingLabel>

                        </Col>
                        <div class="text-center mb-5">
                            <button onClick={handleEdit} type="submit" class="btn btn-primary">Update</button>
                        </div>
                    </Row>

                </div>
            </Form >
            <ToastContainer position="top-center" theme="dark" />
        </div >
    )
}

export default Edit





