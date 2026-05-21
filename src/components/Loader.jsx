const Loader = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="w-12 h-12 border-4 border-[#21B7E2] border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-gray-500 font-medium animate-pulse">Loading doctors...</p>
  </div>
);

export default Loader;