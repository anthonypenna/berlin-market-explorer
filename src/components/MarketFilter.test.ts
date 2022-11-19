import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import MarketFilter from "@/components/MarketFilter.vue";

describe("<MarketFilter />", () => {
  it("renders correctly", async () => {
    const wrapper = mount(MarketFilter, {
      props: {
        modelValue: "",
      },
    });

    expect(wrapper.get("input").element.value).toEqual("");

    await wrapper.setProps({ modelValue: "Spandau" });
    expect(wrapper.get("input").element.value).toEqual("Spandau");
  });

  it("emits the correct events", () => {
    const wrapper = mount(MarketFilter, {
      props: {
        modelValue: "",
      },
    });

    wrapper.get("input").setValue("foo");
    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
  });
});
