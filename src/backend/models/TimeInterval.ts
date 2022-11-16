export interface TimeInterval {
    start: Date;
    end: Date;
}

export function isTimeInterval(obj: Object) {
    return 'start' in obj && 'end' in obj;
}