"use client";

import dynamic from "next/dynamic";

// The 3D Hope Engine (three.js) loads only on the Lab page, after the page itself.
export const LabEngine = dynamic(() => import("./hope-machine").then((m) => m.HopeMachine), {
  ssr: false,
  loading: () => <div className="hope-machine-loading" aria-label="Hope engine waking" />,
});
