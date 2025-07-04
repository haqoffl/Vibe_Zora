
import Peer from 'simple-peer';
export async function initiateChannel() {
  // Check if the influencer is a valid string

  return new Promise((resolve) => {
    const peer = new Peer({
      initiator: true,
      trickle: false, // Disable trickle ICE for simplicity
        config: {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      {
        urls: 'turn:relay1.expressturn.com:3478',
        username: 'ef7489',
        credential: 'webrtc'
      }
    ]
  }
    });

    peer.on('signal', (data) => {
      const signalData = JSON.stringify(data);
      resolve({ peer, signalData }); 
    });
  });
}


export function joinChannelAsAudience(data) {
  // This function is called when the influencer sends the signal data
  // You would typically receive this data from a signaling server
return new Promise((resolve) => {
    const peer = new Peer({
      initiator: false,
      trickle: false, // Disable trickle ICE for simplicity
      config: {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      {
        urls: 'turn:relay1.expressturn.com:3478',
        username: 'ef7489',
        credential: 'webrtc'
      }
    ]
  }
    });
      peer.signal(data);

    peer.on('signal', (mySignalData) => {
      const signalData = JSON.stringify(mySignalData);
      resolve({ peer, signalData }); 
    });
  });
  
}

export function joinChannelAsInfluencer(data,peer) {
  // This function is called when the audience sends the signal data
  // You would typically receive this data from a signaling server
  peer.signal(data);
peer.on('connect', () => {
    console.log("connected succefully as influencer")

    peer.send("hello from influencer");
  });
  console.log("connected")
}