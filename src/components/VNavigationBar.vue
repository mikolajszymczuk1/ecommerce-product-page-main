<template>
    <!-- Navigation bar --> 
    <nav class="navigation-bar">
        <div class="navigation-bar__wrapper">
            <!-- Menu icon -->
            <img class="navigation-bar__menu-icon" src="@/assets/svg/icon-menu.svg" alt="Menu icon" title="Menu icon"
                @click="toggleMenu"
            >
            
            <!-- Logo -->
            <img class="navigation-bar__logo" src="@/assets/svg/logo.svg" alt="Logo image" title="Logo">
            
            <!-- Side menu -->
            <div class="navigation-bar__side-menu-container"
                :class="isActive ? 'navigation-bar__side-menu-container--active' : ''"
            >
                <!-- Container with all navigation links -->
                <div class="navigation-bar__links-wrapper"
                    :class="isActive ? 'navigation-bar__links-wrapper--active' : ''"
                >
                    <!-- Close icon -->
                    <img class="navigation-bar__close-icon" src="@/assets/svg/icon-close.svg" alt="Close icon" title="Close icon"
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
            <!-- Cart icon -->
            <img class="navigation-bar__cart-icon" src="@/assets/svg/icon-cart.svg" alt="Cart icon" title="Cart icon"
                @click="toggleCart"
            >

            <!-- Avatar icon -->
            <img class="navigation-bar__avatar-image" src="@/assets/images/image-avatar.png" alt="Avatar image" title="Avatar">
        </div>

        <Cart v-if="showCart" />
    </nav>
</template>

<script>
import Cart from "@/components/VCart.vue";

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

    &__cart-icon {
        margin-right: 20px;

        @media screen and (min-width: 850px) {
            margin-right: 45px;
        }
    }

    &__avatar-image {
        width: 25px;
        height: auto;

        @media screen and (min-width: $navigation-change) {
            width: 35px;
        }

        @media screen and (min-width: 850px) {
            width: 50px;
        }
    }
}
</style>
