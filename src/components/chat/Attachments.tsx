import { CgAttachment } from "react-icons/cg";
import Menu from "./Menu";

type Props = {
  showAttachment: any;
  setShowAttachment: any;
  setShowEmojis: any;
};

const Attachments = ({
  showAttachment,
  setShowAttachment,
  setShowEmojis,
}: Props) => {
  return (
    <li className="relative">
      <button
        onClick={() => {
          setShowAttachment((e: any) => !e);
          setShowEmojis(false);
        }}
        className="btn"
        type="button"
      >
        <CgAttachment className="dark:text-dark_svg_2 w-[20px] h-[20px]" />
      </button>
      {/* menu */}
      {showAttachment && <Menu />}
    </li>
  );
};

export default Attachments;
