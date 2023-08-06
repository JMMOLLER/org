/* eslint-disable react/prop-types */
import "./Button.css"

// type props {
//     type: String,
//     text: String
// }

export default function Button(props/*: props*/) {
    try{
        const response = validateProps(props);

        if(!response.isValid) throw new Error(response.msg);

        return <button type={props.type}>{props.text}</button>
    }catch(err){
        console.warn(err);
        return null;
    }
}

function validateProps(props/*: props*/){
    const response = {
        isValid: false,
        msg: ""
    }

    if(!props.text) response.msg = "Field 'text' is missing."
    else if(!props.type) response.msg = "Field 'type' is missing."
    else response.isValid = true;

    return response;
}