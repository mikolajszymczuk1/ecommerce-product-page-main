import { mount } from "@vue/test-utils";
import VLightBox from "@/components/VLightBox";

const images = [
    "testImageA",
    "testImageB"
];

const thumbnails = [
    "testThumbnailA",
    "testThumbnailB"
];

describe("VLightBox.vue", () => {
    test("When lightbox is active should has active class", () => {
        const wrapper = mount(VLightBox, {
            propsData: {
                images: images,
                thumbnails: thumbnails,
                isActive: true
            }
        });

        const lightbox = wrapper.find(".lightbox");
        expect(lightbox.classes()).toContain("lightbox--active");
    });

    test("When click close icon, should emit custom event", async () => {
        const wrapper = mount(VLightBox, {
            propsData: {
                images: images,
                thumbnails: thumbnails,
                isActive: true
            }
        });

        await wrapper.find(".lightbox__close-icon").trigger("click");
        expect(wrapper.emitted()).toBeTruthy();
    });

    test("Main image should have correct background based on current value", async () => {
        const wrapper = mount(VLightBox, {
            propsData: {
                images: images,
                thumbnails: thumbnails,
                isActive: true
            }
        });

        const mainImage = wrapper.find(".lightbox__main-image");
        expect(mainImage.attributes("style")).toBe("background-image: url(testImageA);");
        wrapper.vm.nextImage(images);
        await wrapper.vm.$nextTick();
        expect(mainImage.attributes("style")).toBe("background-image: url(testImageB);");
    });

    test("Number of thumbnail boxes should be equal thumbnails array length", () => {
        const wrapper = mount(VLightBox, {
            propsData: {
                images: images,
                thumbnails: thumbnails,
                isActive: true
            }
        });

        const thumbnailsBoxes = wrapper.findAll(".lightbox__thumbnail");
        expect(thumbnailsBoxes.length).toBe(2);
    });

    test("First thumbnail should be active", () => {
        const wrapper = mount(VLightBox, {
            propsData: {
                images: images,
                thumbnails: thumbnails,
                isActive: true
            }
        });

        const thumbnailsBoxes = wrapper.findAll(".lightbox__thumbnail");
        expect(thumbnailsBoxes.at(0).classes()).toContain("lightbox__thumbnail--active");
    });

    test("When click thumbnail box, should set clicked thumbnail as active and set correct background for main image", async () => {
        const wrapper = mount(VLightBox, {
            propsData: {
                images: images,
                thumbnails: thumbnails,
                isActive: true
            }
        });

        const mainImage = wrapper.find(".lightbox__main-image");
        const thumbnailsBoxes = wrapper.findAll(".lightbox__thumbnail");
        
        expect(mainImage.attributes("style")).toBe("background-image: url(testImageA);");
        expect(thumbnailsBoxes.at(0).classes()).toContain("lightbox__thumbnail--active");

        await thumbnailsBoxes.at(1).trigger("click");

        expect(mainImage.attributes("style")).toBe("background-image: url(testImageB);");
        expect(thumbnailsBoxes.at(1).classes()).toContain("lightbox__thumbnail--active");
    });
});
