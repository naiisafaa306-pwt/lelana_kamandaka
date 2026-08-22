/* ==========================================
   SCREEN 03 — PETA LELANA SCREEN CONTROLLER
   ========================================== */

import { MapEngine } from '../components/mapEngine.js';

let mapEngineInstance = null;

export function initMapScreen() {
  if (!mapEngineInstance) {
    mapEngineInstance = new MapEngine('map-canvas-wrapper', 'location-preview-card');
  }
  mapEngineInstance.renderPins();
}
