/* Keeps the trainer on the iPad for use with no network: the page and its photos are saved the first time
   it opens, checked for a newer copy whenever there is a network, and served from here when there is none. */
const CACHE = 'a320-trainer-41a8ce7bb0';
const FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icon-192.png",
  "icon-512.png",
  "apple-touch-icon.png",
  "checklist/img/01_trainer.webp",
  "checklist/img/02_states.webp",
  "checklist/img/03_overhead_cruise.webp",
  "checklist/img/04_managed.webp",
  "checklist/img/05_mcdu_entry.webp",
  "checklist/img/06_runways.webp",
  "checklist/img/07_cockpit.webp",
  "checklist/img/08_cockpit.webp",
  "checklist/img/09_overhead_map.webp",
  "checklist/img/10_pfd.webp",
  "checklist/img/11_speedtape.webp",
  "checklist/img/12_fma_photo.webp",
  "checklist/img/13_fma_trainer.webp",
  "checklist/img/14_nd.webp",
  "checklist/img/15_ecam.webp",
  "checklist/img/16_fcu.webp",
  "checklist/img/17_fcu.webp",
  "checklist/img/18_mcdu.webp",
  "checklist/img/19_thrust.webp",
  "checklist/img/20_thrust_levers.webp",
  "checklist/img/21_lights.webp",
  "checklist/img/22_jurvetson_sim.webp",
  "checklist/img/23_levers.webp",
  "checklist/img/24_power.webp",
  "checklist/img/25_overhead_gate.webp",
  "checklist/img/26_overhead_set.webp",
  "checklist/img/27_adirs.webp",
  "checklist/img/28_overhead.webp",
  "checklist/img/29_mainpanel.webp",
  "checklist/img/30_rmp.webp",
  "checklist/img/31_efis.webp",
  "checklist/img/32_acstatus.webp",
  "checklist/img/33_inita.webp",
  "checklist/img/34_dep.webp",
  "checklist/img/35_route.webp",
  "checklist/img/36_arr.webp",
  "checklist/img/37_disco.webp",
  "checklist/img/38_radnav.webp",
  "checklist/img/39_initb.webp",
  "checklist/img/40_perfto.webp",
  "checklist/img/41_perfappr.webp",
  "checklist/img/42_tc_jpn.webp",
  "checklist/img/43_wizz_tug.webp",
  "checklist/img/44_eng.webp",
  "checklist/img/45_pedestal.webp",
  "checklist/img/46_climb.webp",
  "checklist/img/47_prog_fuel.webp",
  "checklist/img/48_cruise.webp",
  "checklist/img/49_nd_td.webp",
  "checklist/img/50_descent.webp",
  "checklist/img/51_perf_appr.webp",
  "checklist/img/52_approaching_ory.webp",
  "checklist/img/53_nd_cf.webp",
  "checklist/img/54_final.webp",
  "checklist/img/55_nce_short.webp",
  "checklist/img/56_reversers.webp",
  "checklist/img/57_after_touchdown.webp",
  "checklist/img/58_ist_aerial.webp",
  "checklist/img/59_runway_vacated.webp",
  "checklist/img/60_finger.webp",
  "checklist/img/61_a330.webp",
  "checklist/img/flight_profile.webp",
  "checklist/img/ils_side_view.webp",
  "checklist/img/point_merge.webp",
  "checklist/img/route_map.webp"
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k.startsWith('a320-trainer-') && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const res = await fetch(req, { cache: 'no-cache' });
      if (res.ok) cache.put(req, res.clone());
      return res;
    } catch (err) {
      const hit = (await cache.match(req, { ignoreSearch: true })) || (req.mode === 'navigate' ? await cache.match('index.html') : null);
      if (hit) return hit;
      throw err;
    }
  })());
});
