"use client";

import { useChat } from "ai/react";
import React, {
  ChangeEvent,
  SVGProps,
  useEffect,
  useRef,
  useState,
} from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Loader from "./ui/loader";
import Image from "next/image";

import UploadImage from "@/components/uploadImage";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import Link from "next/link";
import { Textarea } from "./ui/textarea";

interface ChatWindowProps {
  onCodeReceived: (code: string) => void;
  setGenerating: (status: Boolean) => void;
  link: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  onCodeReceived,
  link,
  setGenerating,
}) => {
  type Message = {
    id: string;
    role: "system" | "user" | "assistant";
    content: any;
  };

  const {
    messages,
    input,
    handleSubmit,
    handleInputChange,
    isLoading,
    setInput,
    setMessages,
  } = useChat({
    initialInput: "Hi LandifAi",
  });
  const [uploadImage, setUploadImage] = useState<string>("");

  const handleEmbedCode = async (messageContent: string) => {
    if (messageContent.startsWith("```html")) {
      let code = messageContent.replace("```html", "").replace("", "");
      code.endsWith("```") ? (code = code.replace("```", "")) : code;
      onCodeReceived(code);
      return;
    }

    onCodeReceived(messageContent);
  };

  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dzlca45bc");
  const [uploadPreset] = useState("pr2es232t");

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    sources: ["local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const myImage = cld.image(publicId);
  useEffect(() => {
    if (publicId) {
      setInput(myImage.toURL());
      setUploadImage(myImage.toURL());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicId]);

  const chatContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) setGenerating(true);
    else setGenerating(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const scroll = () => {
    const { offsetHeight, scrollHeight, scrollTop } =
      chatContainer.current as HTMLDivElement;
    if (scrollHeight >= scrollTop + offsetHeight) {
      chatContainer.current?.scrollTo(0, scrollHeight + 200);
    }
  };
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (uploadImage != "") setUploadImage("");
    scroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <div className="flex flex-col bg-background text-foreground p-6 gap-6 w-[50%] resize">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          LandifAI - landing page in seconds
        </h1>
      </div>
      <div
        className="flex flex-col gap-4 overflow-y-scroll h-full"
        ref={chatContainer}
      >
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
                {message.content.startsWith("<!") ||
                message.content.startsWith("```html") ? (
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
      <div>
        {uploadImage && (
          <Image src={uploadImage} alt="uploadedImg" width={120} height={120} />
        )}
      </div>
      <div className="relative rounded-lg flex items-center justify-around gap-2">
        <UploadImage uwConfig={uwConfig} setPublicId={setPublicId} />
        <form
          onSubmit={handleSubmit}
          className="w-[95%] flex justify-center items-center gap-2 h-20"
        >
          <Textarea
            className="bg-secondary h-20 w-full rounded-2xl px-2 text-white placeholder:pt-2 overflow-y-scroll"
            value={input}
            placeholder="Send a message..."
            onChange={handleInputChange}
            disabled={isLoading}
            onKeyDown={handleKeyPress}
          />
          {isLoading ? (
            <div>
              <button
                type="button"
                className="w-12 h-20 rounded-2xl bg-red-500"
                onClick={() => stop()}
              >
                Stop
              </button>
            </div>
          ) : (
            <Button
              type="submit"
              size="icon"
              className="w-12 h-20 rounded-2xl"
              onClick={handleSubmit}
            >
              <ArrowUpIcon className="h-4 w-4" />
            </Button>
          )}
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
