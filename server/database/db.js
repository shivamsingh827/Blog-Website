import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb://${username}:${password}@ac-c8hr2uj-shard-00-00.izulamn.mongodb.net:27017,ac-c8hr2uj-shard-00-01.izulamn.mongodb.net:27017,ac-c8hr2uj-shard-00-02.izulamn.mongodb.net:27017/?ssl=true&replicaSet=atlas-m5zbv9-shard-0&authSource=admin&retryWrites=true&w=majority`;
    
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;