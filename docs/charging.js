window.NORWAY_API_BASE="https://norway-eight-winter-journey.wh1sper.chatgpt.site";
(() => {
  // public/charging.js
  var stations = [{ name: "Tesla Svolv\xE6r \xB7 Shell", address: "Caroline Harveys vei 8, 8300 Svolv\xE6r, Norway", info: "16 \u4E2A\u8D85\u7EA7\u5145\u7535\u4F4D\uFF0C\u6700\u9AD8 250 kW\uFF1BCCS \u517C\u5BB9\u5176\u4ED6\u54C1\u724C\u7535\u8F66\uFF1B24/7\u3002", price: "Tesla App \u6309\u7AD9\u70B9\u3001\u8F66\u578B\uFF0F\u4F1A\u5458\u53CA\u65F6\u95F4\u663E\u793A\uFF1B\u7F51\u9875\u672A\u7ED9\u56FA\u5B9A\u6570\u503C\u3002", source: "https://www.tesla.com/findus/location/supercharger/teslasvolvr8carolineharveysvei" }, { name: "Tesla Leknes \xB7 REMA 1000", address: "Leknessletta 2, 8370 Leknes, Norway", info: "12 \u4E2A\u8D85\u7EA7\u5145\u7535\u4F4D\uFF0C\u6700\u9AD8 250 kW\uFF1BCCS \u517C\u5BB9\u5176\u4ED6\u54C1\u724C\u7535\u8F66\uFF1B24/7\u3002", price: "\u8BF7\u5728 Tesla App \u9009\u62E9\u6240\u79DF\u8F66\u578B\uFF0C\u67E5\u770B\u5145\u7535\u524D\u5B9E\u9645\u4EF7\u683C\u3002", source: "https://www.tesla.com/findus/location/supercharger/413771" }, { name: "Tesla Reine", address: "Sverdrups vei 7, 8390 Reine, Norway", info: "\u5B98\u65B9\u5217\u8868\u5DF2\u5217\u51FA\u5730\u5740\uFF1B\u53EF\u7528\u63D2\u5934\u3001\u529F\u7387\u53CA\u5176\u4ED6\u54C1\u724C\u517C\u5BB9\u6027\u8BF7\u5728 Tesla App \u518D\u6838\u5BF9\u3002", price: "\u52A8\u6001\u7AD9\u70B9\u4EF7\u683C\uFF0C\u4EE5 Tesla App \u4E3A\u51C6\u3002", source: "https://www.tesla.com/findus/location/supercharger/Reinenosupercharger" }, { name: "Circle K Leknes", address: "Storgata 35, 8370 Leknes, Norway", info: "\u7AD9\u70B9\u5DF2\u6838\u5B9E\uFF1B\u81EA\u8425\uFF0F\u5408\u4F5C\u5145\u7535\u8BBE\u5907\u3001\u529F\u7387\u3001\u7A7A\u95F2\u72B6\u6001\u4E0E\u5145\u7535\u533A\u5F00\u653E\u65F6\u95F4\uFF0C\u4EE5 Circle K App \u4E3A\u51C6\u3002", price: "Circle K \u81EA\u8425\u5FEB\u5145\u53C2\u8003\uFF1Adrop-in 6.79 NOK/kWh\uFF0Cextra 6.49\uFF1B\u4E0D\u81EA\u52A8\u9002\u7528\u4E8E\u5408\u4F5C\u65B9\u8BBE\u5907\u3002", source: "https://www.circlek.no/station/circle-k-leknes" }];
  var select = document.querySelector("#station-select");
  var map = document.querySelector("#charge-map");
  var outside = document.querySelector("#map-external");
  for (let i = 0; i < stations.length; i++) select.add(new Option(stations[i].name, "station-" + i));
  var areas = { all: "EV charging stations Lofoten Norway", eve: "EV charging stations Evenes airport Norway", svolvaer: "EV charging stations Svolvaer Vagan Norway", leknes: "EV charging stations Leknes Norway", reine: "EV charging stations Reine Moskenes Norway" };
  function update() {
    const s = select.value.startsWith("station-") ? stations[Number(select.value.slice(8))] : null;
    const query = s ? s.name + " " + s.address : areas[select.value];
    map.src = "https://www.google.com/maps?q=" + encodeURIComponent(query) + "&output=embed";
    outside.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
  }
  select.onchange = update;
  update();
  var root = document.querySelector("#stations");
  stations.forEach((s, i) => {
    const card = document.createElement("article");
    card.className = "shared-card";
    const title = document.createElement("h3");
    title.textContent = s.name;
    card.append(title);
    for (const text of [s.address, s.info, s.price]) {
      const p = document.createElement("p");
      p.textContent = text;
      card.append(p);
    }
    const controls = document.createElement("div");
    controls.className = "operator-links";
    const btn = document.createElement("button");
    btn.textContent = "\u5728\u5730\u56FE\u4E2D\u67E5\u770B";
    btn.onclick = () => {
      select.value = "station-" + i;
      update();
      map.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    const nav = document.createElement("a");
    nav.textContent = "\u9A7E\u8F66\u5BFC\u822A \u2197";
    nav.href = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(s.address) + "&travelmode=driving";
    nav.target = "_blank";
    nav.rel = "noopener";
    const source = document.createElement("a");
    source.textContent = "\u8FD0\u8425\u5546\u8D44\u6599 \u2197";
    source.href = s.source;
    source.target = "_blank";
    source.rel = "noopener";
    controls.append(btn, nav, source);
    card.append(controls);
    root.append(card);
  });
  var form = document.querySelector("#charge-calc");
  function calc(e) {
    e == null ? void 0 : e.preventDefault();
    const values = Object.fromEntries(new FormData(form));
    const b = Number(values.battery), a = Number(values.start), z = Number(values.end), p = Number(values.power), c = Number(values.price);
    const result = document.querySelector("#charge-result");
    if (z <= a) {
      result.textContent = "\u76EE\u6807\u7535\u91CF\u987B\u9AD8\u4E8E\u5F53\u524D\u7535\u91CF\u3002";
      return;
    }
    const energy = b * (z - a) / 100;
    result.textContent = "\u53C2\u8003\u8865\u7535 " + energy.toFixed(1) + " kWh \xB7 \u7406\u8BBA\u7EA6 " + Math.ceil(energy / p * 60) + " \u5206\u949F \xB7 \u7535\u91CF\u8D39\u7528\u7EA6 " + (energy * c).toFixed(2) + " NOK\uFF08\u4E0D\u542B\u635F\u8017\u4E0E\u9644\u52A0\u8D39\uFF09";
  }
  form.onsubmit = calc;
  calc();
})();
