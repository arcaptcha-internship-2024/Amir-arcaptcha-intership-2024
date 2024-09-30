const arrayDiff = (array1, array2) => {
    
    array2.forEach(number2 => {
        array1 = array1.filter(number1 => number1 !== number2)
    });
    return array1
}

module.exports = {
    arrayDiff
}