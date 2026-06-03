(function (root) {
  function closeDropdownMenu(menuEl, toggleEl) {
    if (menuEl) menuEl.classList.remove("open");
    if (toggleEl) toggleEl.setAttribute("aria-expanded", "false");
  }

  function toggleDropdownMenu(menuEl, toggleEl, closeFns = []) {
    if (!menuEl || !toggleEl) return;
    const open = menuEl.classList.toggle("open");
    toggleEl.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      closeFns.forEach((fn) => {
        try {
          fn();
        } catch (_) {}
      });
    }
  }

  root.MikroTikDropdownUtils = { closeDropdownMenu, toggleDropdownMenu };
  root.closeDropdownMenu = closeDropdownMenu;
  root.toggleDropdownMenu = toggleDropdownMenu;
})(typeof window !== "undefined" ? window : globalThis);
