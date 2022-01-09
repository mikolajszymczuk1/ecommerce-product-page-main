// Image slider mixin (basic functionality for image sliders)
export default {
    data() {
        return {
            current: 0
        }
    },
    methods: {
        // Return current image url
        getCurrentImage(images) {
            return images[this.current];
        },

        // When user click thumbnail, set current image
        setCurrentImage(newCurrent) {
            this.current = newCurrent;
        },

        // Change to next image
        nextImage(images) {
            this.current++;
            if (this.current > images.length - 1) {
                this.current = 0;
            }
        },

        // Change to previous image
        previousImage(images) {
            this.current--;
            if (this.current < 0) {
                this.current = images.length - 1;
            }
        }
    }
}
