// Image slider mixin (basic functionality for image sliders)
export default {
    data() {
        return {
            current: 0
        }
    },
    methods: {
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
    }
}
