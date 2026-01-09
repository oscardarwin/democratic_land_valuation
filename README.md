# Somers Democratic LVT

## How To Run Locally:
nix develop
npm run build
npm run preview

## To Create Mock Evaluations
```
cd value_parcels
python -m venv .venv
source .venv/bin/activate.fish
pip install poetry
poetry install
python title_boundary_evaluation/run.py
```

# TODO:
## Voting Map
Make randomness choose parcels with similar size
Make parcels limited to a randomly selected square?




## Aggregation Animation

## New Idea:

### Property Features Breakdown
Countours on map. Overall + toggleable features
Also make the parcels toggleable. Selecting a parcel shows all features.
The features form a table with contributions towards tax each row also has a confidence percentage on how likely the variance is explained by the model.

### Show Research on features
Do the features actually contribute towards the model?

Show datapoints that have this feature and show feature vs price graph with relevant datapoints.
For binary features show overlapping histograms.

### Legal Defensibility of Hedonic Models
The model has a convex objective function?
iff Data matrix has full rank

=> There is exactly one set of parameters that explains all the variation

+ This algorithm is % percent accurate.

### Detail appeal process

1. Is the data in the current features correct?
=> Someone can come round and verify

2. Are there missing important features? If so, run the same analysis with the feature included and check if it explains more variance


## List all features of respective property
List what each features contributes towards the model


## Show Countours of each feature contributions on map
