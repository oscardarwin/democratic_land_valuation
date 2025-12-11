SCHEMAFULL;

DEFINE TABLE title_boundaries SCHEMAFULL;
DEFINE FIELD boundary ON title_boundaries TYPE geometry<multipolygon> ASSERT $value != NONE;

DEFINE TABLE users SCHEMAFULL;
DEFINE FIELD residence_title_boundary ON users TYPE record<title_boundaries> ASSERT $value != NONE;

DEFINE TABLE assessments SCHEMAFULL;
DEFINE FIELD start_date ON assessments TYPE datetime ASSERT $value != NONE;
DEFINE FIELD end_date ON assessments TYPE datetime ASSERT $value != NONE AND $value >= $this.start_date;
DEFINE FIELD assessed_title_boundary ON users TYPE record<title_boundaries> ASSERT $value != NONE;
DEFINE FIELD comparison_title_boundaries ON assessments TYPE array<record<title_boundaries>> ASSERT array::len($value) = 4;
