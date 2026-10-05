// Real photography sourced from Unsplash (free license, commercial use
// allowed) to stand in for ENGOBO GROUP's own photography until the media
// library described in the cahier des charges (§33) is populated with real
// project photos. Every key here matches an `image`/gallery id used across
// lib/data.ts and the page banners — see components/ui/ImagePlaceholder.tsx
// for how this map is consumed.

export const unsplashPhotos: Record<string, string> = {
  // Hero slides (home)
  "hero-marbrerie": "1658804611830-435a78038870",
  "hero-granit": "1706222299160-db5d09a3e095",
  "hero-menuiserie": "1497218770144-3fea6dbc33fe",

  // Inner page banners
  "hero-services": "1613490493576-7fde63acd811",
  "hero-produits": "1680503146454-0fe569cef4eb",
  "hero-realisations": "1554703752-4a82234d396e",
  "hero-devis": "1611021061285-16c871740efa",
  "hero-contact": "1591474200742-8e512e6f98f8",
  "hero-a-propos": "1589939705384-5185137a7f0f",
  "hero-actualites": "1512916194211-3f2b7f5f7de3",

  // Services
  "service-importation": "1605732562742-3023a888e56e",
  "service-marbrerie": "1682888813913-e13f18692019",
  "service-ebenisterie": "1608613304899-ea8098577e38",
  "service-menuiserie": "1536160885591-301854e2ed04",
  "service-commerce": "1687180497278-ca4d736ecc99",

  "gallery-importation-1": "1590497008432-598f04441de8",
  "gallery-importation-2": "1583686298564-46fbffda0707",
  "gallery-marbrerie-1": "1540177656454-3f6c4547bed1",
  "gallery-marbrerie-2": "1604762537333-e60adda0acdc",
  "gallery-marbrerie-3": "1526573059328-179b147e1b42",
  "gallery-ebenisterie-1": "1590880795696-20c7dfadacde",
  "gallery-ebenisterie-2": "1632862378103-8248dccb7e3d",
  "gallery-menuiserie-1": "1542354642-233af003db87",
  "gallery-menuiserie-2": "1569216961559-fd512349ebba",
  "gallery-commerce-1": "1687180498602-5a1046defaa4",
  "gallery-commerce-2": "1493946740644-2d8a1f1a6aff",

  // Products
  "product-marbre-blanc": "1556911220-bff31c812dba",
  "product-marbre-blanc-1": "1610276099118-c929abaaa80a",
  "product-marbre-blanc-2": "1556912173-46c336c7fd55",
  "product-granit-noir": "1706222299160-db5d09a3e095",
  "product-granit-noir-1": "1604762537333-e60adda0acdc",
  "product-armoire-bois": "1774301211236-dab64d553241",
  "product-armoire-bois-1": "1787539386488-2d287f4438b7",
  "product-table-bois": "1631048835473-73c7aaf86096",
  "product-table-bois-1": "1600122272511-c85c3a0209f9",
  "product-porte-bois": "1542020383883-6c6b2a343807",
  "product-porte-bois-1": "1636619301813-c637106c541e",
  "product-fenetre-alu": "1564327481459-8bcd5561cf86",
  "product-fenetre-alu-1": "1569216961559-fd512349ebba",
  "product-carrelage": "1706629503586-2731f65587ae",
  "product-carrelage-1": "1599031628962-1f6755a3b1b5",
  "product-ciment": "1730627283177-f43b83c3850c",
  "product-ciment-1": "1761805618757-9d2b9552ee32",

  // Projects (réalisations)
  "project-cuisine-granit": "1610733374054-59454fe657cd",
  "project-cuisine-granit-1": "1560562125-ab512e4d9d29",
  "project-cuisine-granit-2": "1616596612351-5a7ae04e2840",
  "project-cuisine-granit-3": "1612031736184-77bc60f94c06",
  "project-escalier-marbre": "1627382385242-d41b912877eb",
  "project-escalier-marbre-1": "1658804611830-435a78038870",
  "project-escalier-marbre-2": "1554703752-4a82234d396e",
  "project-dressing": "1781473377372-8690a514c152",
  "project-dressing-1": "1774301211236-dab64d553241",
  "project-dressing-2": "1787539386488-2d287f4438b7",
  "project-bureau": "1623177623442-979c1e42c255",
  "project-bureau-1": "1611269154421-4e27233ac5c7",
  "project-bureau-2": "1497219055242-93359eeed651",
  "project-facade-pierre": "1748063578185-3d68121b11ff",
  "project-facade-pierre-1": "1670589953882-b94c9cb380f5",
  "project-portail": "1497218770144-3fea6dbc33fe",
  "project-portail-1": "1536160885591-301854e2ed04",
  "project-showroom": "1680503146454-0fe569cef4eb",
  "project-showroom-1": "1687180497278-ca4d736ecc99",
  "project-monument": "1604762537333-e60adda0acdc",
  "project-monument-1": "1706222299160-db5d09a3e095",

  // Articles
  "article-marbre-tendances": "1682888813913-e13f18692019",
  "article-cuisine-granit": "1502005097973-6a7082348e28",
  "article-devis-conseils": "1623177623442-979c1e42c255",

  // About / misc
  "intro-atelier": "1611021061285-16c871740efa",
  "cta-projet": "1613490493576-7fde63acd811",
  "about-entreprise": "1601058268499-e52658b8bb88",
  "equipe-1": "1589939705384-5185137a7f0f",
  "equipe-2": "1632862378103-8248dccb7e3d",
  "equipe-3": "1505798577917-a65157d3320a",
  "equipe-4": "1659930087003-2d64e33181f7",
};

