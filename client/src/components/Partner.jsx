import { useState } from "react";

export default function Partner({ updatePage, selectedPartner, pageTarget }) {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseOver = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      {/* Partner Image Button */}
      <button
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          updatePage(pageTarget);
        }}
        style={{ padding: ".5rem", position: 'relative', }}>
        <img
          src={`/Partners/${selectedPartner}.png`} // Assuming the images are in the public/Partners folder
          alt={selectedPartner}
          style={{ width: '8rem', height: '8rem', objectFit: 'cover' }}
        />
        {/* Tooltip */}
        {tooltipVisible && (
          <div style={{
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            fontSize: '0.5rem',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}>
            Change Partner
          </div>
        )}
      </button>

      {/* Partner Name */}
      <h5 style={{ margin: '0px' }}>{selectedPartner}</h5>
    </div>
  );
}

