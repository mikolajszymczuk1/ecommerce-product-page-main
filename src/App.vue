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
            </section>
        </main>
        <!-- ====== END Main ====== -->
    </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar";
import ImageSlider from "@/components/ImageSlider";
import { mapGetters, mapActions } from "vuex";

export default {
    name: "App",
    components: {
        NavigationBar,
        ImageSlider
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
}
</style>
