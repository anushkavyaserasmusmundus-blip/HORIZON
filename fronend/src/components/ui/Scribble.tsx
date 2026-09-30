import { useRef, useState, type FocusEvent, type ReactNode } from "react";
import { useInView } from "framer-motion";
import { RoughNotation } from "react-rough-notation";

export type ScribbleType =
  | "underline"
  | "circle"
  | "highlight"
  | "box"
  | "strike-through"
  | "bracket";

type ScribbleProps = {
  children: ReactNode;
  type: ScribbleType;
  color?: string;
  show?: boolean;
  order?: number | string;
  hover?: boolean;
  iterations?: number;
  padding?: number | [number, number, number, number] | [number, number];
  multiline?: boolean;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

export default function Scribble({
  children,
  type,
  color = "#9E2B25",
  show = true,
  order,
  hover = false,
  iterations = 2,
  padding = 6,
  multiline = true,
  className = "",
  "aria-hidden": ariaHidden,
}: ScribbleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const shouldShow = isInView && show && (!hover || isHovered);

  function handleBlur(event: FocusEvent<HTMLSpanElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) setIsHovered(false);
  }

  return (
    <span
      ref={ref}
      className={`scribble-annotation-anchor ${className}`.trim()}
      aria-hidden={ariaHidden}
      onMouseEnter={() => hover && setIsHovered(true)}
      onMouseLeave={() => hover && setIsHovered(false)}
      onFocusCapture={() => hover && setIsHovered(true)}
      onBlurCapture={handleBlur}
    >
      <RoughNotation
        type={type}
        color={color}
        strokeWidth={2.5}
        animationDuration={1000}
        iterations={iterations}
        padding={padding}
        multiline={multiline}
        order={order}
        show={shouldShow}
      >
        {children}
      </RoughNotation>
    </span>
  );
}