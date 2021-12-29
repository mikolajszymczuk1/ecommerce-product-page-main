<template>
    <!-- Cart component -->
    <div class="cart">
        <!-- Top cart banner -->
        <div class="cart__banner">Cart</div>
    
        <!-- Cart content -->
        <div class="cart__content"
            :class="isCartEmpty ? '' : 'cart__content--not-empty'"
        >
            <div class="cart__empty-message" v-if="isCartEmpty">
                Your cart is empty
            </div>

            <template v-else>
                <!-- Single item in cart -->
                <div class="cart__item"
                    v-for="item in items"
                    :key="item.product.id"
                >
                    <div class="cart__wrapper">
                        <!-- Item short info -->
                        <div class="cart__item-thumbnail" :style="{ backgroundImage: `url(${ item.product.images[0].thumbnail })` }"></div>
                        <div class="cart__item-content-wrapper">
                            <h2 class="cart__item-title">{{ item.product.title }}</h2>
                            <div class="cart__item-prices">
                                ${{ discountPrice(item.product) }} x {{ item.quantity }}
                                <span class="cart__total-item-price">${{ totalPriceOfItem(item.product.id) }}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Item delete icon -->
                    <img class="cart__item-delete"
                        src="@/assets/svg/icon-delete.svg"
                        alt="Delete icon"
                        title="Delete icon"
                        @click="removeItemFromCart(item)"
                    >
                </div>

                <!-- Checkout button -->
                <button class="cart__checkout-button">Checkout</button>
            </template>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
    name: "Cart",
    computed: {
        ...mapState({ items: state => state.cart.items }),
        ...mapGetters({
            "isCartEmpty": "cart/isEmpty",
            "discountPrice": "cart/discountPrice",
            "totalPriceOfItem": "cart/totalPriceOfItem"
        })
    },
    methods: {
        ...mapActions({
            "removeItemFromCart": "cart/removeItemFromCart"
        })
    }
}
</script>

<style lang="scss" scoped>
.cart {
    position: absolute;
    top: 73px;
    left: 50%;

    width: 95.5%;

    transform: translateX(-50%);
    border-radius: 10px;
    background-color: colors.$White;
    box-shadow: 0 10px 16px rgba(colors.$Very-vark-blue, 0.2);

    z-index: 1;

    &__banner {
        padding: 24px 25px;

        border-bottom: solid 1px rgba(colors.$Grayish-blue, 0.4);

        color: colors.$Very-vark-blue;
        font-weight: 700;
    }

    &__content {
        &--not-empty {
            padding: 25px 25px 30px 25px;
        }
    }

    &__empty-message {
        padding: 80px 0 88px 0;

        text-align: center;
        font-weight: 700;
        color: colors.$Dark-grayish-blue;
    }

    // Styles for cart item and checkout button
    &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-bottom: 25px;
    }

    &__wrapper {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex: 1;

        overflow: hidden;
    }

    &__item-thumbnail {
        width: 50px;
        height: 50px;

        background-color: colors.$Orange;
        border-radius: 5px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    &__item-content-wrapper {
        margin-left: 15px;

        width: 65%;

        color: colors.$Dark-grayish-blue;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    &__item-title {
        margin-bottom: 5px;

        overflow: hidden;

        white-space: nowrap;
        font-weight: 400;
        font-size: 1em;
        text-overflow: ellipsis;
    }

    // &__item-prices {}

    &__total-item-price {
        font-weight: 700;
        color: colors.$Very-vark-blue;
    }

    // &__item-delete {}

    &__checkout-button {
        padding: 19px 0;

        width: 100%;
        
        border: 0;
        outline: none;
        background-color: colors.$Orange;
        border-radius: 10px;

        font-weight: 700;
        font-size: 1em;
        color: colors.$Light-grayish-blue;
    }
}
</style>
