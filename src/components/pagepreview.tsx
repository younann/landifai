// PagePreview component for displaying the generated page
import React from "react";
import DOMPurify from "dompurify";
import { Button } from "./ui/button";

interface PagePreviewProps {
  code: string;
}

const PagePreview: React.FC<PagePreviewProps> = ({ code }) => {
  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "landing-page.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  //open code as html in new tab
  const openCode = () => {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-muted p-6 max-h-full w-[50%]">
      <div className="w-full flex justify-around items-center pb-5">
        <Button
          className="hover:bg-white hover:text-primary"
          onClick={downloadCode}
        >
          Download
        </Button>
        <Button
          className="hover:bg-white hover:text-primary"
          onClick={openCode}
        >
          Preview In New Tab
        </Button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: code }}></div>
    </div>
  );
};

export default PagePreview;
