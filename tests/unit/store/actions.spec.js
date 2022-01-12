import { actions } from "@/store";

describe("actions", () => {
    describe("loadData", () => {
        test("Should commit loadData mutation", () => {
            const commit = jest.fn();
            actions.loadData({ commit });
            expect(commit).toHaveBeenCalledWith("loadData");
        });
    });
});
