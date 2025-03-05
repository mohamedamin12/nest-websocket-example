import { OnModuleInit } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  onModuleInit() {
    this.server.on('connection' , (client)=> {
      console.log('Client connected' , client.id);
    })
  }
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string) {
    this.server.emit('message', message);
  }
  @SubscribeMessage('singleMessage')
  handleSingleMessage(@MessageBody() data : { client: string ,message: string}) {
    // const targetClient = this.server.sockets.sockets.get(data.client);
    // targetClient.emit('singleMessage', data.message);
    this.server.to(data.client).emit('singleMessage', data.message);
  }
}
