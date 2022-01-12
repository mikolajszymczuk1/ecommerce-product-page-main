import { mutations } from "@/store/modules/cart";

describe("cart mutations", () => {
    let state;
    let product;
    
    beforeEach(() => {
        state = {
            items: []
        };

        product = {
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
    });

    describe("addItemToCart", () => {
        test("Should correctly add item to cart (add element to items array)", () => {
            mutations.addItemToCart(state, { product, count: 5 });
            
            expect(state.items).toEqual([{
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
                quantity: 5
            }]);
        });

        test("If new item's count equal 0, mutation should do nothing", () => {
            mutations.addItemToCart(state, { product, count: 0 });

            expect(state.items).toEqual([]);
        });

        test("If item exit in cart, should increment only count (quantity) of item", () => {
            mutations.addItemToCart(state, { product, count: 5 });
            mutations.addItemToCart(state, { product, count: 25 });

            expect(state.items).toEqual([{
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
                quantity: 30
            }]);
        });
    });

    describe("removeItemFromCart", () => {
        test("Should remove item from cart (decrement quantity of item)", () => {
            mutations.addItemToCart(state, { product, count: 4 });

            expect(state.items).toEqual([{
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
                quantity: 4
            }]);

            mutations.removeItemFromCart(state, state.items[0]);

            expect(state.items).toEqual([{
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
                quantity: 3
            }]);
        });

        test("If quantity of item in cart is equal 0, should remove this item from items array", () => {
            mutations.addItemToCart(state, { product, count: 1 });

            expect(state.items).toEqual([{
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
                quantity: 1
            }]);

            mutations.removeItemFromCart(state, state.items[0]);

            expect(state.items).toEqual([]);
        });
    });
});
