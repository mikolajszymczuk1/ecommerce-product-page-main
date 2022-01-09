<template>
    <!-- Image slider with lightbox future -->
    <div class="image-slider">
        <LightBox
            :images="images"
            :thumbnails="thumbnails"
            :is-active="lightBoxActive"
            @close-lightbox="toggleLightBox"
        />

        <!-- Main slider image container -->
        <div class="image-slider__main-image-container">
            <div class="image-slider__main-image"
                :style="{ backgroundImage: `url(${ getCurrentImage(images) })` }"
                @click="toggleLightBox"
            ></div>

            <!-- Left arrow icon -->
            <div class="image-slider__arrow-icon-wrapper image-slider__arrow-icon-wrapper--left"
                @click="previousImage(images)"
            >
                <img class="image-slider__arrow-icon" 
                    src="@/assets/svg/icon-previous.svg" 
                    alt="Arrow icon"
                    title="Left arrow"
                >
            </div>

            <!-- Right arrow icon -->
            <div class="image-slider__arrow-icon-wrapper image-slider__arrow-icon-wrapper--right"
                @click="nextImage(images)"
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
import LightBox from "@/components/VLightBox";
import imageSliderMixin from "@/mixins/imageSliderMixin";

export default {
    name: "ImageSlider",
    mixins: [imageSliderMixin],
    components: {
        LightBox
    },
    data() {
        return {
            images: [],
            thumbnails: [],
            lightBoxActive: false
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

        // Change lightbox active status
        toggleLightBox() {
            this.lightBoxActive = !this.lightBoxActive;
        }
    },
    created() {
        this.updateComponentData(this.sliderImages);
    }
}
</script>

<style lang="scss" scoped>
.image-slider {
    @media screen and (min-width: 1024px) {
        width: 400px;
    }

    @media screen and (min-width: 1440px) {
        width: 475px;
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
            border-radius: 15px;
        }

        @media screen and (min-width: 1440px) {
            height: 445px;
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

    // Thumbnails styles
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
        position: relative;

        margin: 0 25px;

        width: 80px;
        height: 80px;

        cursor: pointer;
        border-radius: 15px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    
        @media screen and (min-width: 1024px) {
            margin: 0;
        }

        @media screen and (min-width: 1440px) {
            width: 88px;
            height: 88px;

            border-radius: 10px;
        }

        &:hover {
            opacity: 0.5;
        }

        &--active::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            box-sizing: border-box;
            background-color: rgba(colors.$White, 0.6);
            border-radius: 15px;
            border: solid 2px colors.$Orange;

            @media screen and (min-width: 1440px) {
                border-radius: 10px;
            }
        }
    }
}
</style>
