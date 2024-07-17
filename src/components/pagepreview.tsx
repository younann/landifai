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

      <div className="mx-auto my-2 w-full h-full">
        <div className="w-full h-11 rounded-t-lg bg-gray-200 flex justify-start items-center space-x-1.5 px-3">
          <span className="w-3 h-3 rounded-full bg-red-400"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
          <span className="w-3 h-3 rounded-full bg-green-400"></span>
        </div>
        <div className="bg-gray-100 border-t-0 w-full h-[95%]">
          {pageUrl && (
            <iframe
              src={pageUrl}
              frameBorder="0"
              className="w-full h-full"
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default PagePreview;
