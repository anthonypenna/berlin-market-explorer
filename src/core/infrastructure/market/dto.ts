export interface GetMarketDto {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    title: string;
    href: string;
    description: string;
    id: string;
    data: {
      id: string;
      bild: string;
      copyright: string;
      bezirk: string;
      bezeichnung: string;
      strasse: string;
      plz: string;
      tage: string;
      zeiten: string;
      betreiber: string;
      email: string;
      www: string;
      bemerkungen: string;
      _wgs84_lat: string;
      _wgs84_lon: string;
    };
  };
}

export interface GetMarketListDto {
  type: "FeatureCollection";
  features: GetMarketDto[];
}
