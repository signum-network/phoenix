export default abstract class AbstractModel {

    protected mapJsonToProps(json: any) {
        Object.keys(json).forEach(k => this[k] = json[k]);
    }
}
