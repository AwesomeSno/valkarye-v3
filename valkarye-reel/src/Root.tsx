import { Composition } from "remotion";
import { ValkaryeReel } from "./ValkaryeReel";
import { Valkarye15HourReel } from "./Valkarye15HourReel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ValkaryeReel"
        component={ValkaryeReel}
        durationInFrames={1410}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Valkarye15HourReel"
        component={Valkarye15HourReel}
        durationInFrames={1410}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
