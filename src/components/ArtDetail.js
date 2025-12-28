export default function ArtDetail({ artwork, onClose }) {
  if (!artwork) return null;

  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-zinc-900 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
            className="absolute top-4 right-4 text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
            onClick={onClose}
            aria-label="Close details"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <div className="p-6">
            <div className="w-full flex justify-center mb-6 bg-zinc-100 dark:bg-zinc-800 rounded-md p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                    src={artwork.image_url} 
                    alt={artwork.title} 
                    className="max-h-[50vh] object-contain shadow-md"
                />
            </div>
            
            <h2 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">{artwork.title}</h2>
            <div className="space-y-2 text-zinc-600 dark:text-zinc-300">
                <p><span className="font-semibold text-zinc-900 dark:text-zinc-100">Artist:</span> {artwork.artist_display || 'Unknown'}</p>
                <p><span className="font-semibold text-zinc-900 dark:text-zinc-100">Date:</span> {artwork.date_display || 'Unknown'}</p>
            </div>
        </div>
      </div>
    </div>
  );
}
