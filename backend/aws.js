import React , {useState} from 'react';
import { uploadFile } from 'react-s3';


const S3_BUCKET ='gallie-artwork-images';
const REGION ='us-east-1';
const ACCESS_KEY ='AKIASXCPVCMKISRN3YGD';
const SECRET_ACCESS_KEY ='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';

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

const UploadImageToS3WithReactS3 = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }

    return <div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div>
}

export default UploadImageToS3WithReactS3;