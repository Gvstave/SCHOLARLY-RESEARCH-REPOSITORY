export default function Loader({ fullScreen = false, page = false }) {
  const heightClass = fullScreen ? 'min-h-screen' : page ? 'grow' : 'min-h-48';

  return (
    <div className={`${heightClass} flex w-full items-center justify-center`}>
      <div
        className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-800"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
