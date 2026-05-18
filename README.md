# Jellystrm Plugins

Jellyfin plugin repository catalog for Jellystrm plugins.

Add this repository URL in Jellyfin Dashboard -> Plugins -> Repositories:

```text
https://raw.githubusercontent.com/jellystrm/plugins/main/manifest.json
```

This catalog can contain multiple Jellyfin plugins. Individual plugin source code and release ZIPs live in their own repositories.

## Adding Plugins

Add each plugin repository manifest URL to `plugins.json`, then run the `Update Catalog` workflow. The workflow merges all plugin manifests into `manifest.json`.

## Current Plugins

- Jellystrm: https://github.com/jellystrm/source-manager
