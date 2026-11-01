window.NORWAY_API_BASE="https://norway-eight-winter-journey.wh1sper.chatgpt.site";
(() => {
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
  document.querySelector("#day-list").innerHTML = dates.map((d, i) => {
    const fixed = i === 1 || i === 3 || i === 9;
    const title = i === 3 ? "\u7279\u7F57\u59C6\u745F \u2192 \u7F57\u5F17\u6566\u7FA4\u5C9B" : i === 9 ? "\u4E24\u7EC4\u8FD4\u7A0B \xB7 \u57C3\u6C83\u5185\u65AF\u51FA\u53D1" : i === 1 ? "\u62B5\u8FBE\u7279\u7F57\u59C6\u745F\uFF0C\u51C6\u5907\u4F1A\u5408" : i === 0 ? "\u4E24\u5730\u51FA\u53D1\uFF0C\u5F00\u59CB\u5317\u632A\u5A01\u4E4B\u65C5" : "\u8FD9\u4E00\u5929\uFF0C\u7559\u7ED9\u65B0\u7684\u98CE\u666F";
    const body = i === 3 ? "\u5DF2\u786E\u5B9A\u4E8E 2027 \u5E74 1 \u6708 3 \u65E5\u4ECE\u7279\u7F57\u59C6\u745F\u524D\u5F80\u7F57\u5F17\u6566\u7FA4\u5C9B\u3002\u4EA4\u901A\u65B9\u5F0F\u3001\u5177\u4F53\u51FA\u53D1\u65F6\u95F4\u4E0E\u62B5\u8FBE\u5730\u70B9\u5C1A\u672A\u786E\u5B9A\u3002" : i === 9 ? "\u4E0A\u6D77\u7EC4 06:00 \u4ECE\u57C3\u6C83\u5185\u65AF EVE \u8D77\u98DE\uFF0C08:00 \u62B5\u8FBE\u5965\u65AF\u9646\uFF1B\u91CD\u65B0\u6258\u8FD0\u884C\u674E\u540E\uFF0C12:30 \u8F6C\u4E58 HU770 \u524D\u5F80\u5317\u4EAC\u30021 \u6708 10 \u65E5\u7ECF\u5317\u4EAC\u8F6C\u673A\uFF0C09:35 \u62B5\u8FBE\u4E0A\u6D77\u8679\u6865\u3002\u7EBD\u7EA6\u7EC4\u540C\u4E58 SK4079\uFF0C\u968F\u540E 10:45 \u8F6C\u4E58 SK907\uFF0C13:25 \u62B5\u8FBE\u7EBD\u7EA6\u7EBD\u74E6\u514B\u3002" : i === 1 ? "\u7EBD\u7EA6\u7EC4\u7ECF\u5965\u65AF\u9646\uFF0C12:00 \u62B5\u8FBE\u7279\u7F57\u59C6\u745F\uFF1B\u4E0A\u6D77\u7EC4\u7ECF\u4F0A\u65AF\u5766\u5E03\u5C14\u548C\u5965\u65AF\u9646\uFF0C14:55 \u62B5\u8FBE\u3002\u4F1A\u5408\u5730\u70B9\u3001\u63A5\u9A73\u4E0E\u4F4F\u5BBF\u5B89\u6392\u5F85\u5B9A\u3002" : i === 0 ? "u7\u3001whisper \u4ECE\u7EBD\u7EA6\u51FA\u53D1\uFF1B\u5176\u4F59\u516D\u4F4D\u4F19\u4F34\u4ECE\u4E0A\u6D77\u51FA\u53D1\u3002\u4E0A\u6D77\u7EC4 23:05 \u4ECE\u6D66\u4E1C\u8D77\u98DE\uFF1B\u7EBD\u7EA6\u7EC4 18:30\uFF08\u7EBD\u7EA6\u65F6\u95F4\uFF09\u4ECE\u7EBD\u74E6\u514B\u8D77\u98DE\u3002\u4E24\u7EC4\u5747\u4E8E\u6B21\u65E5\u62B5\u8FBE\u7279\u7F57\u59C6\u745F\u3002" : "\u666F\u70B9\u3001\u6D3B\u52A8\u4E0E\u4F4F\u5BBF\u5B89\u6392\u5F85\u5B9A\u3002";
    return `<details class="${fixed ? "fixed-day" : ""}"><summary><span class="daynum">DAY ${String(i + 1).padStart(2, "0")}</span><span class="date">${d}</span><span class="daytitle">${title}</span><span class="daystatus">${fixed ? "\u5DF2\u786E\u8BA4\u90E8\u5206\u5B89\u6392" : "\u5F85\u89C4\u5212"}</span></summary><div class="daybody"><div class="placeholder">${body}</div><div class="day-fields"><span>\u2302 \u4F4F\u5BBF\u5F85\u5B9A</span><span>${i === 3 ? "\u2197 \u8F6C\u573A\u4EA4\u901A\u5F85\u5B9A" : i === 9 ? "\u2708 EVE \u2192 OSL \u2192 PEK \u2192 SHA" : "\u2197 \u5F53\u5929\u4EA4\u901A\u5F85\u5B9A"}</span></div></div></details>`;
  }).join("");
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
    if (!foods.length) $2("#foods").append(el2("div", "\u8FD8\u6CA1\u6709\u98DF\u6750\u3002\u628A\u60F3\u5E26\u7684\u4E1C\u897F\u52A0\u8FDB\u6765\uFF0C\u518D\u7531\u5927\u5BB6\u8BA4\u9886\u3002", "empty"));
    $2("#food-progress").textContent = foods.filter((r) => r.completed).length + " / " + foods.length + " \u5DF2\u5E26\u597D";
    money.render(expenses, actor, remove);
  }
  var money = makeMoney({ request, getExpenses: () => rows.filter((r) => r.kind === "expense"), getActor: () => actor, remove });
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
})();
