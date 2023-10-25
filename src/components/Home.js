import React, { useContext, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import TableC from './TableC'
import Spinner from './Spinner';
import { deleteContext, registerContext, updateContext } from '../employeeContext/ContextShare';
import Alert from 'react-bootstrap/Alert';
import { getAllEmployees, removeEmployee } from '../service/allApis';






function Home() {
    // state to store search data
    const [search, setSearch] = useState("")
    console.log(search);

    //state to store all employees
    const [allEmployees, setAllEmployees] = useState([])


    // state to handel spinner
    const [showSpin, setSpin] = useState(false)
    const variant = 'success';

    // to get context
    const { registerData, setRegisterData } = useContext(registerContext)
    //to get delete context
    const { deleteData, setDeleteData } = useContext(deleteContext)
    // to get update context
    const { updateData, setUpdate } = useContext(updateContext)

    //api call to get all employees
    const getEmployees = async () => {

        const response = await getAllEmployees(search)
        // console.log(response.data);
        setAllEmployees(response.data)
    }
    // console.log(allEmployees);

    //function to delete employee
    const deleteEmployee = async (id) => {
        const { data } = await removeEmployee(id)
        //data to context 
        setDeleteData(data)
        //refresh the table content
        getEmployees()
    }
    console.log(deleteData);


    // true the value after 2 sec
    useEffect(() => {
        getEmployees()

        setTimeout(() => {
            setSpin(true)
        }, 2000);

    }, [search])
    // useffect will  work according to the search state

    // console.log(showSpin);

    return (
        <div >
            {
                updateData ?
                    <Alert style={{ borderRadius: '12px' }} onClose={() => setRegisterData("")} key={variant} variant={variant} className='w-50 text-center container mt-1 text-capitalize' dismissible>
                        Update Success..
                    </Alert> : ""
            }
            {
                registerData ?
                    <Alert style={{ borderRadius: '12px' }} onClose={() => setRegisterData("")} key={variant} variant={variant} className='w-50 text-center container mt-1 text-capitalize' dismissible>
                        {registerData.fname} is added successfully
                    </Alert> : ""
            }
            {
                deleteData ?
                    <Alert style={{ borderRadius: '12px' }} onClose={() => setRegisterData("")} key={variant} variant='danger' className=' w-50 text-center container mt-1 text-capitalize' dismissible>
                        {deleteData.fname} is deleted successfully
                    </Alert> : ""
            }
            <div class='w-25 ms-5 mt-4 d-flex' >


                <input onChange={e => setSearch(e.target.value)} style={{ borderRadius: '12px' }} class='form-control ' type="email" placeholder="Search employee" ></input>
            </div >
            <div class="text-end me-5">
                <Link to={"/add"} ><button style={{ borderRadius: '12px' }} type="button" class="btn btn-outline-primary"> Add Employee  <i class="fa-solid fa-user-plus fa-fade"></i></button></Link>


            </div>
            <div className="mt-5 text-center  container">
                <h2 className="mt-5 ms-5 mb-4">List Of Employees</h2>

                <div>
                    {
                        showSpin ? <TableC employees={allEmployees} removeEmp={deleteEmployee}></TableC> : <Spinner></Spinner>
                    }

                </div>

            </div>


        </div >

    )
}

export default Home