<script setup lang="ts">
import leaflet from "leaflet";
import { onMounted, ref } from "vue";
let mymap;

const location = ref();
const errorStr = ref();

onMounted(async () => {
  const Turruter = leaflet.tileLayer.wms(
    "https://openwms.statkart.no/skwms1/wms.friluftsruter2?",
    {
      layers: "Fotrute",

      transparent: true,
      format: "image/png",
      attribution: "NVE",
    }
  );

  const bolgevarsel = leaflet.tileLayer.wms(
    "https://geo.barentswatch.no/geoserver/bw/ows?",
    {
      layers: "waveforecast_area_iso_latest",
      transparent: true,
      format: "image/png",
      attribution: "NVE",
    }
  );

  const laksekart = leaflet.tileLayer.wms(
    " https://laksekartogc.fylkesmannen.no/wms.ashx?",
    {
      layers: "layer_53",
      transparent: true,
      format: "image/png",
      attribution: "NVE",
    }
  );

  const Vindkraft = leaflet.tileLayer.wms(
    "https://nve.geodataonline.no/arcgis/services/Vindkraft2/MapServer/WmsServer?",
    {
      layers: "Vindkraft_utbygd",
      transparent: true,
      format: "image/png",
      attribution: "NVE",
    }
  );

  const bratthet = leaflet.tileLayer.wms(
    "https://nve.geodataonline.no/arcgis/services/Bratthet/MapServer/WmsServer?",
    {
      layers: "Bratthet_snoskred",
      transparent: true,
      format: "image/png",
      attribution: "NVE",
    }
  );

  var norgeskart = leaflet.tileLayer(
    "https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4graatone&zoom={z}&x={x}&y={y}",
    {
      opacity: 0.7,
      maxZoom: 19,
      detectRetina: true,
      attribution: '&copy; <a href="https://www.kartverket.no/">Kartverket</a>',
    }
  );

  var baseMaps = {
    norgeskart: norgeskart,
  };

  var overlay = {
    bratt: bratthet,
    Vindkraft: Vindkraft,
    Bølgevarsel: bolgevarsel,
    laksekart: laksekart,
    turruter: Turruter,
  };
  mymap = leaflet.map("mapid", {
    layers: [norgeskart],
  });

  mymap.locate({ setView: true, maxZoom: 10 });
  var layerControl = leaflet.control.layers(baseMaps, overlay).addTo(mymap);
  await locateMe();

  leaflet
    .marker([location.value.coords.latitude, location.value.coords.longitude])
    .addTo(mymap)
    .bindPopup("Du er her")
    .openPopup();
});

const locateMe = async () => {
  try {
    location.value = await getLocation();
  } catch (e: any) {
    errorStr.value = e.message;
  }

  return true;
};

const getLocation = async () => {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Geolocation is not available."));
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve(pos);
      },
      (err) => {
        reject(err);
      }
    );
  });
};
</script>

<template>
  <div class="grid">
    <div class="col">
      <div id="mapid"></div>
    </div>
  </div>
</template>

<style>
#mapid {
  height: 100vh;
}
</style>
