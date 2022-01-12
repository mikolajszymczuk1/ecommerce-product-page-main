import { getters } from "@/store/modules/cart";

describe("cart getters", () => {
    describe("isEmpty", () => {
        test("Should return true if cart is empty and false if cart is not empty", () => {
            const state = {
                items: []
            };

            expect(getters.isEmpty(state)).toBeTruthy();
            state.items.push("test");
            expect(getters.isEmpty(state)).toBeFalsy();
        });
    });

    describe("quantityOfItems", () => {
        test("Should return quantity of all items in the cart", () => {
            const state = {
                items: [
                    {
                        product: {
                            id: 0,
                            images: [
                                {
                                    image: "image",
                                    thumbnail: "thumbnail"
                                },
                            ],
                            name: "testName",
                            description: "testDescription",
                            price: 250,
                            discount: 50
                        },
                        quantity: 10
                    }
                ]
            };

            expect(getters.quantityOfItems(state)).toBe(10);
        });
    });

    describe("discountPrice", () => {
        test("Should return correct discount price", () => {
            const product = {
                id: 0,
                images: [
                    {
                        image: "image",
                        thumbnail: "thumbnail"
                    },
                ],
                name: "testName",
                description: "testDescription",
                price: 250,
                discount: 50
            };

            expect(getters.discountPrice()(product)).toBe(125);
        });
    });

    describe("totalPriceOfItem", () => {
        test("Should return total price of item (discount price * item quantity)", () => {
            const state = {
                items: [
                    {
                        product: {
                            id: 0,
                            images: [
                                {
                                    image: "image",
                                    thumbnail: "thumbnail"
                                },
                            ],
                            name: "testName",
                            description: "testDescription",
                            price: 250,
                            discount: 50
                        },
                        quantity: 10
                    }
                ]
            };
    
            const discountPrice = () => getters.discountPrice()(state.items[0].product);
            expect(getters.totalPriceOfItem(state, { discountPrice })(0)).toBe(1250);
        });
    });
});
