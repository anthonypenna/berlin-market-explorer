export interface Market {
  id: string;
  name: string;
  address: {
    street: string;
    postalCode: string;
    district: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
