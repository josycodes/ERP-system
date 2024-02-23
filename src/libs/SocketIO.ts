import LoggerLib from './Logger.Lib';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

let io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export default class SocketIOLib {
  static async getInstance(server?: http.Server){
    if (io) {
      return io
    }
    io = new Server(server, { cors: { origin: '*' } });
    return io;
  }
}