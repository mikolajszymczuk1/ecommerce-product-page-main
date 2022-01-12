<template>
    <!-- Quantity counter component -->
    <div class="quantity-counter">
        <!-- Minus icon -->
        <img class="quantity-counter__icon"
            data-cy="decrement-icon"
            src="@/assets/svg/icon-minus.svg"
            alt="Minus icon"
            title="Minus icon"
            @click="decrementCounter"
        >

        <!-- Counter value -->
        <div class="quantity-counter__value" data-cy="counter-value">{{ counter }}</div>

        <!-- Plus icon -->
        <img class="quantity-counter__icon"
            data-cy="increment-icon"
            src="@/assets/svg/icon-plus.svg"
            alt="Plus icon"
            title="Plus icon"
            @click="incrementCounter"
        >
    </div>
</template>

<script>
export default {
    name: "QuantityCounter",
    data() {
        return {
            counter: 0
        }
    },
    methods: {
        // Increment counter
        incrementCounter() {
            this.counter++;
            this.$emit("counter-change", this.counter);
        },

        // Decrement counter
        decrementCounter() {
            this.counter--;
            if (this.counter < 0) {
                this.counter = 0;
            }
            
            this.$emit("counter-change", this.counter);
        }
    }
}
</script>

<style lang="scss" scoped>
.quantity-counter {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 18px;

    border-radius: 10px;
    background-color: colors.$Light-grayish-blue;

    @media screen and (min-width: 550px) {
        width: 40%;
    }

    @media screen and (min-width: 1440px) {
        width: 36%;
    }

    &__icon {
        cursor: pointer;

        &:hover {
            opacity: 0.6;
        }
    }

    &__value {
        font-weight: 700;
        color: colors.$Very-vark-blue;
    }
}
</style>
