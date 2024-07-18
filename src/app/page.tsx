"use client";
import ChatWindow from "@/components/chatwindow";
import PagePreview from "@/components/pagepreview";
import { useState } from "react";
import { PopUP } from "@/components/pop-up";

export default function Home() {
  const [code, setCode] = useState("");
  const [link, setLink] = useState("");

  const handleCodeReceived = (newCode: string) => {
    setCode(newCode);
  };
  const handleLinkReceived = (newLink: string) => {
    console.log(link);

    setLink(newLink);
  };
  return (
    <div className="flex justify-between h-screen">
      <ChatWindow onCodeReceived={handleCodeReceived} link={link} />
      <PagePreview code={code} onLinkReceived={handleLinkReceived} />
    </div>
  );
}
