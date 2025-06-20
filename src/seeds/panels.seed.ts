import { DataSource } from 'typeorm';
import { Panel } from '../panels/entities/panel.entity';
import { Location } from '../locations/entities/location.entity';

export async function seedPanelsAndLocations(dataSource: DataSource) {
  const panelRepository = dataSource.getRepository(Panel);
  const locationRepository = dataSource.getRepository(Location);

  const cityCoords = {
    'São Paulo': { lat: -23.55052, long: -46.633308 },
    'Porto Alegre': { lat: -30.0346, long: -51.2177 },
    Curitiba: { lat: -25.4284, long: -49.2733 },
    Florianópolis: { lat: -27.5954, long: -48.548 },
    'São José do Ouro': { lat: -27.7706, long: -51.5965 },
  };

  const cityList = Object.entries(cityCoords);
  const panelsWithLocations: { panel: Panel; location: Location }[] = [];

  for (let i = 0; i < 50; i++) {
    const cityIndex = Math.floor(i / 10); // 0 a 4
    const [cityName, coords] = cityList[cityIndex];

    // Adiciona jitter pequeno nas coordenadas (±0.01° ≈ 1 km)
    const jitterLat = coords.lat + (Math.random() - 0.5) * 0.02;
    const jitterLong = coords.long + (Math.random() - 0.5) * 0.02;

    const location = locationRepository.create({
      street: `Rua ${cityName} ${(i % 10) + 1}`,
      lat: jitterLat.toFixed(6),
      long: jitterLong.toFixed(6),
    });

    const panel = panelRepository.create({
      name: `Painel ${i + 1}`,
      groupId: i % 5 === 0 ? undefined : Math.floor(Math.random() * 5) + 1,
      tenantId: 1,
      online: i % 2 === 0,
      location,
    });

    panelsWithLocations.push({ panel, location });
  }

  await locationRepository.save(panelsWithLocations.map((p) => p.location));
  await panelRepository.save(panelsWithLocations.map((p) => p.panel));

  console.log(
    '✔️ Seed de 50 painéis com localizações variadas criado com sucesso.',
  );
}
