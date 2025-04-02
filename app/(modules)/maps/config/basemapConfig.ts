export const basemapConfig = {
  osm: {
    name: "OpenStreetMap",
    thumbnail: "osm-thumb.png", // Optional: for thumbnail previews
    leaflet: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    },
    cesium: {
      type: "OpenStreetMapImageryProvider",
      options: {
        url: "https://a.tile.openstreetmap.org/",
      },
    },
  },
  satellite: {
    name: "Satellite",
    thumbnail: "satellite-thumb.png",
    leaflet: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      maxZoom: 18,
    },
    cesium: {
      type: "ArcGisMapServerImageryProvider",
      options: {
        url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
      },
    },
  },
  terrain: {
    name: "Terrain",
    thumbnail: "terrain-thumb.png",
    leaflet: {
      url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      attribution:
        'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
      maxZoom: 17,
    },

    cesium: {
      type: "OpenStreetMapImageryProvider",
      options: {
        url: "https://a.tile.opentopomap.org/",
      },
    },
  },
  dark: {
    name: "Dark Mode",
    thumbnail: "dark-thumb.png",
    leaflet: {
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
    },
    cesium: {
      type: "UrlTemplateImageryProvider",
      options: {
        url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{y}/{x}.png",
        subdomains: ["a", "b", "c", "d"],
        minimumLevel: 0,
        maximumLevel: 19,
      },
    },
  },
  light: {
    name: "Light Mode",
    thumbnail: "light-thumb.png",
    leaflet: {
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
    },
    cesium: {
      type: "UrlTemplateImageryProvider",
      options: {
        url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{y}/{x}.png",
        subdomains: ["a", "b", "c", "d"],
        minimumLevel: 0,
        maximumLevel: 19,
      },
    },
  },
};
