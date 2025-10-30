{
  description = "Leptos + WASM dev shell (with Rust + cargo-leptos)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05";
    flake-utils.url = "github:numtide/flake-utils";
    rust-overlay.url = "github:oxalica/rust-overlay";
  };

  outputs = { self, nixpkgs, flake-utils, rust-overlay }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        overlays = [ (import rust-overlay) ];
        pkgs = import nixpkgs { inherit system overlays; };

        rust = pkgs.rust-bin.stable.latest.default.override {
          extensions = [ "rust-src" "rustfmt" "clippy" ];
          targets = [ "wasm32-unknown-unknown" ];
        };
      in
      {
        devShells.default = pkgs.mkShell {
          name = "leptos-dev-shell";

          buildInputs = with pkgs; [
            rust
            cargo-leptos
            cargo-generate
            gdal
            nodejs
            openssl
            pkg-config
            wasm-bindgen-cli_0_2_100
            dart-sass
          ];
        };
      });
}
