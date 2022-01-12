<template>
    <!-- Navigation bar --> 
    <nav class="navigation-bar">
        <div class="navigation-bar__wrapper">
            <!-- Menu icon -->
            <img class="navigation-bar__menu-icon" src="@/assets/svg/icon-menu.svg" alt="Menu icon" title="Menu icon"
                data-cy="menu-icon"
                @click="toggleMenu"
            >
            
            <!-- Logo -->
            <img class="navigation-bar__logo" src="@/assets/svg/logo.svg" alt="Logo image" title="Logo">
            
            <!-- Side menu -->
            <div class="navigation-bar__side-menu-container"
                :class="isActive ? 'navigation-bar__side-menu-container--active' : ''"
            >
                <!-- Container with all navigation links -->
                <div class="navigation-bar__links-wrapper" data-cy="navigation-links-wrapper"
                    :class="isActive ? 'navigation-bar__links-wrapper--active' : ''"
                >
                    <!-- Close icon -->
                    <img class="navigation-bar__close-icon" src="@/assets/svg/icon-close.svg" alt="Close icon" title="Close icon"
                        data-cy="close-icon"
                        @click="toggleMenu"
                    >
                    
                    <!-- Navigation links -->
                    <a class="navigation-bar__link" href="#Collections">Collections</a>
                    <a class="navigation-bar__link" href="#Men">Men</a>
                    <a class="navigation-bar__link" href="#Woman">Woman</a>
                    <a class="navigation-bar__link" href="#About">About</a>
                    <a class="navigation-bar__link" href="#Contact">Contact</a>
                </div>
            </div>
        </div>

        <div class="navigation-bar__user-icons">
            <div class="navigation-bar__cart-icon-wrapper"
                data-cy="cart-icon-wrapper"
                @click="toggleCart"
            >
                <!-- Cart icon -->
                <svg class="navigation-bar__cart-icon" width="22" height="20" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill-rule="nonzero"/></svg>

                <!-- Cart items counter -->
                <div class="navigation-bar__items-counter"
                    data-cy="items-counter"
                    v-if="quantityOfItems != 0" 
                >
                    {{ quantityOfItems }}
                </div>
            </div>

            <!-- Avatar icon -->
            <div class="navigation-bar__avatar-image" :style="{ backgroundImage: `url(${ 'static/image-avatar.png' })` }"></div>
        </div>

        <Cart v-if="showCart" />
    </nav>
</template>

<script>
import Cart from "@/components/VCart.vue";
import { mapGetters } from "vuex";

export default {
    name: "NavigationBar",
    components: {
        Cart
    },
    data() {
        return {
            isActive: false,
            showCart: false
        }
    },
    computed: {
        ...mapGetters("cart", ["quantityOfItems"])
    },
    methods: {
        // Activate or deactivate side menu (mobile version)
        toggleMenu() {
            this.isActive = !this.isActive;
        },

        // Activate ot deactivate cart container
        toggleCart() {
            this.showCart = !this.showCart;
        }
    }
}
</script>

<style lang="scss" scoped>
// Width value where navigation bar is changed to pc version
$navigation-change: 768px;

.navigation-bar {
    $self: &;
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 20px 25px;

    @media screen and (min-width: $navigation-change) {
        padding: 0 35px;

        border-bottom: solid 1px rgba(colors.$Grayish-blue, 0.35);
    }

    @media screen and (min-width: 1200px) {
        padding: 0;
    }

    &__wrapper {
        @media screen and (min-width: $navigation-change) {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    &__menu-icon {
        margin-right: 16px;
    
        @media screen and (min-width: $navigation-change) {
            display: none;
        }
    }

    // &__logo {}

    &__side-menu-container {
        display: none;
        position: fixed;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;
        
        opacity: 0;
        background-color: rgba(colors.$Black, 0.75);

        z-index: 2;

        @media screen and (min-width: $navigation-change) {
            display: block;
            position: static;

            margin-left: 20px;

            width: auto;
            height: auto;

            background-color: transparent;
            opacity: 1;
        }

        @media screen and (min-width: 850px) {
            margin-left: 45px;
        }

        &--active {
            display: block;

            animation: fadeIn 300ms ease-out forwards;
        }
    }

    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }

    &__links-wrapper {
        padding: 25px 30px;

        width: 65%;
        height: 100%;

        background-color: colors.$White;
        overflow-y: auto;
        transform: translateX(-100%);
    
        @media screen and (min-width: $navigation-change) {
            padding: 0;
            
            width: auto;
            height: auto;
            
            overflow-y: visible;
            transform: translateX(0);
        }

        &--active {
            animation: slideRight 250ms 400ms ease-out forwards;    
        }
    }

    @keyframes slideRight {
        to {
            transform: translateX(0);
        }
    }

    &__close-icon {
        margin-bottom: 35px;
    
        @media screen and (min-width: $navigation-change) {
            display: none;
        }
    }
    
    &__link {
        $link-self: &;
        display: block;
        position: relative;

        padding: 12px 0;

        text-decoration: none;
        font-weight: 700;
        color: colors.$Very-vark-blue;
        font-size: 1.1em;
    
        @media screen and (min-width: $navigation-change) {
            display: inline-block;
            
            padding: 46px 0;
            margin: 0 16px;

            font-weight: 400;
            font-size: 1em;
            color: colors.$Dark-grayish-blue;
            
            &:hover {
                color: colors.$Very-vark-blue;
            }

            &:hover::before {
                opacity: 1;
                transform: translateY(0);
            }
        }

        &::before {
            content: "";
            position: absolute;
            bottom: 0;

            width: 100%;
            height: 4px;

            transition: transform 100ms ease-out,
                        opacity 100ms ease-out;
            transform: translateY(100%);
            opacity: 0;
            background-color: colors.$Orange;
        }
    }

    &__user-icons {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__cart-icon-wrapper {
        position: relative;

        cursor: pointer;

        &:hover #{ $self }__cart-icon {
            fill: colors.$Black;
        }
    }

    &__cart-icon {
        display: block;

        margin-right: 20px;

        fill: #69707D;

        @media screen and (min-width: 850px) {
            margin-right: 45px;
        }
    }

    &__items-counter {
        position: absolute;
        top: -7px;
        left: 8px;

        padding: 0px 7px;

        border-radius: 10px;
        background-color: colors.$Orange;

        color: colors.$White;
        font-size: 0.7em;
        font-weight: 700;
    }

    &__avatar-image {
        display: block;
        position: relative;

        width: 25px;
        height: 25px;

        border-radius: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        cursor: pointer;

        @media screen and (min-width: $navigation-change) {
            width: 35px;
            height: 35px;
        }

        @media screen and (min-width: 850px) {
            width: 50px;
            height: 50px;

            &:hover::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;

                width: 100%;
                height: 100%;

                border: solid 2px colors.$Orange;
                border-radius: 50%;
                box-sizing: border-box;

                z-index: 1;
            }
        }
    }
}
</style>
