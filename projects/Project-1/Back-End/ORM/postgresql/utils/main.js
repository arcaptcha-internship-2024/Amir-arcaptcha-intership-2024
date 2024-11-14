const throwExceptionIfIDNotIncluded = async (id = null) => {
    if (typeof id !== "number" || id <= 0){
        throw Error("ID parameter in necessary and should included");
    }
}

module.exports = {
    throwExceptionIfIDNotIncluded
}