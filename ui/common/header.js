(function (root) {
  const DEFAULT_CONTROL_ORDER = ["themeStyle", "theme", "fontSize", "pollInterval", "language"];
  const DEFAULT_ENABLED = {
    themeStyle: true,
    theme: true,
    fontSize: true,
    pollInterval: true,
    language: true
  };
  const FONT_ITEMS = [
    { value: "25", labelKey: "fontLegacy" },
    { value: "50", labelKey: "fontCurrent" },
    { value: "100", labelKey: "fontLarge" }
  ];
  const POLL_ITEMS = [
    { value: "1h", amount: 1 },
    { value: "3h", amount: 3 },
    { value: "6h", amount: 6 },
    { value: "12h", amount: 12 }
  ];
  const HEADER_HTML = `
    <div>
      <h1 class="brand-title">
        <svg class="brand-mikrotik-mark" viewBox="0 0 258.95 44.62" width="258.95" height="44.62" preserveAspectRatio="xMinYMid meet" role="img" aria-label="MikroTik" xmlns="http://www.w3.org/2000/svg">
          <g fill="currentColor">
            <path d="M130.32,21.19c-.16-.21-.14-.5.04-.68l7.32-7.19c.33-.32.1-.88-.36-.88h-4.26c-.21,0-.4.08-.55.22l-8.24,7.56c-.33.3-.86.07-.86-.38v-6.58c0-.45-.37-.82-.82-.82h-2.97c-.45,0-.82.37-.82.82v18.27c0,.45.37.82.82.82h2.97c.46,0,.82-.37.82-.83l-.03-4.24c0-.23.09-.45.26-.61l2.56-2.38c.22-.2.56-.18.75.05l6.19,7.69c.16.19.39.31.64.31h4.27c.43,0,.67-.49.4-.83l-8.14-10.33Z"/>
            <path d="M103.08,12.44h2.98c.45,0,.82.37.82.82v18.27c0,.45-.37.82-.82.82h-2.97c-.45,0-.82-.37-.82-.82V13.26c0-.45.37-.82.82-.82Z"/>
            <path d="M159.77,12.38c-.39-.05-.95-.12-1.39-.12-2.67,0-4.83.76-6.19,2.16v-1.16c0-.45-.37-.82-.82-.82h-2.83c-.45,0-.82.37-.82.82v18.27c0,.45.37.82.82.82h2.97c.45,0,.82-.37.82-.82v-9.1c0-3.67,1.87-5.69,5.26-5.69.61.01,1.59.05,2.3.07.47.02.85-.35.85-.82v-2.5c0-.56-.42-1.04-.97-1.11Z"/>
            <path d="M82.08,12.27c-2.68,0-5.09.92-6.74,2.56-.22.22-.56.2-.76-.03-1.41-1.63-3.57-2.53-6.17-2.53-2.39,0-4.43.71-5.83,2.02v-1.02c0-.45-.37-.82-.82-.82h-2.83c-.45,0-.82.37-.82.82v18.27c0,.45.37.82.82.82h2.97c.45,0,.82-.37.82-.82v-9.41c0-3.55,1.82-5.59,4.99-5.59,2.79,0,4.21,1.63,4.21,4.85v10.15c0,.45.37.82.82.82h2.97c.45,0,.82-.37.82-.82v-9.41c0-3.55,1.82-5.59,4.99-5.59,2.8,0,4.21,1.63,4.21,4.85v10.15c0,.45.37.82.82.82h2.97c.45,0,.82-.37.82-.82v-10.54c0-5.54-3.01-8.72-8.26-8.72Z"/>
            <path d="M223.46,12.44h2.97c.45,0,.82.37.82.82v18.27c0,.45-.37.82-.82.82h-2.97c-.45,0-.82-.37-.82-.82V13.26c0-.45.37-.82.82-.82Z"/>
            <path d="M258.84,31.52l-8.14-10.33c-.16-.21-.14-.5.04-.68l7.32-7.19c.33-.32.1-.88-.36-.88h-4.26c-.21,0-.4.08-.55.22l-8.24,7.56c-.33.3-.86.07-.86-.38v-6.58c0-.45-.37-.82-.82-.82h-2.97c-.45,0-.82.37-.82.82v18.27c0,.45.37.82.82.82h2.97c.46,0,.82-.37.82-.83l-.03-4.24c0-.23.09-.45.26-.61l2.56-2.38c.22-.2.56-.18.75.06l6.19,7.69c.16.19.39.31.64.31h4.27c.43,0,.67-.49.4-.83Z"/>
            <path d="M177.29,12.27c-5.99,0-10.34,4.26-10.34,10.13s4.35,10.17,10.34,10.17,10.31-4.28,10.31-10.17-4.33-10.13-10.31-10.13ZM177.29,28.37c-3.35,0-5.69-2.46-5.69-5.97s2.34-5.94,5.69-5.94,5.66,2.39,5.66,5.94-2.33,5.97-5.66,5.97Z"/>
            <path d="M212.57,12.44h-17.95c-.45,0-.82.37-.82.82v2.66c0,.45.37.82.82.82h6.1c.28,0,.51.23.51.51v14.28c0,.45.37.82.82.82h3.08c.45,0,.82-.37.82-.82v-14.28c0-.28.23-.51.51-.51h6.1c.45,0,.82-.37.82-.82v-2.66c0-.45-.37-.82-.82-.82Z"/>
            <path d="M11.71,21.59c-.09-.1-.19-.19-.31-.26l-2.95-1.63c-.11-.06-.22-.07-.32-.05-.27-.02-.53.18-.53.48v7.99c0,.72.39,1.39,1.03,1.74l2.7,1.48c.33.18.73-.06.73-.43v-8.58c0-.29-.13-.55-.34-.74Z"/>
            <path d="M33.21,14.78l-10.19-5.58-1.31-.72c-.52-.29-1.16-.29-1.69,0l-2.9,1.6c-.1.05-.16.13-.21.22-.17.23-.12.57.15.72l8.62,4.72c.3.22.29.68-.05.87l-3.81,2.11c-.52.29-1.16.29-1.69,0l-8.48-4.69c-.52-.29-1.16-.29-1.69,0l-1.4.77c-.28.16-.51.39-.66.65-.2.31-.32.68-.32,1.06v.52l6.44,3.53,3.73,2.06s.06.05.09.07c.09.06.17.12.25.19.24.23.4.52.5.83.04.14.06.29.06.44v10.66c0,.26.12.49.31.66.07.08.15.14.24.2l.76.42c.59.33,1.31.33,1.91,0l.76-.42c.17-.09.31-.24.39-.41.1-.14.15-.31.15-.49v-10.55c0-.63.34-1.22.9-1.53l4.95-2.73c.32-.18.7.03.75.38v10.57c0,.38.4.62.73.43l2.7-1.48c.64-.35,1.03-1.02,1.03-1.74v-11.61c0-.72-.4-1.39-1.03-1.74Z"/>
            <path d="M39.33,9.57L23.3.62c-1.48-.83-3.28-.83-4.76,0L2.5,9.57c-1.54.86-2.5,2.49-2.5,4.26v17.08c0,1.78.97,3.42,2.53,4.28l16.04,8.82c1.46.81,3.24.81,4.7,0l16.04-8.82c1.56-.86,2.53-2.5,2.53-4.28V13.83c0-1.77-.96-3.4-2.5-4.26ZM36.95,32.33l-15.01,8.26c-.64.35-1.41.35-2.05,0l-15.01-8.26c-.68-.37-1.1-1.09-1.1-1.86V14.27c0-.77.42-1.48,1.09-1.86l15.01-8.38c.64-.36,1.43-.36,2.07,0l15.01,8.38c.67.38,1.09,1.09,1.09,1.86v16.2c0,.78-.42,1.49-1.1,1.86Z"/>
          </g>
        </svg>
        <span class="brand-text" id="brand-text"></span>
        <span class="brand-version" id="brand-version" aria-label="Version"></span>
      </h1>
      <p class="subtitle" id="subtitle"></p>
    </div>
    <div class="controls"></div>`;

  function normalizeEnabledMap(cfg) {
    const source = cfg && typeof cfg === "object" ? (cfg.enabled || cfg.visible || cfg) : {};
    const enabled = {};
    DEFAULT_CONTROL_ORDER.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        enabled[key] = !!source[key];
      } else {
        enabled[key] = DEFAULT_ENABLED[key];
      }
    });
    return enabled;
  }

  function normalizeOrder(cfg) {
    if (!cfg || typeof cfg !== "object" || !Array.isArray(cfg.order)) {
      return DEFAULT_CONTROL_ORDER.slice();
    }
    const seen = new Set();
    const order = [];
    cfg.order.forEach((key) => {
      const normalized = String(key || "").trim();
      if (DEFAULT_CONTROL_ORDER.includes(normalized) && !seen.has(normalized)) {
        seen.add(normalized);
        order.push(normalized);
      }
    });
    DEFAULT_CONTROL_ORDER.forEach((key) => {
      if (!seen.has(key)) {
        order.push(key);
      }
    });
    return order;
  }

  function normalizeThemeOptions(items) {
    const out = [];
    const seen = new Set();
    (Array.isArray(items) ? items : []).forEach((entry) => {
      const value = String(entry?.value || "").trim().toLowerCase();
      if (!/^[a-z][a-z0-9_-]{1,15}$/.test(value) || seen.has(value)) {
        return;
      }
      seen.add(value);
      out.push({
        value,
        label: entry?.label && typeof entry.label === "object"
          ? entry.label
          : { en: String(entry?.label || value), ro: String(entry?.label || value) },
        icon: String(entry.icon || `/images/ui/theme-${value}.svg`).trim()
      });
    });
    return out;
  }

  function normalizeThemeStyleOptions(items) {
    const out = [];
    const seen = new Set();
    (Array.isArray(items) ? items : []).forEach((entry) => {
      const value = String(entry?.value || "").trim().toLowerCase();
      if (!/^[a-z][a-z0-9_-]{1,15}$/.test(value) || seen.has(value)) {
        return;
      }
      seen.add(value);
      out.push({
        value,
        label: entry?.label && typeof entry.label === "object"
          ? entry.label
          : { en: String(entry?.label || value), ro: String(entry?.label || value) },
        css: String(entry.css || `styles-${value}.css`).trim()
      });
    });
    return out;
  }

  function normalizeLanguageOptions(items) {
    const out = [];
    const seen = new Set();
    (Array.isArray(items) ? items : []).forEach((entry) => {
      const code = String(entry?.code || "").trim().toLowerCase();
      if (!/^[a-z][a-z0-9_-]{1,15}$/.test(code) || seen.has(code)) {
        return;
      }
      seen.add(code);
      out.push({
        code,
        label: String(entry.label || code.toUpperCase()).trim(),
        file: String(entry.file || `/i18n/${code}.json`).trim(),
        icon: String(entry.icon || `/images/lang/${code}.svg`).trim()
      });
    });
    return out;
  }

  async function fetchJson(url) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return null;
      return await res.json();
    } catch (_) {
      return null;
    }
  }

  function cloneState() {
    return {
      theme: shared.state.theme,
      themeStyle: shared.state.themeStyle,
      fontSize: shared.state.fontSize,
      language: shared.state.language,
      themeOptions: shared.state.themeOptions.slice(),
      themeStyleOptions: shared.state.themeStyleOptions.slice(),
      languageOptions: shared.state.languageOptions.slice(),
      controls: {
        enabled: Object.assign({}, shared.state.controls.enabled),
        order: shared.state.controls.order.slice()
      }
    };
  }

  function t(key, params = {}) {
    const value = shared.translations[key] ?? shared.fallbackTranslations[key] ?? key;
    return String(value || "").replace(/\{([a-zA-Z0-9_]+)\}/g, (_, token) => {
      if (Object.prototype.hasOwnProperty.call(params, token)) {
        return String(params[token]);
      }
      return `{${token}}`;
    });
  }

  function currentThemeOption() {
    return shared.state.themeOptions.find((entry) => entry.value === shared.state.theme) || shared.state.themeOptions[0] || null;
  }

  function currentThemeStyleOption() {
    return shared.state.themeStyleOptions.find((entry) => entry.value === shared.state.themeStyle) || shared.state.themeStyleOptions[0] || null;
  }

  function currentLanguageOption() {
    return shared.state.languageOptions.find((entry) => entry.code === shared.state.language) || shared.state.languageOptions[0] || null;
  }

  function fontLabelKey(value) {
    if (value === "25") return "fontLegacy";
    if (value === "100") return "fontLarge";
    return "fontCurrent";
  }

  function pollLabel(value) {
    const normalized = String(value || "").trim().toLowerCase();
    const match = normalized.match(/^([0-9]+)h$/);
    const amount = match ? parseInt(match[1], 10) : 1;
    const unitKey = amount === 1 ? "hoursSingular" : "hoursPlural";
    return `${amount} ${t(unitKey)}`;
  }

  function buildHeaderControl(kind, controlsRoot) {
    const defs = {
      themeStyle: {
        labelId: "theme-style-label",
        toggleId: "theme-style-toggle",
        menuId: "theme-style-menu",
        selectId: "theme-style",
        currentLabelId: "theme-style-current-label",
        currentIconId: null,
        icon: "/images/ui/theme-style.svg",
        labelKey: "themeStyleMenuLabel",
        ariaLabelKey: "themeStyleOptions"
      },
      theme: {
        labelId: "theme-label",
        toggleId: "theme-toggle",
        menuId: "theme-menu",
        selectId: "theme",
        currentLabelId: "theme-current-label",
        currentIconId: "theme-current-icon",
        icon: null,
        labelKey: "themeMenuLabel",
        ariaLabelKey: "themeOptions"
      },
      fontSize: {
        labelId: "font-label",
        toggleId: "font-toggle",
        menuId: "font-menu",
        selectId: "font-size",
        currentLabelId: "font-current-label",
        currentIconId: null,
        icon: "/images/ui/font-size.svg",
        labelKey: "fontSize",
        ariaLabelKey: "fontSize"
      },
      pollInterval: {
        labelId: "poll-label",
        toggleId: "poll-toggle",
        menuId: "poll-menu",
        selectId: "poll-interval",
        currentLabelId: "poll-current-label",
        currentIconId: null,
        icon: "/images/ui/interval.svg",
        labelKey: "poll",
        ariaLabelKey: "pollInterval"
      },
      language: {
        labelId: "lang-label",
        toggleId: "lang-toggle",
        menuId: "lang-menu",
        selectId: "lang",
        currentLabelId: "lang-current-label",
        currentIconId: "lang-current-icon",
        icon: null,
        labelKey: "language",
        ariaLabelKey: "languageOptions"
      }
    }[kind];

    if (!defs) return null;

    let labelEl = document.getElementById(defs.labelId);
    let toggleEl = document.getElementById(defs.toggleId);
    let menuEl = document.getElementById(defs.menuId);
    let selectEl = document.getElementById(defs.selectId);
    let currentLabelEl = document.getElementById(defs.currentLabelId);
    let currentIconEl = defs.currentIconId ? document.getElementById(defs.currentIconId) : null;

    if (!labelEl && controlsRoot) {
      const wrapper = document.createElement("label");
      wrapper.className = "control";
      wrapper.setAttribute("data-header-control", kind);
      wrapper.setAttribute("for", defs.selectId);

      const dropdownClass = kind === "language" ? "lang-dropdown" : "theme-dropdown";
      const toggleClass = kind === "language" ? "lang-toggle" : "theme-toggle";
      const iconHtml = defs.currentIconId
        ? `<img id="${defs.currentIconId}" src="${defs.icon || "/images/ui/theme-auto.svg"}" alt="" />`
        : `<img src="${defs.icon || "/images/ui/theme-auto.svg"}" alt="" />`;

      wrapper.innerHTML = `
        <span id="${defs.labelId}"></span>
        <div class="${dropdownClass}" id="${kind}-dropdown">
          <button type="button" class="${toggleClass}" id="${defs.toggleId}" aria-haspopup="listbox" aria-expanded="false">
            ${iconHtml}
            <span id="${defs.currentLabelId}"></span>
          </button>
          <div class="${kind === "language" ? "lang-menu" : "theme-menu"}" id="${defs.menuId}" role="listbox"></div>
          <select id="${defs.selectId}" class="sr-only" tabindex="-1" aria-hidden="true"></select>
        </div>`;
      controlsRoot.appendChild(wrapper);

      labelEl = document.getElementById(defs.labelId);
      toggleEl = document.getElementById(defs.toggleId);
      menuEl = document.getElementById(defs.menuId);
      selectEl = document.getElementById(defs.selectId);
      currentLabelEl = document.getElementById(defs.currentLabelId);
      currentIconEl = defs.currentIconId ? document.getElementById(defs.currentIconId) : null;
    }

    if (!labelEl || !toggleEl || !menuEl || !selectEl || !currentLabelEl) {
      return null;
    }

    return { kind, defs, labelEl, toggleEl, menuEl, selectEl, currentLabelEl, currentIconEl };
  }

  function closeControl(control) {
    if (!control) return;
    closeDropdownMenu(control.menuEl, control.toggleEl);
  }

  function closeAllControls(exceptKind) {
    ["themeStyle", "theme", "fontSize", "pollInterval", "language"].forEach((kind) => {
      if (kind !== exceptKind) closeControl(shared.controls[kind]);
    });
  }

  function updateControlText(control) {
    if (!control) return;
    const { kind, selectEl, currentLabelEl, currentIconEl } = control;

    if (kind === "theme") {
      const picked = currentThemeOption();
      if (currentIconEl) currentIconEl.setAttribute("src", picked?.icon || "/images/ui/theme-auto.svg");
      currentLabelEl.textContent = picked ? (picked.label?.[shared.state.language] || picked.label?.en || picked.label?.ro || picked.value || "") : "";
      selectEl.value = shared.state.theme;
      return;
    }

    if (kind === "themeStyle") {
      const picked = currentThemeStyleOption();
      currentLabelEl.textContent = picked ? (picked.label?.[shared.state.language] || picked.label?.en || picked.label?.ro || picked.value || "") : "";
      selectEl.value = shared.state.themeStyle;
      return;
    }

    if (kind === "fontSize") {
      currentLabelEl.textContent = t(fontLabelKey(shared.state.fontSize));
      selectEl.value = shared.state.fontSize;
      return;
    }

    if (kind === "pollInterval") {
      currentLabelEl.textContent = pollLabel(shared.state.pollInterval);
      selectEl.value = shared.state.pollInterval;
      return;
    }

    if (kind === "language") {
      const picked = currentLanguageOption();
      if (currentIconEl) currentIconEl.setAttribute("src", picked?.icon || "/images/lang/en.svg");
      currentLabelEl.textContent = picked ? picked.label : "EN";
      selectEl.value = shared.state.language;
    }
  }

  function renderControlMenu(control) {
    if (!control) return;
    const { kind, menuEl, selectEl } = control;
    menuEl.innerHTML = "";
    selectEl.innerHTML = "";

    if (kind === "themeStyle") {
      shared.state.themeStyleOptions.forEach((item) => {
        const label = item.label?.[shared.state.language] || item.label?.en || item.label?.ro || item.value;
        const button = document.createElement("button");
        button.type = "button";
        button.className = "theme-item";
        button.setAttribute("role", "option");
        button.innerHTML = `<img src="/images/ui/theme-style.svg" alt="" /><span>${label}</span>`;
        button.addEventListener("click", async () => {
          closeControl(control);
          await setSetting("themeStyle", item.value);
        });
        menuEl.appendChild(button);

        const option = document.createElement("option");
        option.value = item.value;
        option.textContent = label;
        selectEl.appendChild(option);
      });
      updateControlText(control);
      return;
    }

    if (kind === "theme") {
      shared.state.themeOptions.forEach((item) => {
        const label = item.label?.[shared.state.language] || item.label?.en || item.label?.ro || item.value;
        const button = document.createElement("button");
        button.type = "button";
        button.className = "theme-item";
        button.setAttribute("role", "option");
        button.innerHTML = `<img src="${item.icon || "/images/ui/theme-auto.svg"}" alt="" /><span>${label}</span>`;
        button.addEventListener("click", async () => {
          closeControl(control);
          await setSetting("theme", item.value);
        });
        menuEl.appendChild(button);

        const option = document.createElement("option");
        option.value = item.value;
        option.textContent = label;
        selectEl.appendChild(option);
      });
      updateControlText(control);
      return;
    }

    if (kind === "fontSize") {
      FONT_ITEMS.forEach((item) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "theme-item";
        button.setAttribute("role", "option");
        button.setAttribute("data-font-size", item.value);
        button.innerHTML = `<img src="/images/ui/font-size.svg" alt="" /><span>${t(item.labelKey)}</span>`;
        button.addEventListener("click", async () => {
          closeControl(control);
          await setSetting("fontSize", item.value);
        });
        menuEl.appendChild(button);

        const option = document.createElement("option");
        option.value = item.value;
        option.textContent = t(item.labelKey);
        selectEl.appendChild(option);
      });
      updateControlText(control);
      return;
    }

    if (kind === "pollInterval") {
      POLL_ITEMS.forEach((item) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "theme-item";
        button.setAttribute("role", "option");
        button.setAttribute("data-poll-interval", item.value);
        button.innerHTML = `<img src="/images/ui/interval.svg" alt="" /><span>${pollLabel(item.value)}</span>`;
        button.addEventListener("click", async () => {
          closeControl(control);
          await setSetting("pollInterval", item.value);
        });
        menuEl.appendChild(button);

        const option = document.createElement("option");
        option.value = item.value;
        option.textContent = pollLabel(item.value);
        selectEl.appendChild(option);
      });
      updateControlText(control);
      return;
    }

    if (kind === "language") {
      shared.state.languageOptions.forEach((item) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "theme-item";
        button.setAttribute("role", "option");
        button.innerHTML = `<img src="${item.icon || "/images/lang/en.svg"}" alt="" /><span>${item.label}</span>`;
        button.addEventListener("click", async () => {
          closeControl(control);
          await setSetting("language", item.code);
        });
        menuEl.appendChild(button);

        const option = document.createElement("option");
        option.value = item.code;
        option.textContent = item.label;
        selectEl.appendChild(option);
      });
      updateControlText(control);
    }
  }

  function syncControlVisibility(rootEl) {
    const controlsRoot = rootEl.querySelector(".controls");
    if (!controlsRoot) return;
    const enabled = shared.state.controls.enabled;
    const order = shared.state.controls.order;
    const nodes = new Map();
    controlsRoot.querySelectorAll("[data-header-control]").forEach((el) => {
      nodes.set(el.getAttribute("data-header-control"), el);
    });

    nodes.forEach((el, key) => {
      el.style.display = enabled[key] === false ? "none" : "";
    });

    order.forEach((key) => {
      const el = nodes.get(key);
      if (el) controlsRoot.appendChild(el);
    });
  }

  function applyHeaderLabels() {
    Object.keys(shared.controls).forEach((key) => {
      const control = shared.controls[key];
      if (!control) return;
      control.labelEl.textContent = t(control.defs.labelKey);
      control.menuEl.setAttribute("aria-label", t(control.defs.ariaLabelKey));
      updateControlText(control);
    });
  }

  function applyBrand(rootEl) {
    if (!rootEl) return;
    const brand = String(rootEl.dataset.brand || "mikrotik").trim().toLowerCase();
    const brandText = rootEl.dataset.brandText || "";
    const brandVersion = rootEl.dataset.brandVersion || "";
    const subtitle = rootEl.dataset.subtitle || "";
    const brandImage = rootEl.dataset.brandImage || "";
    const mark = rootEl.querySelector(".brand-mikrotik-mark");
    if (brand !== "mikrotik" && mark) {
      const markSvg = brandImage
        ? `<img class="brand-custom-mark brand-${brand}-mark" src="${brandImage}" alt="${brandText || brand}" />`
        : brand === "share-manager"
        ? `<img class="brand-custom-mark brand-${brand}-mark" src="/share-manager-icon.svg" alt="Share Manager" />`
        : brand === "fancontrol"
        ? `<svg class="brand-custom-mark brand-${brand}-mark" viewBox="0 0 48 48" role="img" aria-label="Fancontrol"><circle cx="24" cy="24" r="4" fill="currentColor"/><path fill="currentColor" d="M24 21c-2-5-1-11 4-15 5 3 6 9 3 14-2 3-4 4-7 5Zm3 3c5-2 11-1 15 4-3 5-9 6-14 3-3-2-4-4-5-7Zm-3 0c-3 2-5 5-5 8-1 5 3 9 8 10 2-5 0-10-3-13Zm0-3c-3-2-6-3-9-2-5 1-7 6-6 11 5 1 10-2 12-5 2-3 3-4 3-4Zm0 3c2-3 3-6 2-9-1-5-6-7-11-6-1 5 2 10 5 12 2 2 4 3 4 3Z"/></svg>`
        : `<svg class="brand-custom-mark brand-${brand}-mark" viewBox="0 0 48 48" role="img" aria-label="${brand}"><path fill="none" stroke="currentColor" stroke-width="3" d="M14 7h20a3 3 0 0 1 3 3v28a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3Zm-1-4h8m6 0h8"/><path fill="currentColor" d="M27 12 17 27h7l-2 10 10-15h-7z"/></svg>`;
      mark.outerHTML = markSvg;
    }
    const textEl = rootEl.querySelector("#brand-text");
    const versionEl = rootEl.querySelector("#brand-version");
    const subtitleEl = rootEl.querySelector("#subtitle");
    if (textEl) textEl.textContent = brandText;
    if (versionEl) versionEl.textContent = brandVersion;
    if (subtitleEl) subtitleEl.textContent = subtitle;
  }

  function applyThemeToDom() {
    const theme = shared.state.theme === "auto"
      ? (root.matchMedia && root.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : shared.state.theme;
    document.documentElement.setAttribute("data-theme", theme);
  }

  function applyThemeStyleToDom() {
    const picked = currentThemeStyleOption();
    const link = document.getElementById("theme-style-css");
    const css = String(picked?.css || `styles-${shared.state.themeStyle}.css`).replace(/^\/+/, "");
    if (link) {
      try {
        const current = new URL(link.getAttribute("href") || css, document.baseURI);
        current.pathname = css.startsWith("/") ? css : `/${css}`;
        link.setAttribute("href", `${current.pathname}${current.search || ""}`);
      } catch (_) {
        link.setAttribute("href", `/${css}`);
      }
    }
    document.documentElement.setAttribute("data-theme-style", shared.state.themeStyle);
  }

  function applyFontSizeToDom() {
    const mode = ["25", "50", "100"].includes(shared.state.fontSize) ? shared.state.fontSize : "100";
    shared.state.fontSize = mode;
    document.documentElement.setAttribute("data-font-size", mode);
  }

  function applyLanguageToDom() {
    document.documentElement.lang = shared.state.language || "en";
  }

  async function saveSettings(patch) {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch || {})
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      return await res.json().catch(() => ({}));
    } catch (error) {
      try {
        const current = JSON.parse(root.localStorage?.getItem("mikrotik-ui-settings") || "{}");
        root.localStorage?.setItem("mikrotik-ui-settings", JSON.stringify(Object.assign(current, patch || {})));
        return { ok: true, local: true };
      } catch (_) {
        throw error;
      }
    }
  }

  function emitSettingChanged(key, value, previous) {
    const detail = {
      key,
      value,
      previous,
      state: cloneState()
    };
    root.dispatchEvent(new CustomEvent("mikrotik:header-setting-changed", { detail }));
  }

  async function setSetting(key, value) {
    const previous = shared.state[key];
    let next = value;

    if (key === "theme") {
      next = shared.state.themeOptions.some((entry) => entry.value === value) ? value : "auto";
      shared.state.theme = next;
      applyThemeToDom();
      updateControlText(shared.controls.theme);
    } else if (key === "themeStyle") {
      next = shared.state.themeStyleOptions.some((entry) => entry.value === value) ? value : "modern";
      shared.state.themeStyle = next;
      applyThemeStyleToDom();
      updateControlText(shared.controls.themeStyle);
    } else if (key === "fontSize") {
      next = ["25", "50", "100"].includes(value) ? value : "100";
      shared.state.fontSize = next;
      applyFontSizeToDom();
      updateControlText(shared.controls.fontSize);
    } else if (key === "pollInterval") {
      next = POLL_ITEMS.some((entry) => entry.value === value) ? value : "1h";
      shared.state.pollInterval = next;
      updateControlText(shared.controls.pollInterval);
    } else if (key === "language") {
      next = shared.state.languageOptions.some((entry) => entry.code === value) ? value : "en";
      shared.state.language = next;
      await loadTranslations(next);
      applyLanguageToDom();
      applyHeaderLabels();
      updateControlText(shared.controls.language);
      // Re-render option labels so the dropdowns stay aligned with the active language.
      renderAllMenus();
    } else {
      return;
    }

    await saveSettings({ [key === "themeStyle" ? "theme_style" : key === "fontSize" ? "font_size" : key === "pollInterval" ? "poll_interval" : key]: next });
    emitSettingChanged(key, next, previous);
  }

  function renderAllMenus() {
    Object.keys(shared.controls).forEach((key) => {
      renderControlMenu(shared.controls[key]);
    });
  }

  function bindListeners() {
    Object.keys(shared.controls).forEach((key) => {
      const control = shared.controls[key];
      if (!control) return;
      control.toggleEl.addEventListener("click", () => {
        closeAllControls(key);
        toggleDropdownMenu(control.menuEl, control.toggleEl, []);
      });
    });

    document.addEventListener("click", (event) => {
      Object.keys(shared.controls).forEach((key) => {
        const control = shared.controls[key];
        if (!control) return;
        const wrap = control.toggleEl.closest(".control") || control.toggleEl.parentElement;
        if (wrap && !wrap.contains(event.target)) {
          closeControl(control);
        }
      });
    });

    Object.keys(shared.controls).forEach((key) => {
      const control = shared.controls[key];
      if (!control) return;
      control.selectEl.addEventListener("change", async () => {
        await setSetting(key, control.selectEl.value);
      });
    });
  }

  async function loadHeaderControlsConfig() {
    const [localCfg, sharedCfg] = await Promise.all([
      fetchJson("header-controls.json?_=" + Date.now()),
      fetchJson("/common/header-controls.json?_=" + Date.now())
    ]);
    return Object.assign({}, sharedCfg || {}, localCfg || {});
  }

  async function loadRegistries() {
    const [themeOptions, themeStyleOptions, languageOptions] = await Promise.all([
      fetchJson("/common/theme-options.json?_=" + Date.now()),
      fetchJson("/common/theme-styles.json?_=" + Date.now()),
      fetchJson("/i18n/languages.json?_=" + Date.now())
    ]);

    shared.state.themeOptions = normalizeThemeOptions(themeOptions || []);
    shared.state.themeStyleOptions = normalizeThemeStyleOptions(themeStyleOptions || []);
    shared.state.languageOptions = normalizeLanguageOptions(languageOptions || []);
  }

  async function loadTranslations(language) {
    const requested = String(language || "en").trim().toLowerCase();
    const fallback = await fetchJson("/i18n/en.json?_=" + Date.now());
    const selected = requested === "en" ? {} : await fetchJson(`/i18n/${requested}.json?_=${Date.now()}`);
    shared.fallbackTranslations = fallback || {};
    shared.translations = selected && Object.keys(selected).length > 0
      ? selected
      : shared.fallbackTranslations;
  }

  function availableLanguageCode(code) {
    return shared.state.languageOptions.some((entry) => entry.code === code);
  }

  function detectBrowserLanguage() {
    const raw = [
      root.navigator?.language,
      ...(Array.isArray(root.navigator?.languages) ? root.navigator.languages : [])
    ].map((value) => String(value || "").trim().toLowerCase()).filter(Boolean);

    for (const candidate of raw) {
      const base = candidate.split("-")[0];
      if (base === "ro" && availableLanguageCode("ro")) {
        return "ro";
      }
      if (base === "en" && availableLanguageCode("en")) {
        return "en";
      }
    }

    if (availableLanguageCode("en")) {
      return "en";
    }
    if (availableLanguageCode("ro")) {
      return "ro";
    }
    return shared.state.languageOptions[0]?.code || "en";
  }

  async function loadSettings() {
    const result = await fetchJson("/api/settings.json?_=" + Date.now());
    const settings = result?.settings || result || {};
    try {
      Object.assign(settings, JSON.parse(root.localStorage?.getItem("mikrotik-ui-settings") || "{}"));
    } catch (_) {}

    const theme = String(settings.theme || "").trim().toLowerCase();
    shared.state.theme = shared.state.themeOptions.some((entry) => entry.value === theme) ? theme : (shared.state.themeOptions[0]?.value || "auto");

    const themeStyle = String(settings.theme_style || settings.themeStyle || "").trim().toLowerCase();
    shared.state.themeStyle = shared.state.themeStyleOptions.some((entry) => entry.value === themeStyle) ? themeStyle : (shared.state.themeStyleOptions[0]?.value || "modern");

    const fontSize = String(settings.font_size || settings.fontSize || "100").trim();
    shared.state.fontSize = ["25", "50", "100"].includes(fontSize) ? fontSize : "100";

    const requestedLanguage = String(settings.language || "").trim().toLowerCase();
    const browserLanguage = detectBrowserLanguage();
    if (availableLanguageCode(requestedLanguage)) {
      shared.state.language = requestedLanguage;
    } else {
      shared.state.language = browserLanguage;
    }

    const pollInterval = String(settings.poll_interval || settings.effective_poll_interval || "1h").trim().toLowerCase();
    shared.state.pollInterval = POLL_ITEMS.some((entry) => entry.value === pollInterval) ? pollInterval : "1h";
  }

  function applyStateToDom() {
    applyThemeToDom();
    applyThemeStyleToDom();
    applyFontSizeToDom();
    applyLanguageToDom();
    applyHeaderLabels();
  }

  async function initSharedHeader(rootEl) {
    if (!rootEl || rootEl.dataset.sharedHeaderRendered === "1") return;

    rootEl.innerHTML = HEADER_HTML;
    rootEl.dataset.sharedHeaderRendered = "1";
    applyBrand(rootEl);
    const controlsRoot = rootEl.querySelector(".controls");

    try {
      const cfg = await loadHeaderControlsConfig();
      shared.state.controls.enabled = normalizeEnabledMap(cfg);
      shared.state.controls.order = normalizeOrder(cfg);
    } catch (_) {
      shared.state.controls.enabled = normalizeEnabledMap({});
      shared.state.controls.order = normalizeOrder({});
    }

    shared.controls = {
      themeStyle: buildHeaderControl("themeStyle", controlsRoot),
      theme: buildHeaderControl("theme", controlsRoot),
      fontSize: buildHeaderControl("fontSize", controlsRoot),
      pollInterval: buildHeaderControl("pollInterval", controlsRoot),
      language: buildHeaderControl("language", controlsRoot)
    };

    syncControlVisibility(rootEl);
    await loadRegistries();
    await loadSettings().catch(() => {});
    await loadTranslations(shared.state.language).catch(() => {
      shared.translations = shared.fallbackTranslations || {};
    });
    applyStateToDom();
    renderAllMenus();
    bindListeners();
    shared.readyResolved = true;
    if (typeof shared.readyResolve === "function") {
      shared.readyResolve(shared);
      shared.readyResolve = null;
    }
    root.dispatchEvent(new CustomEvent("mikrotik:header-ready", { detail: cloneState() }));
  }

  function initAllSharedHeaders() {
    document.querySelectorAll("[data-mikrotik-header-root]").forEach((rootEl) => {
      initSharedHeader(rootEl);
    });
    if (!document.querySelector("[data-mikrotik-header-root]") && !shared.readyResolved && typeof shared.readyResolve === "function") {
      shared.readyResolved = true;
      shared.readyResolve(shared);
      shared.readyResolve = null;
    }
  }

  const shared = root.MikroTikSharedHeader || {};
  shared.ownsControls = true;
  shared.state = shared.state || {
    theme: "auto",
    themeStyle: "modern",
    fontSize: "100",
    language: "en",
    pollInterval: "1h",
    themeOptions: [],
    themeStyleOptions: [],
    languageOptions: [],
    controls: {
      enabled: normalizeEnabledMap({}),
      order: normalizeOrder({})
    }
  };
  shared.translations = shared.translations || {};
  shared.fallbackTranslations = shared.fallbackTranslations || {};
  shared.controls = shared.controls || {
    themeStyle: null,
    theme: null,
    fontSize: null,
    pollInterval: null,
    language: null
  };
  shared.readyResolved = false;
  shared.ready = new Promise((resolve) => {
    shared.readyResolve = resolve;
  });
  shared.whenReady = () => shared.ready;
  shared.getState = () => cloneState();
  shared.setSetting = setSetting;
  shared.renderAllMenus = renderAllMenus;
  shared.applyBrand = applyBrand;
  shared.loadHeaderControlsConfig = loadHeaderControlsConfig;
  shared.loadRegistries = loadRegistries;
  shared.loadTranslations = loadTranslations;
  shared.loadSettings = loadSettings;
  shared.t = t;

  root.MikroTikSharedHeader = shared;

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initAllSharedHeaders, { once: true });
    } else {
      initAllSharedHeaders();
    }
  }
})(typeof window !== "undefined" ? window : globalThis);
