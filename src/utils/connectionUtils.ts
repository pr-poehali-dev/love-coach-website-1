// Утилиты для определения скорости соединения
export const getConnectionSpeed = (): 'slow' | 'medium' | 'fast' => {
  // @ts-ignore - navigator.connection может не существовать
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  if (!connection) return 'medium';
  
  const effectiveType = connection.effectiveType;
  
  switch (effectiveType) {
    case 'slow-2g':
    case '2g':
      return 'slow';
    case '3g':
      return 'medium';
    case '4g':
      return 'fast';
    default:
      return 'medium';
  }
};

export const getTimeoutByConnection = (basetime: number): number => {
  const speed = getConnectionSpeed();
  
  switch (speed) {
    case 'slow':
      return basetime * 2; // Увеличиваем время ожидания для медленного соединения
    case 'medium':
      return basetime * 1.5;
    case 'fast':
      return basetime;
    default:
      return basetime;
  }
};

export const isOnline = (): boolean => {
  return navigator.onLine;
};