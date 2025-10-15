"use client";

import { useCallback, useEffect, useRef } from "react";

const Cursor = () => {
  const delay = 5;

  const endX = useRef(0);
  const endY = useRef(0);
  const x = useRef(0);
  const y = useRef(0);

  const requestRef = useRef<number | null>(null);
  const dot = useRef<HTMLDivElement | null>(null);

  // Cache CSS colors to avoid repeated getComputedStyle calls
  const primaryColor = useRef<string>("");
  const accentColor = useRef<string>("");
  const isHovering = useRef(false);

  const INTERACTIVE_ELEMENTS = [
    "LI",
    "A",
    "BUTTON",
    "H1",
    "svg",
    "path",
    "SPAN",
  ];

  const mouseMoveEvent = useCallback((e: MouseEvent) => {
    endX.current = e.clientX;
    endY.current = e.clientY;

    if (!dot.current) return;

    const hoveredElements = document.querySelectorAll(":hover");
    if (hoveredElements.length === 0) {
      // No elements hovered, reset to default state
      if (isHovering.current) {
        dot.current.style.transform = "scale(1)";
        dot.current.style.width = "13px";
        dot.current.style.height = "13px";
        dot.current.style.backgroundColor = primaryColor.current;
        dot.current.style.opacity = "1";
        isHovering.current = false;
      }
      return;
    }

    const lastElement = hoveredElements[hoveredElements.length - 1];
    if (!lastElement) return;

    const tagName = lastElement.tagName;
    const hasSkillClass = lastElement.classList.contains("skill");

    const shouldHighlight =
      INTERACTIVE_ELEMENTS.includes(tagName) || hasSkillClass;

    if (shouldHighlight && !isHovering.current) {
      dot.current.style.transform = "scale(3)";
      dot.current.style.width = "13px";
      dot.current.style.height = "13px";
      dot.current.style.backgroundColor = accentColor.current;
      dot.current.style.opacity = "0.3";
      isHovering.current = true;
    } else if (!shouldHighlight && isHovering.current) {
      dot.current.style.transform = "scale(1)";
      dot.current.style.opacity = "1";
      dot.current.style.width = "13px";
      dot.current.style.height = "13px";
      dot.current.style.backgroundColor = primaryColor.current;
      isHovering.current = false;
    }
  }, []);

  const animateDotOutline = useCallback(() => {
    if (!dot.current) return;

    x.current += (endX.current - x.current) / delay;
    y.current += (endY.current - y.current) / delay;

    dot.current.style.left = `${x.current - 6}px`;
    dot.current.style.top = `${y.current - 7}px`;

    requestRef.current = requestAnimationFrame(animateDotOutline);
  }, []);

  useEffect(() => {
    // Cache CSS colors once on mount
    const rootStyles = getComputedStyle(document.documentElement);
    primaryColor.current = rootStyles.getPropertyValue("--primary").trim();
    accentColor.current = rootStyles.getPropertyValue("--accent").trim();

    document.addEventListener("mousemove", mouseMoveEvent);
    animateDotOutline();

    return () => {
      document.removeEventListener("mousemove", mouseMoveEvent);
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [mouseMoveEvent, animateDotOutline]);

  return (
    <div
      id="cursor-container"
      className="fixed top-0 left-0 z-[999] hidden md:block pointer-events-none"
    >
      <div
        ref={dot}
        className="cursor-dot fixed transition-all duration-100 ease-out rounded-full pointer-events-none"
        style={{ width: "13px", height: "13px" }}
      />
    </div>
  );
};

export default Cursor;
