export default abstract class AbstractModel {

    protected mapJsonToProps(json: any) {
        Object.keys(json).forEach(k => this[k] = json[k]);
    }

    /**
     * Transform properties of this class into an JSON object
     * @param customMapper A custom mapping function to override the default mapping
     */
    public toJson(customMapper?: (thisModel) => any): any {
        return customMapper ? customMapper(this) : {...this};
    }
}
