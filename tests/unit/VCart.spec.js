import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import VCart from "@/components/VCart";
import cart from "@/store/modules/cart";
import products from "@/data";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("VCart.vue", () => {
    let state;
    let store;
    let testProduct;

    beforeEach(() => {
        state = {
            items: []
        }

        testProduct = {
            id: 0,
            images: [
                {
                    image: "testImage",
                    thumbnail: "testThumbnail"
                }
            ],
            name: "test",
            description: "testDecription",
            price: 100,
            discount: 50
        }

        store = new Vuex.Store({
            modules: {
                cart: {
                    namespaced: true,
                    state,
                    getters: cart.getters,
                    mutations: cart.mutations,
                    actions: cart.actions
                }
            }
        });
    });

    test("When isEmpty return true, cart should not has extra class, else should has", async () => {
        const wrapper = mount(VCart, { store, localVue });

        expect(wrapper.vm.isCartEmpty).toBeTruthy();
        expect(wrapper.find(".cart__content").classes()).not.toContain("cart__content--not-empty");
        
        store.state.cart.items.push({ product: products[0], quantity: 1 });
        await wrapper.vm.$nextTick();
        
        expect(wrapper.vm.isCartEmpty).toBeFalsy();
        expect(wrapper.find(".cart__content").classes()).toContain("cart__content--not-empty");
    });

    test("When cart is empty, should show empty message, else should show items", async () => {
        const wrapper = mount(VCart, { store, localVue });

        expect(wrapper.find(".cart__empty-message").exists()).toBeTruthy();
        expect(wrapper.find(".cart__cart-item").exists()).toBeFalsy();

        store.state.cart.items.push({ product: products[0], quantity: 1 });
        await wrapper.vm.$nextTick();
        
        expect(wrapper.find(".cart__empty-message").exists()).toBeFalsy();
        expect(wrapper.find(".cart__item").exists()).toBeTruthy();
    });

    test("Each item's data should contain correct values", async () => {
        const wrapper = mount(VCart, { store, localVue });

        store.state.cart.items.push({ product: testProduct, quantity: 5 });
        await wrapper.vm.$nextTick();

        const cartItem = wrapper.find(".cart__item");
        expect(cartItem.find(".cart__item-thumbnail").attributes("style")).toBe("background-image: url(testThumbnail);");
        expect(cartItem.find(".cart__item-title").text()).toBe("test");
        expect(cartItem.find(".cart__item-prices").text()).toContain(
                `$50 x 5
                            $250`
        );

    });

    test("When click delete icon button, should decrement quantity of item", async () => {
        const wrapper = mount(VCart, { store, localVue });
        
        store.state.cart.items.push({ product: testProduct, quantity: 2 });
        await wrapper.vm.$nextTick();

        const deleteButton = wrapper.find(".cart__item-delete");
        
        expect(store.state.cart.items[0].quantity).toBe(2);
        await deleteButton.trigger("click");
        expect(store.state.cart.items[0].quantity).toBe(1);
        await deleteButton.trigger("click");
        expect(wrapper.vm.isCartEmpty).toBeTruthy();
    });
});
