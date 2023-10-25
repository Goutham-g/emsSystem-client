import React, { Children, createContext, useState } from 'react'

// create context  object 

export const registerContext = createContext()
// create context for delete alert
export const deleteContext = createContext()

export const updateContext = createContext()



function ContextShare({ children }) {
    const [registerData, setRegisterData] = useState("")
    const [deleteData, setDeleteData] = useState("")
    const [updateData, setUpdate] = useState("")

    return (
        <div>
            <updateContext.Provider value={{ updateData, setUpdate }}>
                <deleteContext.Provider value={{ deleteData, setDeleteData }}>
                    <registerContext.Provider value={{ registerData, setRegisterData }} >
                        {children}</registerContext.Provider>
                </deleteContext.Provider>
            </updateContext.Provider>
        </div >
    )
}

export default ContextShare