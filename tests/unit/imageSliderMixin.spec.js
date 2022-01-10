import { mount } from "@vue/test-utils";
import VMockComponent from "@/components/VMockComponent";
import imageSliderMixin from "@/mixins/imageSliderMixin";

const images = [
    "testImageA",
    "testImageB",
    "testImageC",
    "testImageD",
];

describe("imageSliderMixin.js", () => {
    describe("getCurrentImage method", () => {
        test("getCurrentImage should return correct current image based on current data value", () => {
            const wrapper = mount(VMockComponent, { mixins: [imageSliderMixin] });
            expect(wrapper.vm.getCurrentImage(images)).toBe("testImageA");
        });
    });

    describe("setCurrentImage method", () => {
        test("setCurrentImage should set new current value", () => {
            const wrapper = mount(VMockComponent, { mixins: [imageSliderMixin] });
            expect(wrapper.vm.current).toBe(0);
            wrapper.vm.setCurrentImage(2);
            expect(wrapper.vm.current).toBe(2);
        }); 
    });

    describe("nextImage method", () => {
        test("nextImage should increment current value, when value is out of images array range, should set current value to 0", () => {
            const wrapper = mount(VMockComponent, { mixins: [imageSliderMixin] });
            wrapper.vm.setCurrentImage(2);
            expect(wrapper.vm.current).toBe(2);
            wrapper.vm.nextImage(images);
            expect(wrapper.vm.current).toBe(3);
            wrapper.vm.nextImage(images);
            expect(wrapper.vm.current).toBe(0);
        }); 
    });

    describe("previousImage method", () => {
        test("previousImage should derement current value, when value is less than 0, should set current value to last index of images array", () => {
            const wrapper = mount(VMockComponent, { mixins: [imageSliderMixin] });
            wrapper.vm.setCurrentImage(1);
            expect(wrapper.vm.current).toBe(1);
            wrapper.vm.previousImage(images);
            expect(wrapper.vm.current).toBe(0);
            wrapper.vm.previousImage(images);
            expect(wrapper.vm.current).toBe(3);
        });
    });
});
