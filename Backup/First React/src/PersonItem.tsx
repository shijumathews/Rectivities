import React from "react";
import Person from './Person';



interface Props{
    person:Person;
}
export function PersonItem({person}:Props)
{
    return (
            <div>
                <p>{person.Name}</p>
                <p>{person.Age}</p>
                <p>{person.MakeIdentity(person.Name)}</p>
          </div>
    );
}

export default PersonItem;