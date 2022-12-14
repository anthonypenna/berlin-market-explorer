import type { Market } from "@/core/domain/market/entity";
import type { MarketRepository } from "@/core/domain/market/repository";
import type { GetMarketListDto } from "@/core/infrastructure/market/dto";

export class MarketRepositoryImpl implements MarketRepository {
  async getMarkets(query = ""): Promise<Market[]> {
    const response = await fetch(
      "https://www.berlin.de/sen/web/service/maerkte-feste/wochen-troedelmaerkte/index.php/index/all.geojson?q=" +
        query
    );
    const json: GetMarketListDto = await response.json();
    return json.features.map((market) => ({
      id: market.properties.data.id,
      name: market.properties.data.bezeichnung,
      address: {
        district: market.properties.data.bezirk,
        postalCode: market.properties.data.plz,
        street: market.properties.data.strasse,
      },
      coordinates: {
        latitude: Number(market.properties.data._wgs84_lat),
        longitude: Number(market.properties.data._wgs84_lon),
      },
    }));
  }
}
