import { shallowMount } from "@vue/test-utils";
import VImageSlider from "@/components/VImageSlider";
import VLightBox from "@/components/VLightBox";

const images = [
    {
        image: "testImageA",
        thumbnail: "testThumbnailA"
    },
    {
        image: "testImageB",
        thumbnail: "testThumbnailB"
    }
];

describe("VImageSlider.vue", () => {
    test("When component is created, should load data to images array and thumbnails array", () => {
        const wrapper = shallowMount(VImageSlider, {
            propsData: {
                sliderImages: images
            }
        });
        
        expect(wrapper.vm.images).toEqual(["testImageA", "testImageB"]);
        expect(wrapper.vm.thumbnails).toEqual(["testThumbnailA", "testThumbnailB"]);
    });

    test("Main image should have correct background based on current value", async () => {
        const wrapper = shallowMount(VImageSlider, {
            propsData: {
                sliderImages: images
            }
        });

        const mainImage = wrapper.find(".image-slider__main-image");
        expect(mainImage.attributes("style")).toBe("background-image: url(testImageA);");
        wrapper.vm.nextImage(images);
        await wrapper.vm.$nextTick();
        expect(mainImage.attributes("style")).toBe("background-image: url(testImageB);");
    });

    test("Number of thumbnail boxes should be equal thumbnails array length", () => {
        const wrapper = shallowMount(VImageSlider, {
            propsData: {
                sliderImages: images
            }
        });

        const thumbnailsBoxes = wrapper.findAll(".image-slider__thumbnail");
        expect(thumbnailsBoxes.length).toBe(2);
    });

    test("First thumbnail should be active", () => {
        const wrapper = shallowMount(VImageSlider, {
            propsData: {
                sliderImages: images
            }
        });

        const thumbnailsBoxes = wrapper.findAll(".image-slider__thumbnail");
        expect(thumbnailsBoxes.at(0).classes()).toContain("image-slider__thumbnail--active");
    });

    test("When click thumbnail box, should set clicked thumbnail as active and set correct background for main image", async () => {
        const wrapper = shallowMount(VImageSlider, {
            propsData: {
                sliderImages: images
            }
        });

        const mainImage = wrapper.find(".image-slider__main-image");
        const thumbnailsBoxes = wrapper.findAll(".image-slider__thumbnail");
        
        expect(mainImage.attributes("style")).toBe("background-image: url(testImageA);");
        expect(thumbnailsBoxes.at(0).classes()).toContain("image-slider__thumbnail--active");

        await thumbnailsBoxes.at(1).trigger("click");

        expect(mainImage.attributes("style")).toBe("background-image: url(testImageB);");
        expect(thumbnailsBoxes.at(1).classes()).toContain("image-slider__thumbnail--active");
    });

    test("When click main image in slider, should open light box,\
    when emit slider on-close event, should close lightbox", async () => {
        const wrapper = shallowMount(VImageSlider, {
            propsData: {
                sliderImages: images
            }
        });

        const mainImage = wrapper.find(".image-slider__main-image");
        const lightbox = wrapper.findComponent(VLightBox);
        
        expect(wrapper.vm.lightBoxActive).toBeFalsy();
        await mainImage.trigger("click");
        expect(wrapper.vm.lightBoxActive).toBeTruthy();
        lightbox.vm.$emit("close-lightbox");
        expect(wrapper.vm.lightBoxActive).toBeFalsy();
    });
});
