import AWS from 'aws-sdk';

function RemoveAllArt(posts) {  
    const config = new AWS.S3 ({
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_BUCKET_REGION,
        accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
    });
      
    const handleS3Delete = async (filename) => {
        const params = {
            Bucket: process.env.REACT_APP_BUCKET_NAME, 
            Key: filename  
        };
        
        config.deleteObject(params, function(err, data) {
        if (err) 
            console.log(err);
        else
            console.log("Successfully deleted file from bucket");
            console.log(data);
        });
    }
    console.log(posts);
    if(posts.length!==0){{ posts.map(val => {
        //delete the image from s3 bucket
        console.log(val.artworkURL)
        handleS3Delete( val.artworkURL );
    })}}
    else {
        console.log("No Art")
    }
}
  
export default RemoveAllArt;