import { FC, ReactElement } from "react";
import { ReferenceDotProps } from "recharts";

const CustomCross: FC<ReferenceDotProps> = (
  props
): ReactElement<SVGAElement> | null => {
  const { cx, cy } = props;

  if (cx === undefined || cy === undefined) {
    return null;
  }

  return (
    <>
      <line
        x1={cx - 3}
        y1={cy - 3}
        x2={cx + 3}
        y2={cy + 3}
        stroke="var(--mistake-color)"
        strokeWidth="2"
      />
      <line
        x1={cx + 3}
        y1={cy - 3}
        x2={cx - 3}
        y2={cy + 3}
        stroke="var(--mistake-color)"
        strokeWidth="2"
      />
    </>
  );
};

export default CustomCross;
