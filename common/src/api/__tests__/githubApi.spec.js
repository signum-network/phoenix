import Http from "../http";
import GithubApi from "../githubApi";
import HttpResponse from "../httpResponse";

jest.mock('../http');

/**
 * This test is a reference implementation to show how Http requests can be mocked
 */
describe("GithubApi", () => {

    it("should getAllPuppies easily", async () => {

        Http.mockImplementationOnce(() => {
            return {
                get : () => Promise.resolve(new HttpResponse(200, ["fluffy", "puffy"]))
            }
        });

        const puppyApi = new GithubApi("http://crazy.puppyworld");
        const puppies = await puppyApi.getAllPuppies();
        expect(puppies.length).toBe(2);
        expect(puppies).toEqual(["fluffy", "puffy"]);
    });


    it("should return error on getAllPuppies failure", async () => {

        Http.mockImplementationOnce(() => {
            return {
                get : () => Promise.resolve(new HttpResponse(500, null, "Oh no, internal server error. Blame the backend"))
            }
        });

        const puppyApi = new GithubApi("http://crazy.puppyworld");
        try{
            const puppies = await puppyApi.getAllPuppies();

        }catch(e){
            expect(e).toBe("Oh no, internal server error. Blame the backend");
        }
    })


});
