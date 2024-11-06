import React from "react";

export default function Rate({ payload }: any) {
  return (
    <div className="flex items-center gap-1">
      <p className="header1">Rate:</p>
      <p className="text-xs text-accent">
        {String(payload?.price)}/{payload.frequency}
      </p>
    </div>
  );
}
