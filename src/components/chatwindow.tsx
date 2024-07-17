// ChatWindow component for interacting with AI
"use client";

import { useChat } from "ai/react";
import React, { SVGProps, useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Loader from "./ui/loader";
import { Textarea } from "./ui/textarea";

interface ChatWindowProps {
  onCodeReceived: (code: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onCodeReceived }) => {
  const { messages, input, handleSubmit, handleInputChange, isLoading, stop } =
    useChat();
  const handleEmbedCode = async (messageContent: string) => {
    onCodeReceived(messageContent);
  };

  return (
    <div className="flex flex-col bg-background text-foreground p-6 gap-6 w-[50%] resize">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          LandifAI - landing page in seconds
        </h1>
      </div>
      <div className="flex flex-col gap-4 overflow-y-scroll h-full ">
        {messages.map((message) => (
          <div className="flex items-start gap-4" key={message.id}>
            <div>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>YO</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-medium">
                {message.role === "user" ? "User: " : "LandifAi: "}
              </div>
              <div className="prose text-muted-foreground">
                {message.content.startsWith("<!") ? (
                  messages.indexOf(message) === messages.length - 1 &&
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
      <div className="relative rounded-lg flex items-center justify-around gap-2">
        <label
          htmlFor="imageupload"
          className="bg-primary w-9 h-20 flex justify-center items-center rounded-2xl hover:bg-white hover:text-primary"
        >
          <UploadIcon />

          <input
            type="file"
            name="image"
            id="imageupload"
            disabled={isLoading}
            className="sr-only"
            onChange={handleInputChange}
          />
        </label>

        <form
          onSubmit={handleSubmit}
          className="w-[95%] flex justify-center items-center gap-2 h-20"
        >
          <textarea
            className="bg-secondary h-20 w-full rounded-2xl px-2 text-white placeholder:pt-2"
            value={input}
            placeholder="Send a message..."
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="w-9 h-20 rounded-2xl"
            onClick={handleSubmit}
          >
            <ArrowUpIcon className="h-4 w-4" />
          </Button>
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

function UploadIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
