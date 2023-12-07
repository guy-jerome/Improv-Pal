import { useState } from 'react';

const partnerData = [
    { name: 'Tina', png: 'Tina.png', description: 'Friendly and outgoing' },
    { name: 'BeeBop', png: 'BeeBop.png', description: 'Tech-savvy and creative' },
    { name: 'Fredric', png: 'Fredric.png', description: 'Adventurous and spontaneous' },
    { name: 'Lucy', png: 'Lucy.png', description: 'Calm and thoughtful' },
    { name: 'Olaf', png: 'Olaf.png', description: 'Energetic and playful' },
    { name: 'Sam', png: 'Sam.png', description: 'Witty and humorous' },
  ];

export default function Partners({updatePage,selectedPartner, setSelectedPartner, selectedDescription, setSelectedDescription}) {

  const handleImageClick = (imageName,description) => {
    setSelectedPartner(imageName);
    setSelectedDescription(description)
  };

  return (
    <div className="main">
      <h1>Select a Partner</h1>
      <h3>{`Selected Partner: ${selectedPartner}`}</h3>
      <h4>{selectedDescription}</h4>
      <div className="image-grid" style={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'center'}}>
        {partnerData.map((partner, index) => (
          <button
            key={index}
            onClick={() => handleImageClick(partner.name,partner.description)}
            style={{ backgroundColor: selectedPartner === partner.name ? '#042713' : '#2ecc71' }}
          >
            <img
              src={`/Partners/${partner.png}`} // Assuming the images are in the public/Partners folder
              alt={partner.name}
              style={{ width: '10em', height: '10em', objectFit: 'cover' }}
            />
          </button>
        ))}
      </div>
      {
        selectedPartner && <button onClick={()=>{updatePage('scenario')}}>Select Scenario</button>
      }

    </div>
  );
}


