/**
 * The base class for all models
 */
export default abstract class AbstractModel {

    /**
     * Maps the json properties to the models _declared_ members
     * @param json Any json
     */
    protected mapJsonToProps(json: any) {
        Object.keys(json).forEach(k => this[k] = json[k]);
    }

    /**
     * Transform class members of this class into a JSON object
     *
     * @param customMapper A custom mapping function to override the default mapping
     * @return A Json with mapped class members
     */
    public toJson(customMapper?: (model) => any): any {
        return customMapper ? customMapper(this) : Object.assign({}, this);
    }



}
