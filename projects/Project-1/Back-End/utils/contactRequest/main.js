const isStatusIncluded = (data) => {
    if (Object.keys(data).includes("status")) {
        const acceptedStatusValues = ['not-checked', 'in-progress', 'completed'];
        return acceptedStatusValues.some(value => data.status === value);
    }
    return false;
}

const textFieldIncluded = (data, field_name) => {
    if (Object.keys(data).includes(field_name)) {
        return data[field_name] !== "";
    }
    return false;
}

const validateContactRequestData = (data, status_neccessary = false) => {
    if ((!isStatusIncluded(data)) && (status_neccessary === true)) {
        return false
    };
    if (
        textFieldIncluded(data, "first_name") &&
        textFieldIncluded(data, "last_name") &&
        textFieldIncluded(data, "company_name") &&
        textFieldIncluded(data, "job_position") &&
        textFieldIncluded(data, "phone_number")
    ) {
        return false;
    }
    return true;
}

module.exports = {
    validateContactRequestData
}