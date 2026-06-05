/* =========================================================
   Schéma réseau interactif (page Projet intégratif).
   Survol / focus d'un nœud : surbrillance + panneau d'info.
   Bilingue : suit l'attribut lang de <html>.
   ========================================================= */
(function () {
  "use strict";

  const svg = document.getElementById("netDiagram");
  const panel = document.getElementById("diagramInfo");
  if (!svg || !panel) return;

  const data = {
    internet: {
      fr: { label: "Internet", desc: "Accès extérieur de l'entreprise vers le réseau public." },
      en: { label: "Internet", desc: "The company's external access to the public network." },
    },
    router: {
      fr: { label: "Routeur", desc: "Routeur / pare-feu : gère la connectivité externe et filtre le trafic entrant et sortant." },
      en: { label: "Router", desc: "Router / firewall: manages external connectivity and filters inbound and outbound traffic." },
    },
    switch: {
      fr: { label: "Switch", desc: "Cœur de réseau commuté, segmenté en VLAN par service pour isoler et sécuriser les flux." },
      en: { label: "Switch", desc: "Switched network core, segmented into per-service VLANs to isolate and secure traffic." },
    },
    win: {
      fr: { label: "Serveur AD", desc: "Serveur Windows avec Active Directory & DNS : gestion des utilisateurs, des groupes et des droits." },
      en: { label: "AD server", desc: "Windows server with Active Directory & DNS: users, groups and access-rights management." },
    },
    linux: {
      fr: { label: "Serveur Linux", desc: "Héberge les services réseau complémentaires (DHCP, web, partage de fichiers)." },
      en: { label: "Linux server", desc: "Hosts the additional network services (DHCP, web, file sharing)." },
    },
    toip: {
      fr: { label: "ToIP", desc: "Serveur de téléphonie sur IP pour la communication interne de l'entreprise." },
      en: { label: "VoIP", desc: "IP-telephony server for the company's internal communication." },
    },
    wifi: {
      fr: { label: "Wi-Fi", desc: "Point d'accès sans fil pour connecter les appareils mobiles au réseau." },
      en: { label: "Wi-Fi", desc: "Wireless access point connecting mobile devices to the network." },
    },
    clients: {
      fr: { label: "Postes", desc: "Postes clients des utilisateurs, répartis dans les VLAN selon leur service." },
      en: { label: "Workstations", desc: "User client workstations, distributed across VLANs by department." },
    },
  };

  const hints = {
    fr: "Survolez ou sélectionnez un élément pour voir son rôle.",
    en: "Hover or select an element to see its role.",
  };

  const lang = () => (document.documentElement.lang === "en" ? "en" : "fr");
  const nodes = svg.querySelectorAll(".node");

  function resetPanel() {
    panel.innerHTML = '<span class="diagram-hint"></span>';
    panel.querySelector(".diagram-hint").textContent = hints[lang()];
  }

  function showInfo(key) {
    const d = data[key] && data[key][lang()];
    if (!d) return;
    panel.innerHTML = "<strong></strong><span></span>";
    panel.querySelector("strong").textContent = d.label;
    panel.querySelector("span").textContent = d.desc;
  }

  function renderLabels() {
    nodes.forEach((n) => {
      const d = data[n.dataset.key];
      const label = n.querySelector(".node-label");
      if (d && label) label.textContent = d[lang()].label;
    });
    resetPanel();
  }

  nodes.forEach((n) => {
    const key = n.dataset.key;
    const activate = () => {
      svg.classList.add("has-active");
      nodes.forEach((o) => o.classList.toggle("active", o === n));
      showInfo(key);
    };
    const deactivate = () => {
      svg.classList.remove("has-active");
      n.classList.remove("active");
      resetPanel();
    };
    n.addEventListener("mouseenter", activate);
    n.addEventListener("focus", activate);
    n.addEventListener("mouseleave", deactivate);
    n.addEventListener("blur", deactivate);
    n.addEventListener("click", activate);
    n.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); }
    });
  });

  renderLabels();

  // Met à jour les libellés et le panneau quand la langue change
  new MutationObserver(renderLabels).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });
})();
