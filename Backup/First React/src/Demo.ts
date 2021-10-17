import { randomInt } from "crypto"

import Person from './Person';
 
type  people= {
    Name:string,
    Age: number
    MakeIdentity:(Key:string)=>string
}

const Akhil:Person =
{
    Name:"Akhil Shiju",
    Age: 20,
    MakeIdentity:(Key:string):string=>
    {        
        return "01010138" + Key;
    }
}

const Shilpa:Person =
{
    Name:"Shilpa Shiju",
    Age: 20,
    MakeIdentity:(Key:string):string=>
    {        
        return "010101010" + Key;
    }
}

class Human implements  Person
{
    Name:string;
    Age: number;
    constructor (Name:string, Age:number) {
        this.Name = Name;
        this.Age = Age;
    }

   MakeIdentity(Key:string):string
    {     

        return "010101010" + Key;
    }
}

let human:Human = new Human("77897",45);


const Family:Person[] = 
[     
    Akhil,
    Shilpa    
]
export default Family;



