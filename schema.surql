SCHEMAFULL;

DEFINE TABLE title_boundaries SCHEMAFULL;
DEFINE FIELD title_boundary_id ON title_boundaries TYPE string ASSERT $value != NONE;
DEFINE FIELD boundary ON title_boundaries TYPE geometry<multipolygon> ASSERT $value != NONE;
