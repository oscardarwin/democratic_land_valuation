{
  description = "Leptos + WASM dev shell (with Rust + cargo-leptos)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          name = "leptos-dev-shell";

          buildInputs = with pkgs; [
            gdal
            nodejs
            prettierd
            tippecanoe
            nodejs_22
            nodePackages.pnpm
            nodePackages.nodejs
            nodePackages.tailwindcss
            nodePackages.postcss
            nodePackages.autoprefixer
            nodePackages.typescript
          ];
        };
      });
}
