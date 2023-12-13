import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import { Box } from "@chakra-ui/react";

// @ts-ignore
export default function Confetti({ onComplete, ...props }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const animation = lottie.loadAnimation({
      container: ref.current,
      renderer: "svg",
      autoplay: true,
      path: "https://assets2.lottiefiles.com/packages/lf20_ISbOsd.json",
    });
    animation.addEventListener("complete", onComplete);
  }, [onComplete]);
  return (
    <Box
      position="fixed"
      w="100%"
      h="100%"
      top={0}
      left={0}
      {...props}
      ref={ref}
    />
  );
}
