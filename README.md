# Somers Democratic LVT

## Run tile server:

docker run --rm -it -v $(pwd):/data -p 8080:80 klokantech/tileserver-gl

## Run website:

cargo-leptos serve
