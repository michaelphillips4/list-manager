
import React, { useState } from 'react';    

export const ListRowEditor = (
    { id,
        name,
        deleteList,
        editList }:
        {
            id: string,
            name: string,
            deleteList: (id: string) => {},
            editList: (id: string, value: string) => {}
        }) => {

    const [showEdit, setShowEdit] = useState(false);
    const [nameValue, setNameValue] = useState(name);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(event.target.value);
    };
    return (
        <>

            {showEdit ?
                <>
                    <fieldset>
                        <legend>Edit List:</legend>
                        <label htmlFor="name">List Name</label>
                        <input type="text" name="name" id="name" value={nameValue} onChange={handleChange} placeholder="List name" />
                        <button onClick={() => {
                            editList(id, nameValue);
                            setShowEdit(!showEdit)
                        }
                        }>Save</button>
                    </fieldset>
                </>
                : <div className="list-row">

                    <span className="list-row-text">{name}</span>

                    <button onClick={() => deleteList(id)}>Delete</button>
                    <button onClick={() => setShowEdit(!showEdit)} >Edit</button>

                </div >
            }

        </>

    );
}


