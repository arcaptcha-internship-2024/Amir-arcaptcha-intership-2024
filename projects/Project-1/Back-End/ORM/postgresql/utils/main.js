const throwExceptionIfIDNotIncluded = async (id = null) => {
    if (typeof parseInt(id) !== "number" || id <= 0){
        throw Error("ID parameter is required");
    }
}

module.exports = {
    throwExceptionIfIDNotIncluded
}