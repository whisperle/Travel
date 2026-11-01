window.NORWAY_API_BASE="https://norway-eight-winter-journey.wh1sper.chatgpt.site";
(() => {
  // public/travel.js
  var milestones = [{ id: "shanghai", label: "\u4E0A\u6D77\u7EC4\u51FA\u53D1", title: "\u7B2C\u4E00\u7A0B\uFF0C\u4ECE\u4E0A\u6D77\u542F\u822A\u3002", target: "2026-12-31T23:05:00+08:00", when: "2026.12.31 \xB7 23:05", zone: "\u4E0A\u6D77\u65F6\u95F4 UTC+8", route: "\u4E0A\u6D77\u6D66\u4E1C PVG \u2192 \u4F0A\u65AF\u5766\u5E03\u5C14 IST", people: "\u96EA\u513F\u8001\u5E08 \xB7 shirley \xB7 \u7AE5\u8C46 \xB7 \u67DA\u67DA\u5916\u5A46 \xB7 \u5408\u80A5\u5976\u7238 \xB7 Hidder", status: "\u4E0A\u6D77\u7EC4\u5DF2\u5230\u8BA1\u5212\u51FA\u53D1\u65F6\u95F4", detail: "TK027 \xB7 \u6D66\u4E1C\u673A\u573A T2 \u51FA\u53D1" }, { id: "new-york", label: "\u7EBD\u7EA6\u7EC4\u51FA\u53D1", title: "\u53E6\u4E00\u7247\u5929\u7A7A\uFF0C\u540C\u4E00\u4E2A\u76EE\u7684\u5730\u3002", target: "2026-12-31T18:30:00-05:00", when: "2026.12.31 \xB7 18:30", zone: "\u7EBD\u7EA6\u65F6\u95F4 UTC\u22125", route: "\u7EBD\u7EA6\u7EBD\u74E6\u514B EWR \u2192 \u5965\u65AF\u9646 OSL", people: "u7 \xB7 whisper", status: "\u7EBD\u7EA6\u7EC4\u5DF2\u5230\u8BA1\u5212\u51FA\u53D1\u65F6\u95F4", detail: "SK908 \xB7 \u7EBD\u74E6\u514B\u673A\u573A B \u822A\u7AD9\u697C\u51FA\u53D1" }, { id: "reunion", label: "\u7279\u7F57\u59C6\u745F\u4F1A\u5408", title: "\u516B\u4E2A\u4EBA\uFF0C\u5728\u5317\u6781\u5708\u76F8\u89C1\u3002", target: "2027-01-01T14:55:00+01:00", when: "2027.01.01 \xB7 14:55", zone: "\u632A\u5A01\u65F6\u95F4 UTC+1", route: "\u4E24\u7EC4\u62B5\u8FBE\u7279\u7F57\u59C6\u745F TOS", people: "\u7EBD\u7EA6\u7EC4 12:00 \u62B5\u8FBE \xB7 \u4E0A\u6D77\u7EC4 14:55 \u62B5\u8FBE", status: "\u5DF2\u5230\u8BA1\u5212\u4F1A\u5408\u65F6\u95F4", detail: "\u4EE5\u8F83\u665A\u62B5\u8FBE\u7684\u4E0A\u6D77\u7EC4\u822A\u73ED\u65F6\u95F4\u4E3A\u57FA\u51C6\uFF1B\u5177\u4F53\u4F1A\u5408\u5730\u70B9\u5F85\u5B9A\u3002" }];
  function remaining(target, now = Date.now()) {
    const difference = Date.parse(target) - now;
    if (!Number.isFinite(difference)) throw Error("Invalid countdown date");
    const seconds = Math.max(0, Math.floor(difference / 1e3));
    return { days: Math.floor(seconds / 86400), hours: Math.floor(seconds / 3600) % 24, minutes: Math.floor(seconds / 60) % 60, seconds: seconds % 60, reached: difference <= 0 };
  }

  // public/countdown.js
  var $ = (s) => document.querySelector(s);
  var selected = milestones.find((m) => m.id === location.hash.slice(1)) || milestones.find((m) => Date.parse(m.target) > Date.now()) || milestones[milestones.length - 1];
  var lastStatus = "";
  function select(m) {
    selected = m;
    history.replaceState(null, "", "#" + m.id);
    $("#countdown-label").textContent = "COUNTDOWN / " + m.label;
    $("#countdown-title").textContent = m.title;
    $("#countdown-when").textContent = m.when;
    $("#countdown-zone").textContent = m.zone;
    $("#countdown-route").textContent = m.route;
    $("#countdown-people").textContent = m.people;
    $("#countdown-detail").textContent = m.detail;
    for (const b of document.querySelectorAll("#milestone-tabs button")) b.setAttribute("aria-pressed", String(b.dataset.id === m.id));
    lastStatus = "";
    tick();
  }
  for (const m of milestones) {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = m.label;
    b.dataset.id = m.id;
    b.setAttribute("aria-pressed", "false");
    b.onclick = () => select(m);
    $("#milestone-tabs").append(b);
  }
  function tick() {
    const p = remaining(selected.target);
    $("#timer-days").textContent = String(p.days).padStart(2, "0");
    $("#timer-hours").textContent = String(p.hours).padStart(2, "0");
    $("#timer-minutes").textContent = String(p.minutes).padStart(2, "0");
    $("#timer-seconds").textContent = String(p.seconds).padStart(2, "0");
    const status = p.reached ? selected.status : "\u8DDD\u79BB\u8BA1\u5212\u65F6\u523B\u8FD8\u6709";
    if (status !== lastStatus) {
      $("#countdown-status").textContent = status;
      lastStatus = status;
    }
  }
  select(selected);
  setInterval(tick, 1e3);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) tick();
  });
  window.addEventListener("hashchange", () => {
    const m = milestones.find((m2) => m2.id === location.hash.slice(1));
    if (m) select(m);
  });
})();
