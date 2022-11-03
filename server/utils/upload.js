import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const storage = new GridFsStorage({
    url: `mongodb://shivamblogsite:blogsite+123@ac-c8hr2uj-shard-00-00.izulamn.mongodb.net:27017,ac-c8hr2uj-shard-00-01.izulamn.mongodb.net:27017,ac-c8hr2uj-shard-00-02.izulamn.mongodb.net:27017/?ssl=true&replicaSet=atlas-m5zbv9-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({storage}); 