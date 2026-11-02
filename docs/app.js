window.NORWAY_API_BASE="https://norway-eight-winter-journey.wh1sper.chatgpt.site";
(() => {
  // public/weather-logic.js
  var SKY_POINTS = [
    { id: "tromso", name: "\u7279\u7F57\u59C6\u745F\u5E02\u533A", group: "tromso", lat: 69.6492, lon: 18.9553 },
    { id: "ersfjord", name: "Ersfjordbotn \u533A\u57DF", group: "tromso", lat: 69.695, lon: 18.631 },
    { id: "sommaroy", name: "Sommar\xF8y \u533A\u57DF", group: "tromso", lat: 69.633, lon: 17.996 },
    { id: "eve", name: "EVE \u673A\u573A\u533A\u57DF", group: "eve", lat: 68.491, lon: 16.678 },
    { id: "svolvaer", name: "Svolv\xE6r\uFF0FV\xE5gan", group: "lofoten", lat: 68.234, lon: 14.568 },
    { id: "gimsoy", name: "Gims\xF8y \u533A\u57DF", group: "lofoten", lat: 68.326, lon: 14.089 },
    { id: "haukland", name: "Haukland \u533A\u57DF", group: "lofoten", lat: 68.199, lon: 13.528 },
    { id: "reine", name: "\u96F7\u8BB7\uFF0F\xC5 \u5468\u8FB9", group: "lofoten", lat: 67.932, lon: 13.089 }
  ];
  var skyDateFormatter = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Oslo", year: "numeric", month: "2-digit", day: "2-digit" });
  function skyDate(seconds) {
    return skyDateFormatter.format(new Date(seconds * 1e3));
  }
  var skyHourFormatter = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Oslo", hour: "2-digit", hourCycle: "h23" });
  function skyHour(seconds) {
    return Number(skyHourFormatter.format(new Date(seconds * 1e3)));
  }
  function solarAltitude(seconds, lat, lon) {
    const r = Math.PI / 180, d = seconds / 86400 + 24405875e-1 - 2451545, g = (357.529 + 0.98560028 * d) * r, L = (280.459 + 0.98564736 * d) * r, lambda = L + (1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * r, eps = (23.439 - 36e-8 * d) * r, ra = Math.atan2(Math.cos(eps) * Math.sin(lambda), Math.cos(lambda)), dec = Math.asin(Math.sin(eps) * Math.sin(lambda)), ha = (280.16 + 360.9856235 * d + lon) * r - ra;
    return Math.asin(Math.sin(lat * r) * Math.sin(dec) + Math.cos(lat * r) * Math.cos(dec) * Math.cos(ha)) / r;
  }
  function clothing(feels, wind = 0, rain = 0, waiting = false) {
    if (!Number.isFinite(feels)) return "\u6682\u65E0\u6709\u6548\u4F53\u611F\u6E29\u5EA6\uFF0C\u65E0\u6CD5\u751F\u6210\u7A7F\u642D\u5EFA\u8BAE\u3002";
    let s = feels <= -10 ? "\u539A\u4FDD\u6696\u5185\u5C42\uFF0B\u6293\u7ED2\uFF0F\u7F8A\u6BDB\u4E2D\u5C42\uFF0B\u539A\u7FBD\u7ED2\u5916\u5957" : feels <= 0 ? "\u4FDD\u6696\u5185\u5C42\uFF0B\u6293\u7ED2\u4E2D\u5C42\uFF0B\u4FDD\u6696\u5916\u5957" : feels <= 10 ? "\u957F\u8896\u5185\u5C42\uFF0B\u6293\u7ED2\uFF0F\u8584\u7FBD\u7ED2\uFF0C\u53EF\u589E\u51CF\u5206\u5C42" : "\u957F\u8896\u4E0E\u53EF\u8131\u5378\u5916\u5957";
    s += "\uFF1B\u4FDD\u6696\u5E3D\u3001\u624B\u5957\u3001\u7F8A\u6BDB\u889C\u548C\u9632\u6ED1\u9632\u6C34\u978B\u3002";
    if (wind >= 8) s += " \u98CE\u8F83\u5927\uFF0C\u5916\u5C42\u9009\u9632\u98CE\u6B3E\uFF0C\u62A4\u4F4F\u8033\u6735\u548C\u9888\u90E8\u3002";
    if (rain > 0) s += " \u6709\u964D\u6C34\uFF0C\u589E\u52A0\u9632\u6C34\u5916\u5C42\uFF0C\u51C6\u5907\u5907\u7528\u5E72\u889C\u3002";
    if (waiting) s += " \u591C\u95F4\u4E45\u7AD9\u89C2\u6D4B\u518D\u52A0\u4E00\u5C42\u4FDD\u6696\uFF0C\u5E26\u70ED\u996E\uFF0C\u5B89\u6392\u56DE\u8F66\u5185\u53D6\u6696\u3002";
    return s + "\u4EC5\u4F5C\u4E00\u822C\u51C6\u5907\u53C2\u8003\uFF0C\u6D77\u9493\u7B49\u6D3B\u52A8\u4EE5\u8FD0\u8425\u65B9\u88C5\u5907\u8981\u6C42\u4E3A\u51C6\u3002";
  }
  function bestSkyWindow(point, nowSeconds) {
    const h = point.hourly;
    if (!(h == null ? void 0 : h.time)) return null;
    const date = skyDate(nowSeconds), hour = skyHour(nowSeconds), tomorrow = skyDate(Date.parse(date + "T12:00:00Z") / 1e3 + 86400);
    const candidates = h.time.map((t, i) => {
      var _a, _b, _c, _d;
      return { time: t, cloud: (_a = h.cloud_cover) == null ? void 0 : _a[i], wind: (_b = h.wind_speed_10m) == null ? void 0 : _b[i], rain: (_c = h.precipitation) == null ? void 0 : _c[i], feels: (_d = h.apparent_temperature) == null ? void 0 : _d[i] };
    }).filter((x) => {
      if (x.time < nowSeconds || x.time > nowSeconds + 86400) return false;
      const day = skyDate(x.time), hr = skyHour(x.time), tonight = hour < 6 ? day === date && hr < 6 : day === date && hr >= 18 || day === tomorrow && hr < 6;
      return x.time >= nowSeconds && tonight && solarAltitude(x.time, point.lat, point.lon) < -6 && Number.isFinite(x.cloud) && Number.isFinite(x.rain) && Number.isFinite(x.wind);
    });
    candidates.sort((a, b) => a.cloud + a.rain * 30 - (b.cloud + b.rain * 30) || a.time - b.time);
    return candidates[0] || null;
  }
  function auroraState(point, aurora, nowSeconds) {
    var _a;
    const current = point.current, valid = Number.isFinite((_a = aurora == null ? void 0 : aurora.values) == null ? void 0 : _a[point.id]) && Number.isFinite(Date.parse(aurora.observationTime)) && Number.isFinite(Date.parse(aurora.forecastTime)) && Math.abs(nowSeconds - Date.parse(aurora.observationTime) / 1e3) < 7200 && Math.abs(nowSeconds - Date.parse(aurora.forecastTime) / 1e3) < 7200;
    const weatherFresh = current && Number.isFinite(current.time) && Math.abs(nowSeconds - current.time) < 7200;
    if (!valid || !weatherFresh) return "\u6570\u636E\u4E0D\u8DB3\u6216\u5DF2\u8FC7\u671F\uFF0C\u6682\u4E0D\u5224\u65AD";
    if (solarAltitude(nowSeconds, point.lat, point.lon) >= -6) return "\u73B0\u5728\u5929\u8272\u4ECD\u4EAE\uFF0C\u7B49\u5F85\u66F4\u6697\u65F6\u6BB5";
    if (!Number.isFinite(current.cloud_cover) || !Number.isFinite(current.precipitation)) return "\u4E91\u91CF\uFF0F\u964D\u6C34\u6570\u636E\u4E0D\u8DB3";
    if (current.cloud_cover > 60 || current.precipitation > 0.2) return "\u76EE\u524D\u4E91\uFF0F\u964D\u6C34\u906E\u6321\u8F83\u591A";
    if (aurora.values[point.id] >= 10) return "\u73B0\u5728\u53EF\u7559\u610F\u5929\u7A7A\uFF08\u4ECD\u4E0D\u4FDD\u8BC1\u53EF\u89C1\uFF09";
    return "\u5F53\u524D\u6A21\u578B\u4FE1\u53F7\u504F\u4F4E\uFF0C\u7EE7\u7EED\u89C2\u5BDF";
  }

  // public/weather.js
  var skyFmt = (v, suffix = "") => Number.isFinite(v) ? Math.round(v * 10) / 10 + suffix : "\u6682\u65E0\u6570\u636E";
  var skyTime = (s) => new Date(s * 1e3).toLocaleString("zh-CN", { timeZone: "Europe/Oslo", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  var skyCode = (c) => !Number.isFinite(c) ? "\u5929\u6C14\u72B6\u6001\u5F85\u66F4\u65B0" : c === 0 ? "\u6674" : c === 1 ? "\u5927\u90E8\u6674\u6717" : c === 2 ? "\u5C40\u90E8\u591A\u4E91" : c === 3 ? "\u9634" : c === 45 || c === 48 ? "\u96FE" : c >= 71 && c <= 77 || c === 85 || c === 86 ? "\u964D\u96EA" : c >= 95 ? "\u96F7\u66B4" : c >= 51 && c <= 67 || c >= 80 && c <= 82 ? "\u964D\u96E8" : "\u5929\u6C14\u72B6\u6001\u5F85\u66F4\u65B0";
  function skyEl(tag, text, cls) {
    const n = document.createElement(tag);
    if (text !== void 0) n.textContent = text;
    if (cls) n.className = cls;
    return n;
  }
  function skyLocationSelect(value) {
    const s = document.createElement("select");
    for (const p of SKY_POINTS) s.add(new Option(p.name, p.id));
    s.value = value;
    return s;
  }
  function setupWeather() {
    const host = document.querySelector("#live-sky");
    if (!host) return;
    let data = null, loading = false;
    const nowDate = skyDate(Date.now() / 1e3), initial = nowDate >= "2027-01-06" && nowDate <= "2027-01-08" ? "reine" : nowDate >= "2027-01-04" && nowDate < "2027-01-06" ? "svolvaer" : nowDate === "2027-01-09" ? "eve" : "tromso";
    const title = skyEl("div", void 0, "sky-head");
    const heading = skyEl("div");
    heading.append(skyEl("p", "LIVE / WEATHER & AURORA", "eyebrow"), skyEl("h3", "\u770B\u5929\u6C14\uFF0C\u4E5F\u7B49\u4E00\u573A\u6781\u5149"));
    const refresh = skyEl("button", "\u5237\u65B0\u5929\u6C14\u4E0E\u6781\u5149 \u21BB");
    refresh.type = "button";
    title.append(heading, refresh);
    host.append(title);
    const choice = skyEl("label", "\u5F53\u524D\u5929\u6C14\u5730\u70B9 ");
    const select = skyLocationSelect(initial);
    select.setAttribute("aria-label", "\u5F53\u524D\u5929\u6C14\u5730\u70B9");
    choice.append(select);
    host.append(choice);
    const status = skyEl("p", "\u6B63\u5728\u8FDE\u63A5\u5929\u6C14\u4E0E\u6781\u5149\u6570\u636E\u2026", "note");
    status.setAttribute("role", "status");
    const current = skyEl("div", void 0, "sky-current");
    host.append(status, current);
    const auroraHead = skyEl("div", void 0, "sky-head");
    auroraHead.append(skyEl("h3", "\u4ECA\u665A\uFF0C\u5148\u770B\u54EA\u7247\u5929\u7A7A\uFF1F"));
    const groupLabel = skyEl("label", "\u5019\u9009\u533A\u57DF "), group = skyEl("select");
    group.setAttribute("aria-label", "\u6781\u5149\u5019\u9009\u533A\u57DF");
    for (const [id, name] of [["tromso", "\u7279\u7F57\u59C6\u745F\u5468\u8FB9"], ["lofoten", "\u7F57\u5F17\u6566\u7FA4\u5C9B"], ["eve", "EVE \u5468\u8FB9"]]) group.add(new Option(name, id));
    group.value = SKY_POINTS.find((p) => p.id === initial).group;
    groupLabel.append(group);
    auroraHead.append(groupLabel);
    host.append(auroraHead);
    const alert = skyEl("p", "\u7B49\u5F85\u6570\u636E\u2026", "sky-notice");
    alert.setAttribute("role", "status");
    const stamp = skyEl("p", "", "note"), candidates = skyEl("div", void 0, "sky-candidates");
    host.append(alert, stamp, candidates);
    const explain = skyEl("p", "\u4F4D\u7F6E\u6392\u5E8F\u53EA\u6BD4\u8F83\u6240\u9009\u533A\u57DF\u4ECA\u665A\u8F83\u5C11\u4E91\u3001\u964D\u6C34\u8F83\u5C11\u7684\u591C\u95F4\u5C0F\u65F6\uFF1BNOAA \u6307\u6807\u53EA\u5BF9\u5E94\u5176\u6807\u6CE8\u7684\u77ED\u65F6\u9884\u6D4B\u65F6\u523B\uFF0C\u4E0D\u7528\u4E8E\u9884\u6D4B\u6574\u665A\uFF0C\u4E5F\u4E0D\u7B49\u4E8E\u4F60\u8089\u773C\u770B\u5230\u6781\u5149\u7684\u6982\u7387\u3002\u9875\u9762\u6253\u5F00\u65F6\u7EA6\u6BCF 10 \u5206\u949F\u5237\u65B0\uFF0C\u4E0D\u4F1A\u5411\u5FAE\u4FE1\u63A8\u9001\u3002", "note");
    host.append(explain);
    const safety = skyEl("p", "\u5019\u9009\u4F4D\u7F6E\u662F\u533A\u57DF\u53C2\u8003\uFF0C\u4E0D\u662F\u5DF2\u6838\u5B9E\u53EF\u505C\u8F66\u7684\u89C2\u6D4B\u70B9\u3002\u5148\u67E5\u9053\u8DEF\u3001\u98CE\u96EA\u548C\u505C\u8F66\u6761\u4EF6\uFF0C\u8FDC\u79BB\u6D6A\u8FB9\u3001\u7ED3\u51B0\u5CB8\u7EBF\u53CA\u9053\u8DEF\u5E94\u6025\u8F66\u9053\uFF1B\u4E0D\u4E3A\u4E91\u91CF\u6392\u540D\u8DE8\u533A\u57DF\u8D76\u8DEF\u3002", "note");
    host.append(safety);
    const links = skyEl("p");
    for (const [name, url] of [["\u5929\u6C14\u6765\u6E90\uFF1AOpen-Meteo", "https://open-meteo.com/"], ["\u6781\u5149\u6765\u6E90\uFF1ANOAA OVATION", "https://www.swpc.noaa.gov/products/aurora-30-minute-forecast"], ["\u5B98\u65B9\u9053\u8DEF\u72B6\u6001", "https://www.vegvesen.no/trafikk/"]]) {
      const a = skyEl("a", name + " \u2197");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
      links.append(a, document.createTextNode("\u3000"));
    }
    host.append(links);
    const cards = [];
    document.querySelectorAll("#day-list>details").forEach((detail, i) => {
      const box = skyEl("div", void 0, "day-sky"), label = skyEl("label", "\u67E5\u770B\u5929\u6C14\u5730\u70B9 "), s = skyLocationSelect(i < 4 ? "tromso" : i < 6 ? "svolvaer" : i < 8 ? "reine" : "eve"), body = skyEl("div");
      s.setAttribute("aria-label", "\u7B2C " + (i + 1) + " \u5929\u5929\u6C14\u5730\u70B9");
      label.append(s);
      box.append(label, body);
      detail.querySelector(".daybody").append(box);
      const c = { select: s, body, date: i === 0 ? "2026-12-31" : "2027-01-" + String(i).padStart(2, "0") };
      cards.push(c);
      s.onchange = () => renderDay(c);
    });
    function weatherSummary(p) {
      const c = p.current;
      if (!c || !Number.isFinite(c.temperature_2m)) return "\u8BE5\u5730\u70B9\u5F53\u524D\u5929\u6C14\u6682\u65E0\u6570\u636E\u3002";
      return p.name + " \xB7 " + skyCode(c.weather_code) + " \xB7 " + skyFmt(c.temperature_2m, "\xB0C") + "\uFF0C\u4F53\u611F " + skyFmt(c.apparent_temperature, "\xB0C") + " \xB7 \u98CE " + skyFmt(c.wind_speed_10m, " m/s") + " \xB7 \u4E91\u91CF " + skyFmt(c.cloud_cover, "%") + "\uFF08\u5F53\u5730 " + skyTime(c.time) + "\uFF09";
    }
    function renderDay(c) {
      var _a, _b, _c, _d, _e, _f;
      c.body.replaceChildren();
      const p = data == null ? void 0 : data.points.find((p2) => p2.id === c.select.value);
      if (!p) {
        c.body.append(skyEl("p", "\u5929\u6C14\u6682\u4E0D\u53EF\u7528\uFF0C\u70B9\u51FB\u4E0A\u65B9\u5237\u65B0\u91CD\u8BD5\u3002", "note"));
        return;
      }
      const today = skyDate(Date.now() / 1e3);
      const index = (_c = (_b = (_a = p.daily) == null ? void 0 : _a.time) == null ? void 0 : _b.findIndex((t) => skyDate(t) === c.date)) != null ? _c : -1;
      if (index >= 0) {
        const d = p.daily;
        c.body.append(skyEl("p", c.date + " \xB7 " + p.name + " \xB7 " + skyCode(d.weather_code[index]) + " \xB7 " + skyFmt(d.temperature_2m_min[index], "\xB0C") + "\uFF5E" + skyFmt(d.temperature_2m_max[index], "\xB0C") + " \xB7 \u6700\u5927\u964D\u6C34\u6982\u7387 " + skyFmt(d.precipitation_probability_max[index], "%") + " \xB7 \u6700\u5927\u98CE\u901F " + skyFmt(d.wind_speed_10m_max[index], " m/s")));
        c.body.append(skyEl("p", "\u5F53\u5929\u7A7F\u642D\u53C2\u8003\uFF1A" + clothing(d.apparent_temperature_min[index], d.wind_speed_10m_max[index], d.precipitation_probability_max[index] > 30 ? 1 : 0)));
      } else c.body.append(skyEl("p", c.date < today ? "\u884C\u7A0B\u65E5\u671F\u5DF2\u8FC7\u53BB\uFF0C\u6B64\u5904\u4E0D\u63D0\u4F9B\u5386\u53F2\u5B9E\u51B5\u3002" : "\u884C\u7A0B\u5F53\u5929\u5C1A\u672A\u8FDB\u5165\u6700\u957F 16 \u5929\u7684\u9884\u62A5\u8303\u56F4\uFF0C\u4E34\u8FD1\u540E\u4F1A\u81EA\u52A8\u663E\u793A\u5F53\u5929\u9884\u62A5\u548C\u7A7F\u642D\u5EFA\u8BAE\u3002", "note"));
      c.body.append(skyEl("p", "\u73B0\u5728\u53C2\u8003\uFF1A" + weatherSummary(p), "note"));
      if (index < 0) c.body.append(skyEl("p", "\u73B0\u5728\u7A7F\u642D\u53C2\u8003\uFF08\u4E0D\u662F\u884C\u7A0B\u65E5\u9884\u62A5\uFF09\uFF1A" + clothing((_d = p.current) == null ? void 0 : _d.apparent_temperature, (_e = p.current) == null ? void 0 : _e.wind_speed_10m, (_f = p.current) == null ? void 0 : _f.precipitation)));
      c.body.append(skyEl("p", "\u81EA\u52A8\u5929\u6C14\u6309\u6240\u9009\u57CE\u9547\u4F30\u7B97\uFF1B\u6D77\u9493\u7B49\u9879\u76EE\u9700\u53E6\u770B\u6D77\u51B5\u53CA\u6D3B\u52A8\u65B9\u901A\u77E5\u3002\u4F60\u586B\u5199\u7684\u884C\u7A0B\u4E0E\u7A7F\u7740\u5907\u6CE8\u4F1A\u4FDD\u7559\u3002", "note"));
    }
    function render2() {
      var _a, _b, _c, _d, _e, _f;
      if (!data) return;
      const seconds = Date.now() / 1e3, p = data.points.find((p2) => p2.id === select.value);
      current.replaceChildren();
      if (p) {
        current.append(skyEl("strong", weatherSummary(p)), skyEl("p", "\u73B0\u5728\u600E\u4E48\u7A7F\uFF1A" + clothing((_a = p.current) == null ? void 0 : _a.apparent_temperature, (_b = p.current) == null ? void 0 : _b.wind_speed_10m, (_c = p.current) == null ? void 0 : _c.precipitation)));
        if (Math.abs(seconds - ((_d = p.current) == null ? void 0 : _d.time)) > 7200) current.append(skyEl("p", "\u5F53\u524D\u5929\u6C14\u6570\u636E\u5DF2\u8D85\u8FC7 2 \u5C0F\u65F6\uFF0C\u8BF7\u5237\u65B0\u6838\u5BF9\u3002", "note"));
      } else current.append(skyEl("p", "\u5929\u6C14\u63A5\u53E3\u6682\u4E0D\u53EF\u7528\uFF0C\u8BF7\u7A0D\u540E\u5237\u65B0\u3002"));
      status.textContent = "\u9875\u9762\u83B7\u53D6\uFF1A" + new Date(data.fetchedAt).toLocaleString("zh-CN", { timeZone: "Europe/Oslo", hour12: false }) + "\uFF08\u632A\u5A01\u65F6\u95F4\uFF09\u3002\u5F53\u524D\u5929\u6C14\u4E3A\u6A21\u578B\u4F30\u8BA1\uFF0C\u5E76\u975E\u4F4F\u5BBF\u95E8\u53E3\u5B9E\u6D4B\u3002" + data.errors.join(" ");
      candidates.replaceChildren();
      const ranked = data.points.filter((p2) => p2.group === group.value).map((p2) => ({ p: p2, w: bestSkyWindow(p2, seconds) })).sort((a, b) => (a.w ? a.w.cloud + a.w.rain * 30 : Infinity) - (b.w ? b.w.cloud + b.w.rain * 30 : Infinity));
      const best = ranked.find((x) => x.w);
      alert.textContent = best ? (best.w.cloud <= 40 && best.w.rain <= 0.2 ? "\u4ECA\u665A\u8F83\u5C11\u4E91\u7684\u5019\u9009\uFF1A" : "\u4ECA\u665A\u4E91\uFF0F\u964D\u6C34\u6761\u4EF6\u4ECD\u6709\u9650\uFF0C\u53EF\u5148\u6BD4\u8F83\uFF1A") + best.p.name + " \xB7 " + skyTime(best.w.time) + "\uFF1B\u6B64\u65F6\u6BB5\u5C1A\u4E0D\u80FD\u7531\u5F53\u524D\u6781\u5149\u6A21\u578B\u4FDD\u8BC1\u6709\u6781\u5149\u3002" : "\u4ECA\u665A\u6682\u65E0\u8DB3\u591F\u7684\u591C\u95F4\u5929\u6C14\u6570\u636E\uFF0C\u6682\u4E0D\u63A8\u8350\u4F4D\u7F6E\u3002";
      stamp.textContent = data.aurora ? "NOAA \u89C2\u6D4B\uFF1A" + data.aurora.observationTime + " \xB7 \u77ED\u65F6\u9884\u6D4B\u6709\u6548\u65F6\u523B\uFF1A" + data.aurora.forecastTime + "\uFF08\u5747\u4E3A UTC\uFF09\uFF1B\u7EA6 30\u201390 \u5206\u949F\u77ED\u65F6\u4EA7\u54C1\uFF0C\u7EA6 1\xB0 \u7F51\u683C\u4E0D\u80FD\u533A\u5206\u76F8\u90BB\u8857\u9053\u3002" : "NOAA \u77ED\u65F6\u6570\u636E\u6682\u65E0\uFF0C\u4EE5\u4E0B\u4EC5\u4F5C\u4E91\u91CF\u53C2\u8003\u3002";
      for (const { p: p2, w } of ranked) {
        const card = skyEl("article", void 0, "sky-location");
        card.append(skyEl("h4", p2.name), skyEl("p", auroraState(p2, data.aurora, seconds)));
        const val = (_f = (_e = data.aurora) == null ? void 0 : _e.values) == null ? void 0 : _f[p2.id];
        card.append(skyEl("p", "\u5F53\u524D\u533A\u57DF NOAA \u6A21\u578B\u503C\uFF1A" + skyFmt(val, " / 100") + "\uFF08\u975E\u76EE\u89C6\u6210\u529F\u7387\uFF09", "note"));
        if (w) {
          card.append(skyEl("p", "\u4ECA\u665A\u8F83\u5C11\u4E91\u65F6\u6BB5\uFF1A" + skyTime(w.time) + " \xB7 \u4E91\u91CF " + skyFmt(w.cloud, "%") + " \xB7 \u964D\u6C34 " + skyFmt(w.rain, " mm") + " \xB7 \u98CE " + skyFmt(w.wind, " m/s")), skyEl("p", "\u7B49\u6781\u5149\u7A7F\u642D\uFF1A" + clothing(w.feels, w.wind, w.rain, true)));
        } else card.append(skyEl("p", "\u6682\u65E0\u53EF\u7528\u591C\u95F4\u5C0F\u65F6\uFF0C\u4E0D\u80FD\u5224\u65AD\u4ECA\u665A\u7A97\u53E3\u3002"));
        const a = skyEl("a", "\u67E5\u770B\u533A\u57DF\u5730\u56FE \u2197");
        a.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(p2.lat + "," + p2.lon);
        a.target = "_blank";
        a.rel = "noopener";
        card.append(a);
        candidates.append(card);
      }
      cards.forEach(renderDay);
    }
    async function load2() {
      if (loading) return;
      loading = true;
      refresh.disabled = true;
      try {
        const controller = new AbortController(), timer = setTimeout(() => controller.abort(), 2e4);
        let r;
        try {
          r = await fetch((window.NORWAY_API_BASE || "") + "/api/weather", { cache: "no-store", signal: controller.signal });
        } finally {
          clearTimeout(timer);
        }
        if (!r.ok) throw Error("weather");
        data = await r.json();
        if (!Array.isArray(data.points)) throw Error("format");
        if (!data.points.length) {
          const direct = new URL("https://api.open-meteo.com/v1/forecast");
          direct.search = new URLSearchParams({ latitude: SKY_POINTS.map((p) => p.lat).join(","), longitude: SKY_POINTS.map((p) => p.lon).join(","), current: "temperature_2m,apparent_temperature,precipitation,weather_code,cloud_cover,wind_speed_10m", hourly: "apparent_temperature,precipitation,cloud_cover,wind_speed_10m", daily: "temperature_2m_max,temperature_2m_min,apparent_temperature_min,precipitation_probability_max,wind_speed_10m_max,weather_code", forecast_days: "16", timezone: "Europe/Oslo", wind_speed_unit: "ms", timeformat: "unixtime" });
          const fallbackControl = new AbortController(), fallbackTimer = setTimeout(() => fallbackControl.abort(), 12e3);
          try {
            const fallback = await fetch(direct, { signal: fallbackControl.signal });
            if (fallback.ok) {
              const raw = await fallback.json();
              if (Array.isArray(raw) && raw.length === SKY_POINTS.length) {
                data.points = SKY_POINTS.map((p, i) => ({ ...p, current: raw[i].current, daily: raw[i].daily, hourly: raw[i].hourly }));
                data.fetchedAt = (/* @__PURE__ */ new Date()).toISOString();
                data.errors = data.errors.filter((e) => !e.startsWith("\u5929\u6C14"));
              }
            }
          } catch (e) {
          } finally {
            clearTimeout(fallbackTimer);
          }
        }
        render2();
      } catch (e) {
        status.textContent = "\u5929\u6C14\uFF0F\u6781\u5149\u8FDE\u63A5\u6682\u65F6\u5931\u8D25\u3002" + (data ? "\u4E0B\u65B9\u4FDD\u7559\u7684\u662F\u4E0A\u6B21\u83B7\u53D6\u5185\u5BB9\uFF0C\u8BF7\u6838\u5BF9\u5176\u65F6\u95F4\uFF0C\u4E0D\u80FD\u5F53\u4F5C\u5F53\u524D\u60C5\u51B5\u3002" : "\u8BF7\u70B9\u51FB\u5237\u65B0\u91CD\u8BD5\u3002");
        alert.textContent = "\u8FDE\u63A5\u5931\u8D25\uFF0C\u6682\u505C\u65B0\u7684\u89C2\u6D4B\u63D0\u793A\u3002";
      } finally {
        loading = false;
        refresh.disabled = false;
      }
    }
    select.onchange = render2;
    group.onchange = render2;
    refresh.onclick = load2;
    load2();
    setInterval(() => {
      if (!document.hidden) load2();
    }, 6e5);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) load2();
    });
  }

  // public/plan-data.js
  var stayDefaults = {
    "airbnb-tromso": { "address": "Garver Eidissens veg 15, Troms\xF8, Troms 9011, Norway", "checkin": "2027-01-01 15:00", "checkout": "2027-01-02 11:00 \u524D", "rooms": "8 \u4EBA\uFF1B\u623F\u95F4\u5B89\u6392\u5F85\u8865\u5145", "notes": "\u7528\u6237\u5DF2\u63D0\u4F9B\u5730\u5740\u30021 \u6708 2\u20134 \u65E5\u4F4F\u5BBF\u5C1A\u672A\u63D0\u4F9B\u3002", "transport": "\u673A\u573A\u4E58 24 \u8DEF\u5F80 Skjelnan via sentrum\uFF0C\u7EA6 20 \u5206\u949F\u81F3 Storskogen\uFF0C\u518D\u6B65\u884C\u7EA6 275 \u7C73\uFF0F4\u20135 \u5206\u949F\uFF1B1 \u6708 1 \u65E5\u53C2\u8003\uFF1A13:15\u219213:35\uFF08\u7EBD\u7EA6\u7EC4\uFF09\uFF0C16:15\u219216:35\uFF08\u4E0A\u6D77\u7EC4\uFF09\u3002\u5165\u5883\u63D0\u884C\u674E\u540E\u91CD\u65B0\u786E\u8BA4\u73ED\u6B21\uFF0C15:00 \u624D\u53EF\u5165\u4F4F\u3002", "busstop": "\u63A8\u8350 Storskogen\uFF08NSR:StopPlace:54464\uFF09\uFF0C\u6B65\u884C\u7EA6 265\u2013275 \u7C73\uFF0F4\u20135 \u5206\u949F\u3002\u4EE5 15A\uFF0F15B \u76F8\u90BB\u4F4D\u7F6E\u4F30\u7B97\uFF0C\u5165\u53E3\u5F85\u623F\u4E1C\u786E\u8BA4\u3002\u66F4\u8FD1\u7684 Storskogvegen\uFF08\u7EA6 137 \u7C73\uFF09\u672C\u6B21\u672A\u67E5\u5230\u51FA\u884C\u65E5\u671F\u73ED\u6B21\uFF0C\u6682\u4E0D\u63A8\u8350\u3002", "buslines": "\u53BB\u5E02\u4E2D\u5FC3\uFF1A24 \u8DEF Skjelnan via sentrum\uFF0C\u6216 20 \u8DEF Kroken via sentrum\uFF08\u7AD9\u53F0 92999\uFF09\uFF1B\u53CD\u5411\uFF1A24 \u8DEF Troms\xF8 lufthavn via Mortensnes\uFF0C20 \u8DEF Stakkevollan via UNN\uFF08\u7AD9\u53F0 92996\uFF09\u3002\u6838\u5BF9\u8F66\u5934\u65B9\u5411\u3002", "busdates": "Entur \u67E5\u8BE2\u4E8E 2026-11-02\uFF0CCET \u632A\u5A01\u5F53\u5730\u65F6\u95F4\u30021 \u6708 1 \u65E5\u53BB\u5E02\u4E2D\u5FC3\uFF1A24 \u8DEF 15:05\uFF0F15:35\uFF0F16:05\uFF0F16:35\uFF1B20 \u8DEF 15:22\uFF0F15:52\uFF0F16:22\uFF0F16:52\u30021 \u6708 2 \u65E5\u53BB\u5E02\u4E2D\u5FC3\uFF1A24 \u8DEF 09:05\uFF0F09:35\uFF0F10:05\uFF0F10:35\uFF1B20 \u8DEF 09:22\uFF0F09:52\uFF0F10:22\uFF0F10:53\u3002\u66F4\u591A\u65B9\u5411\u8BE6\u89C1\u4E0B\u65B9\u516C\u4EA4\u5361\u3002\u5F53\u524D\u8BA1\u5212\uFF0C\u51FA\u53D1\u524D\u590D\u67E5 entur.no\uFF0Fkart.svipper.no\u3002" },
    "airbnb-vagan": { address: "Veg 2804, V\xE5gan, Nordland 8313, Norway", checkin: "2027-01-04 15:00", checkout: "2027-01-06 11:00 \u524D", rooms: "8 \u4EBA\uFF1B\u623F\u95F4\u5B89\u6392\u5F85\u8865\u5145", notes: "\u5730\u5740\u7F3A\u95E8\u724C\u53F7\u6216\u623F\u4E1C\u5B9A\u4F4D\uFF0C\u4E0D\u80FD\u636E\u6B64\u7CBE\u786E\u5BFC\u822A\u5230\u95E8\u53E3\u3002", transport: "EVE \u673A\u573A\u53D6\u7535\u8F66\uFF0C\u8D70 E10 \u524D\u5F80\u6C11\u5BBF\uFF1B\u51FA\u53D1\u524D\u5728\u5730\u56FE\u6838\u5BF9\u623F\u4E1C\u5B9A\u4F4D\u53CA\u8DEF\u51B5\u3002" },
    "airbnb-reine": { address: "Reine, Lofoten\uFF08\u5177\u4F53\u623F\u6E90\u4E0E\u5730\u5740\u5F85\u8865\u5145\uFF09", checkin: "2027-01-06\uFF08\u65F6\u95F4\u5F85\u786E\u8BA4\uFF09", checkout: "2027-01-08\uFF08\u65F6\u95F4\u5F85\u786E\u8BA4\uFF09", notes: "\u8BA1\u5212 1 \u6708 6\u20138 \u65E5\u4F4F\u96F7\u8BB7\uFF1B1 \u6708 8 \u65E5\u665A\u4F4F\u5904\u5C1A\u672A\u63D0\u4F9B\uFF0C\u5EFA\u8BAE\u7814\u7A76\u9760\u8FD1 EVE \u7684\u4F4F\u5BBF\u65B9\u4FBF 1 \u6708 9 \u65E5\u65E9\u73ED\u673A\u3002" },
    "airbnb-extra": { address: "\u5F85\u8865\u5145\uFF1A1 \u6708 2\u20134 \u65E5\u30011 \u6708 8\u20139 \u65E5\u4F4F\u5BBF", notes: "\u8FD9\u91CC\u53EF\u7EE7\u7EED\u8865\u5145\u884C\u7A0B\u7A7A\u6863\u7684\u4F4F\u5BBF\u4E0E\u63A5\u9A73\u3002" }
  };
  var days = [
    ["\u4E24\u5730\u51FA\u53D1\uFF0C\u5F00\u542F\u5317\u632A\u5A01\u4E4B\u65C5", "\u4E0A\u6D77\u7EC4 23:05\uFF08\u4E0A\u6D77\u65F6\u95F4\uFF09PVG \u51FA\u53D1\uFF1B\u7EBD\u7EA6\u7EC4 18:30\uFF08\u7EBD\u7EA6\u65F6\u95F4\uFF09EWR \u51FA\u53D1\u3002"],
    ["\u62B5\u8FBE\u7279\u7F57\u59C6\u745F \xB7 15:00 \u5165\u4F4F", "\u7EBD\u7EA6\u7EC4 12:00\u3001\u4E0A\u6D77\u7EC4 14:55 \u62B5\u8FBE TOS\u3002\u4E24\u7EC4\u5747\u9700\u63A5\u9A73\u5230\u4F4F\u5BBF\uFF0C15:00 \u540E\u5165\u4F4F\u3002"],
    ["11:00 \u524D\u9000\u623F \xB7 \u6D77\u9493\u8BA1\u5212\u5F85\u786E\u8BA4", "\u539F\u5148\u8BA1\u5212\u6D77\u9493\uFF0C\u6D3B\u52A8\u4E0E\u8D2D\u7968\u5C1A\u672A\u786E\u5B9A\u3002\u4ECA\u65E5 11:00 \u524D\u9000\u623F\uFF1B\u4E4B\u540E\u4F4F\u5904\u5F85\u8865\u5145\u3002"],
    ["\u7279\u7F57\u59C6\u745F\u81EA\u7531\u5B89\u6392 \xB7 \u4F4F\u5BBF\u5F85\u5B9A", "\u539F 1 \u6708 3 \u65E5\u8F6C\u573A\u5DF2\u53D6\u6D88\uFF0C\u6539\u4E3A 1 \u6708 4 \u65E5\u98DE EVE\u3002\u4ECA\u5929\u9884\u7559\u5E02\u533A\u6D3B\u52A8\uFF0F\u5929\u6C14\u673A\u52A8\u3002"],
    ["\u98DE\u62B5 EVE \xB7 \u53D6\u7535\u8F66 \xB7 \u524D\u5F80 V\xE5gan", "\u786E\u8BA4\u540E\u7684\u8BA1\u5212\uFF1A1 \u6708 4 \u65E5\u4E58\u98DE\u673A\u5230 EVE\uFF0C\u53D6\u7535\u8F66\uFF0C\u6CBF E10 \u524D\u5F80 Veg 2804 \u6C11\u5BBF\uFF0C15:00 \u540E\u5165\u4F4F\u3002\u822A\u73ED\u3001\u62B5\u8FBE\u65F6\u523B\u53CA\u95E8\u724C\u53F7\u5F85\u8865\u5145\u3002"],
    ["\u9879\u76EE\u4E00\u5F85\u5B9A \xB7 \u4F4F V\xE5gan", "\u5F53\u5929\u4EE5\u4E00\u4E2A\u9884\u8BA2\u9879\u76EE\u4E3A\u4E3B\uFF0C\u5EFA\u8BAE\u4F18\u5148\u9009\u62E9 Svolv\xE6r \u5468\u8FB9\u96C6\u5408\u7684\u9879\u76EE\uFF0C\u51CF\u5C11\u5F80\u8FD4\uFF1B\u53EF\u9009\u6D77\u9493\u3001\u5F53\u5730\u5BFC\u89C8\u7B49\uFF0C\u5C1A\u672A\u9009\u5B9A\uFF0F\u8D2D\u7968\u3002"],
    ["\u9879\u76EE\u4E8C\u5F85\u5B9A \xB7 \u9000\u623F\u5E76\u8F6C\u573A\u96F7\u8BB7", "11:00 \u524D\u4ECE V\xE5gan \u9000\u623F\u3002\u4F18\u5148\u8003\u8651\u4E0A\u5348\u77ED\u9879\u76EE\u6216\u6CBF\u9014\u9879\u76EE\uFF1B\u6CBF E10 \u7ECF Leknes\uFF0FRamberg \u8F6C\u573A Reine\uFF0C\u907F\u514D\u957F\u9879\u76EE\u540E\u518D\u8D76\u957F\u9014\u3002"],
    ["\u96F7\u8BB7 \u2192 S\xF8rv\xE5gen \u2192 \xC5 \u2192 \u96F7\u8BB7", "\u5EFA\u8BAE\u4EE5\u897F\u7EBF\u5C0F\u9547\u4E3A\u4E3B\uFF1AReine \u5468\u8FB9\u3001S\xF8rv\xE5gen\u3001\xC5 \u9547\u540E\u8FD4\u56DE\u96F7\u8BB7\uFF1B\u6839\u636E\u5F53\u5929\u5929\u6C14\u5220\u51CF\u505C\u8F66\u70B9\uFF0C\u51AC\u5B63\u8425\u4E1A\u65F6\u95F4\u53E6\u67E5\u3002"],
    ["\u96F7\u8BB7\u9000\u623F \xB7 \u5411 EVE \u65B9\u5411\u56DE\u7A0B", "1 \u6708 8 \u65E5\u9000\u623F\uFF08\u65F6\u95F4\u5F85\u786E\u8BA4\uFF09\u3002\u5EFA\u8BAE\u4E0D\u518D\u5411\u897F\u7ED5\u884C\uFF0C\u6CBF E10 \u4E1C\u8FD4\uFF0C\u7814\u7A76 EVE \u9644\u8FD1\u6700\u540E\u4E00\u665A\u4F4F\u5BBF\u53CA\u8FD8\u8F66\u65F6\u95F4\u3002"],
    ["EVE 06:00 \u8D77\u98DE \xB7 \u4E24\u7EC4\u8FD4\u7A0B", "\u4E24\u7EC4 SK4079\uFF1A06:00 EVE \u2192 08:00 OSL\uFF1B\u7EBD\u7EA6\u7EC4 10:45 SK907 \u2192 13:25 EWR\uFF0C\u4E0A\u6D77\u7EC4 12:30 HU770 \u2192 \u6B21\u65E5\u5317\u4EAC\uFF0C\u518D\u8F6C\u4E0A\u6D77\u3002"]
  ];
  var dayDefaults = {
    "day-02": { activity: "\u62B5\u8FBE\u7279\u7F57\u59C6\u745F\u3001\u529E\u7406\u5165\u4F4F\u3001\u8F7B\u677E\u91C7\u8D2D", transport: "TOS \u673A\u573A \u2192 Garver Eidissens veg 15\uFF1B\u5177\u4F53\u516C\u4EA4\u7AD9\u4E0E\u73ED\u6B21\u5F85\u6838\u5B9E\u3002", notes: "15:00 \u540E\u5165\u4F4F\uFF1B\u4E0A\u6D77\u7EC4 14:55 \u624D\u62B5\u8FBE\u673A\u573A\uFF0C\u4E0D\u5B89\u6392 15:00 \u51C6\u70B9\u5230\u6C11\u5BBF\u3002" },
    "day-03": { activity: "\u6D77\u9493\uFF08\u539F\u8BA1\u5212\uFF0C\u5F85\u786E\u8BA4\uFF09", ticket: "\u5F85\u786E\u8BA4", notes: "11:00 \u524D\u9000\u623F\uFF1B1 \u6708 2\u20134 \u65E5\u4F4F\u5BBF\u5F85\u8865\u5145\u3002" },
    "day-04": { activity: "\u7279\u7F57\u59C6\u745F\u81EA\u7531\u6D3B\u52A8\uFF0F\u5929\u6C14\u673A\u52A8", transport: "\u539F 1.3 \u8F6C\u573A\u6539\u4E3A 1.4 \u98DE EVE\u3002" },
    "day-05": { activity: "\u98DE EVE\u3001\u53D6\u8F66\u3001\u5165\u4F4F V\xE5gan \u6C11\u5BBF", transport: "EVE \u2192 E10 \u2192 Veg 2804\uFF1B\u79DF\u8F66\u516C\u53F8\u3001\u8F66\u8F86\u3001\u822A\u73ED\u65F6\u95F4\u53CA\u95E8\u724C\u53F7\u5F85\u8865\u5145\u3002", notes: "15:00 \u540E\u5165\u4F4F\u3002\u53D6\u8F66\u6838\u5BF9 CCS\uFF0FType 2\u3001\u968F\u8F66\u7EBF\u7F06\u3001\u51AC\u5B63\u914D\u7F6E\u3001\u8FD8\u8F66\u7535\u91CF\u53CA\u5145\u7535\u652F\u4ED8\u65B9\u5F0F\u3002" },
    "day-06": { activity: "\u9879\u76EE\u4E00\uFF08\u5F85\u9009\u3001\u5F85\u9884\u8BA2\uFF09", ticket: "\u672A\u8D2D\u7968", transport: "\u5EFA\u8BAE\u9009\u62E9 Svolv\xE6r\uFF0F\u9644\u8FD1\u96C6\u5408\u9879\u76EE\uFF0C\u96C6\u5408\u5730\u548C\u65F6\u95F4\u786E\u5B9A\u540E\u518D\u586B\u5199\u3002" },
    "day-07": { activity: "\u9879\u76EE\u4E8C\uFF08\u5F85\u9009\uFF09\uFF0B\u8F6C\u573A\u96F7\u8BB7", ticket: "\u672A\u8D2D\u7968", transport: "Veg 2804 \u2192 E10 \u2192 Leknes\uFF08\u5145\u7535/\u91C7\u8D2D\uFF09\u2192 Ramberg \u2192 Reine\uFF1B\u53EF\u9009\u505C\u9760\u6309\u5929\u6C14\u5220\u51CF\u3002", notes: "11:00 \u524D\u9000\u623F\u3002\u82E5\u9879\u76EE\u5728\u4E1C\u90E8\u4E14\u7ED3\u675F\u5F88\u665A\uFF0C\u5E94\u8C03\u6574\u6D3B\u52A8\u6216\u8F6C\u573A\u65E5\uFF1B\u96F7\u8BB7\u5165\u4F4F\u65F6\u95F4\u5F85\u786E\u8BA4\u3002" },
    "day-08": { activity: "Reine\uFF0FHamn\xF8y \u5468\u8FB9 \u2192 S\xF8rv\xE5gen \u2192 \xC5 \u2192 Reine", transport: "\u897F\u7EBF\u77ED\u9014\u81EA\u9A7E\uFF0C\u6309\u51AC\u5B63\u8DEF\u51B5\u51B3\u5B9A\u505C\u9760\u3002", notes: "\u4EE5\u5C0F\u9547\u548C\u6D77\u5CB8\u89C2\u666F\u4E3A\u4E3B\uFF0C\u4E0D\u9ED8\u8BA4\u5B89\u6392\u51AC\u5B63\u767B\u5C71\u3002" },
    "day-09": { activity: "\u96F7\u8BB7\u9000\u623F\u3001\u6CBF E10 \u4E1C\u8FD4\u3001\u51C6\u5907\u65E9\u73ED\u673A", transport: "Reine \u2192 Leknes \u2192 E10 \u2192 EVE \u65B9\u5411\uFF1B\u6700\u540E\u4E00\u665A\u5730\u5740\u548C\u8FD8\u8F66\u5730\u70B9\u5F85\u8865\u5145\u3002", notes: "1 \u6708 9 \u65E5 06:00 \u8D77\u98DE\uFF0C\u4E0D\u5EFA\u8BAE\u4ECE\u96F7\u8BB7\u4E34\u6668\u8D76\u673A\u573A\u3002\u6700\u540E\u4E00\u665A\uFF0F\u8FD8\u8F66\u5B89\u6392\u4ECD\u672A\u786E\u5B9A\u3002" }
  };

  // public/plans.js
  function setupPlans({ mutate: mutate2 }) {
    let saved = [];
    const forms = [];
    function make(container, key, stay = false) {
      const form = document.createElement("form");
      form.className = "plan-editor";
      const fields = stay ? [["address", "\u623F\u6E90\u540D\u79F0\u4E0E\u5730\u5740"], ["checkin", "\u5165\u4F4F\u65E5\u671F\u4E0E\u65F6\u95F4"], ["checkout", "\u9000\u623F\u65E5\u671F\u4E0E\u65F6\u95F4"], ["rooms", "\u623F\u95F4\u4E0E\u4EBA\u5458\u5B89\u6392"], ["transport", "\u5230\u8FBE\u4F4F\u5BBF\u7684\u4EA4\u901A\u65B9\u5F0F"], ["busstop", "\u9644\u8FD1\u516C\u4EA4\u7AD9\u4E0E\u6B65\u884C\u4FE1\u606F"], ["buslines", "\u516C\u4EA4\u7EBF\u8DEF\u4E0E\u65B9\u5411"], ["busdates", "\u516C\u4EA4\u65F6\u523B\u3001\u67E5\u8BE2\u65E5\u671F\u53CA\u6765\u6E90"], ["notes", "\u5165\u4F4F\u8BF4\u660E\u3001\u505C\u8F66\u4E0E\u5907\u6CE8\uFF08\u4E0D\u8981\u586B\u5199\u5BC6\u7801\uFF09"]] : [["activity", "\u6D3B\u52A8\u9879\u76EE\uFF08\u53EF\u9010\u884C\u586B\u5199\u591A\u4E2A\u9879\u76EE\uFF09"], ["ticket", "\u8D2D\u7968\u72B6\u6001"], ["transport", "\u4EA4\u901A\u65B9\u5F0F\u3001\u96C6\u5408\u5730\u70B9\u4E0E\u65F6\u95F4"], ["weather", "\u5929\u6C14\u60C5\u51B5\u3001\u9884\u62A5\u65E5\u671F\u4E0E\u6765\u6E90"], ["clothes", "\u7A7F\u7740\u5EFA\u8BAE"], ["notes", "\u6D3B\u52A8\u65F6\u95F4\u3001\u9884\u8BA2\u94FE\u63A5\u4E0E\u5176\u4ED6\u5907\u6CE8"]];
      const inputs = {};
      for (const [name, title] of fields) {
        const label = document.createElement("label");
        label.textContent = title;
        let input;
        if (name === "ticket") {
          input = document.createElement("select");
          for (const t of ["\u5F85\u786E\u8BA4", "\u672A\u8D2D\u7968", "\u5DF2\u8D2D\u7968", "\u65E0\u9700\u8D2D\u7968"]) input.add(new Option(t, t));
        } else {
          input = document.createElement("textarea");
          input.rows = name === "activity" || name === "notes" ? 3 : 2;
          input.maxLength = 500;
        }
        input.name = name;
        input.setAttribute("aria-label", title);
        label.append(input);
        form.append(label);
        inputs[name] = input;
      }
      let version = 0, dirty = false;
      form.addEventListener("input", () => dirty = true);
      form.addEventListener("change", () => dirty = true);
      const status = document.createElement("p");
      status.className = "note";
      status.setAttribute("role", "status");
      const button2 = document.createElement("button");
      button2.textContent = "\u4FDD\u5B58\u5230\u56E2\u961F\u884C\u7A0B";
      const hint = document.createElement("p");
      hint.className = "note";
      hint.textContent = stay ? "\u623F\u6E90\u786E\u8BA4\u540E\u586B\u5199\u3002\u8FD9\u91CC\u662F\u516C\u5F00\u7F51\u9875\uFF0C\u8BF7\u52FF\u5B58\u653E\u95E8\u7981\u5BC6\u7801\u548C\u4E2A\u4EBA\u8BC1\u4EF6\u3002" : "\u4E0A\u65B9\u81EA\u52A8\u5929\u6C14\u4F9B\u53C2\u8003\uFF1B\u8FD9\u91CC\u53EF\u586B\u5199\u6D3B\u52A8\u65B9\u88C5\u5907\u8981\u6C42\u3001\u7A7F\u7740\u4E0E\u4E2A\u4EBA\u51C6\u5907\u3002";
      form.append(hint, button2, status);
      form.onsubmit = async (e) => {
        e.preventDefault();
        button2.disabled = true;
        status.textContent = "\u6B63\u5728\u4FDD\u5B58\u2026";
        const body = { version };
        for (const [k, input] of Object.entries(inputs)) body[k] = input.value;
        try {
          const ok = await mutate2("plans/" + key, "POST", body);
          if (ok) {
            version++;
            dirty = false;
            status.textContent = "\u5DF2\u5171\u4EAB\u4FDD\u5B58\uFF0C\u6240\u6709\u4F19\u4F34\u5237\u65B0\u540E\u53EF\u89C1\u3002";
          } else status.textContent = "\u672A\u4FDD\u5B58\uFF0C\u8BF7\u67E5\u770B\u9875\u9762\u63D0\u793A\uFF1B\u586B\u5199\u5185\u5BB9\u4ECD\u4FDD\u7559\u3002";
        } finally {
          button2.disabled = false;
        }
      };
      container.append(form);
      forms.push({ key, apply(record) {
        var _a;
        if (dirty) return;
        version = (record == null ? void 0 : record.version) || 0;
        for (const [k, input] of Object.entries(inputs)) input.value = record && Object.prototype.hasOwnProperty.call(record, k) ? record[k] : ((_a = { ...dayDefaults, ...stayDefaults }[key]) == null ? void 0 : _a[k]) || (k === "ticket" ? "\u5F85\u786E\u8BA4" : "");
      } });
    }
    document.querySelectorAll("#day-list>details").forEach((d, i) => make(d, "day-" + String(i + 1).padStart(2, "0")));
    const airbnb = document.querySelector("#airbnb-editor");
    if (airbnb) {
      for (const [key, title] of [["airbnb-tromso", "1.1\u20131.2 \xB7 \u7279\u7F57\u59C6\u745F"], ["airbnb-vagan", "1.4\u20131.6 \xB7 V\xE5gan"], ["airbnb-reine", "1.6\u20131.8 \xB7 \u96F7\u8BB7"], ["airbnb-extra", "\u5176\u4ED6\u4F4F\u5BBF\uFF0F\u5C1A\u672A\u8865\u9F50\u7684\u591C\u665A"], ["airbnb", "\u4E4B\u524D\u4FDD\u5B58\u7684\u4F4F\u5BBF\u5907\u6CE8"]]) {
        const detail = document.createElement("details");
        detail.open = key === "airbnb-tromso";
        const summary = document.createElement("summary");
        summary.textContent = title;
        detail.append(summary);
        airbnb.append(detail);
        make(detail, key, true);
      }
    }
    return { update(rows2) {
      saved = rows2.filter((r) => r.kind === "plan");
      for (const f of forms) f.apply(saved.find((r) => r.id === "plan-" + f.key));
    } };
  }

  // public/compat.js
  var runtime = typeof globalThis !== "undefined" ? globalThis : window;
  if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function(search, replacement) {
      return this.split(search).join(replacement);
    };
  }
  if (!runtime.queueMicrotask) runtime.queueMicrotask = (callback) => Promise.resolve().then(callback);
  function newRecordId() {
    var _a, _b;
    if ((_a = runtime.crypto) == null ? void 0 : _a.randomUUID) return runtime.crypto.randomUUID();
    if ((_b = runtime.crypto) == null ? void 0 : _b.getRandomValues) {
      const bytes = new Uint8Array(16);
      runtime.crypto.getRandomValues(bytes);
      return Array.from(bytes, (x) => x.toString(16).padStart(2, "0")).join("");
    }
    return "record-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2) + "-" + Math.random().toString(36).slice(2);
  }

  // public/travel.js
  var groups = [{ id: "new-york", name: "\u7EBD\u7EA6\u7EC4", english: "NEW YORK", count: 2, members: ["u7", "whisper"], outRoute: "EWR \u2192 OSL \u2192 TOS", backRoute: "EVE \u2192 OSL \u2192 EWR", outSummary: "12.31 18:30 \u7EBD\u74E6\u514B\u51FA\u53D1 \xB7 01.01 12:00 \u62B5\u8FBE\u7279\u7F57\u59C6\u745F", backSummary: "01.09 06:00 \u57C3\u6C83\u5185\u65AF\u51FA\u53D1 \xB7 13:25 \u62B5\u8FBE\u7EBD\u7EA6", out: [{ flight: "SK908", airline: "\u5317\u6B27\u822A\u7A7A", date: "2026.12.31 \u2192 2027.01.01", from: "EWR", fromName: "\u7EBD\u7EA6\u7EBD\u74E6\u514B \xB7 B \u822A\u7AD9\u697C", departure: "18:30", to: "OSL", toName: "\u5965\u65AF\u9646", arrival: "\u6B21\u65E5 08:05", after: "\u5965\u65AF\u9646\u4E2D\u8F6C 1 \u5C0F\u65F6 55 \u5206" }, { flight: "SK4412", airline: "\u5317\u6B27\u822A\u7A7A", date: "2027.01.01", from: "OSL", fromName: "\u5965\u65AF\u9646", departure: "10:00", to: "TOS", toName: "\u7279\u7F57\u59C6\u745F", arrival: "12:00" }], back: [{ flight: "SK4079", airline: "\u5317\u6B27\u822A\u7A7A", date: "2027.01.09", from: "EVE", fromName: "\u57C3\u6C83\u5185\u65AF", departure: "06:00", to: "OSL", toName: "\u5965\u65AF\u9646", arrival: "08:00", after: "\u5965\u65AF\u9646\u4E2D\u8F6C 2 \u5C0F\u65F6 45 \u5206" }, { flight: "SK907", airline: "\u5317\u6B27\u822A\u7A7A", date: "2027.01.09", from: "OSL", fromName: "\u5965\u65AF\u9646", departure: "10:45", to: "EWR", toName: "\u7EBD\u7EA6\u7EBD\u74E6\u514B", arrival: "13:25" }], note: "\u7EBD\u7EA6\u7EC4\u822A\u6BB5\u5DF2\u7531 u7 \u786E\u8BA4\u7EE7\u7EED\u91C7\u7528\u3002\u673A\u7968\u4E2A\u4EBA\u8D39\u7528\u4E0D\u81EA\u52A8\u8BA1\u5165\u56E2\u961F AA\u3002" }, { id: "shanghai", name: "\u4E0A\u6D77\u7EC4", english: "SHANGHAI", count: 6, members: ["\u96EA\u513F\u8001\u5E08", "shirley", "\u7AE5\u8C46", "\u67DA\u67DA\u5916\u5A46", "\u5408\u80A5\u5976\u7238", "Hidder"], outRoute: "PVG \u2192 IST \u2192 OSL \u2192 TOS", backRoute: "EVE \u2192 OSL \u2192 PEK \u2192 SHA", outSummary: "12.31 23:05 \u6D66\u4E1C\u51FA\u53D1 \xB7 01.01 14:55 \u62B5\u8FBE\u7279\u7F57\u59C6\u745F", backSummary: "01.09 06:00 \u57C3\u6C83\u5185\u65AF\u51FA\u53D1 \xB7 01.10 09:35 \u62B5\u8FBE\u8679\u6865", out: [{ flight: "TK027", airline: "\u571F\u8033\u5176\u822A\u7A7A", date: "2026.12.31 \u2192 2027.01.01", from: "PVG", fromName: "\u4E0A\u6D77\u6D66\u4E1C \xB7 T2", departure: "23:05", to: "IST", toName: "\u4F0A\u65AF\u5766\u5E03\u5C14", arrival: "\u6B21\u65E5 06:10", after: "\u4F0A\u65AF\u5766\u5E03\u5C14\u4E2D\u8F6C 2 \u5C0F\u65F6 10 \u5206 \xB7 \u622A\u56FE\u6807\u6CE8\u884C\u674E\u76F4\u8FBE" }, { flight: "TK1751", airline: "\u571F\u8033\u5176\u822A\u7A7A", date: "2027.01.01", from: "IST", fromName: "\u4F0A\u65AF\u5766\u5E03\u5C14", departure: "08:20", to: "OSL", toName: "\u5965\u65AF\u9646", arrival: "10:10", after: "\u5965\u65AF\u9646\u4E2D\u8F6C 2 \u5C0F\u65F6 45 \u5206 \xB7 \u9700\u91CD\u65B0\u529E\u7406\u767B\u673A\uFF0C\u884C\u674E\u662F\u5426\u76F4\u8FBE\u4EE5\u673A\u573A\u786E\u8BA4\u4E3A\u51C6" }, { flight: "DY376", airline: "\u632A\u5A01\u7A7F\u68AD\u822A\u7A7A", date: "2027.01.01", from: "OSL", fromName: "\u5965\u65AF\u9646", departure: "12:55", to: "TOS", toName: "\u7279\u7F57\u59C6\u745F", arrival: "14:55" }], back: [{ flight: "SK4079", airline: "\u5317\u6B27\u822A\u7A7A", date: "2027.01.09", from: "EVE", fromName: "\u57C3\u6C83\u5185\u65AF", departure: "06:00", to: "OSL", toName: "\u5965\u65AF\u9646", arrival: "08:00", after: "\u5965\u65AF\u9646\u4E2D\u8F6C 4 \u5C0F\u65F6 30 \u5206 \xB7 \u9700\u91CD\u65B0\u6258\u8FD0\u884C\u674E" }, { flight: "HU770", airline: "\u6D77\u5357\u822A\u7A7A", date: "2027.01.09 \u2192 2027.01.10", from: "OSL", fromName: "\u5965\u65AF\u9646", departure: "12:30", to: "PEK", toName: "\u5317\u4EAC\u9996\u90FD \xB7 T2", arrival: "\u6B21\u65E5 04:30", after: "\u5317\u4EAC\u4E2D\u8F6C 2 \u5C0F\u65F6 55 \u5206 \xB7 \u884C\u674E\u662F\u5426\u76F4\u8FBE\u4EE5\u673A\u573A\u786E\u8BA4\u4E3A\u51C6" }, { flight: "HU7601", airline: "\u6D77\u5357\u822A\u7A7A", date: "2027.01.10", from: "PEK", fromName: "\u5317\u4EAC\u9996\u90FD \xB7 T2", departure: "07:25", to: "SHA", toName: "\u4E0A\u6D77\u8679\u6865 \xB7 T2", arrival: "09:35" }], note: "\u4E0A\u6D77\u7EC4\u53BB\u7A0B\u4E0E\u8FD4\u7A0B\u5747\u6309\u63D0\u4F9B\u622A\u56FE\u5F55\u5165\u3002\u4E0A\u6D77\u7EC4\u4E8E 1 \u6708 10 \u65E5\u62B5\u8FBE\u4E0A\u6D77\u3002" }];
  var milestones = [{ id: "shanghai", label: "\u4E0A\u6D77\u7EC4\u51FA\u53D1", title: "\u7B2C\u4E00\u7A0B\uFF0C\u4ECE\u4E0A\u6D77\u542F\u822A\u3002", target: "2026-12-31T23:05:00+08:00", when: "2026.12.31 \xB7 23:05", zone: "\u4E0A\u6D77\u65F6\u95F4 UTC+8", route: "\u4E0A\u6D77\u6D66\u4E1C PVG \u2192 \u4F0A\u65AF\u5766\u5E03\u5C14 IST", people: "\u96EA\u513F\u8001\u5E08 \xB7 shirley \xB7 \u7AE5\u8C46 \xB7 \u67DA\u67DA\u5916\u5A46 \xB7 \u5408\u80A5\u5976\u7238 \xB7 Hidder", status: "\u4E0A\u6D77\u7EC4\u5DF2\u5230\u8BA1\u5212\u51FA\u53D1\u65F6\u95F4", detail: "TK027 \xB7 \u6D66\u4E1C\u673A\u573A T2 \u51FA\u53D1" }, { id: "new-york", label: "\u7EBD\u7EA6\u7EC4\u51FA\u53D1", title: "\u53E6\u4E00\u7247\u5929\u7A7A\uFF0C\u540C\u4E00\u4E2A\u76EE\u7684\u5730\u3002", target: "2026-12-31T18:30:00-05:00", when: "2026.12.31 \xB7 18:30", zone: "\u7EBD\u7EA6\u65F6\u95F4 UTC\u22125", route: "\u7EBD\u7EA6\u7EBD\u74E6\u514B EWR \u2192 \u5965\u65AF\u9646 OSL", people: "u7 \xB7 whisper", status: "\u7EBD\u7EA6\u7EC4\u5DF2\u5230\u8BA1\u5212\u51FA\u53D1\u65F6\u95F4", detail: "SK908 \xB7 \u7EBD\u74E6\u514B\u673A\u573A B \u822A\u7AD9\u697C\u51FA\u53D1" }, { id: "reunion", label: "\u7279\u7F57\u59C6\u745F\u4F1A\u5408", title: "\u516B\u4E2A\u4EBA\uFF0C\u5728\u5317\u6781\u5708\u76F8\u89C1\u3002", target: "2027-01-01T14:55:00+01:00", when: "2027.01.01 \xB7 14:55", zone: "\u632A\u5A01\u65F6\u95F4 UTC+1", route: "\u4E24\u7EC4\u62B5\u8FBE\u7279\u7F57\u59C6\u745F TOS", people: "\u7EBD\u7EA6\u7EC4 12:00 \u62B5\u8FBE \xB7 \u4E0A\u6D77\u7EC4 14:55 \u62B5\u8FBE", status: "\u5DF2\u5230\u8BA1\u5212\u4F1A\u5408\u65F6\u95F4", detail: "\u4EE5\u8F83\u665A\u62B5\u8FBE\u7684\u4E0A\u6D77\u7EC4\u822A\u73ED\u65F6\u95F4\u4E3A\u57FA\u51C6\uFF1B\u5177\u4F53\u4F1A\u5408\u5730\u70B9\u5F85\u5B9A\u3002" }];
  function remaining(target, now = Date.now()) {
    const difference = Date.parse(target) - now;
    if (!Number.isFinite(difference)) throw Error("Invalid countdown date");
    const seconds = Math.max(0, Math.floor(difference / 1e3));
    return { days: Math.floor(seconds / 86400), hours: Math.floor(seconds / 3600) % 24, minutes: Math.floor(seconds / 60) % 60, seconds: seconds % 60, reached: difference <= 0 };
  }

  // public/flight-cards.js
  function legHtml(leg) {
    return `<div class="flight-leg"><div class="leg-top"><span>${leg.date}</span><strong>${leg.airline} ${leg.flight}</strong></div><div class="leg-route"><div><b>${leg.departure}</b><span>${leg.from} \xB7 ${leg.fromName}</span></div><span class="leg-arrow">\u2192</span><div><b>${leg.arrival}</b><span>${leg.to} \xB7 ${leg.toName}</span></div></div></div>${leg.after ? `<p class="leg-transfer">\u21B3 ${leg.after}</p>` : ""}`;
  }
  function renderFlights() {
    const root = document.querySelector("#flight-cards");
    root.innerHTML = groups.map((g) => `<details class="flight-card" id="flight-${g.id}"><summary><div class="flight-cover"><span class="flight-kicker">${g.english} / ${g.count} \u4EBA\u540C\u884C</span><h3>${g.name} \xB7 \u5F80\u8FD4\u822A\u73ED</h3><p class="flight-people">${g.members.join(" \xB7 ")}</p><div class="flight-preview"><small>\u53BB\u7A0B / ${g.outRoute}</small><p>${g.outSummary}</p><small>\u8FD4\u7A0B / ${g.backRoute}</small><p>${g.backSummary}</p></div><div class="flight-expand"><span class="expand-label">\u70B9\u51FB\u5C55\u5F00\u5168\u90E8 ${g.out.length + g.back.length} \u4E2A\u822A\u6BB5</span><span class="collapse-label">\u70B9\u51FB\u6536\u8D77\u822A\u6BB5</span><span class="flight-plus" aria-hidden="true">\uFF0B</span></div></div></summary><div class="flight-content"><h4>\u53BB\u7A0B \xB7 \u62B5\u8FBE\u7279\u7F57\u59C6\u745F</h4>${g.out.map(legHtml).join("")}<h4>\u8FD4\u7A0B \xB7 \u57C3\u6C83\u5185\u65AF\u51FA\u53D1</h4>${g.back.map(legHtml).join("")}<p class="note">${g.note}</p></div></details>`).join("");
  }

  // public/calc.js
  var MEMBERS = ["u7", "whisper", "\u96EA\u513F\u8001\u5E08", "shirley", "\u7AE5\u8C46", "\u67DA\u67DA\u5916\u5A46", "\u5408\u80A5\u5976\u7238", "Hidder"];
  function calculate(expenses) {
    const result = {};
    for (const e of expenses) {
      const c = e.currency;
      if (!result[c]) result[c] = { total: 0, paid: Array(8).fill(0), share: Array(8).fill(0) };
      const r = result[c];
      r.total += e.cents;
      r.paid[MEMBERS.indexOf(e.payer)] += e.cents;
      const base = Math.floor(e.cents / 8), rem = e.cents % 8;
      for (let i = 0; i < 8; i++) r.share[i] += base + (i < rem ? 1 : 0);
    }
    for (const r of Object.values(result)) {
      r.net = r.paid.map((p, i2) => p - r.share[i2]);
      const creditors = r.net.map((v, i2) => ({ i: i2, v })).filter((x) => x.v > 0), debtors = r.net.map((v, i2) => ({ i: i2, v: -v })).filter((x) => x.v > 0);
      r.transfers = [];
      let i = 0, j = 0;
      while (i < debtors.length && j < creditors.length) {
        const a = debtors[i], b = creditors[j], v = Math.min(a.v, b.v);
        r.transfers.push({ from: MEMBERS[a.i], to: MEMBERS[b.i], cents: v });
        a.v -= v;
        b.v -= v;
        if (!a.v) i++;
        if (!b.v) j++;
      }
    }
    return result;
  }
  function convertExpense(expense, snapshot, target) {
    var _a, _b;
    if (expense.currency === target) return { ...expense, currency: target };
    if (!snapshot || snapshot.rateDate > expense.date || !((_a = snapshot.rates) == null ? void 0 : _a[expense.currency]) || !((_b = snapshot.rates) == null ? void 0 : _b[target])) return null;
    return { ...expense, currency: target, cents: Math.round(expense.cents * snapshot.rates[target] / snapshot.rates[expense.currency]) };
  }

  // public/money.js
  var currencies = ["CNY", "USD", "NOK"];
  var names = { CNY: "\u4EBA\u6C11\u5E01", USD: "\u7F8E\u5143", NOK: "\u632A\u5A01\u514B\u6717" };
  var fmt = (cents, c) => c + " " + (cents / 100).toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  var $ = (s) => document.querySelector(s);
  function el(tag, text, cls) {
    const n = document.createElement(tag);
    if (text !== void 0) n.textContent = text;
    if (cls) n.className = cls;
    return n;
  }
  function makeMoney({ request: request2, getExpenses, getActor, remove: remove2 }) {
    const cache = /* @__PURE__ */ new Map();
    let selected = "CNY";
    let scheduled = false;
    const referenceDate = () => $("#expense-date").value || (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA");
    function rerender() {
      if (scheduled) return;
      scheduled = true;
      queueMicrotask(() => {
        scheduled = false;
        render2(getExpenses(), getActor(), remove2);
      });
    }
    function getRate(date) {
      const existing = cache.get(date);
      if (existing && (existing.pending || Date.now() - existing.at < 3e5)) return existing;
      const entry = { pending: true, at: Date.now(), data: existing == null ? void 0 : existing.data };
      cache.set(date, entry);
      request2("fx?date=" + encodeURIComponent(date)).then((data) => {
        cache.set(date, { data, at: Date.now() });
        rerender();
      }).catch((e) => {
        cache.set(date, { error: e.message, at: Date.now() });
        rerender();
      });
      return entry;
    }
    function button2(text, fn) {
      const b = el("button", text);
      b.type = "button";
      b.onclick = fn;
      return b;
    }
    function render2(expenses, actor2, remove3) {
      var _a;
      const entries = new Map([...new Set(expenses.map((e) => e.date))].map((d) => [d, getRate(d)]));
      const refDate = referenceDate(), ref = getRate(refDate);
      const refBox = $("#fx-reference");
      refBox.replaceChildren();
      if (ref.pending) refBox.append(el("span", "\u6B63\u5728\u83B7\u53D6 " + refDate + " \u7684\u6BCF\u65E5\u53C2\u8003\u6C47\u7387\u2026"));
      else if (ref.error) refBox.append(el("span", ref.error, "fx-pending"));
      else {
        const r = ref.data;
        refBox.append(el("span", "1 NOK \u2248 " + (r.rates.CNY / r.rates.NOK).toFixed(4) + " CNY\u3000 /\u3000" + (r.rates.USD / r.rates.NOK).toFixed(4) + " USD"), el("span", "\u53C2\u8003\u65E5\u671F " + refDate + " \xB7 \u5B9E\u9645\u6C47\u7387\u65E5\u671F " + r.rateDate + " \xB7 1 USD \u2248 " + (r.rates.CNY / r.rates.USD).toFixed(4) + " CNY", "fx-asof"));
      }
      $("#money-summary").replaceChildren();
      const convertedByCurrency = {};
      for (const c of currencies) {
        const converted = expenses.map((e) => {
          var _a2;
          return convertExpense(e, (_a2 = entries.get(e.date)) == null ? void 0 : _a2.data, c);
        }).filter(Boolean);
        convertedByCurrency[c] = converted;
        const total = converted.reduce((n, e) => n + e.cents, 0);
        const card = el("article");
        card.append(el("small", names[c] + " / " + c), el("h3", fmt(total, c)), el("p", "\u6BCF\u4EBA\u7EA6 " + fmt(Math.round(total / 8), c)), el("span", expenses.length ? converted.length === expenses.length ? "\u5DF2\u8BA1\u5165\u5168\u90E8 " + expenses.length + " \u7B14\uFF08\u540C\u5E01\u79CD\u4FDD\u7559\u539F\u989D\uFF09" : "\u6682\u8BA1 " + converted.length + " / " + expenses.length + " \u7B14\uFF0C\u5F85\u6C47\u7387\u9F50\u5168" : "\u6682\u65E0\u5171\u540C\u82B1\u8D39", "fx-note"));
        $("#money-summary").append(card);
      }
      const included = convertedByCurrency[selected], missing = expenses.length - included.length;
      $("#fx-warning").textContent = missing ? "\u5C1A\u6709 " + missing + " \u7B14\u7F3A\u5C11\u53EF\u7528\u6C47\u7387\uFF0C\u4EE5\u4E0B\u4EC5\u4E3A\u5DF2\u6362\u7B97\u90E8\u5206\uFF1B\u5B8C\u6574\u8F6C\u8D26\u5EFA\u8BAE\u5C06\u5728\u6C47\u7387\u9F50\u5168\u540E\u663E\u793A\u3002" : "\u5DF2\u6309\u5404\u7B14\u82B1\u8D39\u65E5\u6C47\u7387\u6362\u7B97\uFF1B\u5207\u6362\u5E01\u79CD\u67E5\u770B\u540C\u4E00\u4EFD\u8D26\uFF0C\u8BF7\u9009\u62E9\u4E00\u79CD\u5E01\u79CD\u7ED3\u7B97\u3002";
      $("#balances").replaceChildren();
      $("#settlements").replaceChildren();
      const sums = calculate(included)[selected];
      if (sums) {
        const table = el("table"), caption = el("caption", names[selected] + " \xB7 \u516B\u4EBA\u5206\u644A" + (missing ? " \xB7 \u6682\u8BA1" : "")), thead = el("thead"), head = el("tr");
        for (const label of ["\u6210\u5458", "\u5DF2\u57AB\u4ED8", "\u5E94\u644A", "\u5E94\u6536 / \u5E94\u4ED8"]) head.append(el("th", label));
        thead.append(head);
        table.append(caption, thead);
        const tbody = el("tbody");
        MEMBERS.forEach((n, i) => {
          const row = el("tr");
          row.append(el("td", n), el("td", fmt(sums.paid[i], selected)), el("td", fmt(sums.share[i], selected)), el("td", sums.net[i] > 0 ? "\u5E94\u6536 " + fmt(sums.net[i], selected) : sums.net[i] < 0 ? "\u5E94\u4ED8 " + fmt(-sums.net[i], selected) : "\u5DF2\u5E73\u8861", sums.net[i] >= 0 ? "positive" : "negative"));
          tbody.append(row);
        });
        table.append(tbody);
        $("#balances").append(table);
        if (!missing) {
          const panel = el("article", void 0, "shared-card");
          panel.append(el("h4", names[selected] + " \xB7 \u8F6C\u8D26\u5EFA\u8BAE"));
          if (!sums.transfers.length) panel.append(el("p", "\u5F53\u524D\u65E0\u9700\u8F6C\u8D26"));
          for (const t of sums.transfers) panel.append(el("p", t.from + " \u2192 " + t.to + "\u3000" + fmt(t.cents, selected)));
          $("#settlements").append(panel);
        }
      } else $("#balances").append(el("p", expenses.length ? "\u7B49\u5F85\u6C47\u7387\u540E\u8BA1\u7B97\u516B\u4EBA\u5206\u644A\uFF0C\u539F\u5E01\u8D26\u5355\u5DF2\u4FDD\u5B58\u3002" : "\u8BB0\u4E0B\u7B2C\u4E00\u7B14\u540E\uFF0C\u81EA\u52A8\u5217\u51FA\u516B\u4E2A\u4EBA\u7684\u57AB\u4ED8\u4E0E\u5206\u644A\u3002", "empty"));
      $("#expenses").replaceChildren();
      for (const e of [...expenses].sort((a, b) => b.date.localeCompare(a.date))) {
        const line = el("article", void 0, "expense-row");
        line.append(el("span", e.date), el("strong", e.text), el("span", e.payer + " \u57AB\u4ED8"), el("b", fmt(e.cents, e.currency)));
        if (e.createdBy === actor2) line.append(button2("\u5220\u9664", () => remove3(e)));
        const equivalents = el("div", void 0, "fx-equivalents");
        for (const c of currencies) {
          const v = convertExpense(e, (_a = entries.get(e.date)) == null ? void 0 : _a.data, c);
          equivalents.append(el("span", v ? (e.currency === c ? "" : "\u2248 ") + fmt(v.cents, c) : c + " \u5F85\u6C47\u7387"));
        }
        const fx = entries.get(e.date);
        line.append(equivalents, el("div", fx.pending ? "\u6309\u82B1\u8D39\u65E5\u671F " + e.date + " \u83B7\u53D6\u6C47\u7387\u4E2D\u2026" : fx.data ? "\u6C47\u7387\u65E5\u671F " + fx.data.rateDate + (fx.data.rateDate !== e.date ? "\uFF08\u6CBF\u7528\u6B64\u524D\u6700\u8FD1\u516C\u5E03\u503C\uFF09" : "") + " \xB7 ECB via Frankfurter" : fx.error || "\u6C47\u7387\u6682\u4E0D\u53EF\u7528", "fx-detail"));
        $("#expenses").append(line);
      }
    }
    $("#display-currency").onchange = () => {
      selected = $("#display-currency").value;
      rerender();
    };
    $("#expense-date").addEventListener("change", rerender);
    $("#fx-retry").onclick = () => {
      for (const [d, v] of cache) if (!v.pending) cache.delete(d);
      rerender();
    };
    $("#export").onclick = () => {
      const expenses = getExpenses();
      const data = [["\u82B1\u8D39\u65E5\u671F", "\u7528\u9014", "\u539F\u5E01", "\u539F\u91D1\u989D", "\u57AB\u4ED8\u4EBA", "\u8BB0\u5F55\u4EBA", "\u5B9E\u9645\u6C47\u7387\u65E5\u671F", "\u6298\u5408\u4EBA\u6C11\u5E01 CNY", "\u6298\u5408\u7F8E\u5143 USD", "\u6298\u5408\u632A\u5A01\u514B\u6717 NOK"], ...expenses.map((e) => {
        var _a;
        const snapshot = (_a = cache.get(e.date)) == null ? void 0 : _a.data;
        return [e.date, e.text, e.currency, (e.cents / 100).toFixed(2), e.payer, e.createdBy, (snapshot == null ? void 0 : snapshot.rateDate) || "\u5F85\u6C47\u7387", ...currencies.map((c) => {
          const v = convertExpense(e, snapshot, c);
          return v ? (v.cents / 100).toFixed(2) : "\u5F85\u6C47\u7387";
        })];
      })];
      const csv = "\uFEFF" + data.map((row) => row.map((v) => '"' + String(v).replace(/^[=+@-]/, "'$&").replaceAll('"', '""') + '"').join(",")).join("\r\n");
      const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
      const a = el("a");
      a.href = url;
      a.download = "\u632A\u5A01\u516B\u4EBAAA\u8D26\u672C-\u6BCF\u65E5\u6C47\u7387.csv";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1e3);
    };
    return { render: render2 };
  }

  // public/app.js
  renderFlights();
  function homeTick() {
    const target = milestones[0];
    const p = remaining(target.target);
    document.querySelector(".departure-strip strong").textContent = p.reached ? "\u51FA\u53D1\u65E5\u5DF2\u5230\uFF0C\u53BB\u632A\u5A01\u89C1\u3002" : "\u79BB\u7B2C\u4E00\u7A0B\u51FA\u53D1\uFF0C\u8FD8\u6709 " + p.days + " \u5929 " + String(p.hours).padStart(2, "0") + " \u5C0F\u65F6\u3002";
  }
  homeTick();
  setInterval(homeTick, 3e4);
  var dates = ["12.31", "01.01", "01.02", "01.03", "01.04", "01.05", "01.06", "01.07", "01.08", "01.09"];
  document.querySelector("#day-list").innerHTML = days.map(([title, body], i) => `<details><summary><span class="daynum">DAY ${String(i + 1).padStart(2, "0")}</span><span class="date">${dates[i]}</span><span class="daytitle">${title}</span></summary><div class="daybody"><p class="placeholder">${body}</p></div></details>`).join("");
  var $2 = (s) => document.querySelector(s);
  function el2(tag, text, cls) {
    const n = document.createElement(tag);
    if (text !== void 0) n.textContent = text;
    if (cls) n.className = cls;
    return n;
  }
  function button(text, fn) {
    const n = el2("button", text);
    n.type = "button";
    n.onclick = fn;
    return n;
  }
  for (const name of MEMBERS) {
    $2("#identity").append(new Option(name, name));
    $2("#expense-payer").append(new Option(name, name));
  }
  var actor = "";
  try {
    actor = localStorage.getItem("norway-actor") || "";
  } catch (e) {
  }
  if (!MEMBERS.includes(actor)) actor = "";
  $2("#identity").value = actor;
  $2("#identity").onchange = () => {
    actor = $2("#identity").value;
    try {
      localStorage.setItem("norway-actor", actor);
    } catch (e) {
    }
    if (actor) $2("#expense-payer").value = actor;
    render();
  };
  if (actor) $2("#expense-payer").value = actor;
  $2("#expense-date").value = (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA");
  var rows = [];
  var busy = false;
  var loaded = false;
  function identity() {
    if (!actor) {
      $2("#error").textContent = "\u8BF7\u5148\u5728\u201C\u6211\u662F\u201D\u4E2D\u9009\u62E9\u4F60\u7684\u540D\u5B57\u3002";
      $2("#identity").focus();
      return false;
    }
    return true;
  }
  async function request(path, options = {}) {
    const r = await fetch((window.NORWAY_API_BASE || "") + "/api/" + path, { ...options, headers: options.method ? { "Content-Type": "application/json", "X-Member": encodeURIComponent(actor) } : {}, cache: "no-store" });
    let data;
    try {
      data = await r.json();
    } catch (e) {
      throw Error("\u8FDE\u63A5\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");
    }
    if (!r.ok) throw Error(data.error || "\u4FDD\u5B58\u5931\u8D25");
    return data;
  }
  async function load() {
    if (busy) return;
    try {
      rows = (await request("records")).records;
      loaded = true;
      render();
      $2("#sync-state").textContent = "\u5DF2\u540C\u6B65 \xB7 " + (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      $2("#sync-state").textContent = "\u6682\u672A\u8FDE\u63A5";
      $2("#error").textContent = e.message;
    }
  }
  async function mutate(path, method, body) {
    if (!identity() || busy) return false;
    busy = true;
    $2("#error").textContent = "";
    $2("#sync-state").textContent = "\u6B63\u5728\u4FDD\u5B58\u2026";
    document.querySelectorAll("form button").forEach((n) => n.disabled = true);
    let ok = false;
    try {
      await request(path, { method, body: body ? JSON.stringify(body) : void 0 });
      ok = true;
    } catch (e) {
      $2("#error").textContent = e.message;
    } finally {
      busy = false;
      document.querySelectorAll("form button").forEach((n) => n.disabled = false);
    }
    await load();
    return ok;
  }
  var patch = (r, action) => mutate("records/" + r.id, "PATCH", { action });
  var remove = (r) => {
    if (confirm("\u5220\u9664\u201C" + r.text + "\u201D\uFF1F\u5176\u4ED6\u4EBA\u4E5F\u5C06\u770B\u4E0D\u5230\u8FD9\u6761\u8BB0\u5F55\u3002")) mutate("records/" + r.id, "DELETE");
  };
  function render() {
    var _a, _b;
    if (!loaded) return;
    const tasks = rows.filter((r) => r.kind === "task"), foods = rows.filter((r) => r.kind === "food"), expenses = rows.filter((r) => r.kind === "expense");
    $2("#tasks").replaceChildren();
    let total = 0, done = 0;
    for (const r of tasks) {
      const card = el2("article", void 0, "shared-card"), head = el2("div", void 0, "shared-head");
      head.append(el2("strong", r.text));
      if (!r.createdBy || r.createdBy === actor) head.append(button("\u5220\u9664", () => remove(r)));
      card.append(head);
      if (r.mode === "all") {
        const count = MEMBERS.filter((n) => {
          var _a2;
          return (_a2 = r.done) == null ? void 0 : _a2[n];
        }).length;
        done += count;
        total += 8;
        card.append(el2("small", "\u6BCF\u4E2A\u4EBA\u90FD\u8981\u5B8C\u6210 \xB7 " + count + " / 8"));
        const members = el2("div", void 0, "member-checks");
        for (const n of MEMBERS) {
          const lab = el2("label", void 0, (((_a = r.done) == null ? void 0 : _a[n]) ? "checked " : "") + (n === actor ? "me" : ""));
          const input = el2("input");
          input.type = "checkbox";
          input.checked = !!((_b = r.done) == null ? void 0 : _b[n]);
          input.disabled = n !== actor;
          input.onchange = () => patch(r, "toggle");
          lab.append(input, document.createTextNode(n));
          members.append(lab);
        }
        card.append(members);
      } else {
        total++;
        if (r.completed) done++;
        const line = el2("div", void 0, "claim-line");
        line.append(el2("span", r.owner ? "\u8D1F\u8D23\u4EBA\uFF1A" + r.owner : "\u7B49\u5F85\u8BA4\u9886"));
        if (!r.owner) line.append(button("\u6211\u6765\u8D1F\u8D23", () => patch(r, "claim")));
        if (r.owner === actor) {
          line.append(button(r.completed ? "\u2713 \u5DF2\u5B8C\u6210 \xB7 \u64A4\u9500" : "\u6807\u8BB0\u5B8C\u6210", () => patch(r, "toggle")), button("\u53D6\u6D88\u8BA4\u9886", () => patch(r, "unclaim")));
        } else if (r.completed) line.append(el2("span", "\u2713 \u5DF2\u5B8C\u6210", "pill"));
        card.append(line);
      }
      $2("#tasks").append(card);
    }
    $2("#progress").textContent = done + " / " + total + " \u4EBA\u6B21";
    if (!tasks.length) $2("#tasks").append(el2("p", "\u8FD8\u6CA1\u6709\u5F85\u529E\uFF0C\u6DFB\u52A0\u7B2C\u4E00\u9879\u5427\u3002", "empty"));
    $2("#foods").replaceChildren();
    for (const r of foods) {
      const card = el2("article", void 0, "shared-card");
      const head = el2("div", void 0, "shared-head");
      head.append(el2("strong", r.text + (r.qty ? " \xB7 " + r.qty : "")));
      if (r.createdBy === actor) head.append(button("\u5220\u9664", () => remove(r)));
      const line = el2("div", void 0, "claim-line");
      line.append(el2("span", r.owner ? "\u643A\u5E26\u4EBA\uFF1A" + r.owner : "\u7B49\u5F85\u8BA4\u9886"));
      if (!r.owner) line.append(button("\u6211\u6765\u5E26", () => patch(r, "claim")));
      if (r.owner === actor) line.append(button(r.completed ? "\u2713 \u5DF2\u5E26\u597D \xB7 \u64A4\u9500" : "\u52FE\u9009\uFF1A\u5DF2\u5E26\u597D", () => patch(r, "toggle")), button("\u53D6\u6D88\u8BA4\u9886", () => patch(r, "unclaim")));
      else if (r.completed) line.append(el2("span", "\u2713 \u5DF2\u5E26\u597D", "pill"));
      card.append(head, line);
      $2("#foods").append(card);
    }
    if (!foods.length) $2("#foods").append(el2("div", "\u8FD8\u6CA1\u6709\u7269\u8D44\u3002\u628A\u98DF\u6750\u3001\u65E5\u7528\u54C1\u6216\u5176\u4ED6\u8981\u5E26\u7684\u4E1C\u897F\u52A0\u8FDB\u6765\uFF0C\u518D\u7531\u5927\u5BB6\u8BA4\u9886\u3002", "empty"));
    $2("#food-progress").textContent = foods.filter((r) => r.completed).length + " / " + foods.length + " \u5DF2\u5E26\u597D";
    money.render(expenses, actor, remove);
    plans.update(rows);
  }
  var money = makeMoney({ request, getExpenses: () => rows.filter((r) => r.kind === "expense"), getActor: () => actor, remove });
  var plans = setupPlans({ mutate });
  $2("#add-form").onsubmit = async (e) => {
    e.preventDefault();
    const text = $2("#new-task").value.trim();
    if (text && await mutate("records", "POST", { id: newRecordId(), kind: "task", text, mode: $2("#task-mode").value })) $2("#new-task").value = "";
  };
  $2("#food-form").onsubmit = async (e) => {
    e.preventDefault();
    const text = $2("#food-name").value.trim();
    if (text && await mutate("records", "POST", { id: newRecordId(), kind: "food", text, qty: $2("#food-qty").value.trim() })) {
      $2("#food-name").value = "";
      $2("#food-qty").value = "";
    }
  };
  $2("#expense-form").onsubmit = async (e) => {
    e.preventDefault();
    const data = { id: newRecordId(), kind: "expense", text: $2("#expense-name").value.trim(), amount: $2("#expense-amount").value, currency: $2("#expense-currency").value, payer: $2("#expense-payer").value, date: $2("#expense-date").value };
    if (data.text && await mutate("records", "POST", data)) {
      $2("#expense-name").value = "";
      $2("#expense-amount").value = "";
    }
  };
  $2("#refresh").onclick = load;
  load();
  setInterval(() => {
    if (!document.hidden && !document.querySelector("form :focus")) load();
  }, 12e3);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) load();
  });
  setupWeather();
})();
