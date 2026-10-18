import { Composition } from "remotion";
import { ValkaryeReel } from "./ValkaryeReel";
import { Valkarye15HourReel } from "./Valkarye15HourReel";
import { Valkarye15HourDeepDive } from "./Valkarye15HourDeepDive";

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
      <Composition
        id="Valkarye15HourDeepDive"
        component={Valkarye15HourDeepDive}
        durationInFrames={1720}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
