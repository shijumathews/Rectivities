import React from "react";

export interface Person {
    Name:string,
    Age: number
    MakeIdentity:(Key:string)=>string
}
export default Person;