export function unsplashUrl(hash: string, width = 1400) {
  return `https://images.unsplash.com/photo-${hash}?auto=format&fit=crop&w=${width}&q=80`;
}

// ---------------------------------------------------------------------------
// Fallback photos for content that has no uploaded image yet (the API returns
// `image: ""`). Picks a themed pool from the item's slug/title; anything
// uploaded through the back-office always takes precedence.
// ---------------------------------------------------------------------------

const pools = {
  marble: ["1556911220-bff31c812dba", "1610276099118-c929abaaa80a", "1556912173-46c336c7fd55", "1540177656454-3f6c4547bed1"],
  granite: ["1706222299160-db5d09a3e095", "1604762537333-e60adda0acdc", "1682888813913-e13f18692019"],
  stairs: ["1658804611830-435a78038870", "1554703752-4a82234d396e", "1627382385242-d41b912877eb", "1526573059328-179b147e1b42"],
  kitchen: ["1610733374054-59454fe657cd", "1560562125-ab512e4d9d29", "1502005097973-6a7082348e28", "1631048835473-73c7aaf86096"],
  wardrobe: ["1774301211236-dab64d553241", "1787539386488-2d287f4438b7", "1781473377372-8690a514c152"],
  office: ["1623177623442-979c1e42c255", "1611269154421-4e27233ac5c7", "1497219055242-93359eeed651"],
  door: ["1497218770144-3fea6dbc33fe", "1536160885591-301854e2ed04", "1542020383883-6c6b2a343807", "1636619301813-c637106c541e"],
  window: ["1564327481459-8bcd5561cf86", "1569216961559-fd512349ebba", "1542354642-233af003db87"],
  tile: ["1706629503586-2731f65587ae", "1599031628962-1f6755a3b1b5", "1706629503571-c165023a7792"],
  construction: ["1730627283177-f43b83c3850c", "1761805618757-9d2b9552ee32", "1787422429939-8b628fa88e3b"],
  furniture: ["1608613304899-ea8098577e38", "1590880795696-20c7dfadacde", "1631048835473-73c7aaf86096", "1600122272511-c85c3a0209f9"],
  workshop: ["1611021061285-16c871740efa", "1659930087003-2d64e33181f7", "1632862378103-8248dccb7e3d", "1589939705384-5185137a7f0f"],
  facade: ["1748063578185-3d68121b11ff", "1670589953882-b94c9cb380f5", "1613490493576-7fde63acd811", "1591474200742-8e512e6f98f8"],
  showroom: ["1680503146454-0fe569cef4eb", "1687180497278-ca4d736ecc99", "1687180498602-5a1046defaa4"],
  import: ["1605732562742-3023a888e56e", "1590497008432-598f04441de8", "1583686298564-46fbffda0707", "1493946740644-2d8a1f1a6aff"],
};

const keywordPools: [RegExp, keyof typeof pools][] = [
  [/escalier/, "stairs"],
  [/cuisine/, "kitchen"],
  [/dressing|armoire|placard/, "wardrobe"],
  [/bureau/, "office"],
  [/fenetre|vitrage|aluminium/, "window"],
  [/porte|portail|cloture/, "door"],
  [/carrelage|gres|revetement/, "tile"],
  [/ciment|materiaux|construction|chantier/, "construction"],
  [/granit|monument|tombal/, "granite"],
  [/marbre|marbrerie|pierre|plan-de-travail/, "marble"],
  [/facade/, "facade"],
  [/showroom|commerc|amenagement/, "showroom"],
  [/import|container/, "import"],
  [/table|meuble|mobilier|ebenist|bois/, "furniture"],
  [/menuiser|atelier|devis|conseil/, "workshop"],
];

function normalize(text: string) {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function fallbackPhotos(text: string, seed = 0, count = 3): string[] {
  const t = normalize(text);
  const match = keywordPools.find(([re]) => re.test(t));
  const names = Object.keys(pools) as (keyof typeof pools)[];
  const pool = pools[match ? match[1] : names[seed % names.length]];
  return Array.from({ length: Math.min(count, pool.length) }, (_, i) =>
    unsplashUrl(pool[(i + seed) % pool.length])
  );
}
