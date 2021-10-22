function artType({templateInfo}) {
    return (<ul>
        { templateInfo.map(val => {
            return (
                <ul>
                    <li><strong>{val.artType}</strong></li>
                    <li><strong>{val.artPrice}</strong></li>
                    <li><strong>{val.artDesc}</strong></li>
                    <li><strong>{val.artExURL}</strong></li>
                </ul>
            )
            })
        }
    </ul>
    );
}

export default artType;