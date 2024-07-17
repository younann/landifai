import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface PagePreviewProps {
  code: string;
}

const PagePreview: React.FC<PagePreviewProps> = ({ code }) => {
  const [pageUrl, setPageUrl] = useState<string>();

  useEffect(() => {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setPageUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [code]);

  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "landing-page.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openCode = () => {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url);
    URL.revokeObjectURL(url);
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
      {pageUrl && (
        <iframe
          src={pageUrl}
          frameBorder="0"
          className="w-full h-full"
        ></iframe>
      )}
    </div>
  );
};

export default PagePreview;
