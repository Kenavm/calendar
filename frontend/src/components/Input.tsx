function Input(props: {className: string, type: string, onChange: Function}) {
    return <input type={props.type} className={props.className}></input>
}

export default Input