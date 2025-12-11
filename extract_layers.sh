#!/bin/bash

INPUT_MBTILES="tiles/uk.mbtiles"
OUTPUT_DIR="split_geojsons"
# Your target clipping area (minlon, minlat, maxlon, maxlat)
SPATIAL_EXTENT="-0.130945 51.474153 -0.043786 51.516047"

# List of all layers from your MBTiles metadata
# NOTE: Ensure this list is accurate based on your 'json' metadata key
LAYERS=(
    "sea" "names" "rail" "waterlines" "etl" "foreshore" "sites"
    "railwaystations" "roads" "greenspaces" "contours" "buildings"
    "boundaries" "airports" "woodland" "national_parks" "urban_areas"
    "surfacewater"
)
# ---------------------

# 1. Create the output directory
echo "Creating output directory: ${OUTPUT_DIR}"
mkdir -p "$OUTPUT_DIR"

# 2. Loop through each layer and run the ogr2ogr command
for LAYER_NAME in "${LAYERS[@]}"; do
    OUTPUT_FILE="${OUTPUT_DIR}/${LAYER_NAME}.geojson"
    
    echo ""
    echo "Processing layer: **${LAYER_NAME}** -> ${OUTPUT_FILE}"
    
    # The core ogr2ogr command
    ogr2ogr \
        -f GeoJSON \
        -spat ${SPATIAL_EXTENT} \
        -spat_srs EPSG:4326 \
        -t_srs EPSG:4326 \
        "${OUTPUT_FILE}" \
        "${INPUT_MBTILES}" \
        "${LAYER_NAME}"
        
    if [ $? -ne 0 ]; then
        echo "⚠️ WARNING: ogr2ogr encountered an error on layer **${LAYER_NAME}**. Check if the layer exists or contains valid geometry."
    fi
done

echo ""
echo "**✅ All layers processed!**"
echo "You can find your clipped GeoJSON files in the **${OUTPUT_DIR}** directory."

# 3. Next step: Generate the PMTiles file
echo "---"
echo "Next step: Run Tippecanoe to generate the final PMTiles file:"
echo "tippecanoe -o elephant_and_castle.pmtiles ${OUTPUT_DIR}/*.geojson -z14 -Z4 -f"
