import React from "react";
import useVideoCallStore from "../../store/videoCallStore";
import useUserStore from "../../store/useUserStore";
import { useEffect } from "react";
import { useCallback } from "react";
import VideoCallModal from "./VideoCallModal";
const VideoCallManager = ({ socket }) => {
  const {
    setIncomingCall,
    setCurrentCall,
    setCallType,
    setCallModalOpen,
    endCall,
    setCallStatus,
  } = useVideoCallStore();

  const { user } = useUserStore();

  useEffect(
    () => {
      if (!socket) return;

      // Handle incoming call

      const handleIncomingCall = ({
        callerId,
        callerName,
        callerAvatar,
        callType,
        callId,
      }) => {
        setIncomingCall({
          callerId,
          callerName,
          callerAvatar,
          callId,
        });
        setCallType(callType);
        setCallModalOpen(true);
        setCallStatus("ringing");
      };

      const handleCallEnded = ({ reason }) => {
        setCallStatus("failed");
        setTimeout(() => {
          endCall();
        }, 2000);
      };

      socket.on("incoming_call", handleIncomingCall);
      socket.on("call_failed", handleCallEnded);

      return () => {
        socket.off("incoming_call", handleIncomingCall);
        socket.off("call_failed", handleCallEnded);
      };
    },
    [
      socket,
      setIncomingCall,
      setCallType,
      setCallModalOpen,
      setCallStatus,
      endCall,
    ]);

    // Memozed function to initial call

    const initiateCall = useCallback((receiverId,receiverName,receiverAvatar,callType = "video") =>{

        const callId = `${user?._id} - ${Date.now()}`;

        const callData = {
            callId,
            participantId:receiverId,
            participantName:receiverName,
            participantAvatar:receiverAvatar
        }

        setCurrentCall(callData)
        setCallType(callType)
        setCallModalOpen(true)
        setCallStatus("calling")

        // Emit the call initiate

        socket.emit("initiate_call",{
            callerId:user?._id,
            receiverId,
            callType,
            callerInfo:{
                username:user.username,
                profilePicture:user.profilePicture
            }
        })
    } ,[
        user,socket,setCurrentCall,setCallType,setCallModalOpen,setCallStatus
    ])

    // expose the initiate call function to store 

    useEffect(() =>{
        useVideoCallStore.getState().initiateCall = initiateCall
    },[initiateCall])

     return <VideoCallModal socket = {socket} />
};

export default VideoCallManager;
