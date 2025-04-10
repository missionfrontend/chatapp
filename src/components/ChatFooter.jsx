import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import {
  MdAttachFile,
  MdOutlineEmojiEmotions,
  MdOutlineEmojiSymbols,
} from "react-icons/md";

function ChatFooter({ setimage, settext, handlesendChat, text }) {
  const [openemoji, setopenemoji] = useState(false);
  const emojiref = useRef();
  const windowref = useRef(null);
  useEffect(
    function () {
      function handleClose(e) {
        //   if(!windowref.current.contains(e.target)) return;

        if (
          emojiref.current &&
          !emojiref.current.contains(e.target) &&
          windowref.current &&
          !windowref.current.contains(e.target)
        ) {
          setopenemoji(false);
        }
      }

      document.addEventListener("click", handleClose, true);

      return () => document.removeEventListener("click", handleClose, true);
    },
    [setopenemoji, emojiref, windowref]
  );
  return (
    <div className="border-t border-t-gray-200 p-3 relative">
      <div className="flex  gap-3 justify-between">
        <input
          type="text"
          className="w-3/4 p-2 rounded-md outline-none bg-purple-100 text-sm"
          placeholder="Enter Message"
          value={text}
          onChange={(e) => settext(e.target.value)}
        />

        <div className="flex gap-4 item-center">
          <button
            onClick={() => setopenemoji((open) => !open)}
            className="hover:text-yellow-500"
            ref={emojiref}
          >
            <MdOutlineEmojiEmotions />
          </button>
          <label
            htmlFor="chatattachment"
            className="cursor-pointer flex items-center hover:text-blue-500"
          >
            <MdAttachFile />
          </label>
          <input
            type="file"
            className="hidden"
            id="chatattachment"
            accept="image/*"
            name="image"
            onChange={(e) => setimage(e.target.files[0])}
          />
          <button
            className="bg-purple-500 p-2 text-white rounded-md"
            onClick={() => handlesendChat()}
          >
            <IoMdSend />
          </button>
        </div>
      </div>
      <div className="absolute  bottom-16 right-5" ref={windowref}>
        <EmojiPicker
          // width={250}
          // height={300}
          open={openemoji}
          onEmojiClick={(e) => {
            settext((prev) => prev + e.emoji);
            setopenemoji(false);
          }}
          
          
        />
      </div>
    </div>
  );
}

export default ChatFooter;
