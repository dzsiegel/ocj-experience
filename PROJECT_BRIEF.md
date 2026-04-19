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

## Data source (AGOL — exported)

- **Portal:** `https://yalemaps.maps.arcgis.com`
- **Web Map Item ID:** `74a0e6e253f54319928bdaa1e77b7b0a`
- **App Item ID:** `391d1a92a2584a32963ca92a5e471422`

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

## ✅ Completed: Language Schools map

**File:** `maps/language-schools.html`
**Embedded in:** `pages/communities.html` (first iframe, replaces AGOL app `391d1a92a2584a32963ca92a5e471422`)

**Implementation:**
- MapLibre GL JS v4, CartoDB Dark Matter basemap
- GeoJSON: `map-data/OCJ_Language_Schools_v0_1_WFL1.geojson` (11 features)
- Renderer from `map-data/agol-rest-api.json`:
  - `Lat_Long_Uncertainty == "No"` → blue circle (r=9, #4a90d9, white border)
  - `Lat_Long_Uncertainty == "Yes"` → red circle (r=7.5, rgba(255,0,0,0.75), dark border)
- Popup: Location (title), Years active, Uncertainty flag, Description
- Splash screen from `schools-config.json`
- Legend bottom-left, navigation + scale controls

---

## ✅ Completed: 4 temporal maps using full dataset (2026-04-19)

### Dataset: `map-data/OCJ_Experience_0_2_1_Full_WFL1.geojson`
- **1,332 features** total; 666 with real geometry (348 Points + 318 Lines); 666 null-geometry (ArcGIS export artifacts)
- **Points** — fields: `OBJECTID` (stop index), `Year_Begin`, `Year_End` (RFC 2822), `Lat_Long_Uncertainty`, `Location`, `Description`
- **Lines** — fields: `OID`, `ORIG_FID`, `Begin_Year`, `End_Year` (RFC 2822), `Description`
- **No narrator field** in the raw GeoJSON — narrator identity is derived from the GeoJSON feature `id` (fid) range lookup in JS
- Feature `id` (fid) 1–348 = points; fid 1–318 = lines (overlapping ranges; same fid = matching point + line)

### Narrator → fid mapping (27 narrators total)
| Key | Name | fid Range |
|-----|------|-----------|
| furuta | Yukiko Furuta | 1–8 |
| yoshida | Yoshiki Yoshida | 9–20 |
| dobashi | Yoneko Dobashi | 21–28 |
| ykishi | Y. Kishiyama | 29–38 |
| runo | Roy Uno | 39–53 |
| mnitta | Mitsuo Nitta | 54–64 |
| hnitta | Hitoshi Nitta | 65–72 |
| myabuki | Mine Yabuki | 73–85 |
| tashima | Masako Tashima | 86–92 |
| marynitta | Mary Nitta | 93–101 |
| mkanno | Maki Kanno | 102–114 |
| kishii | Kyutaro Ishii | 115–123 |
| shige | Kiyoshi Shigekawa | 124–132 |
| yoshitomi | Kinichi K. Yoshitomi | 133–142 |
| kikuchi | Kenji Kikuchi | 143–166 |
| kamei | Shizu Kamei | 167–181 |
| jkanno | James Kanno | 182–190 |
| jskishi | J.S. Kishiyama | 191–199 |
| kaneko | Hyotaro Kaneko | 200–218 |
| minnitta | Minoru Nitta | 219–221 |
| akiyama | Henry K. Akiyama | 222–235 |
| kanegae | Henry Kanegae | 236–240 |
| takahashi | Hana Takahashi | 241–250 |
| fujii | George Fujii | 251–264 |
| nishizu | Clarence I. Nishizu | 265–323 |
| cishii | Charles Ishii | 324–341 |
| amyishii | Amy Uno Ishii | 342–348 |

### Shared implementation (all 4 maps)
- MapLibre GL JS v4, CartoDB Dark Matter basemap
- Narrator assigned via JS `NARRATOR_MAP` fid-range lookup on `f.id`; stored in `p._narrator`
- 27-color `match` expression on `_narrator` for both circle and line layers
- Dual-range time slider: **Window** mode (overlap filter) and **Cumulative** mode (all starts ≤ endYear)
- Scrollable narrator panel (right side) with All / None toggle buttons
- Popup shows narrator name colored to match their dot

### Map 1: Full Map ✅
- **File:** `maps/full-map.html`
- **Embedded in:** `index.html` (replaces AGOL app `d449e9714c224386bc883ea1b5e210d0`)
- Time range 1883–1988; autoplay off; loop on; center [-117.87, 33.72] zoom 8

### Map 2: New Roots (Immigration) ✅
- **File:** `maps/new-roots.html`
- **Embedded in:** `pages/new-roots.html` (replaces AGOL app `bf4f9389ce9e4ff88da7b8dba49f39ab`)
- Time range 1883–1988; autoplay on (triggers from splash OK); loop on; center [155, 32] zoom 3

### Map 3: Incarceration ✅
- **File:** `maps/incarceration.html`
- **Embedded in:** `pages/incarceration.html` (replaces AGOL app `56958096d1f749c68c19612e9ff2cdc3`)
- Time range **1940–1950 only**; autoplay off; loop off; center [-110, 37] zoom 4

### Map 4: Clarence Iwao Nishizu Biography ✅
- **File:** `maps/nishizu.html`
- **Embedded in:** `pages/communities.html` (second iframe, replaces AGOL app `f6b52a8bd2e846d79d30ef142dc9d07b`)
- Filtered to `_narrator == 'nishizu'` only (fids 265–323)
- Time range 1883–1988; autoplay off; center [-117.87, 33.72] zoom 9
- Fixed color scheme: points #4a90d9 (blue), lines #f5a623 (amber)

---

## Notes for Claude Code

- Dylan works in WSL 2 + Docker Desktop on Windows
- Preferred approach: understand reasoning behind implementation decisions, not just copy-paste solutions
- The school icon PNG from agol-rest-api.json causes tile-boundary clipping in MapLibre symbol layers — use circle layers instead
- All map work pushed to `dev` branch; do not merge to `main` without Dylan's instruction
