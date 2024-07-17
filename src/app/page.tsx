"use client";
import ChatWindow from "@/components/chatwindow";
import PagePreview from "@/components/pagepreview";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");

  const handleCodeReceived = (newCode: string) => {
    setCode(newCode);
  };
  return (
    <div className="flex justify-between h-screen">
      <ChatWindow onCodeReceived={handleCodeReceived} />
      <PagePreview code={code} />
    </div>
  );
}
