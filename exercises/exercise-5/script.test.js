const { arrayDiff } = require("./script");

test("Check remove element from list", () => {
    let array1 = [1, 2, 3, 4, 5];
    let array2 = [3];
    let result = arrayDiff(array1, array2);
    expect(result.includes(3)).toBe(false);
    array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    array2 = [3, 4, 6, 8];
    result = arrayDiff(array1, array2);
    expect(array2.some(num => result.includes(num))).toBe(false);
})

test("Check correct sequence after changes", () => {
    let array1 = [1, 2, 3, 4, 5];
    let array2 = [3];
    expect(arrayDiff(array1, array2).join(", ")).toBe("1, 2, 4, 5");
    array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    array2 = [3, 4, 6, 8];
    expect(arrayDiff(array1, array2).join(", ")).toBe("1, 2, 5, 7, 9, 10");
})