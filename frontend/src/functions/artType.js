function ArtType({templateInfo}) {
    const awsRoute = 'https://gallie-artwork-images.s3.amazonaws.com/';  

    return (
    <ul>
        { templateInfo.map(val => {
            return (
                <ul align="center">
                    <li><strong>{val.artType}</strong></li>
                    <li><strong>${val.artPrice.toFixed(2)}</strong></li>
                    <li><strong>{val.artDesc}</strong></li>
                    <li><img  
                        src={awsRoute + val.artExURL} 
                        alt="post content"
                    /></li>
                </ul>
            )
            })
        }
    </ul>
    );
}

export default ArtType;