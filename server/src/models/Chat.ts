import {Message} from './Message.js';

export interface Chat {
    id: string;
    messages: Message[];
}