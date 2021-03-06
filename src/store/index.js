import Vue from "vue";
import Vuex from "vuex";
import products from "../data";
import cart from "./modules/cart";

Vue.use(Vuex)

const state = {
    products: []
}

export const getters = {
    // Return array of products
    getAllProducts: (state) => state.products,
    
    // Return product with product id === id
    getProductWithId: (state) => (id) => state.products[id],
}

export const mutations = {
    // This mutation load data to products state
    loadData(state) {
        state.products = products;
    }
}

export const actions = {
    loadData(context) {
        context.commit("loadData");
    }
}

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        cart
    },
    state,
    getters,
    mutations,
    actions 
});
