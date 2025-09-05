import React, { useState, useRef } from "react";
import { FaPlus, FaSmile } from "react-icons/fa";
import { format } from "date-fns";
import EmojiPicker from "emoji-picker-react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { FaCheck, FaCheckDouble } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { HiDotsVertical } from "react-icons/hi";
import { FaTrashAlt, FaRegCopy } from "react-icons/fa";

const MessageBubble = ({
  message,
  theme,
  onReact,
  currentUser,
  deleteMessage,
  onImageClick, 
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const messageRef = useRef(null);
  const optionsRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const reactionsMenuRef = useRef(null);

  const isUserMessage = message.sender._id === currentUser._id;

  const bubbleClass = isUserMessage ? `chat-end` : `chat-start`;

  const bubbleContentClass = isUserMessage
    ? `chat-bubble md:max-w-[50%] min-w-[130px] ${
        theme === "dark" ? "bg-[#144d38] text-white" : "bg-[#d9fdd3] text-black"
      }`
    : `chat-bubble md:max-w-[50%] min-w-[130px] ${
        theme === "dark" ? "bg-[#144d38] text-white" : "bg-white text-black"
      }`;

  const quickReactions = ["👍", "❤️", "😂", "😮", "😢", "🙏"];

  const handleReact = (emoji) => {
    onReact(message._id, emoji);
    setShowEmojiPicker(false);
    setShowReactions(false);
  };

  useOutsideClick(emojiPickerRef, () => {
    if (showEmojiPicker) setShowEmojiPicker(false);
  });
  useOutsideClick(reactionsMenuRef, () => {
    if (showReactions) setShowReactions(false);
  });
  useOutsideClick(optionsRef, () => {
    if (showOptions) setShowOptions(false);
  });

  if (!message) return null;

  return (
    <div className={`chat ${bubbleClass}`}>
      <div
        className={`${bubbleContentClass} relative group ${
          message.reactions && message.reactions.length > 0 ? "mb-5" : "mb-1"
        }`}
        ref={messageRef}
      >
        {/* TEXT MESSAGE */}
        {message.contentType === "text" && (
          <div className="flex items-end gap-2">
            <p>{message.content}</p>
            <div className="flex items-center gap-1 text-[11px] opacity-60">
              <span>{format(new Date(message.createdAt), "HH:mm")}</span>
              {isUserMessage && (
                <>
                  {message.messageStatus === "send" && <FaCheck size={12} />}
                  {message.messageStatus === "delivered" && (
                    <FaCheckDouble size={12} />
                  )}
                  {message.messageStatus === "read" && (
                    <FaCheckDouble size={12} className="text-blue-900" />
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* IMAGE MESSAGE */}
        {message.contentType === "image" && (
          <div className="flex flex-col">
            <img
              src={message.imageOrVideoUrl}
              alt="Shared"
              className="rounded-lg max-w-xs"
              onClick={() =>
                onImageClick && onImageClick(message.imageOrVideoUrl)
              } // Handle image click
            />
            <div className="flex items-end justify-end gap-2 mt-1">
              {message.content && <p className="mr-2">{message.content}</p>}
              <div className="flex items-center gap-1 text-[11px] opacity-60">
                <span>{format(new Date(message.createdAt), "HH:mm")}</span>
                {isUserMessage && (
                  <>
                    {message.messageStatus === "send" && <FaCheck size={12} />}
                    {message.messageStatus === "delivered" && (
                      <FaCheckDouble size={12} />
                    )}
                    {message.messageStatus === "read" && (
                      <FaCheckDouble size={12} className="text-blue-900" />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* OPTIONS BUTTON */}
        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <button
            onClick={() => setShowOptions((prev) => !prev)}
            className={`p-1 rounded-full ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            <HiDotsVertical size={18} />
          </button>
        </div>

        {/* REACTIONS BUTTON */}
        <div
          className={`absolute ${
            isUserMessage ? "-left-10" : "-right-10"
          } top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2`}
        >
          <button
            onClick={() => setShowReactions(!showReactions)}
            className={`p-2 rounded-full ${
              theme === "dark"
                ? "bg-[#202c33] hover:bg-[#202c33]/80"
                : "bg-white hover:bg-gray-100"
            } shadow-lg`}
          >
            <FaSmile
              className={theme === "dark" ? "text-gray-300" : "text-gray-600"}
            />
          </button>
        </div>

        {/* REACTIONS MENU */}
        {showReactions && (
          <div
            ref={reactionsMenuRef}
            className={`absolute -top-8 ${
              isUserMessage ? "left-0" : "left-36"
            } transform -translate-x-1/2 flex items-center bg-[#202c33]/90 rounded-full px-2 py-1.5 gap-1 shadow-lg z-50`}
          >
            {quickReactions.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleReact(emoji)}
                className="hover:scale-125 transition-transform p-1"
              >
                {emoji}
              </button>
            ))}
            <div className="w-[1px] h-5 bg-gray-600 mx-1" />
            <button
              onClick={() => setShowEmojiPicker(true)}
              className="hover:bg-[#ffffff1a] rounded-full p-1"
            >
              <FaPlus className="h-4 w-4 text-gray-300" />
            </button>
          </div>
        )}

        {/* EMOJI PICKER */}
        {showEmojiPicker && (
          <div ref={emojiPickerRef} className="absolute left-0 mb-6 z-50">
            <div className="relative">
              <EmojiPicker
                onEmojiClick={(emojiObject) => handleReact(emojiObject.emoji)}
                theme={theme}
              />
              <button
                onClick={() => setShowEmojiPicker(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <RxCross2 />
              </button>
            </div>
          </div>
        )}

        {/* SHOW REACTIONS UNDER MESSAGE */}
        {message.reactions && message.reactions.length > 0 && (
          <div
            className={`absolute -bottom-6 ${
              isUserMessage ? "right-2" : "left-2"
            } ${theme === "dark" ? "bg-[#2a3942]" : "bg-gray-200"} 
            rounded-full px-2 py-1 shadow-md flex items-center gap-1`}
          >
            {message.reactions.map((reaction, index) => (
              <span key={index} className="mr-1 text-lg leading-none">
                {reaction.emoji}
              </span>
            ))}
          </div>
        )}

        {/* OPTIONS MENU */}
        {showOptions && (
          <div
            ref={optionsRef}
            className={`absolute top-8 right-1 z-50 w-36 rounded-xl shadow-lg py-2 text-sm ${
              theme === "dark"
                ? "bg-[#1d1f1f] text-white"
                : "bg-gray-100 text-black"
            }`}
          >
            <button
              onClick={() => {
                if (message.contentType === "text") {
                  navigator.clipboard.writeText(message.content);
                }
                setShowOptions(false);
              }}
              className="flex items-center w-full px-4 py-2 gap-3 rounded-lg"
            >
              <FaRegCopy size={14} />
              <span>Copy</span>
            </button>

            {isUserMessage && (
              <button
                onClick={() => {
                  deleteMessage(message._id);
                  setShowOptions(false);
                }}
                className="flex items-center w-full px-4 py-2 gap-3 rounded-lg text-red-600"
              >
                <FaTrashAlt className="text-red-500" size={14} />
                <span>Delete</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
