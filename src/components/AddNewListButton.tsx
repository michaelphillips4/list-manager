 

export const AddNewListButton = ({ action }: { action: (name: string) => {} }) => {

    return (
        <>
          <div className="center" >
 <button onClick={() =>  action("(new list)")}>Add new list</button>
          </div>
               
           
        </>
    );
}