import { MessagesRepository } from './messages.repository';
export declare class MessageService {
    messageRepo: MessagesRepository;
    constructor(messageRepo: MessagesRepository);
    findOne(id: string): Promise<any>;
    findAll(): Promise<any>;
    create(content: string): Promise<void>;
}
