import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { BASE_URL } from '../service/base_url';


function TableC({ employees, removeEmp }) {
    return (
        <div>
            <Table striped bordered hover className='table table-hover'>
                <thead className='table table-hover' >
                    <tr>
                        <th>No</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Status</th>
                        <th>Profile</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className='table-dark'>
                    {employees?.length > 0 ? employees.map((i, index) => (
                        <tr >
                            <td>{index + 1}</td>
                            <td class="text-capitalize">{i.fname + " " + i.lname}</td>
                            <td> {i.email}</td>
                            <td>{i.mobile}</td>
                            <td> <Button variant="btn btn-primary">{i.status}</Button></td>
                            <td>
                                <div>
                                    <img src={`${BASE_URL}/uploads/${i.profile}`} alt="" height="30px" width="30px" />

                                </div>
                            </td>
                            <td>
                                <div class="dropdown">
                                    <button style={{ borderRadius: '12px' }} class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa-solid fa-list"></i>
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a class="dropdown-item" href={`/view/${i._id}`}><i class="fa-solid fa-eye"></i> View</a></li>
                                        <li><a class="dropdown-item" href={`/edit/${i._id}`}><i class="fa-solid fa-pen-to-square"></i> Edit</a></li>
                                        <li><div class="dropdown-item" onClick={() => removeEmp(i._id)} ><i class="fa-solid fa-trash"></i> Delete</div></li>
                                    </ul>
                                </div>

                            </td>
                        </tr>
                    ))
                        : "no employees are present"}

                </tbody>
            </Table>
        </div >
    )
}

export default TableC