# OCJ Experience – Japanese Language Schools Map
## Project Brief for Claude Code Sessions

---

## What this project is

A historical web map of known Japanese language schools in Orange County, CA during the prewar era. Originally built as an ArcGIS Web AppBuilder (WAB 2.24) app hosted on ArcGIS Online (AGOL). We are rebuilding it as a fully open-source, free-to-host webapp.

---

## Decided stack

| Layer | Technology |
|---|---|
| Mapping library | **MapLibre GL JS** |
| Static site hosting | **GitHub Pages** |
| Data format | **GeoJSON** |
| Data hosting | **GitHub** (same repo) |
| Container dev environment | **Docker + WSL 2** (Windows) |

---

## Data source (AGOL — to be exported)

- **Portal:** `https://yalemaps.maps.arcgis.com`
- **Web Map Item ID:** `74a0e6e253f54319928bdaa1e77b7b0a`
- **App Item ID:** `391d1a92a2584a32963ca92a5e471422`

To retrieve the full web map definition (renderer, time settings, popups):
```
https://yalemaps.maps.arcgis.com/sharing/rest/content/items/74a0e6e253f54319928bdaa1e77b7b0a/data?f=json
```

---

## Key data characteristics to preserve

- **Temporal data** — each point/line has start/end date fields driving a time slider
- **Classification symbology** — certain/uncertain location status changes the icon (school icon vs. circle)
- **Color and size rules** — defined in the AGOL web map renderer, need to be translated to MapLibre style spec
- **Metadata/attributes** — rich per-point info displayed in popups
- **Lines** — there are both point and line features in the dataset

---

## Splash screen content (from original config.json)

> "This map includes known Japanese language schools around Orange County during the prewar. Some schools exact begin and end dates are unknown. **Click** a **point** or **school!** **Uncertain** latitude and longitude points are displayed as circles instead of schools. View the **legend** by clicking the layer icon in the top left!"

Background color: `#508dca`

---

## Export checklist (before building)

- [ ] Export feature layer(s) from AGOL as **GeoJSON**
- [ ] Download web map JSON from the REST URL above
- [ ] Note all field names (especially temporal fields and the certain/uncertain flag)
- [ ] Screenshot or document the existing symbology before AGOL access ends

---

## Build goals

- Free and open source end to end
- GitHub Pages for hosting (no server cost)
- Faithful recreation of temporal animation
- Preserve original symbology logic (school icon vs. circle for uncertain points)
- Preserve splash/loading screen content
- Accessible and publicly shareable

---

## Notes for Claude Code

- Dylan works in WSL 2 + Docker Desktop on Windows
- Preferred approach: understand reasoning behind implementation decisions, not just copy-paste solutions
- Ask about field names from the exported GeoJSON before writing any MapLibre style expressions
