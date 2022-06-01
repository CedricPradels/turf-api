import { combine } from "./combine";

describe("Combine", () => {
  it("should be a function", () => {
    expect(typeof combine).toBe("function");
  });

  it("should combine all values", () => {
    expect(combine([])).toEqual([]);

    expect(combine([1])).toEqual([[1]]);

    expect(combine([1, 2, 3])).toEqual([
      [1, 2],
      [1, 3],
      [2, 3],
    ]);

    console.log(combine([1, 2, 3, 4]));
    expect(combine([1, 2, 3, 4])).toEqual([
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4],
      [3, 4],
    ]);
  });
});
