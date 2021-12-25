<template>
    <!-- Image slider with lightbox future -->
    <div class="image-slider">
        <!-- Main slider image container -->
        <div class="image-slider__main-image-container">
            <div class="image-slider__main-image"
                :style="{ backgroundImage: `url(${ getCurrentImage(current) })` }"
            ></div>

            <!-- Left arrow icon -->
            <div class="image-slider__arrow-icon-wrapper image-slider__arrow-icon-wrapper--left"
                @click="previousImage()"
            >
                <img class="image-slider__arrow-icon" 
                    src="@/assets/svg/icon-previous.svg" 
                    alt="Arrow icon"
                    title="Left arrow"
                >
            </div>

            <!-- Right arrow icon -->
            <div class="image-slider__arrow-icon-wrapper image-slider__arrow-icon-wrapper--right"
                @click="nextImage()"
            >
                <img class="image-slider__arrow-icon"
                    src="@/assets/svg/icon-next.svg"
                    alt="Arrow icon"
                    title="Right arrow"
                >
            </div>
        </div>

        <!-- Thumbnails container -->
        <div class="image-slider__thumbnails-container">
            <div class="image-slider__thumbnail"
                v-for="(t, index) in thumbnails"
                :key="t"
                :class="(index === current) ? 'image-slider__thumbnail--active' : ''"
                :style="{ backgroundImage: `url(${ t })` }"
                @click="setCurrentImage(index)"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ImageSlider",
    data() {
        return {
            images: [],
            thumbnails: [],
            current: 0
        }
    },
    props: {
        sliderImages: {
            type: Array,
            required: true
        }
    },
    methods: {
        // Update components data
        updateComponentData(data) {
            data.forEach(item => {
                this.images.push(item.image);
                this.thumbnails.push(item.thumbnail);
            });
        },

        // Return current image url
        getCurrentImage(current) {
            return this.images[current];
        },

        // When user click thumbnail, set current image
        setCurrentImage(newCurrent) {
            this.current = newCurrent;
        },

        // Change to next image
        nextImage() {
            this.current++;
            if (this.current > this.images.length - 1) {
                this.current = 0;
            }
        },

        // Change to previous image
        previousImage() {
            this.current--;
            if (this.current < 0) {
                this.current = this.images.length - 1;
            }
        }
    },
    created() {
        this.updateComponentData(this.sliderImages);
    }
}
</script>

<style lang="scss">
.image-slider {
    @media screen and (min-width: 1024px) {
        width: 400px;
    }

    // Main image styles
    &__main-image-container {
        position: relative;

        width: 100%;
        height: 300px;

        overflow: hidden;

        @media screen and (min-width: 550px) {
            height: 400px;
        }

        @media screen and (min-width: 1024px) {
            border-radius: 20px;
        }
    }

    &__main-image {
        width: 100%;
        height: 100%;

        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

    &__arrow-icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 50%;

        width: 40px;
        height: 40px;

        transform: translateY(-50%);
        border-radius: 50%;
        background-color: colors.$White;

        @media screen and (min-width: 768px) {
            display: none;
        }

        &--left {
            left: 15px;
        }

        &--right {
            right: 15px;
        }
    }

    &__arrow-icon {
        width: 10px;
        height: auto;
    }

    // Thumnails styles
    &__thumbnails-container {
        display: none;
        justify-content: center;
        align-items: center;
    
        margin-top: 30px;

        @media screen and (min-width: 768px) {
            display: flex;
        }

        @media screen and (min-width: 1024px) {
            justify-content: space-between;
        }
    }

    &__thumbnail {
        margin: 0 25px;

        width: 80px;
        height: 80px;

        border-radius: 15px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    
        @media screen and (min-width: 1024px) {
            margin: 0;
        }
    }
}
</style>
