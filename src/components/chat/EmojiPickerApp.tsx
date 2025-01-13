import EmojiPicker, { Theme } from "emoji-picker-react";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

import { MdOutlineEmojiEmotions } from "react-icons/md";

type Props = {
  textRef: any;
  setMessage: any;
  showEmojis: any;
  setShowEmojis: any;
  setShowAttachment: any;
};

const EmojiPickerApp = ({
  textRef,
  setMessage,
  showEmojis,
  setShowEmojis,
  setShowAttachment,
}: Props) => {
  const [cursorPosition, setCursorPosition] = useState();

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = async (emojiData: any, _e: any) => {
    const { emoji } = emojiData;
    let ref = textRef.current;
    ref.focus();

    // Use the functional update to access the latest state
    setMessage((prevMessage: any) => {
      const start = prevMessage.substring(0, ref?.selectionStart);
      const end = prevMessage.substring(ref?.selectionStart);
      const newText = start + emoji + end;
      setCursorPosition(start.length + emoji.length);
      return newText;
    });
  };
  return (
    <li className="w-full">
      <button
        onClick={() => {
          setShowEmojis((e: any) => !e);
          setShowAttachment(false);
        }}
        className="btn"
        type="button"
      >
        {showEmojis ? (
          <IoClose className="dark:text-dark_svg_2 w-[20px] h-[20px]" />
        ) : (
          <MdOutlineEmojiEmotions className="dark:text-dark_svg_2 w-[20px] h-[20px]" />
        )}
      </button>
      {/* emoji picker */}

      {showEmojis ? (
        <div className="openEmojiAnimation absolute bottom-[60px] left-[0.5px] w-full">
          <EmojiPicker
            theme={"dark" as Theme}
            className="custom-emoji-picker"
            width={"100%"}
            onEmojiClick={handleEmoji}
          />
        </div>
      ) : (
        ""
      )}
    </li>
  );
};

export default EmojiPickerApp;
