/* Bike Trail Tirol Beispiel */

// Innsbruck
let ibk = {
    lat: 47.267222,
    lng: 11.392778
};

// Karte initialisieren
let map = L.map("map").setView([ibk.lat, ibk.lng], 9);

// WMTS Hintergrundlayer der eGrundkarte Tirol
let eGrundkarteTirol = {
    sommer: L.tileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png", {
        attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
    }),
    winter: L.tileLayer(
        "https://wmts.kartetirol.at/gdi_winter/{z}/{x}/{y}.png", {
        attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
    }),
    ortho: L.tileLayer("https://wmts.kartetirol.at/gdi_ortho/{z}/{x}/{y}.png", {
        attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
    }
    ),
    nomenklatur: L.tileLayer("https://wmts.kartetirol.at/gdi_nomenklatur/{z}/{x}/{y}.png", {
        attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`,
        pane: "overlayPane",
    })
}

// / Layer control mit eGrundkarte Tirol und Standardlayern
L.control.layers({
    "eGrundkarte Tirol Sommer": L.layerGroup([
        eGrundkarteTirol.sommer,
        eGrundkarteTirol.nomenklatur
    ]).addTo(map),
    "eGrundkarte Tirol Winter": L.layerGroup([
        eGrundkarteTirol.winter,
        eGrundkarteTirol.nomenklatur
    ]),
    "eGrundkarte Tirol Orthofoto": L.layerGroup([
        eGrundkarteTirol.ortho,
        eGrundkarteTirol.nomenklatur,
    ]),
    "OpenStreetMap": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Esri WorldImagery": L.tileLayer.provider("Esri.WorldImagery"),
}).addTo(map);

// Maßstab
L.control.scale({
    imperial: false,
}).addTo(map);

// Etappennavigation über Pulldownmenü
//console.log(ETAPPEN);
let pulldown = document.querySelector("#pulldown");
for (let etappe of ETAPPEN) {
    //console.log(etappe);
    //console.log(etappe.user);
    //console.log(etappe.nr);
    //console.log(etappe.titel);
    let selected = "";
    if (etappe.nr == 7) {
        selected = "selected";
    }
    pulldown.innerHTML += `
        <option ${selected} value="${etappe.user}">Etappe ${etappe.nr}: ${etappe.titel}</option>
    `;
}

// auf Wechsel in Pulldown reagieren
pulldown.onchange = function(evt) {
    //console.log(evt.target.value);
    window.location.href = `https://${evt.target.value}.github.io/biketirol`;
}

const controlElevation = L.control.elevation({
    theme: "bike-tirol",
    time: false,
    elevationDiv: "#profile",
    height: 300,
    slope: true,
}).addTo(map);
controlElevation.load("data/etappe7.gpx");


// minimap plugin mit Grundkarte Tirol Sommer als Layer
var gkTirol = new L.TileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png");
var miniMap = new L.Control.MiniMap(gkTirol, {
    toggleDisplay: true
}).addTo(map);

// Leaflet fullscreen plugin
// const fullScreenControl = L.control.fullscreen();
// fullScreenControl.addTo(map);
// oder
map.addControl(new L.Control.Fullscreen());