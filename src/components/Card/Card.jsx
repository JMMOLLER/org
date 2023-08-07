import "./Card.css";

export default function Card(props) {
    try{
        const response = propValidation(props);
        if(!response.isValid) throw new Error(response.msg);
        return (
            <div className="Card">
                <div className="header_card"></div>
                <img src={props.img} alt={"image profile"} />
                <div className="content_card">
                    <h3>{props.fullName}</h3>
                    <p>{props.position}</p>
                </div>
            </div>
        );
    }catch(error){
        console.warn(error.message);
        return null;
    }
}

function propValidation(props){

    const response = {
        isValid: false,
        msg: "",
    };

    if(!props.img) response.msg = "Field 'Img' is missing or empty";
    else if(!props.fullName) response.msg = "Field 'fullName' is missing or empty";
    else if(!props.position) response.msg = "Field 'position' is missing or empty";
    else response.isValid = true;

    return response;
}