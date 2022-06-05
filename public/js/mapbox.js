export const displayMap = (locations) => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoidGhlLWpleSIsImEiOiJja3NiZ2Z6YWMwNnE4MndwZm91YnZteDg1In0.l4S-tHWsKL_uK8pRgDkC-A";

  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/the-jey/cksbgrq21606217pels2oh33z",
    scrollZoom: false,
    // center: [-118.113491, 34.111745],
    // zoom: 10,
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();
  locations.forEach((loc) => {
    // Add a marker
    const el = document.createElement("div");
    el.className = "marker";

    new mapboxgl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 50,
      left: 100,
      right: 100,
    },
  });
};
