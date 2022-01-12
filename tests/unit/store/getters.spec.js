import { getters } from "@/store";

const state = {
    products: [
        {
            id: 0,
            images: [
                {
                    image: "image",
                    thumbnail: "thumbnail"
                }
            ],
            name: "testProduct",
            description: "testDescription",
            price: 250,
            discount: 50
        }
    ]
}

describe("getters", () => {
    describe("getAllProducts", () => {
        test("Should return all products", () => {
            expect(getters.getAllProducts(state)).toEqual([
                {
                    id: 0,
                    images: [
                        {
                            image: "image",
                            thumbnail: "thumbnail"
                        }
                    ],
                    name: "testProduct",
                    description: "testDescription",
                    price: 250,
                    discount: 50
                }
            ]);
        });
    });

    describe("getProductWithId", () => {
        test("Should return product with id", () => {
            expect(getters.getProductWithId(state)(0)).toEqual({
                    id: 0,
                    images: [
                        {
                            image: "image",
                            thumbnail: "thumbnail"
                        }
                    ],
                    name: "testProduct",
                    description: "testDescription",
                    price: 250,
                    discount: 50
            });
        });
    });
});
