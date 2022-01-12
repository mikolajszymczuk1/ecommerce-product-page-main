import { mutations } from "@/store";
import products from "@/data";

describe("mutations", () => {
    describe("loadData", () => {
        test("Should load data to state.products", () => {
            const state = {
                products: []
            }

            mutations.loadData(state);
            expect(state.products).toEqual(products);
        });
    });
});
