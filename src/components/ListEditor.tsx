
import Dialog from '../Dialog';
import { useEffect, useId, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


import { FaTrash,FaEdit,FaPlus } from "react-icons/fa";





type item = { id: string, name: string, description: string, listId: string };

export const ListEditor = (
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

    const [showEdit, setShowEdit] = useState(false);
    const [listNameValue, setListNameValue] = useState("");
    const [listItems, setlistItems] = useState([] as item[] | undefined);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {

        setListNameValue(listName);
        setlistItems(items);
    }, []);


    const listNameId = useId()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setListNameValue(event.target.value);
    };


    return (
        <>
            {showEdit ?
                <>

                    <div className='list-row-2'>
                        <label htmlFor={listNameId}>List Name</label>
                        <input type="text" name="name" id={listNameId} value={listNameValue} onChange={handleChange} placeholder="List name" className='list-item-grow' />

                        <button onClick={() => { setlistItems([{ id: uuidv4(), name: "", description: "", listId: listId }, ...listItems ?? []]) }}><FaPlus /></button>
                    </div>
                    <ol>
                        {listItems?.map((x, i) => (
                            <li key={x.id} className='list-row'>
                             
                                <input type='text' value={listItems[i].name}  className='list-item-grow' placeholder='item name'
                                    onChange={e => {
                                        listItems[i].name = e.target.value;
                                        setlistItems([...listItems]);
                                    }} />
                                <button onClick={() => setlistItems(listItems.filter(e => e.id !== x.id))} ><FaTrash /></button>
                            </li>
                        ))}</ol>
                    <div className='center'>
                        <button onClick={() => {
                            editList(listId, listNameValue);
                            changeListItems(listId, listItems?.map(i => i.name) || []);
                            setShowEdit(!showEdit)
                        }
                        }>Save</button>
                        <button onClick={() => {
                            setShowEdit(!showEdit)
                        }
                        }>Cancel</button></div>

                </>
                : <> <div className="list-row">

                    <span className="list-row-text center"><b>{listName}</b></span>
                    </div>
<ol>
                        {listItems?.map((x, i) => (
                            <li key={x.id} >{listItems[i].name}</li>
                        ))}
                    </ol>
                    <div className='center'>
                        <button onClick={() => setIsOpen(true)}><FaTrash /></button>
                        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                            <h3>Do you want to delete the list</h3>
                            <p>{listName}</p>
                            <button onClick={() => { deleteList(listId); setIsOpen(false) }}>Yes</button>
                        </Dialog>
                        <button onClick={() => setShowEdit(!showEdit)} ><FaEdit /></button>
                    </div >
              
                    
                </>
            }

        </>

    );
}


