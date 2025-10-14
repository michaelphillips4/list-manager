 

export const AddNewListButton = ({ action }: { action: (name: string) => {} }) => {

    return (
        <>
          
                <button onClick={() =>  action("(new list)")}>Add new list</button>
           
        </>
    );
}