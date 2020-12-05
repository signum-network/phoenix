
export interface MonitorModel {
    key: string;
    startTime: number;
    expected: {
        [key: string]: string;
    };
}
