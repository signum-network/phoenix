
jest.mock('../http');

import Http from "../http";
import Github from "../github";
import HttpResponse from "../httpResponse";

/**
 * This test is a reference implementation to show how Http requests can be mocked
 */
describe("Github", () => {

    it("should getAllPhoenixContributors easily", async () => {

        (Http as any).mockImplementationOnce(() => {
            return {
                get : () => Promise.resolve(new HttpResponse(200, [{login:'ohager'}]))
            }
        });

        const github = new Github();
        const contributors = await github.getAllPhoenixContributors();
        expect(contributors.length).toBe(1);
        expect(contributors).toEqual(["ohager"]);
    });


    it("should return error on getAllPhoenixContributors  failure", async () => {

        (Http as any).mockImplementationOnce(() => {
            return {
                get : () => Promise.resolve(new HttpResponse(500, null, "Oh no, internal server error. Blame the backend"))
            }
        });

        const github = new Github();
        try{
            await github.getAllPhoenixContributors();
        }catch(e){
            expect(e).toBe("Oh no, internal server error. Blame the backend");
        }
    })


});
