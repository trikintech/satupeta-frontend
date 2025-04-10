const leafletZoomToCesiumHeight = (zoomLevel: number) => {
  const maxZoom = 18;
  const minHeight = 10000;
  const maxHeight = 2000000;
  const height =
    minHeight + (maxHeight - minHeight) * (1 - zoomLevel / maxZoom);

  return height;
};

export { leafletZoomToCesiumHeight };
