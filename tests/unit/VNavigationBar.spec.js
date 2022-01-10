import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import VNavigationBar from "@/components/VNavigationBar";
import VCart from "@/components/VCart";
import store from "@/store";
import products from "@/data";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("VNavigationBat.vue", () => {
    describe("Side navigation", () => {
        test("When click navigation icon, should activate menu", async () => {
            const wrapper = mount(VNavigationBar, { store, localVue });
            const menuButton = wrapper.find(".navigation-bar__menu-icon");
            const menuContainer = wrapper.find(".navigation-bar__side-menu-container");
            const linksWrapper = wrapper.find(".navigation-bar__links-wrapper");

            expect(menuContainer.classes()).not.toContain("navigation-bar__side-menu-container--active");
            expect(linksWrapper.classes()).not.toContain("navigation-bar__links-wrapper--active");

            await menuButton.trigger("click");

            expect(menuContainer.classes()).toContain("navigation-bar__side-menu-container--active");
            expect(linksWrapper.classes()).toContain("navigation-bar__links-wrapper--active");
        });

        test("When click close navigation icon, should deactivate menu", async () => {
            const wrapper = mount(VNavigationBar, { store, localVue });
            const menuButton = wrapper.find(".navigation-bar__menu-icon");
            const closeButton = wrapper.find(".navigation-bar__close-icon");
            const menuContainer = wrapper.find(".navigation-bar__side-menu-container");
            const linksWrapper = wrapper.find(".navigation-bar__links-wrapper");
            await menuButton.trigger("click");

            expect(menuContainer.classes()).toContain("navigation-bar__side-menu-container--active");
            expect(linksWrapper.classes()).toContain("navigation-bar__links-wrapper--active");
            
            await closeButton.trigger("click");

            expect(menuContainer.classes()).not.toContain("navigation-bar__side-menu-container--active");
            expect(linksWrapper.classes()).not.toContain("navigation-bar__links-wrapper--active");
        });
    });

    describe("Cart", () => {
        test("When click cart icon, should show cart, when again click icon, should close cart", async () => {
            const wrapper = mount(VNavigationBar, { store, localVue });
            const cartButton = wrapper.find(".navigation-bar__cart-icon-wrapper");

            expect(wrapper.findComponent(VCart).exists()).toBeFalsy();

            await cartButton.trigger("click");

            expect(wrapper.findComponent(VCart).exists()).toBeTruthy();
        });

        test("When cart is empty, items counter should not exist", () => {
            const wrapper = mount(VNavigationBar, { store, localVue });

            expect(wrapper.find(".navigation-bar__items-counter").exists()).toBeFalsy();
        });

        test("When cart has some items, cart icon should show correct itmes counter value", async () => {
            const wrapper = mount(VNavigationBar, { store, localVue });
            store.dispatch("cart/addItemToCart", { product: products[0], count: 5 });
            await wrapper.vm.$nextTick();

            expect(wrapper.find(".navigation-bar__items-counter").text()).toBe("5");
        });
    });
});
