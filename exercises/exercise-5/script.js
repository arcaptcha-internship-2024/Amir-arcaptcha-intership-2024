const arrayDiff = (array1, array2) => {
    return array1.filter(number => !array2.includes(number))
}

module.exports = {
    arrayDiff
}