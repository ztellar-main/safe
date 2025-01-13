// src/types/simple-peer.d.ts
declare module "simple-peer" {
  export interface PeerConfig {
    initiator?: boolean;
    trickle?: boolean;
    // config?: RTCConfiguration;
    stream?: MediaStream;
  }

  export default class Peer {
    constructor(config: PeerConfig);
    destroy(): void;
    signal(data: any): void;
    send(data: any): void;
    on(event: string, callback: Function): void;
  }
}
