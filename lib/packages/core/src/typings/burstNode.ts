

export class BurstNode {
    public name: string
    public region: string
    public location: string
    public address: string
    public port: number
    public selected: boolean
    public ping: number

    public constructor(data:any = {}) {
        this.name = data.name || undefined;
        this.region = data.region || undefined;
        this.location = data.location || undefined;
        this.address = data.address || undefined;
        this.port = data.port || -1;
        this.selected = data.selected || false;
        this.ping = data.ping || -1;
    }
}
