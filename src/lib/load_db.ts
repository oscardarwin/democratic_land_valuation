import { GeometryLine, GeometryMultiPolygon, GeometryPoint, GeometryPolygon, Surreal } from 'surrealdb';
import { surrealdbWasmEngines } from "@surrealdb/wasm";

const GEOJSON_PATH = 'title_boundaries.geojson';
const SCHEMA_DEFINITIONS = 'schema.surql';

const DB_NAMESPACE = 'democratic_lvt';
const DB_DATABASE = 'title_boundaries';

interface TitleBoundary {
  title_boundary_id: string;
  boundary: GeometryMultiPolygon;
}

async function createTitleBoundaries(db: Surreal): Promise<void> {
  const response = await fetch(GEOJSON_PATH);
  if (!response.ok) {
    throw new Error(`Failed to fetch GeoJSON from ${GEOJSON_PATH}: ${response.statusText}`);
  }
  const geojson = await response.json();

  const features = geojson.features || [];
  console.log(`Starting data loading for ${features.length} features...`);

  const records: TitleBoundary[] = features.map((feature: any) => {

    const polygons = feature.geometry.coordinates.map(
      (polygon: number[][][]) => {
        // Each polygon is an array of rings
        const lines = polygon.map(
          (ring: number[][]) =>
            new GeometryLine(
              ring.map(([lon, lat]) => new GeometryPoint([lon, lat])) as [
                GeometryPoint,
                GeometryPoint,
                ...GeometryPoint[],
              ]
            )
        );
        return new GeometryPolygon(lines as [GeometryLine, ...GeometryLine[]]);
      }
    );

    const boundary = new GeometryMultiPolygon(
      polygons as [GeometryPolygon, ...GeometryPolygon[]]
    );

    return {
      title_boundary_id: feature.properties.entity,
      boundary: boundary,
    };
  });

  const result = await db.insert<TitleBoundary>('title_boundaries', records);
  console.log(`Successfully inserted ${records.length} records.`, result);
}

async function defineSchema(db: Surreal): Promise<void> {
  const response = await fetch(SCHEMA_DEFINITIONS);
  if (!response.ok) {
    throw new Error(`Failed to fetch schema from ${SCHEMA_DEFINITIONS}: ${response.statusText}`);
  }
  const schemaContent = await response.text();

  console.log("Defining schema and spatial indices...");

  await db.query('REMOVE TABLE title_boundaries');
  const results = await db.query(schemaContent);
  console.log("Schema and indices defined successfully.", results);
}


export async function runLoader(): Promise<void> {
  console.log("Creating new DB");
  const db = new Surreal({
    engines: surrealdbWasmEngines(),
  });
  try {
    await db.connect("indxdb://democratic_lvt");
    await db.use({ namespace: DB_NAMESPACE, database: DB_DATABASE });
    await defineSchema(db);
    await createTitleBoundaries(db);

    console.log("--- Data Loading Complete ---");
  } catch (error) {
    console.error("An error occurred during the loading process.", error);
  }
}
