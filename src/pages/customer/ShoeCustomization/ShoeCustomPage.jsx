import React, { useEffect } from "react";

export default function ShoeCustomPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return <div>ShoeCustomization</div>;
}
