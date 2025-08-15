import dbConnect from "../config/dbConnect.js";

const startServer = async (app, port) => {
    try {
        await dbConnect();
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    } catch (error) {
        console.error('Error while starting server:', error);
        process.exit(1);
    }
};

export default startServer;