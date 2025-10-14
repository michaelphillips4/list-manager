import React, { useState } from 'react';    

export const AddListEditor = ({ action }: { action: (name: string) => {} }) => {
    const [nameValue, setNameValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(event.target.value);
    };
    return (
        <>
            <fieldset>
                <legend>Add new list:</legend>
                <label htmlFor="name">List Name</label>
                <input type="text" name="name" id="name" value={nameValue} onChange={handleChange} placeholder="List name" />
                <button onClick={() => { action(nameValue); setNameValue("") }}>Add new list</button>
            </fieldset>
        </>
    );
}