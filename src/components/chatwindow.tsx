// ChatWindow component for interacting with AI
"use client";

import { useChat } from "ai/react";
import React, { SVGProps, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Loader from "./ui/loader";

interface ChatWindowProps {
  onCodeReceived: (code: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onCodeReceived }) => {
  const { messages, input, handleSubmit, handleInputChange, isLoading } =
    useChat();

  const handleEmbedCode = async (messageContent: string) => {
    // let code = messageContent.replace("!!!", "").trim();
    // code = code
    //   .replace(/```/g, "")
    //   .replace(/html\s+<!DOCTYPE html>/, "<!DOCTYPE html>");
    onCodeReceived(messageContent);
  };

  return (
    <div className="flex flex-col bg-background text-foreground p-6 gap-6 w-[50%]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          LandifAI - landing page in seconds
        </h1>
        <Button>New Page</Button>
      </div>
      <div className="flex flex-col gap-4 overflow-y-scroll h-[600px]">
        {messages.map((message) => (
          <div className="flex items-start gap-4" key={message.id}>
            <div>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>YO</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col gap-1">
              <div>
                {message.createdAt instanceof Date
                  ? message.createdAt.toLocaleString()
                  : ""}
              </div>
              <div className="font-medium">{message.role}</div>
              <div className="prose text-muted-foreground">
                {message.content.startsWith("<!") ? (
                  isLoading ? (
                    <Loader />
                  ) : (
                    <Button onClick={() => handleEmbedCode(message.content)}>
                      preview
                    </Button>
                  )
                ) : (
                  <p>{message.content}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative rounded-lg">
        <form onSubmit={handleSubmit}>
          <Button type="submit" size="icon" className="absolute top-3 right-3">
            <ArrowUpIcon className="h-4 w-4" />
          </Button>
          <input
            className="bg-secondary h-20 w-full rounded-2xl px-2 text-white"
            value={input}
            placeholder="Send a message..."
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;

function ArrowUpIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}
