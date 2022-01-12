import { actions } from "@/store/modules/cart";

describe("cart actions", () => {
    describe("addItemToCart", () => {
        test("addItemToCart mutation should been called", async () => {
            const commit = jest.fn();
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

            await actions.addItemToCart({ commit }, { product, count: 4 });

            expect(commit).toHaveBeenCalledWith("addItemToCart", { 
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
                }, count: 4
            });
        });
    });

    describe("removeItemFromCart", () => {
        test("removeItemFromCart mutation should been called", async () => {
            const commit = jest.fn();
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

            const item = { product, quantity: 5 }
            await actions.removeItemFromCart({ commit }, item);

            expect(commit).toHaveBeenCalledWith("removeItemFromCart", item);
        });
    });
});
