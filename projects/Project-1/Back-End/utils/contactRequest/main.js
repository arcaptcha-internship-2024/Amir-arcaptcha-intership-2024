const isStatusNotIncluded = (data) => {
    if (Object.keys(data).includes("status")) {
        const acceptedStatusValues = ['not-checked', 'in-progress', 'completed'];
        return !acceptedStatusValues.some(value => data.status === value);
    }
    return true;
}

const textFieldNotIncluded = (data, field_name) => {
    if (Object.keys(data).includes(field_name)) {
        return data[field_name] === "";
    }
    return true;
}

const validateContactRequestData = (data, status_neccessary = false) => {
    if ((isStatusNotIncluded(data)) && (status_neccessary === true)) {
        return false
    };
    if (
        textFieldNotIncluded(data, "first_name") &&
        textFieldNotIncluded(data, "last_name") &&
        textFieldNotIncluded(data, "company_name") &&
        textFieldNotIncluded(data, "job_position") &&
        textFieldNotIncluded(data, "phone_number")
    ) {
        return false;
    }
    return true;
}

module.exports = {
    validateContactRequestData
}