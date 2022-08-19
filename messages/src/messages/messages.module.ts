import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesRepository } from './messages.repository';
import { MessageService } from './messages.service';

@Module({
  providers: [MessageService, MessagesRepository],
  controllers: [MessagesController],
})
export class MessagesModule {}
