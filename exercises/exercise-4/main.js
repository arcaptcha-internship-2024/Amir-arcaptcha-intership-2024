const select = (count, numbers) => {
    if (count >= numbers.length) {
        throw new Error("Count cannot be equal or greater than length of numbers array");
    }
    for (let i = numbers.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[randomIndex]] = [numbers[randomIndex], numbers[i]];
    }
    return numbers.slice(0, count)
}
