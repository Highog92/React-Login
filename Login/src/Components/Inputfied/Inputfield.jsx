import inputStyle from './Inputfield.module.scss'



export function Inputfield(props) {



    return (

        <>
            {/* // Props: Alle de ting der skal bruges i projektet skal skrives her for at man kan få det
            // Hvis label er true - så indsæt et label */}
            {props.labelText && <label>{props.labelText} </label>}
            {
                props.type === "submit" ? //Spørgsmåltegnet og Kolontegnet er lidt ligesom en switch. Login eller opret bruger
                    <input
                        className={inputStyle.inputField}
                        type={props.type}
                        value={props.value}
                    >
                    </input> :
                    <input
                        className={inputStyle.inputField}
                        type={props.type}
                        name={props.name}
                        placeholder={props.placeholder}
                        required={props.required}>
                    </input>
            }
        </>

    )
}
