import { GeometryLine, GeometryMultiPolygon, GeometryPoint, GeometryPolygon, Surreal } from 'surrealdb';
import { surrealdbWasmEngines } from "@surrealdb/wasm";
import compute_area from "@turf/area";

const GEOJSON_PATH = 'title_boundaries.geojson';
const SCHEMA_DEFINITIONS = 'schema.surql';

const DB_NAMESPACE = 'democratic_lvt';
const DB_DATABASE = 'title_boundaries';

interface TitleBoundary {
  id: string;
  boundary: GeometryMultiPolygon;
  area: number;
}

interface User {
  residence_title_boundary_id: string;
}

interface Assessment {
  start_date: string;
  end_date: string;
  assessed_title_boundary: string[];
  comparison_title_boundaries: string[];
}

async function fetchTitleBoundariesGeoJson(): GeoJSON {

}

async function createTitleBoundaries(): TitleBoundary[] {
  const response = await fetch(GEOJSON_PATH);
  if (!response.ok) {
    throw new Error(`Failed to fetch GeoJSON from ${GEOJSON_PATH}: ${response.statusText}`);
  }
  const geojson = await response.json();

  const features = geojson.features || [];
  console.log(`Starting data loading for ${features.length} features...`);

  const title_boundaries: TitleBoundary[] = features.map((feature: any) => {
    const area = compute_area(feature);

    const polygons = feature.geometry.coordinates.map(
      (polygon: number[][][]) => {
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
      boundary,
      area,
    };
  });

  return title_boundaries
}

function createUsers(title_boundaries: TitleBoundary[]): User[] {
  let users = title_boundaries
    .filter(() => Math.random() < 0.3)
    .map((title_boundary: TitleBoundary) => {
      return {
        residence_title_boundary_id: title_boundary.id
      }
    });

  if (users.length < 30) {
    return createUsers(title_boundaries); // until we get lodash shuffle
  } else {

    console.log(`Created ${users.length} users.`);
    return users;
  }
}

function createAssessments(users: User[], title_boundaries: TitleBoundary[]): Assessment[] {

}

async function insertTitleBoundariesBatch(db: Surreal, title_boundaries: TitleBoundary[]) {
  const query = title_boundaries.map((tb, idx) =>
    `CREATE ${tb.id} SET boundary = $boundary${idx};`
  ).join("\n");

  const params: Record<string, any> = {};
  title_boundaries.forEach((title_boundary: TitleBoundary, idx) => {
    params[`boundary${idx}`] = title_boundary.boundary;
  });

  await db.query(query, params);
}

async function createTableData(db: Surreal): Promise<void> {
  const title_boundaries = await createTitleBoundaries();
  const users = createUsers(title_boundaries);

  await insertTitleBoundariesBatch(db, title_boundaries);
  await db.insert<User>('users', users);
}

async function defineSchema(db: Surreal): Promise<void> {
  const response = await fetch(SCHEMA_DEFINITIONS);
  if (!response.ok) {
    throw new Error(`Failed to fetch schema from ${SCHEMA_DEFINITIONS}: ${response.statusText}`);
  }
  const schemaContent = await response.text();

  console.log("Defining schema and spatial indices...");

  await db.query('REMOVE TABLE title_boundaries');
  await db.query('REMOVE TABLE users');
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
    await createTableData(db);

    console.log("--- Data Loading Complete ---");
  } catch (error) {
    console.error("An error occurred during the loading process.", error);
  }
}
