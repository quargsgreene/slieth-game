import ConnectPlumbingAndTingleImageNode from "../ConnectPlumbingAndTingleImageNode";
import ConnectPlumbingAndTingleTextNode from "../ConnectPlumbingAndTingleTextNode";
import ConnectPlumbingAndTingleVideoNode from "../ConnectPlumbingAndTingleVideoNode";
import { useStore } from "../useStore";

const ConnectPlumbingAndTingleUI = (gameParams) => {
  const gameTree = useStore((state) => state.gameTree);
  const currentNodeIndex = useStore((state) => state.currentNodeIndex);

  return (
    <div className="connect-plumbing-and-tingle-ui">
      <ConnectPlumbingAndTingleTextNode />
      <ConnectPlumbingAndTingleImageNode />
      <ConnectPlumbingAndTingleVideoNode />
    </div>
  );
};

export default ConnectPlumbingAndTingleUI;