// Import React from 'react'
import React from 'react';

// Define partner data as an array of objects
const partnerData = [
  { name: 'Tina', png: 'Tina.png', description: 'Friendly and outgoing' },
  { name: 'BeeBop', png: 'BeeBop.png', description: 'Tech-savvy and creative' },
  { name: 'Fredric', png: 'Fredric.png', description: 'Adventurous and spontaneous' },
  { name: 'Lucy', png: 'Lucy.png', description: 'Calm and thoughtful' },
  { name: 'Olaf', png: 'Olaf.png', description: 'Energetic and playful' },
  { name: 'Sam', png: 'Sam.png', description: 'Witty and humorous' },
];

// Define the Partners component
export default function Partners({
  updatePage,
  selectedPartner,
  setSelectedPartner,
  selectedDescription,
  setSelectedDescription,
}) {
  // Define a function to handle image click events
  const handleImageClick = (imageName, description) => {
    setSelectedPartner(imageName); // Set the selected partner
    setSelectedDescription(description); // Set the selected partner's description
  };

  // Return the JSX for the Partners component
  return (
    <div className="main">
      {/* Header */}
      <h1>Select a Partner</h1>

      {/* Selected Partner Info */}
      <h3>{`Selected Partner: ${selectedPartner}`}</h3>
      <h4>{selectedDescription}</h4>

      {/* Image Grid */}
      <div className="image-grid">
        {/* Map through the partnerData array to render buttons for each partner */}
        {partnerData.map((partner, index) => (
          <button
            key={index}
            onClick={() => handleImageClick(partner.name, partner.description)}
            style={{ backgroundColor: selectedPartner === partner.name ? '#042713' : '#2ecc71' }}
          >
            {/* Render the partner's image */}
            <img
              src={`/Partners/${partner.png}`} // Set the src attribute of the image to the partner's image path
              alt={partner.name} // Set the alt attribute of the image to the partner's name
              style={{
                width: '8rem',
                height: 'auto', // Maintain aspect ratio
                objectFit: 'cover', // Ensure the image covers the button
              }}
            />
          </button>
        ))}
      </div>

      {/* Select Scenario Button */}
      {/* Render the "Select Scenario" button if a partner is selected */}
      {selectedPartner && (
        <button onClick={() => { updatePage('scenario') }}>Select Scenario</button>
      )}
    </div>
  );
}
