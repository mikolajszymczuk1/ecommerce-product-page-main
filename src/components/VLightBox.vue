<template>
    <!-- Light box component -->
    <div class="lightbox" :class="isActive ? 'lightbox--active' : ''">
        <div class="lightbox__wrapper">
            <svg class="lightbox__close-icon" @click="closeLightBox" width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill-rule="evenodd"/></svg>
            
            <!-- Main lightbox image -->
            <div class="lightbox__main-image-container">
                <div class="lightbox__main-image"
                    :style="{ backgroundImage: `url(${ getCurrentImage(images) })` }"
                ></div>

                <!-- Left arrow icon -->
                <div class="lightbox__arrow-icon-wrapper lightbox__arrow-icon-wrapper--left"
                    @click="previousImage(images)"
                >
                    <img class="lightbox__arrow-icon" 
                        src="@/assets/svg/icon-previous.svg" 
                        alt="Arrow icon"
                        title="Left arrow"
                    >
                </div>

                <!-- Right arrow icon -->
                <div class="lightbox__arrow-icon-wrapper lightbox__arrow-icon-wrapper--right"
                    @click="nextImage(images)"
                >
                    <img class="lightbox__arrow-icon"
                        src="@/assets/svg/icon-next.svg"
                        alt="Arrow icon"
                        title="Right arrow"
                    >
                </div>
            </div>

            <!-- Thumbnails container -->
            <div class="lightbox__thumbnails-container">
                <div class="lightbox__thumbnail"
                    v-for="(t, index) in thumbnails"
                    :key="t"
                    :class="(index === current) ? 'lightbox__thumbnail--active' : ''"
                    :style="{ backgroundImage: `url(${ t })` }"
                    @click="setCurrentImage(index)"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import imageSliderMixin from "@/mixins/imageSliderMixin";

export default {
    name: "LightBox",
    mixins: [imageSliderMixin],
    props: {
        images: {
            type: Array,
            required: true
        },
        thumbnails: {
            type: Array,
            required: true
        },
        isActive: {
            type: Boolean
        }
    },
    methods: {
        // Emit close event
        closeLightBox() {
            this.$emit("close-lightbox");
        }
    }
}
</script>

<style lang="scss" scoped>
.lightbox {
    display: none;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    
    width: 100%;
    height: 100%;

    background-color: rgba(colors.$Black, 0.75);
    overflow-y: auto;

    z-index: 2;

    @media screen and (min-width: 1024px) {
        &--active {
            display: flex;
        }
    }

    &__wrapper {
        text-align: right;
    }

    &__close-icon {
        margin-bottom: 20px;
        
        width: 22px;
        height: auto;

        cursor: pointer;
        fill: colors.$Light-grayish-blue;

        &:hover {
            fill: colors.$Orange;
        }
    }

    &__main-image-container {
        position: relative;

        width: 450px;
        height: 450px;

        @media screen and (min-width: 1440px) {
            width: 550px;
            height: 550px;
        }
    }

    &__main-image {
        width: 100%;
        height: 100%;

        border-radius: 15px;
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

        width: 55px;
        height: 55px;

        border-radius: 50%;
        cursor: pointer;
        background-color: colors.$White;

        &--left {
            left: 0;

            transform: translate(-50%, -50%);
        }

        &--right {
            right: 0;

            transform: translate(50%, -50%);
        }

        &:hover {
            opacity: 0.8;
        }
    }

    &__arrow-icon {
        width: 22%;
        height: auto;
    }

    &__thumbnails-container {
        display: flex;
        justify-content: center;
        align-items: center;

        margin-top: 25px;

        @media screen and (min-width: 1440px) {
            margin-top: 35px;
        }
    }

    &__thumbnail {
        position: relative;

        margin: 0 12px;

        width: 80px;
        height: 80px;

        cursor: pointer;
        border-radius: 10px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    
        @media screen and (min-width: 1440px) {
            margin: 0 15px;
            
            width: 90px;
            height: 90px;
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
