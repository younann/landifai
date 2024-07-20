import React, { useEffect, useState } from "react";
import Link from "next/link";

interface AlertProps {
  link: string;
}

const Alert: React.FC<AlertProps> = ({ link }) => {
  const [show, setShow] = useState<Boolean>(false);
  useEffect(() => {
    if (link !== "") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [link]);

  return (
    show && (
      <div className="fixed top-0 left-0 right-0 bg-accent border-primary-foreground border p-4 text-center">
        <p className="text-green-700">
          <h3 className="text-2xl font-bold mb-4">Deployment Successful!</h3>
          <p className="text-white mb-6">
            Congratulations, your application has been successfully deployed.
          </p>
          <Link
            href={link}
            className="block mb-4 text-primary-foreground hover:underline"
          >
            View Deployed App
          </Link>
          <button
            onClick={() => setShow(false)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-800"
          >
            Close
          </button>
        </p>
      </div>
    )
  );
};

export default Alert;
