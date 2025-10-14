import type { Schema } from "../amplify/data/resource";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { AddNewListButton } from "./components/AddNewListButton";
import { ListRowEditor } from "./components/ListRowEditor";



const client = generateClient<Schema>();

type List = Schema["List"]["type"];
type Item = Schema["Item"]["type"];

export default function List() {
    const [lists, setLists] = useState<List[]>([]);
    const [listItems, setListItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const sub1 = client.models.Item.observeQuery().subscribe({
            next: ({ items }) => {
                setListItems([...items]);
                const sub = client.models.List.observeQuery().subscribe({
                    next: ({ items }) => {
                        setLists([...items]);
                        return  sub.unsubscribe()
                    },
                });
            },
        });



        return () =>  sub1.unsubscribe() ;
    }, []);

    useEffect(() => {
        setIsLoading(false);
        console.log(isLoading, "lists", lists.length, "items", listItems.length);

    }, []);
    useEffect(() => {
        setIsLoading(false);
        console.log("stuff", isLoading, "lists", lists.length, "items", listItems.length);

    }, [listItems, lists]);

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

        const x = await client.models.List.create({
            name: name,

        });


        const createItems = async (listId: string) => {
            await client.models.Item.create({
                name: "a",
                description: "first item",
                listId: listId
            });
            await client.models.Item.create({
                name: "b",
                description: "second item",
                listId: listId
            });
            await client.models.Item.create({
                name: "c",
                description: "third item",
                listId: listId
            });
        }


        const ix = x.data?.id;
        console.log("add list ", ix, lists.length, listItems.length);
        createItems(ix || "a");

    };


    const deleteList = async (id: string) => {
        const listToDelete = lists.find(todo => todo.id === id);
        if (listToDelete) {
            const confirm = window.confirm(`Are you sure you want to delete "${listToDelete?.name}"?`);

            if (confirm) {

                console.log("deleting list and items");
                /*   const itemsToDelete = listItems.filter(i => i.listId === id)  ;
                  for (const item of itemsToDelete) {
                      await client.models.Item.delete(item);
                  }        */

                await client.models.List.delete(listToDelete);
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

                        <li key={index}>

                            <ListRowEditor
                                listId={list.id}
                                listName={list.name ?? ""}
                                changeListItems={changeListItems}
                                items={listItems
                                    .filter(i => i.listId === list.id)
                                    .map(i => ({
                                        ...i,
                                        name: i.name ?? "",
                                        description: i.description ?? "",
                                        listId: i.listId ?? "",
                                        id: i.id ?? ""
                                    }))
                                }
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

