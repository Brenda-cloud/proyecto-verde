import React, { useState } from 'react';

const FullScreenButton = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      // Entrar en modo pantalla completa
      document.documentElement.requestFullscreen();
    } else {
      // Salir del modo pantalla completa
      document.exitFullscreen();
    }

    // Actualizar el estado
    setIsFullScreen(!isFullScreen);
  };

  return (
    <button type="button" onClick={toggleFullScreen}>
    {isFullScreen ? 'Salir de Pantalla Completa' : 'Ir a Pantalla Completa'}
  </button>
  
  );
};

export default FullScreenButton;
