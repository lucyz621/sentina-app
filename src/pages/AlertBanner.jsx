export default function AlertBanner({ show }) {
  if (!show) return null;

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg z-50">
      ⚠️ Warning! Out of Safety Zone! Texting Emergency Contact!
    </div>
  );
}