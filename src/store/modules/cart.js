import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
    items: []
}

export const getters = {
    // Return true if cart is empty
    isEmpty: (state) => state.items.length === 0,
    
    // Return price after discount
    discountPrice: () => (product) => product.price - (product.price * (product.discount / 100)),

    // Calculate total price of product
    totalPriceOfItem: (state, getters) => (id) => {
        let item = state.items.find((item) => item.product.id === id);
        let discountPrice = getters.discountPrice(item.product);
        return [...Array(item.quantity + 1).keys()].reduce((total) => total += discountPrice);
    }
}

export const mutations = {
    // Add item to cart
    addItemToCart(state, { product, count }) {
        if (count === 0) return; 
        let existItem = state.items.find((item) => item.product.id === product.id);
        if (existItem) {
            existItem.quantity += count;
        } else {
            state.items.push({ product, quantity: count });
        }
    },

    // Remove item from cart
    removeItemFromCart(state, item) {
        item.quantity--;
        if (item.quantity === 0) {
            state.items = state.items.filter((el) => el.product.id != item.product.id)
        }
    }
}

export const actions = {
    // Add item to cart action
    addItemToCart(context, product) {
        context.commit("addItemToCart", product);
    },

    // Remove item from cart
    removeItemFromCart(context, item) {
        context.commit("removeItemFromCart", item);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
