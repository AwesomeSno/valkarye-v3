import { Composition } from "remotion";
import { ValkaryeReel } from "./ValkaryeReel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ValkaryeReel"
        component={ValkaryeReel}
        durationInFrames={1300}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
