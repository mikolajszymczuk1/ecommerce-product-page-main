<template>
    <div class="app">
        <!-- ====== Header ====== -->
        <header>
            <NavigationBar />
        </header>
        <!-- ====== END Header ====== -->

        <!-- ====== Main ====== -->
        <main class="main-content">
            <ImageSlider :slider-images="product.images" />

            <!-- Product details container -->
            <section class="product-details">
                <h1 class="product-details__company-name">SNEAKER COMPANY</h1>
                <h2 class="product-details__product-title">{{ product.title }}</h2>
                <p class="product-details__product-description">{{ product.description }}</p>

                <div class="product-details__prices-container">
                    <div class="product-details__prices-wrapper">
                        <div class="product-details__discount-price">${{ discountPrice.toFixed(2) }}</div>
                        <div class="product-details__discount-value">{{ product.discount }}%</div>
                    </div>

                    <div class="product-details__old-price">${{ product.price.toFixed(2) }}</div>
                </div>

                <!-- Quantity and Add to cart buttons -->
                <div class="product-details__buttons-wrapper">
                    <QuantityCounter />

                    <!-- Add to cart button -->
                    <button class="product-details__add-to-cart-button">
                        <svg class="product-details__cart-icon" viewBox="0 0 22 20" width="22" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="#69707D" fill-rule="nonzero"/></svg>
                        Add to cart
                    </button>
                </div>
            </section>
        </main>
        <!-- ====== END Main ====== -->
    </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar";
import ImageSlider from "@/components/ImageSlider";
import QuantityCounter from "@/components/QuantityCounter";
import { mapGetters, mapActions } from "vuex";

export default {
    name: "App",
    components: {
        NavigationBar,
        ImageSlider,
        QuantityCounter
    },
    data() {
        return {
            product: {
                title: "",
                description: "",
                price: 0,
                discount: 0,
                images: []
            }
        }
    },
    computed: {
        ...mapGetters(["getProductWithId"]),
        discountPrice() {
            return this.product.price - (this.product.price * (this.product.discount / 100));
        }
    },
    methods: {
        ...mapActions([ "loadData" ]),

        // Load update component product data
        updateComponentProductData(data) {
            this.product.title = data.name;
            this.product.description = data.description;
            this.product.price = data.price;
            this.product.discount = data.discount;
            this.product.images = data.productImages;
        }
    },
    created() {
        this.loadData();
        this.updateComponentProductData(this.getProductWithId(0));
    }
}
</script>

<style lang="scss" scoped>
.app {
    @media screen and (min-width: 1200px) {
        margin: 0 10%;
    }

    @media screen and (min-width: 1440px) {
        margin: 0 11%;
    }
}

.main-content {
    @media screen and (min-width: 1024px) {
        display: flex;
        justify-content: center;
        align-items: center;

        padding-top: 80px;
    }

    @media screen and (min-width: 1440px) {
        padding: 90px 5% 0 5%;
    }
}

.product-details {
    padding: 25px;

    @media screen and (min-width: 768px) {
        margin: 40px auto 0 auto;
        
        width: 75%;
    }

    @media screen and (min-width: 1024px) {
        margin: 0 0 0 5%;

        width: 50%;
    }

    @media screen and (min-width: 1440px) {
        margin-left: 10%;
        padding: 25px 0 25px 25px;
    }

    @media screen and (min-width: 1800px) {
        width: 40%;
    }

    &__company-name {
        margin-bottom: 10px;

        color: colors.$Orange;
        font-size: 0.7em;
        letter-spacing: 2px;
    
        @media screen and (min-width: 1024px) {
            margin-bottom: 20px;
            
            font-size: 0.8em;   
        }
    }

    &__product-title {
        margin-bottom: 15px;

        color: colors.$Very-vark-blue;
        font-size: 1.8em;

        @media screen and (min-width: 1024px) {
            margin-bottom: 35px;
            
            font-size: 2.7em;
        }
    }

    &__product-description {
        margin-bottom: 25px;

        color: colors.$Dark-grayish-blue;
        font-size: 0.93em;
        line-height: 25px;
    }

    &__prices-container {
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media screen and (min-width: 1024px) {
            flex-direction: column;
            align-items: flex-start;
        }
    }

    &__prices-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;

        @media screen and (min-width: 1024px) {
            margin-bottom: 10px;
        }
    }

    &__discount-price {
        margin-right: 15px;

        font-weight: 700;
        font-size: 1.8em;
    }

    &__discount-value {
        padding: 3px 9px;

        background-color: colors.$Pale-orange;
        border-radius: 5px;

        color: colors.$Orange;
        font-weight: 700;
    }

    &__old-price {
        text-decoration: line-through;
        color: colors.$Grayish-blue;
        font-weight: 700;
    }

    // Styles for buttons
    &__buttons-wrapper {
        margin-top: 25px;

        @media screen and (min-width: 550px) {
            display: flex;
            justify-content: center;
            align-items: center;          
        }
    }

    &__add-to-cart-button {
        display: flex;
        justify-content: center;
        align-items: center;

        padding: 18px 0;
        margin-top: 15px;

        width: 100%;

        background-color: colors.$Orange;
        border: 0;
        border-radius: 10px;
        outline: none;

        font-family: fonts.$Kumbh-sans;
        color: colors.$White;
        font-weight: 700;
        font-size: 1em;
    
        @media screen and (min-width: 550px) {
            margin: 0 0 0 15px;

            width: 60%;
        }

        @media screen and (min-width: 1440px) {
            width: 64%;
        }
    }

    &__cart-icon {
        margin-right: 15px;

        width: 18px;
        height: auto;

        & path {
            fill: colors.$White;
        }
    }
}
</style>
