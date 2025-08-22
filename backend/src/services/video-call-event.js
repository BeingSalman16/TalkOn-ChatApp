const handleVideoCallEvent = (socket, io, onlineUsers) => {
  socket.on("initiate_call", ({ callerId, receiverId, callType, callerInfo }) => {
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      const callId = `${callerId}-${receiverId}-${Date.now()}`;

      io.to(receiverSocketId).emit("incoming_call", {
        callerId,
        callerName: callerInfo.username,
        callerAvatar: callerInfo.profilePicture,
        callId,
        callType,
      });
    } else {
      console.log(`server: Receiver ${receiverId} is offline`);
      socket.emit("call_failed", { reason: "user is offline" });
    }
  });

  // Accept call
  socket.on("accept_call", ({ callerId, callId, receiverInfo }) => {
    const callerSocketId = onlineUsers.get(callerId);
    if (callerSocketId) {
      io.to(callerSocketId).emit("call_accepted", {
        callerName: receiverInfo.username,
        callerAvatar: receiverInfo.profilePicture,
        callId,
      });
    } else {
      console.log(`server: Caller ${callerId} not found`);
    }
  });

  // Reject Call
  socket.on("reject_call", ({ callerId, callId }) => {
    const callerSocketId = onlineUsers.get(callerId);
    if (callerSocketId) {
      io.to(callerSocketId).emit("call_rejected", { callId });
    }
  });

  // End call
  socket.on("end_call", ({ callId, participantId }) => {
    const participantSocketId = onlineUsers.get(participantId);
    if (participantSocketId) {
      io.to(participantSocketId).emit("call_ended", { callId });
    }
  });

  // WebRTC offer
  socket.on("webrtc_offer", ({ offer, receiverId, callId }) => {
    const receiverSocketId = onlineUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("webrtc_offer", {
        offer,
        senderId: socket.userId,
        callId,
      });
      console.log(`server offer forwarded to ${receiverId}`);
    } else {
      console.log(`server: Receiver ${receiverId} not found for offer`);
    }
  });

  // WebRTC answer
  socket.on("webrtc_answer", ({ answer, receiverId, callId }) => {
    const receiverSocketId = onlineUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("webrtc_answer", {
        answer,
        senderId: socket.userId,
        callId,
      });
      console.log(`server answer forwarded to ${receiverId}`);
    } else {
      console.log(`server: Receiver ${receiverId} not found for answer`);
    }
  });

  // WebRTC ICE candidate
  socket.on("webrtc_ice_candidate", ({ candidate, receiverId, callId }) => {
    const receiverSocketId = onlineUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("webrtc_ice_candidate", {
        candidate,
        senderId: socket.userId,
        callId,
      });
    } else {
      console.log(`server: Receiver ${receiverId} not found for ICE candidate`);
    }
  });
};

module.exports = handleVideoCallEvent;
