export default function AlertPulse() {
  return (
    <span className="absolute flex w-4 h-4 lg:w-5 lg:h-5 -right-2 -top-2">
      <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-lime-400"></span>
      <span className="relative inline-flex w-4 h-4 rounded-full lg:w-5 lg:h-5 bg-lime-500"></span>
    </span>
  );
}
