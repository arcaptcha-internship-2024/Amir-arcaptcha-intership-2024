require("dotenv").config();

const getPaginatedResultForFileORM = (startIndex, endIndex, dataArr) => {
    return dataArr.slice(startIndex, endIndex);
}

const filterResultsByQuery = (query = "", data = []) => {
    return data.filter(obj => {
        return obj.first_name.includes(query) || obj.last_name.includes(query)
    });
}

const getPaginationData = (data = [], startIndex, endIndex, currentPage) => {
    return {
        next: {
            has_next: endIndex < data.length,
            next_page: endIndex < data.length ? currentPage + 1 : 0
        },
        previous: {
            has_previous: startIndex > 0,
            previous_page: startIndex > 0 ? currentPage - 1 : 0
        },
    }
}

const getPaginatedResult = (page = 1, limit = 5, query = "", data) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let paginationData = {};
    let result = [];
    if (query !== "") {
        data = filterResultsByQuery(query, data);
    }
    paginationData = getPaginationData(data, startIndex, endIndex, page);
    switch (process.env.DB_TYPE) {
        case "file":
            result = getPaginatedResultForFileORM(startIndex, endIndex, data);
            break
        default:
            result = getPaginatedResultForFileORM(startIndex, endIndex, data);
    }

    return {
        contact_requests: result,
        ...paginationData
    }
}

module.exports = {
    getPaginatedResult
}