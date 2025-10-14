import type { Schema } from "../amplify/data/resource";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { AddListEditor } from "./components/AddListEditor";
import { ListRowEditor } from "./components/ListRowEditor";

const client = generateClient<Schema>();


export default function List() {
    const [lists, setLists] = useState<Schema["List"]["type"][]>([]);

    const createList = async (name: string) => {
        await client.models.List.create({
            name: name,
        });

    };

    const deleteList = async (id: string) => {
        const toDelete = lists.find(todo => todo.id === id);
        if (toDelete) {
            const confirm = window.confirm(`Are you sure you want to delete "${toDelete?.name}"?`);
            if (confirm) {
                await client.models.List.delete(toDelete);
            }

        }
    };

    const editList = async (id: string, name: string) => {
        const toEdit = lists.find(l => l.id === id);
        if (toEdit) {

            await client.models.List.update({
                ...toEdit,
                name: name,
            });
        }

    };


    useEffect(() => {
        const sub = client.models.List.observeQuery().subscribe({
            next: ({ items }) => {
                setLists([...items]);
            },
        });

        return () => sub.unsubscribe();
    }, []);






    if (lists.length === 0) {
        return (
            <>
                <AddListEditor action={createList} />

                <p>No items yet</p>
            </>
        );
    } else {

        return (
            <>
                <AddListEditor action={createList} />

                <ol>
                    {lists.map(({ id, name }) => (
                        <li key={id}>
                            <ListRowEditor id={id} name={name ?? ""} deleteList={deleteList} editList={editList} />
                        </li>
                    ))}
                </ol>
            </>
        );

    }

}

