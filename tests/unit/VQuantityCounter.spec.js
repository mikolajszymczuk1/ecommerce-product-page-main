import { mount } from "@vue/test-utils";
import VQuantityCounter from "@/components/VQuantityCounter";

describe("VQuantityCounter", () => {
    test("By default component should have counter data equal 0", () => {
        const wrapper = mount(VQuantityCounter);
        expect(wrapper.vm.counter).toBe(0);
        expect(wrapper.find(".quantity-counter__value").text()).toBe("0");
    });

    describe("Increment method", () => {
        test("Should increment counter value", () => {
            const wrapper = mount(VQuantityCounter);
            expect(wrapper.vm.counter).toBe(0);
            wrapper.vm.incrementCounter();
            expect(wrapper.vm.counter).toBe(1);
        });

        test("Should emit counter-change event with correct value", () => {
            const wrapper = mount(VQuantityCounter);
            wrapper.vm.incrementCounter();
            expect(wrapper.emitted("counter-change")[0]).toEqual([1]);            
        });

        test("When click increment button, div with value should contain correct value", async () => {
            const wrapper = mount(VQuantityCounter);
            const counterValueContainer = wrapper.find(".quantity-counter__value");
            const incrementButton = wrapper.findAll(".quantity-counter__icon").at(1);
            
            expect(counterValueContainer.text()).toBe("0");
            await incrementButton.trigger("click");
            expect(counterValueContainer.text()).toBe("1");
        });
    });

    describe("Decrement method", () => {
        test("Should decrement counter value, when counter < 0, counter value should be 0", () => {
            const wrapper = mount(VQuantityCounter, {
                data() {
                    return {
                        counter: 1
                    }
                }
            });

            expect(wrapper.vm.counter).toBe(1);
            wrapper.vm.decrementCounter();
            expect(wrapper.vm.counter).toBe(0);
            wrapper.vm.decrementCounter();
            expect(wrapper.vm.counter).toBe(0);
        });

        test("Should emit counter-change event with correct value", () => {
            const wrapper = mount(VQuantityCounter);
            wrapper.vm.decrementCounter();
            expect(wrapper.emitted("counter-change")[0]).toEqual([0]);            
        });

        test("When click increment button, div with value should contain correct value", async () => {
            const wrapper = mount(VQuantityCounter, {
                data() {
                    return {
                        counter: 5
                    }
                }
            });

            const counterValueContainer = wrapper.find(".quantity-counter__value");
            const decrementButton = wrapper.findAll(".quantity-counter__icon").at(0);
            
            expect(counterValueContainer.text()).toBe("5");
            await decrementButton.trigger("click");
            expect(counterValueContainer.text()).toBe("4");
        });
    });
});
