{
  description = "0xhckr.dev website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            pnpm
            nodejs_22
            biome
          ];

          shellHook = ''
            nix run --extra-experimental-features nix-command --extra-experimental-features flakes .#install;
          '';
        };
        apps = {
          install = let
            install = pkgs.writeShellScript "install" ''
              ${pkgs.pnpm}/bin/pnpm install;
            '';
          in {
            type = "app";
            program = "${install}";
          };

          dev = let 
            dev = pkgs.writeShellScript "dev" ''
              ${pkgs.pnpm}/bin/pnpm dev;
            '';
          in {
            type = "app";
            program = "${dev}";
          };
        };
      }
    );
}
