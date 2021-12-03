import "../styles/template.scss";

function ArtType({templateInfo}) {
    const awsRoute = process.env.REACT_APP_AWS_Route;  

    return (
    <div className="templateSet">
        { templateInfo.map(val => {
            return (
                <ul>
                    <li>Art Type: <strong>{val.artType}</strong></li>
                    <li>Sample Price: <strong>${val.artPrice.toFixed(2)}</strong></li>
                    <li>Art Description: <strong>{val.artDesc}</strong></li>
                    <li><img  
                        src={awsRoute + val.artExURL} 
                        alt="post content"
                    /></li>
                </ul>
            )
            })
        }
    </div>
    );
}

export default ArtType;