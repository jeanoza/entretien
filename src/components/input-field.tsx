interface InputFieldProps {
    name:string;
    value?:string;
    setValue: (value: string) => void;
}
export default function InputField(props:InputFieldProps) {
    function handleChange({target:{value}}: { target: { value: string; }; }) {
        props.setValue(value);
    }
    return <div>
        <label>{props.name}</label>
        <input defaultValue={props.value} onChange={handleChange} />
    </div>;
}