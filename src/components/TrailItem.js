export default function TrailItem({ artwork, onClick, isTopMost }) {
  const style = {
    position: 'absolute',
    left: artwork.x,
    top: artwork.y,
    transform: `translate(-50%, -50%) rotate(${artwork.rotation}deg)`,
    zIndex: artwork.zIndex,
    pointerEvents: isTopMost ? 'auto' : 'none',
    maxWidth: '200px',
    maxHeight: '200px',
  };

  return (
    <div 
      style={style} 
      className={`transition-opacity duration-500 ease-out cursor-pointer ${isTopMost ? 'hover:scale-110 transition-transform' : ''}`}
      onClick={() => isTopMost && onClick(artwork)}
    >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
            src={artwork.image_url} 
            alt={artwork.title} 
            className="shadow-lg rounded-sm object-contain"
            loading="eager"
        />
    </div>
  );
}
