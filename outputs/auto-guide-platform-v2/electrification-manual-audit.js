/* Electrification audit: removes inferred procedures and mappings without direct manual evidence. */
(function applyElectrificationManualAudit() {
  const targetIds = new Set([
    'ev-charge-v2l',
    'plug-and-charge', 'iccu-energy-control', 'ev-route-planner',
    'battery-conditioning', 'scheduled-charging', 'charge-limit',
    'v2l-parent', 'v2l-indoor', 'v2l-outdoor',
    'ev-charge-status', 'ev-energy-usage', 'ev-battery-health',
    'i-pedal', 'ev-smart-regeneration', 'ev-regen-level',
    'nexo-h2-refuel', 'nexo-fcev-info', 'nexo-smart-regen',
    'fcev-energy-flow', 'fcev-dedicated-system',
    'hybrid-v2l', 'hybrid-smart-regen', 'hybrid-regen-level',
    'hybrid-energy-flow', 'hybrid-battery-status', 'hybrid-driving-info'
  ]);

  features.forEach(feature => {
    if (!targetIds.has(feature.id)) return;

    feature.verify = verify(false);
    feature.status = '공식 세부 절차 검증 필요';
    feature.preconditions = [];
    feature.settings = [];
    feature.steps = [];
    feature.disable = [];
    feature.limitations = [];
    feature.warnings = [];
    feature.applies = [];
    feature.updatedAt = '2026-06-25';
  });

  render();
})();
