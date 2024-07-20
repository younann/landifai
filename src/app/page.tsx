"use client";
import ChatWindow from "@/components/chatwindow";
import PagePreview from "@/components/pagepreview";
import { useState } from "react";
import { PopUP } from "@/components/pop-up";
import Alert from "@/components/Alert";

export default function Home() {
  const [code, setCode] = useState("");
  const [link, setLink] = useState("");
  const [generating, setGenerating] = useState<Boolean>(false);

  const handleCodeReceived = (newCode: string) => {
    setCode(newCode);
  };
  const handleLinkReceived = (newLink: string) => {
    setLink(newLink);
  };
  const handleGenerating = (status: Boolean) => {
    setGenerating(status);
  };
  return (
    <div className="flex justify-between h-screen">
      <ChatWindow
        onCodeReceived={handleCodeReceived}
        link={link}
        setGenerating={handleGenerating}
      />
      <PagePreview
        code={code}
        onLinkReceived={handleLinkReceived}
        status={generating}
      />
      <Alert link={link} />
    </div>
  );
}
