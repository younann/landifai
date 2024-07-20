import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <>
      <nav className="bg-white dark:bg-gray-800 shadow animate-pulse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="ml-2 h-6 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center">
              <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>

      <section className="bg-gray-100 dark:bg-gray-900 py-20 animate-pulse">
        <div className="container mx-auto px-6 text-center">
          <div className="h-10 w-56 bg-gray-200 rounded mx-auto"></div>
          <div className="h-6 w-64 bg-gray-200 rounded mx-auto my-8"></div>
          <button className="bg-blue-500 h-10 w-48 rounded-full mx-auto"></button>
        </div>
      </section>

      <footer className="bg-white dark:bg-gray-800 py-6 animate-pulse">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="mx-2 h-1 w-16 bg-gray-200 rounded"></div>
          </div>
          <div className="h-4 w-48 bg-gray-200 rounded mx-auto"></div>
        </div>
      </footer>
    </>
  );
}

export { Skeleton };
