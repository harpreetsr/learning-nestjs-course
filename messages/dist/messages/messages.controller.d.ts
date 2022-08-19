import { CreateMessageDto } from './dtos/create-message-dto';
import { MessageService } from './messages.service';
export declare class MessagesController {
    messagesService: MessageService;
    constructor(messagesService: MessageService);
    listMessages(): Promise<any>;
    createMessage(body: CreateMessageDto): Promise<void>;
    getMessage(id: string): Promise<void>;
}
