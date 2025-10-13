import type { Schema } from "../amplify/data/resource";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export default function List() {

    const [items, setItems] = useState<Schema["ListItem"]["type"][]>([]);

    useEffect(() => {
        const sub = client.models.ListItem.observeQuery().subscribe({
            next: ({ items }) => {
                setItems([...items]);
            },
        });

        return () => sub.unsubscribe();
    }, []);


    const createItem = async () => {
        await client.models.ListItem.create({
            content: window.prompt("Todo content?"),
            isDone: false,
        });

    };

    const deleteItem = async (id: string) => {
        const toDelete = items.find(todo => todo.id === id);
        if (toDelete) {
            const confirm = window.confirm(`Are you sure you want to delete "${toDelete?.content}"?`);
            if (confirm) {
                await client.models.ListItem.delete(toDelete);
            }

        }
    };

    const editItem = async (id: string) => {
        const toEdit = items.find(todo => todo.id === id);
        if (toEdit) {
            const newContent = window.prompt("Edit ?", toEdit.content ?? "");
            if (newContent && newContent !== toEdit.content) {
                await client.models.ListItem.update({
                    ...toEdit,
                    content: newContent,
                });
            }
        }
    };

    if (items.length === 0) {
        return (
            <div>
                <button onClick={createItem}>Add new item</button>
                <p>No items yet</p>
            </div>
        );
    } else {

        return (
            <div>
                <button onClick={createItem}>Add new item</button>
                <ul>
                    {items.map(({ id, content }) => (
                        <li key={id}>{content}
                            <p>
                                <button onClick={() => deleteItem(id)}>Delete</button>
                                <button onClick={() => editItem(id)}>Edit</button>
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        );

    }
}

