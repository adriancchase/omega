export interface TimeInterval {
    start: Date;
    end: Date;
}

export function isTimeInterval(obj: any): obj is TimeInterval {
    return 'start' in obj && 'end' in obj;
}