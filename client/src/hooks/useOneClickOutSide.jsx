import { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    // Function to handle click/touch events
    const listener = (event) => {
      // Ignore the event if it occurs inside the referenced element
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // Call the handler function if the event occurs outside the referenced element
      handler(event);
    };

    // Attach event listeners for detecting outside clicks
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // Cleanup event listeners when the component unmounts or dependencies change
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
