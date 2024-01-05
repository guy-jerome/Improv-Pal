// Import the useState hook from React
import { useState } from "react";

// Define the Partner component
export default function Partner({ updatePage, selectedPartner, pageTarget }) {
  // Define state variable for tooltip visibility using the useState hook
  const [tooltipVisible, setTooltipVisible] = useState(false);

  // Define a function to handle mouse over event
  const handleMouseOver = () => {
    setTooltipVisible(true); // Set the tooltip visibility to true
  };

  // Define a function to handle mouse leave event
  const handleMouseLeave = () => {
    setTooltipVisible(false); // Set the tooltip visibility to false
  };

  // Return the JSX for the Partner component
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      {/* Partner Image Button */}
      <button
        onMouseOver={handleMouseOver} // Attach the handleMouseOver function to the onMouseOver event
        onMouseLeave={handleMouseLeave} // Attach the handleMouseLeave function to the onMouseLeave event
        onClick={() => {
          updatePage(pageTarget); // Call the updatePage function with the pageTarget parameter on click
        }}
        style={{ padding: ".5rem", position: 'relative', }}>
        <img
          src={`/Partners/${selectedPartner}.png`} // Set the src attribute of the image to the selectedPartner image path
          alt={selectedPartner} // Set the alt attribute of the image to the selectedPartner name
          style={{ width: '5rem', height: '5rem', objectFit: 'cover' }} // Apply styles to the image
        />
        {/* Tooltip */}
        {tooltipVisible && ( // Render the tooltip if tooltipVisible is true
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
      <h5 style={{ margin: '0px' }}>{selectedPartner}</h5> {/* Display the selectedPartner name */}
    </div>
  );
}
