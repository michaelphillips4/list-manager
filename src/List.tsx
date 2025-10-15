import type { Schema } from "../amplify/data/resource";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { AddNewListButton } from "./components/AddNewListButton";
import { ListEditor } from "./components/ListEditor";

const client = generateClient<Schema>();

type List = Schema["List"]["type"];
type Item = Schema["Item"]["type"];
type listItem = { id: string, name: string, description: string, listId: string };

const getListItems = (listItems: Item[], listId: string): listItem[] | undefined => listItems
    .filter(i => i.listId === listId)
    .map(i => ({
        ...i,
        name: i.name ?? "",
        description: i.description ?? "",
        listId: i.listId ?? "",
        id: i.id ?? ""
    }));


export default function List() {
    const [lists, setLists] = useState<List[]>([]);
    const [listItems, setListItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setIsLoading(true);
        fetchData();
    }, []);

    const fetchData = async () => {
        const listData = await client.models.List.list();
        const itemData = await client.models.Item.list();
        setLists(listData.data);
        setListItems(itemData.data);
        setIsLoading(false);
    };

    const changeListItems = async (id: string, values: string[]) => {

        const itemsToChange = listItems.filter(i => i.listId === id);
        console.log(isLoading, "changing items for list", id, values.length, itemsToChange.length);

        // Delete items that are not in the new values
        for (const item of itemsToChange) {
            await client.models.Item.delete(item);
        }

        // Add or update items
        for (const value of values) {
            // Create new item
            await client.models.Item.create({
                name: value,
                description: "",
                listId: id
            });
        }

    };

    const createList = async (name: string) => {
        await client.models.List.create({
            name: name,
        });
        fetchData();
        console.log("add list ");
    };


    const deleteList = async (id: string) => {
        const listToDelete = lists.find(todo => todo.id === id);
        if (listToDelete) {

            console.log("deleting list and items");
            const itemsToDelete = listItems.filter(i => i.listId === id);
            for (const item of itemsToDelete) {
                await client.models.Item.delete(item);
            }
            await client.models.List.delete(listToDelete);
            fetchData();
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
        fetchData();
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }


    if (lists.length === 0) {
        return (
            <>
                <AddNewListButton action={createList} />

                <p>No items yet</p>
            </>
        );
    } else {

        return (
            <>
                <AddNewListButton action={createList} />

                <ol>
                    {lists.map((list, index) => (

                        <li key={index} className="lists">

                            <ListEditor
                                listId={list.id}
                                listName={list.name ?? ""}
                                changeListItems={changeListItems}
                                items={getListItems(listItems, list.id)}
                                deleteList={deleteList}
                                editList={editList}
                            />
                        </li>
                    ))}
                </ol>
            </>
        );

    }

}


