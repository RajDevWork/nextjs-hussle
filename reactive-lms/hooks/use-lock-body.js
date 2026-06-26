import * as React from "react";

// @see https://usehooks.com/useLockBodyScroll.

/** Lock screen when dialog model appears**/
export function useLockBody() {
  React.useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = originalStyle);
  }, []);
}
