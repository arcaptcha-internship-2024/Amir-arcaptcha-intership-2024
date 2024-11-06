require("dotenv").config();

const getPaginatedResultForFileORM = (startIndex, endIndex, dataArr) => {
    return dataArr.slice(startIndex, endIndex);
}

const getPaginatedResult = (page = 1, limit = 5, data) => {
    if (typeof page !== "number"){
        page = 1;
    }
    
    if (typeof limit !== "number"){
        limit = 1;
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    if (process.env.DB_TYPE === "file") {
        return getPaginatedResultForFileORM(startIndex, endIndex, data);
    }
}

module.exports = {
    getPaginatedResult
}