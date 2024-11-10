require("dotenv").config();

const getPaginatedResultForFileORM = (startIndex, endIndex, dataArr) => {
    return dataArr.slice(startIndex, endIndex);
}

const getPaginatedResult = (page = 1, limit = 5, query = "", data) => {
    if (typeof page !== "number") {
        page = 1;
    }

    if (typeof limit !== "number") {
        limit = 1;
    }


    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    if (query === "") {
        if (process.env.DB_TYPE === "file") {
            return getPaginatedResultForFileORM(startIndex, endIndex, data);
        }
    }else {
        if (process.env.DB_TYPE === "file") {
            data = data.filter(obj => {
                return obj.first_name.includes(query) || obj.last_name.includes(query)
            });
            return getPaginatedResultForFileORM(startIndex, endIndex, data)
        }
    }

}

module.exports = {
    getPaginatedResult
}