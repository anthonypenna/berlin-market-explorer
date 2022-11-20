import { describe, expect, it, vi } from "vitest";
import { debounce } from "@/utils/debounce";

vi.useFakeTimers();

describe("debounce", () => {
  it("debounces the specified function", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 1000);

    debounced();
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
  });
});
