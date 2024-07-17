export default function Loader() {
  return (
    <div className="flex items-center justify-center h-20">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-primary rounded-full border-t-transparent animate-spin" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary font-medium">
          LOADING
        </div>
      </div>
    </div>
  );
}
