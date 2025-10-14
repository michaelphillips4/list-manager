

import { useEffect, useId, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type item = { id: string, name: string, description: string, listId: string };

export const ListRowEditor = (
    { listId,
        listName,
        deleteList,
        editList,
        changeListItems,
        items }:
        {
            listId: string,
            listName: string,
            deleteList: (id: string) => {},
            editList: (id: string, value: string) => {},
            changeListItems: (id: string, values: string[]) => {},
            items: item[] | undefined
        }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [showEdit, setShowEdit] = useState(false);
    const [listNameValue, setListNameValue] = useState("");
    const [listItems, setlistItems] = useState([] as item[] | undefined);

    useEffect(() => {
        setIsLoading(false);
        setListNameValue(listName);
        setlistItems(items);
    }, []);


    useEffect(() => {
        if (!isLoading) {
            changeListItems(listId, listItems?.map(i => i.name) || []);
        }

    }, [listItems]);

    const listNameId = useId()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setListNameValue(event.target.value);
    };


    return (
        <>
            {showEdit ?
                <>
                    <fieldset>
                        <legend>Edit List:</legend>
                        <div className='list-row'>
                            <label htmlFor={listNameId}>List Name</label>
                            <input type="text" name="name" id={listNameId} value={listNameValue} onChange={handleChange} placeholder="List name" className='list-item-grow' />

                            <button onClick={() => { setlistItems([{ id: uuidv4(), name: "", description: "", listId: listId }, ...listItems ?? []]) }}>Add item</button>
                        </div>
                        <ol>
                            {listItems?.map((x, i) => (
                                <li key={x.id} className='list-row'>
                                    <input type='text' value={listItems[i].name} className='list-item-grow' placeholder='item name'
                                        onChange={e => {
                                            listItems[i].name = e.target.value;
                                            setlistItems([...listItems]);
                                        }} />
                                    <button onClick={() => setlistItems(listItems.filter(e => e.id !== x.id))} >Remove</button>
                                </li>
                            ))}</ol>
                        <button onClick={() => {
                            editList(listId, listNameValue);
                            setShowEdit(!showEdit)
                        }
                        }>Save</button>
                        <button onClick={() => {
                            setShowEdit(!showEdit)
                        }
                        }>Cancel</button>



                    </fieldset>
                </>
                : <div className="list-row">

                    <span className="list-row-text">{listName}</span>

                    <button onClick={() => deleteList(listId)}>Delete</button>
                    <button onClick={() => setShowEdit(!showEdit)} >Edit</button>

                </div >
            }

        </>

    );
}


