function Popup(props: {name: string, className: string} ) {
    return(
        <div className={props.className}>
            <h3>{props.name}</h3>


        </div>

    )
}

export default Popup