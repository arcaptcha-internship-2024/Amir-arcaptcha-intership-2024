const { arrayDiff } = require("./script");

describe("Unit tests for arrayDiff method", () => {
    let array1, array2, expectedResult, result;
    beforeEach(() => {
        array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        array2 = [3, 4, 6, 8];
        result = arrayDiff(array1, array2);
        expectedResult = [1, 2, 5, 7, 9, 10];
    })
    test("Test remove element from list", () => {
        expect(result.includes(3)).toBe(false);
        expect(result.includes(4)).toBe(false);
        expect(result.includes(6)).toBe(false);
        expect(result.includes(8)).toBe(false);
    })

    test("Test correct sequence after changes", () => {
        expect(result).toEqual(expectedResult);
    })

    test("Test remove all duplicated element", () => {
        array1 = [1, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6, 7, 8, 8, 9, 10];
        result = arrayDiff(array1, array2);
        expectedResult = [1, 2, 5, 5, 7, 9, 10];
        expect(result).toEqual(expectedResult);
    })

    test("Test duplicated element in both", () => {
        array1 = [1, 2, 3, 3, 3, 4, 4, 5, 6, 6, 6, 7, 8, 8, 9, 10];
        array2 = [3, 3, 4, 4, 6, 6, 8, 8];
        result = arrayDiff(array1, array2);
        expectedResult = [1, 2, 5, 7, 9, 10];
        expect(result).toEqual(expectedResult);
    })

    test("Test remove unordered sequence in array2", () => {
        array2 = [8, 3, 6, 4];
        result = arrayDiff(array1, array2);
        console.log(result);
        expect(result).toEqual(expectedResult);
    })
})
