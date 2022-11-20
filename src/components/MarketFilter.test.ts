import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/vue";
import MarketFilter from "@/components/MarketFilter.vue";
import { marketStore } from "@/stores/markets";

describe("<MarketFilter />", () => {
  it("renders correctly", async () => {
    render(MarketFilter);

    screen.getByText("Find weekly markets and flea markets in Berlin");
    expect(screen.getByRole<HTMLInputElement>("textbox").value).toEqual("");

    await marketStore.query$.next("hello");
    expect(screen.getByRole<HTMLInputElement>("textbox").value).toEqual(
      "hello"
    );
  });
});
