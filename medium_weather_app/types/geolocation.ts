export interface GeolocationMessage {
  message: string;
  error: boolean;
}

interface UseLocationReturn {
  firstLocation: GeolocationMessage | null;
  setFirstLocation: (location: GeolocationMessage) => void;
  getCurrentLocation: () => Promise<void>;
}

export default UseLocationReturn;
