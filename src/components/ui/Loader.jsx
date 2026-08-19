export default function Loader({ fullScreen = false }) {
  return (
    <div className={`${fullScreen ? 'min-h-screen' : 'min-h-48'} flex items-center justify-center`}>
      <div
        className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-800"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
