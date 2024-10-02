const { arrayDiff } = require("./script");

describe("Unit tests for arrayDiff method", () => {
    let array1, array2, expectedResult, result;
    beforeAll(() => {
        array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        array2 = [3, 4, 6, 8];
        result = arrayDiff(array1, array2);
        expectedResult = [1, 2, 5, 7, 9, 10];
    })
    test("Check remove element from list", () => {
        expect(result.includes(3)).toBe(false);
        expect(result.includes(4)).toBe(false);
        expect(result.includes(6)).toBe(false);
        expect(result.includes(8)).toBe(false);
    })

    test("Check correct sequence after changes", () => {
        expect(result).toEqual(expectedResult);
    })
})
