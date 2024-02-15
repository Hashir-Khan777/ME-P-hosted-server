import mongoose from "mongoose";
import config from "config";
import log from "./logger";

async function connect() {
    const uri = config.get<string>("MONGO_URI")
    try {
        await mongoose.connect(uri)
        log.info("Connected to DB!");
    }
    catch (error) {
        log.error(error)
        log.error("Error connecting to DB", error)
        process.exit(1);
    }
}

export default connect;