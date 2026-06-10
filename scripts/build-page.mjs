import { readFileSync, writeFileSync } from "node:fs";

const sourcePath = "D:/下载/agent_vs_rpa_skill_marketplace_updated.md";
const markdown = readFileSync(sourcePath, "utf8");
const now = new Date().toISOString().slice(0, 10);

const html = String.raw`<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Agent 平台、RPA、应用市场与 Skill 的对比分析</title>
  <meta name="description" content="一份关于 Agent 平台、RPA、应用市场与 Skill 的交互式介绍网页。" />
  <style>
    :root {
      color-scheme: light;
      --ink: #101828;
      --muted: #667085;
      --soft: #f6f7fb;
      --line: rgba(16, 24, 40, .12);
      --panel: rgba(255, 255, 255, .82);
      --panel-strong: rgba(255, 255, 255, .94);
      --cyan: #12b5cb;
      --blue: #2563eb;
      --amber: #f59e0b;
      --green: #16a34a;
      --shadow: 0 24px 70px rgba(15, 23, 42, .14);
    }

    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      font-family: Inter, "SF Pro Display", "Segoe UI", "PingFang SC", "Microsoft YaHei", Arial, sans-serif;
      color: var(--ink);
      background:
        radial-gradient(circle at 18% 12%, rgba(18, 181, 203, .14), transparent 30%),
        radial-gradient(circle at 84% 6%, rgba(245, 158, 11, .18), transparent 26%),
        linear-gradient(180deg, #ffffff 0%, #f7f9fc 42%, #eef3f7 100%);
      line-height: 1.68;
    }

    a { color: #0f66d6; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .progress {
      position: fixed;
      inset: 0 0 auto;
      height: 3px;
      background: linear-gradient(90deg, var(--cyan), var(--blue), var(--amber));
      transform-origin: left;
      transform: scaleX(0);
      z-index: 50;
    }

    .shell { min-height: 100vh; }
    .topbar {
      position: sticky;
      top: 0;
      z-index: 30;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      padding: 14px clamp(18px, 4vw, 56px);
      border-bottom: 1px solid rgba(255,255,255,.45);
      background: rgba(255, 255, 255, .74);
      backdrop-filter: blur(18px);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 800;
      letter-spacing: 0;
      white-space: nowrap;
    }
    .brand-mark {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      background: conic-gradient(from 150deg, var(--cyan), var(--blue), var(--amber), var(--cyan));
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.68), 0 12px 26px rgba(18, 181, 203, .26);
    }

    .top-actions {
      display: flex;
      gap: 8px;
      align-items: center;
      min-width: 0;
    }
    .btn {
      border: 1px solid rgba(16, 24, 40, .12);
      background: #101828;
      color: white;
      border-radius: 999px;
      padding: 10px 14px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
    }
    .btn.secondary { background: rgba(255,255,255,.78); color: var(--ink); }

    .hero {
      position: relative;
      min-height: min(760px, 92vh);
      display: grid;
      grid-template-columns: minmax(360px, .78fr) minmax(520px, 1.22fr);
      gap: clamp(24px, 4vw, 60px);
      align-items: center;
      padding: clamp(58px, 7vw, 92px) clamp(18px, 5vw, 76px) 48px;
      overflow: hidden;
    }
    .hero::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, rgba(255,255,255,.94), rgba(255,255,255,.7) 44%, rgba(255,255,255,.1));
      pointer-events: none;
      z-index: 1;
    }
    .hero-media {
      position: absolute;
      inset: 0 0 auto auto;
      width: min(68vw, 980px);
      height: 100%;
      background: url("assets/ai-automation-hero.png") center / cover no-repeat;
      opacity: .95;
      filter: saturate(1.06) contrast(1.02);
    }
    .hero-copy,
    .hero-panel {
      position: relative;
      z-index: 2;
    }
    .hero-copy {
      max-width: 680px;
    }
    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 7px 10px;
      border: 1px solid rgba(18,181,203,.26);
      border-radius: 999px;
      background: rgba(255,255,255,.76);
      color: #075985;
      font-size: 13px;
      font-weight: 800;
    }
    .hero h1 {
      margin: 18px 0 18px;
      font-size: clamp(34px, 3.15vw, 48px);
      line-height: 1.12;
      letter-spacing: 0;
      max-width: min(100%, 11.5em);
      text-wrap: balance;
    }
    .hero-lede {
      max-width: 760px;
      color: #344054;
      font-size: clamp(17px, 2vw, 22px);
    }
    .hero-cta {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 26px;
    }
    .hero-panel {
      align-self: stretch;
      display: grid;
      align-content: end;
    }
    .metric-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      padding: 14px;
      border: 1px solid rgba(255,255,255,.66);
      border-radius: 22px;
      background: rgba(255,255,255,.66);
      backdrop-filter: blur(18px);
      box-shadow: var(--shadow);
    }
    .metric {
      min-height: 94px;
      padding: 14px 16px;
      border: 1px solid var(--line);
      border-radius: 14px;
      background: var(--panel-strong);
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .metric b { display: block; font-size: 20px; line-height: 1.18; }
    .metric span { display: block; margin-top: 7px; color: var(--muted); font-size: 13px; line-height: 1.45; }

    .layout {
      display: grid;
      grid-template-columns: 290px minmax(0, 1fr);
      gap: 28px;
      padding: 22px clamp(18px, 4vw, 56px) 72px;
      max-width: 1540px;
      margin: 0 auto;
      transition: grid-template-columns .24s ease, gap .24s ease;
    }
    .layout.toc-collapsed {
      grid-template-columns: 56px minmax(0, 1fr);
      gap: 16px;
    }
    .toc {
      position: sticky;
      top: 78px;
      align-self: start;
      max-height: calc(100vh - 94px);
      overflow: auto;
      padding: 16px;
      border: 1px solid var(--line);
      border-radius: 18px;
      background: rgba(255,255,255,.74);
      backdrop-filter: blur(18px);
      box-shadow: 0 16px 50px rgba(15,23,42,.07);
      transition: padding .24s ease, border-radius .24s ease;
    }
    .toc-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    .toc h2 {
      margin: 0 0 10px;
      font-size: 13px;
      text-transform: uppercase;
      color: var(--muted);
    }
    .toc-head h2 { margin: 0; }
    .toc-toggle {
      width: 28px;
      height: 28px;
      border: 1px solid rgba(16,24,40,.1);
      border-radius: 999px;
      background: rgba(255,255,255,.96);
      color: #344054;
      font-size: 16px;
      line-height: 1;
      cursor: pointer;
    }
    .toc a {
      display: block;
      padding: 8px 10px;
      border-radius: 10px;
      color: #344054;
      font-size: 14px;
      font-weight: 750;
      line-height: 1.35;
    }
    .toc a.active,
    .toc a:hover {
      background: rgba(18,181,203,.1);
      color: #075985;
      text-decoration: none;
    }
    .layout.toc-collapsed .toc {
      padding: 12px 10px;
      border-radius: 16px;
      overflow: hidden;
    }
    .layout.toc-collapsed .toc-head {
      justify-content: center;
    }
    .layout.toc-collapsed .toc h2,
    .layout.toc-collapsed #toc {
      display: none;
    }

    .content {
      min-width: 0;
    }
    .feature-strip {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      margin-bottom: 18px;
    }
    .feature {
      border: 1px solid var(--line);
      border-radius: 18px;
      padding: 18px;
      background: rgba(255,255,255,.78);
      box-shadow: 0 16px 40px rgba(15,23,42,.06);
    }
    .feature strong { display: block; font-size: 15px; }
    .feature span { display: block; margin-top: 6px; color: var(--muted); font-size: 13px; }

    .switcher {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin: 18px 0 22px;
    }
    .switch-card {
      border: 1px solid var(--line);
      border-radius: 20px;
      overflow: hidden;
      background: rgba(255,255,255,.83);
      box-shadow: 0 18px 46px rgba(15,23,42,.08);
    }
    .switch-card img {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
    }
    .switch-card div { padding: 18px; }
    .switch-card h3 { margin: 0 0 6px; font-size: 20px; }
    .switch-card p { margin: 0; color: var(--muted); }

    .decision-3d {
      margin: 22px 0 24px;
      border: 1px solid var(--line);
      border-radius: 24px;
      background: rgba(255,255,255,.9);
      box-shadow: var(--shadow);
      overflow: hidden;
    }
    .decision-head {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 14px;
      align-items: end;
      padding: clamp(20px, 3vw, 30px);
      border-bottom: 1px solid rgba(16,24,40,.08);
      background: linear-gradient(135deg, rgba(18,181,203,.1), rgba(245,158,11,.1));
    }
    .decision-head h2 {
      margin: 0;
      font-size: clamp(24px, 3vw, 36px);
      line-height: 1.15;
      letter-spacing: 0;
    }
    .decision-head p {
      margin: 8px 0 0;
      max-width: 820px;
      color: #344054;
    }
    .decision-score {
      min-width: 160px;
      padding: 14px 16px;
      border: 1px solid rgba(16,24,40,.1);
      border-radius: 16px;
      background: rgba(255,255,255,.82);
      text-align: right;
    }
    .decision-score b {
      display: block;
      font-size: 26px;
      line-height: 1;
    }
    .decision-score span {
      color: var(--muted);
      font-size: 13px;
    }
    .decision-body {
      display: grid;
      grid-template-columns: minmax(280px, .46fr) minmax(0, .54fr);
      gap: 0;
      min-height: 580px;
      align-items: stretch;
    }
    .decision-panel {
      display: flex;
      flex-direction: column;
      padding: clamp(20px, 3vw, 30px);
      height: 900px;
      min-height: 580px;
      max-height: 900px;
      overflow: hidden;
      border-right: 1px solid rgba(16,24,40,.08);
    }
    .panel-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .decision-panel h3,
    .legend-panel h3 {
      margin: 0 0 12px;
      font-size: 16px;
      color: #12263f;
    }
    .panel-head h3 { margin: 0; }
    .dimension-summary {
      margin: 10px 0 0;
      color: #667085;
      font-size: 12px;
      line-height: 1.45;
    }
    .dimension-drawer {
      position: relative;
      flex: 1 1 auto;
      min-height: 0;
      overflow: auto;
      padding-right: 6px;
      opacity: 1;
      transition: opacity .2s ease;
    }
    .dimension-drawer::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 78px;
      background: linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,.92) 62%, rgba(255,255,255,1));
      pointer-events: none;
    }
    .dimension-list {
      display: grid;
      gap: 10px;
      margin-top: 14px;
    }
    .dimension-item {
      display: grid;
      grid-template-columns: 76px minmax(0, 1fr) 42px 42px 52px;
      gap: 9px;
      align-items: center;
      padding: 10px;
      border: 1px solid rgba(16,24,40,.09);
      border-radius: 12px;
      background: #fff;
      font-size: 13px;
    }
    .dimension-item strong { color: #12263f; }
    .meter {
      display: grid;
      gap: 5px;
    }
    .meter-line {
      position: relative;
      height: 8px;
      border-radius: 999px;
      background: rgba(16,24,40,.08);
      overflow: hidden;
    }
    .meter-line::before {
      content: "";
      position: absolute;
      inset: 0 auto 0 0;
      width: calc(var(--value, 50) * 10%);
      border-radius: inherit;
      background: var(--color, #2563eb);
    }
    .meter-line.rpa { --color: #2563eb; }
    .meter-line.agent { --color: #f59e0b; }
    .meter-line.hybrid { --color: #16a34a; }
    .score-pill {
      display: inline-flex;
      justify-content: center;
      padding: 2px 0;
      border-radius: 999px;
      background: rgba(248,250,252,.95);
      font-weight: 700;
    }
    .score-pill.rpa { color: #1d4ed8; }
    .score-pill.agent { color: #b45309; }
    .score-pill.hybrid { color: #15803d; }
    .meter-note {
      margin-top: 4px;
      color: #667085;
      font-size: 11px;
    }
    .scenario-cards {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
      margin-top: 18px;
    }
    .scenario-card {
      padding: 13px;
      border: 1px solid rgba(16,24,40,.09);
      border-radius: 14px;
      background: #f8fafc;
    }
    .scenario-card strong { display: block; font-size: 14px; color: #12263f; }
    .scenario-card span { display: block; margin-top: 6px; color: var(--muted); font-size: 12px; line-height: 1.45; }
    .chart-shell {
      position: relative;
      height: 900px;
      min-height: 580px;
      max-height: 900px;
      overflow: auto;
      background:
        linear-gradient(180deg, rgba(248,250,252,.75), rgba(255,255,255,.96)),
        radial-gradient(circle at 70% 20%, rgba(18,181,203,.16), transparent 30%);
    }
    .decision-route {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
      padding: 16px 16px 0;
      position: relative;
      z-index: 2;
    }
    .route-card {
      padding: 12px 13px;
      border: 1px solid rgba(16,24,40,.09);
      border-radius: 14px;
      background: rgba(255,255,255,.76);
      backdrop-filter: blur(10px);
      box-shadow: 0 10px 24px rgba(15,23,42,.06);
    }
    .route-card strong {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 14px;
      color: #12263f;
    }
    .route-card span {
      display: block;
      margin-top: 5px;
      color: var(--muted);
      font-size: 12px;
      line-height: 1.42;
    }
    .combo-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      padding: 10px 16px 0;
      position: relative;
      z-index: 2;
    }
    .combo-card {
      padding: 11px 12px;
      border: 1px solid rgba(16,24,40,.09);
      border-radius: 14px;
      background: rgba(255,255,255,.78);
      box-shadow: 0 10px 22px rgba(15,23,42,.05);
    }
    .combo-card strong {
      display: block;
      color: #12263f;
      font-size: 13px;
      line-height: 1.35;
    }
    .combo-card span {
      display: block;
      margin-top: 4px;
      color: var(--muted);
      font-size: 12px;
      line-height: 1.38;
    }
    .combo-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-top: 8px;
    }
    .combo-tags b {
      padding: 2px 7px;
      border-radius: 999px;
      background: rgba(15,23,42,.06);
      color: #475467;
      font-size: 11px;
      line-height: 1.45;
    }
    .combo-card.rpa { border-color: rgba(37,99,235,.22); }
    .combo-card.agent { border-color: rgba(245,158,11,.26); }
    .combo-card.hybrid { border-color: rgba(22,163,74,.24); }
    .combo-card.rpa .combo-tags b { background: rgba(37,99,235,.1); color: #1d4ed8; }
    .combo-card.agent .combo-tags b { background: rgba(245,158,11,.16); color: #b45309; }
    .combo-card.hybrid .combo-tags b { background: rgba(22,163,74,.1); color: #15803d; }
    #automation3dCanvas {
      display: block;
      width: 100%;
      height: 480px;
      min-height: 480px;
    }
    .chart-hint {
      position: absolute;
      left: 18px;
      bottom: 16px;
      max-width: min(420px, calc(100% - 36px));
      padding: 10px 12px;
      border: 1px solid rgba(16,24,40,.1);
      border-radius: 12px;
      background: rgba(255,255,255,.82);
      color: #344054;
      font-size: 12px;
      backdrop-filter: blur(12px);
    }
    .legend-panel {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 224px;
      max-width: calc(100% - 32px);
      padding: 10px;
      border: 1px solid rgba(16,24,40,.1);
      border-radius: 16px;
      background: rgba(255,255,255,.86);
      backdrop-filter: blur(12px);
      box-shadow: 0 16px 40px rgba(15,23,42,.08);
      cursor: grab;
      user-select: none;
      z-index: 4;
    }
    .legend-panel.dragging { cursor: grabbing; }
    .legend-panel.collapsed {
      width: auto;
      min-width: 94px;
      padding: 8px 10px;
      border-radius: 999px;
    }
    .legend-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    .legend-title h3 {
      margin: 0;
    }
    .legend-toggle {
      width: 24px;
      height: 24px;
      border: 1px solid rgba(16,24,40,.12);
      border-radius: 999px;
      background: #fff;
      color: #344054;
      font-weight: 800;
      line-height: 1;
      cursor: pointer;
    }
    .legend-content {
      margin-top: 8px;
    }
    .legend-panel.collapsed .legend-content {
      display: none;
    }
    .legend-row {
      display: grid;
      grid-template-columns: 12px minmax(0, 1fr) auto;
      gap: 8px;
      align-items: center;
      margin: 8px 0;
      color: #344054;
      font-size: 13px;
    }
    .swatch {
      width: 12px;
      height: 12px;
      border-radius: 4px;
    }
    .swatch.rpa { background: #2563eb; }
    .swatch.agent { background: #f59e0b; }
    .swatch.hybrid { background: #16a34a; }
    .best-badge {
      display: inline-flex;
      justify-content: center;
      min-width: 44px;
      padding: 2px 6px;
      border-radius: 999px;
      background: rgba(22,163,74,.1);
      color: #15803d;
      font-weight: 800;
      font-size: 12px;
      line-height: 1.45;
    }
    .best-badge.rpa { background: rgba(37,99,235,.1); color: #1d4ed8; }
    .best-badge.agent { background: rgba(245,158,11,.16); color: #b45309; }
    .best-badge.hybrid { background: rgba(22,163,74,.12); color: #15803d; }
    .choice-note {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid rgba(16,24,40,.08);
      color: var(--muted);
      font-size: 12px;
      line-height: 1.45;
    }

    .doc {
      border: 1px solid var(--line);
      border-radius: 24px;
      background: rgba(255,255,255,.86);
      box-shadow: var(--shadow);
      overflow: hidden;
    }
    .doc-toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 14px 18px;
      border-bottom: 1px solid var(--line);
      background: rgba(248,250,252,.82);
    }
    .chips { display: flex; gap: 8px; flex-wrap: wrap; }
    .chip {
      border: 1px solid var(--line);
      border-radius: 999px;
      background: white;
      color: #344054;
      padding: 8px 11px;
      font-weight: 700;
      cursor: pointer;
    }
    .chip.active { background: #101828; color: white; }
    .read-time { color: var(--muted); font-size: 13px; }

    .article {
      padding: clamp(24px, 4vw, 48px);
    }
    .article section {
      scroll-margin-top: 92px;
      padding: 34px 0;
      border-top: 1px solid rgba(16,24,40,.08);
    }
    .article section:first-child { border-top: 0; padding-top: 0; }
    .article h2 {
      margin: 0 0 16px;
      font-size: clamp(26px, 3.5vw, 42px);
      line-height: 1.12;
      letter-spacing: 0;
    }
    .article h3 {
      margin: 28px 0 12px;
      font-size: clamp(20px, 2.3vw, 28px);
      line-height: 1.2;
      padding-left: 14px;
      border-left: 4px solid var(--cyan);
      color: #12263f;
    }
    .article h4 {
      margin: 24px 0 10px;
      font-size: 18px;
      line-height: 1.3;
      color: #12344d;
    }
    .article p { margin: 12px 0; color: #344054; }
    .article blockquote {
      margin: 18px 0;
      padding: 18px 20px;
      border-left: 4px solid var(--cyan);
      border-radius: 0 16px 16px 0;
      background: rgba(18,181,203,.08);
      color: #164e63;
    }
    .article pre {
      overflow: auto;
      padding: 18px 20px;
      border: 1px solid rgba(18,181,203,.18);
      border-left: 4px solid var(--cyan);
      border-radius: 16px;
      background:
        linear-gradient(135deg, rgba(18,181,203,.1), rgba(37,99,235,.04)),
        #f8fbff;
      color: #243b53;
      line-height: 1.75;
      white-space: pre-wrap;
      word-break: break-word;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.72);
    }
    .article code {
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
      font-size: .94em;
    }
    .article pre code {
      color: inherit;
      white-space: inherit;
    }
    .section-hero-image {
      margin: 10px 0 26px;
      overflow: hidden;
      border: 1px solid rgba(16,24,40,.1);
      border-radius: 18px;
      background: white;
      box-shadow: 0 18px 46px rgba(15,23,42,.08);
    }
    .section-hero-image img {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
    }
    .section-hero-image figcaption {
      padding: 12px 16px;
      color: var(--muted);
      font-size: 13px;
      border-top: 1px solid rgba(16,24,40,.08);
    }
    .article :not(pre) > code {
      padding: 2px 6px;
      border-radius: 6px;
      background: rgba(15,23,42,.08);
      color: #0f172a;
    }
    .article ul, .article ol { padding-left: 1.2rem; color: #344054; }
    .article li { margin: 5px 0; }
    .table-wrap {
      overflow: auto;
      margin: 18px 0;
      border: 1px solid rgba(16,24,40,.11);
      border-radius: 16px;
      background: white;
    }
    table { width: 100%; border-collapse: collapse; min-width: 680px; }
    th, td {
      padding: 13px 14px;
      border-bottom: 1px solid rgba(16,24,40,.08);
      text-align: left;
      vertical-align: top;
    }
    th {
      position: sticky;
      top: 0;
      background: #f8fafc;
      color: #0f172a;
      font-size: 13px;
    }
    tr:hover td { background: rgba(18,181,203,.05); }
    mark {
      background: rgba(245,158,11,.28);
      border-radius: 4px;
      padding: 0 2px;
    }
    .section-actions {
      display: flex;
      gap: 8px;
      margin: 8px 0 14px;
    }
    .mini {
      border: 1px solid var(--line);
      border-radius: 999px;
      background: white;
      padding: 7px 10px;
      color: #344054;
      cursor: pointer;
    }
    section.collapsed > *:not(h2):not(.section-actions) { display: none; }

    .empty {
      display: none;
      padding: 50px;
      text-align: center;
      color: var(--muted);
    }
    .footer {
      padding: 28px clamp(18px, 4vw, 56px) 52px;
      color: var(--muted);
      text-align: center;
    }

    @media (max-width: 1080px) {
      .hero { grid-template-columns: 1fr; }
      .hero-panel { align-self: auto; }
      .layout { grid-template-columns: 1fr; }
      .toc { position: relative; top: auto; max-height: 260px; }
      .feature-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .decision-body { grid-template-columns: 1fr; }
      .decision-panel { border-right: 0; border-bottom: 1px solid rgba(16,24,40,.08); }
    }
    @media (max-width: 720px) {
      .topbar { align-items: stretch; flex-direction: column; }
      .top-actions { width: 100%; justify-content: flex-end; }
      .hero {
        min-height: auto;
        padding-top: 38px;
      }
      .hero h1 {
        font-size: clamp(32px, 8.5vw, 42px);
        max-width: 12em;
      }
      .hero-media { width: 100%; opacity: .34; }
      .hero::before { background: rgba(255,255,255,.82); }
      .metric-grid,
      .feature-strip,
      .switcher { grid-template-columns: 1fr; }
      .decision-head { grid-template-columns: 1fr; }
      .decision-score { text-align: left; }
      .dimension-item { grid-template-columns: 70px minmax(0, 1fr); }
      .dimension-item span { font-size: 12px; }
      .scenario-cards { grid-template-columns: 1fr; }
      .legend-panel { position: static; width: auto; margin: 14px; }
      #automation3dCanvas,
      .chart-shell { min-height: 520px; }
      .article { padding: 22px; }
    }
  </style>
</head>
<body>
  <div class="progress" id="progress"></div>
  <div class="shell">
    <header class="topbar">
      <div class="brand"><span class="brand-mark" aria-hidden="true"></span><span>Agent × RPA Insight</span></div>
      <div class="top-actions">
        <button class="btn" id="exportMarkdown" type="button">导出 MD</button>
      </div>
    </header>

    <main>
      <section class="hero">
        <div class="hero-media" aria-hidden="true"></div>
        <div class="hero-copy">
          <span class="eyebrow">AI 自动化商业化分析 · ${now}</span>
          <h1>Agent 平台、RPA、应用市场与 Skill 的对比分析</h1>
          <div class="hero-cta">
            <a class="btn" href="#article">阅读完整分析</a>
            <a class="btn secondary" href="#compare">查看核心对比</a>
          </div>
        </div>
        <aside class="hero-panel" aria-label="页面摘要">
          <div class="metric-grid">
            <div class="metric"><b>17 个完整章节</b><span>保留原文主体内容</span></div>
            <div class="metric"><b>5 个核心问题</b><span>覆盖区别、稳定性、市场、Skill 与替代关系</span></div>
            <div class="metric"><b>3 类交互方式</b><span>支持搜索、目录点选与章节切换</span></div>
            <div class="metric"><b>1 个关键结论</b><span>RPA 会被 Agent 平台化，而非简单消失</span></div>
          </div>
        </aside>
      </section>

      <div class="layout">
        <nav class="toc" aria-label="章节目录">
          <div class="toc-head">
            <h2>目录</h2>
            <button class="toc-toggle" id="tocToggle" type="button" aria-expanded="true" aria-label="隐藏目录">-</button>
          </div>
          <div id="toc"></div>
        </nav>

        <div class="content">
          <section class="feature-strip" id="compare" aria-label="核心摘要">
            <div class="feature"><strong>RPA</strong><span>固定流程执行器，擅长确定、重复、低异常任务。</span></div>
            <div class="feature"><strong>Agent</strong><span>目标理解、任务规划、工具编排与自动化资产生成器。</span></div>
            <div class="feature"><strong>Skill</strong><span>Agent 的可复用能力模块，让经验沉淀为方法包。</span></div>
            <div class="feature"><strong>Marketplace</strong><span>把场景化自动化能力做成可分发、可维护、可收费的产品。</span></div>
          </section>

          <section class="switcher" aria-label="内容配图">
            <article class="switch-card">
              <img src="assets/agent-skill-workflow.png" alt="Agent 应用由 Skill、Tool 与 Workflow 组成的产品化结构图" />
              <div>
                <h3>Agent 应用不是一堆 Skill</h3>
                <p>它还需要 Tool、Workflow、权限、日志、计费、审核与交付界面。</p>
              </div>
            </article>
            <article class="switch-card">
              <img src="assets/rpa-execution-layer.png" alt="RPA 作为稳定执行层连接桌面、浏览器、API 与审计日志" />
              <div>
                <h3>RPA 更像确定性执行层</h3>
                <p>在老系统、强审计、低容错流程里，RPA 很可能继续长期存在。</p>
              </div>
            </article>
          </section>

          <section class="decision-3d" id="decision-3d" aria-labelledby="decision3dTitle">
            <div class="decision-head">
              <div>
                <h2 id="decision3dTitle">Agent 与 RPA 自动化选择球状 3D 仪表盘</h2>
              </div>
              <div class="decision-score" aria-label="综合建议">
                <b>Hybrid</b>
                <span>综合最优：Agent 编排 + RPA 执行</span>
              </div>
            </div>
            <div class="decision-body">
              <aside class="decision-panel" aria-label="评分维度">
                <div class="panel-head">
                  <h3>维度评分</h3>
                </div>
                <p class="dimension-summary">滚动查看全部评分与场景建议，首屏优先保留路线卡和 3D 球图。</p>
                <div class="dimension-drawer" id="dimensionDrawer">
                  <div class="dimension-list" id="dimensionList"></div>
                  <div class="scenario-cards" aria-label="场景选择建议">
                    <div class="scenario-card">
                      <strong>选 RPA</strong>
                      <span>流程固定、页面稳定、低容错、强审计、批量重复。</span>
                    </div>
                    <div class="scenario-card">
                      <strong>选 Agent</strong>
                      <span>目标模糊、信息非结构化、需要判断、生成或跨系统规划。</span>
                    </div>
                    <div class="scenario-card">
                      <strong>选混合</strong>
                      <span>高价值流程：Agent 做判断和维护，脚本/API/RPA 做确定性执行。</span>
                    </div>
                  </div>
                </div>
              </aside>
              <div class="chart-shell">
                <div class="decision-route" aria-label="快速选择路线">
                  <div class="route-card">
                    <strong><span class="swatch rpa"></span>RPA 优先</strong>
                    <span>固定页面、批量重复、强审计、低运行成本。</span>
                  </div>
                  <div class="route-card">
                    <strong><span class="swatch agent"></span>Agent 优先</strong>
                    <span>需求模糊、变化频繁、需要判断、分析或生成。</span>
                  </div>
                  <div class="route-card">
                    <strong><span class="swatch hybrid"></span>默认混合</strong>
                    <span>Agent 做理解和维护，RPA/API/脚本做稳定执行。</span>
                  </div>
                </div>
                <div class="combo-grid" aria-label="维度组合推荐">
                  <article class="combo-card rpa">
                    <strong>低成本 + 稳定运行 + 治理审计 → RPA</strong>
                    <span>适合财务录入、报表下载、老系统搬运这类低变化流程。</span>
                    <div class="combo-tags"><b>经济成本</b><b>稳定运行</b><b>治理审计</b></div>
                  </article>
                  <article class="combo-card agent">
                    <strong>需求变化 + 判断生成 + 未来扩展 → Agent</strong>
                    <span>适合分析归因、内容生成、跨系统规划和脚本生成。</span>
                    <div class="combo-tags"><b>需求适配</b><b>学习成本</b><b>未来发展</b></div>
                  </article>
                  <article class="combo-card hybrid">
                    <strong>复杂判断 + 强执行 + 可审计 → 混合</strong>
                    <span>Agent 负责理解和维护，RPA/API/脚本负责确定性执行。</span>
                    <div class="combo-tags"><b>执行效率</b><b>稳定运行</b><b>治理审计</b></div>
                  </article>
                  <article class="combo-card hybrid">
                    <strong>重复使用 + 场景变化 → Skill 化工作流</strong>
                    <span>把 Agent 能力沉淀为 Skill，再接执行器，适合应用市场化。</span>
                    <div class="combo-tags"><b>重复使用</b><b>需求场景</b><b>应用市场</b></div>
                  </article>
                </div>
                <canvas id="automation3dCanvas" aria-label="Agent、RPA 与混合自动化方案的三维对比图"></canvas>
                <div class="legend-panel collapsed" id="chartLegend" aria-label="图例">
                  <div class="legend-title">
                    <h3>图例</h3>
                    <button class="legend-toggle" id="legendToggle" type="button" aria-label="展开图例">+</button>
                  </div>
                  <div class="legend-content">
                    <div class="legend-row"><span class="swatch rpa"></span><span>RPA</span><b>确定性执行</b></div>
                    <div class="legend-row"><span class="swatch agent"></span><span>Agent</span><b>理解与编排</b></div>
                    <div class="legend-row"><span class="swatch hybrid"></span><span>Hybrid</span><b>综合落地</b></div>
                    <div class="choice-note">球面经纬线表示决策空间，维度点绕球体分布；轨迹越靠外，代表该方案越适合承担该维度的自动化价值。</div>
                  </div>
                </div>
                <div class="chart-hint">可拖拽旋转球体。外圈越饱满，代表方案综合能力越均衡。</div>
              </div>
            </div>
          </section>

          <article class="doc" id="article">
            <div class="doc-toolbar">
              <div class="chips">
                <button class="chip active" data-locate="Agent 平台、RPA、应用市场与 Skill 的对比分析" type="button">导读</button>
                <button class="chip" data-locate="Agent 平台与传统 RPA 的核心区别" type="button">Agent</button>
                <button class="chip" data-locate="哪些场景适合 RPA" type="button">RPA</button>
                <button class="chip" data-locate="Agent 应用市场能否理解为 Skill 市场" type="button">Skill</button>
                <button class="chip" data-locate="八爪鱼 RPA 应用市场是否是 RPA 的优势" type="button">应用市场</button>
              </div>
              <span class="read-time" id="readTime"></span>
            </div>
            <div class="article" id="articleBody"></div>
            <div class="empty" id="empty">没有匹配的章节，换个关键词试试。</div>
          </article>
        </div>
      </div>
    </main>

    <footer class="footer">原始内容来自：D:/下载/agent_vs_rpa_skill_marketplace_updated.md · 页面已完整嵌入原文并增强交互。</footer>
  </div>

  <script id="sourceMarkdown" type="application/json">${JSON.stringify(markdown)}</script>
  <script>
    const source = JSON.parse(document.getElementById("sourceMarkdown").textContent);
    const toc = document.getElementById("toc");
    const articleBody = document.getElementById("articleBody");
    const empty = document.getElementById("empty");
    const progress = document.getElementById("progress");
    const readTime = document.getElementById("readTime");
    const automationDimensions = [
      { label: "经济成本", rpa: 8.2, agent: 5.8, hybrid: 8.5, note: "RPA 低频模型成本；Agent 降低开发人力，混合更均衡" },
      { label: "学习成本", rpa: 6.4, agent: 8.4, hybrid: 7.8, note: "Agent 自然语言入口更低，RPA 需理解流程与选择器" },
      { label: "执行效率", rpa: 8.7, agent: 7.6, hybrid: 9.1, note: "固定批量任务 RPA 快，复杂任务混合效率最高" },
      { label: "需求适配", rpa: 5.6, agent: 9.0, hybrid: 9.2, note: "需求越模糊、变化越多，Agent 越占优" },
      { label: "未来发展", rpa: 6.2, agent: 9.4, hybrid: 9.6, note: "Agent 会吸收 RPA 为确定性执行层" },
      { label: "重复使用", rpa: 8.6, agent: 8.1, hybrid: 9.3, note: "RPA 模板强，Agent Skill 与 Workflow 更易扩展" },
      { label: "治理审计", rpa: 9.0, agent: 6.6, hybrid: 8.8, note: "高风险流程仍需确定性日志、审批与权限边界" },
      { label: "维护弹性", rpa: 5.7, agent: 8.8, hybrid: 9.0, note: "Agent 能读日志、改脚本、生成测试，降低维护成本" },
      { label: "稳定运行", rpa: 9.1, agent: 6.8, hybrid: 9.0, note: "裸 Agent 不稳，脚本/API/RPA 执行层稳定" }
    ];

    function escapeHtml(value) {
      return value.replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[char]));
    }

    function inline(text) {
      let html = escapeHtml(text);
      html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
      html = html.replace(/\`([^\`]+)\`/g, "<code>$1</code>");
      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
      return html;
    }

    function slugify(text, index) {
      return "sec-" + index + "-" + text.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 42);
    }

    function displayTitle(title) {
      return title.replace(/^0\.\s*/, "");
    }

    function parseBlocks(lines) {
      const out = [];
      let i = 0;
      while (i < lines.length) {
        const line = lines[i];
        if (!line.trim()) { i++; continue; }

        if (line.startsWith("\`\`\`")) {
          const lang = line.slice(3).trim();
          const code = [];
          i++;
          while (i < lines.length && !lines[i].startsWith("\`\`\`")) {
            code.push(lines[i]);
            i++;
          }
          i++;
          out.push('<pre><code class="language-' + escapeHtml(lang) + '">' + escapeHtml(code.join("\n")) + '</code></pre>');
          continue;
        }

        if (/^####\s+/.test(line)) {
          out.push("<h4>" + inline(line.replace(/^####\s+/, "")) + "</h4>");
          i++;
          continue;
        }

        if (/^###\s+/.test(line)) {
          out.push("<h3>" + inline(line.replace(/^###\s+/, "")) + "</h3>");
          i++;
          continue;
        }

        if (/^\|.*\|$/.test(line.trim()) && i + 1 < lines.length && /^\|[\s\-:|]+\|$/.test(lines[i + 1].trim())) {
          const rows = [];
          rows.push(lines[i]);
          i += 2;
          while (i < lines.length && /^\|.*\|$/.test(lines[i].trim())) {
            rows.push(lines[i]);
            i++;
          }
          const htmlRows = rows.map((row, idx) => {
            const cells = row.trim().replace(/^\||\|$/g, "").split("|").map(cell => inline(cell.trim()));
            const tag = idx === 0 ? "th" : "td";
            return "<tr>" + cells.map(cell => "<" + tag + ">" + cell + "</" + tag + ">").join("") + "</tr>";
          }).join("");
          out.push('<div class="table-wrap"><table>' + htmlRows + '</table></div>');
          continue;
        }

        if (line.startsWith(">")) {
          const quote = [];
          while (i < lines.length && lines[i].startsWith(">")) {
            const quoteLine = lines[i].replace(/^>\s?/, "");
            if (!quoteLine.includes("本文基于前面对话整理")) quote.push(quoteLine);
            i++;
          }
          out.push("<blockquote>" + parseBlocks(quote).join("") + "</blockquote>");
          continue;
        }

        if (/^\s*[-*]\s+/.test(line)) {
          const items = [];
          while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
            items.push("<li>" + inline(lines[i].replace(/^\s*[-*]\s+/, "")) + "</li>");
            i++;
          }
          out.push("<ul>" + items.join("") + "</ul>");
          continue;
        }

        if (/^\s*\d+\.\s+/.test(line)) {
          const items = [];
          while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
            items.push("<li>" + inline(lines[i].replace(/^\s*\d+\.\s+/, "")) + "</li>");
            i++;
          }
          out.push("<ol>" + items.join("") + "</ol>");
          continue;
        }

        if (/^---+$/.test(line.trim())) {
          out.push("<hr>");
          i++;
          continue;
        }

        const paragraph = [line.trim()];
        i++;
        while (
          i < lines.length &&
          lines[i].trim() &&
          !lines[i].startsWith("\`\`\`") &&
          !lines[i].startsWith(">") &&
          !/^\s*[-*]\s+/.test(lines[i]) &&
          !/^\s*\d+\.\s+/.test(lines[i]) &&
          !/^\|.*\|$/.test(lines[i].trim())
        ) {
          paragraph.push(lines[i].trim());
          i++;
        }
        out.push("<p>" + inline(paragraph.join(" ")) + "</p>");
      }
      return out;
    }

    function splitSections(md) {
      const lines = md.replace(/\r\n/g, "\n").split("\n");
      const sections = [];
      let title = "导读";
      let level = 1;
      let buf = [];
      let index = 0;

      for (const line of lines) {
        const match = /^(#{1,3})\s+(.+)$/.exec(line);
        if (match && match[1].length <= 2) {
          if (buf.length || sections.length === 0) {
            sections.push({ title, level, body: buf.join("\n"), id: slugify(title, index++) });
          }
          title = match[2].trim();
          level = match[1].length;
          buf = [];
        } else {
          buf.push(line);
        }
      }
      sections.push({ title, level, body: buf.join("\n"), id: slugify(title, index++) });
      return sections.filter(sec => sec.title !== "导读" || sec.body.trim());
    }

    const sections = splitSections(source);
    const plainWords = source.replace(/[#>*\`\-|]/g, "").length;
    readTime.textContent = "约 " + Math.max(8, Math.round(plainWords / 650)) + " 分钟阅读 · " + sections.length + " 个章节";
    let activeIndex = Math.max(0, sections.findIndex(sec => "#" + sec.id === decodeURIComponent(location.hash)));

    function sectionVisual(sec) {
      const title = sec.title;
      if (/应用市场|商业|对应关系/.test(title)) {
        return {
          src: "assets/automation-marketplace.png",
          caption: "场景化应用市场把自动化能力包装成可分发、可维护、可收费的业务产品。"
        };
      }
      if (/落地架构|替代|场景适合|商业化判断/.test(title)) {
        return {
          src: "assets/hybrid-automation-architecture.png",
          caption: "更成熟的形态是 Agent 负责理解与维护，脚本、API、RPA 负责稳定执行，人类负责审批。"
        };
      }
      if (/Skill|一句话结论|Agent 应用/.test(title)) {
        return {
          src: "assets/agent-skill-workflow.png",
          caption: "Agent 应用由 Skill、Tool、Workflow 和产品化外壳组合而成。"
        };
      }
      if (/RPA|对比表|稳定性|核心区别/.test(title)) {
        return {
          src: "assets/rpa-execution-layer.png",
          caption: "RPA 的长期价值更接近确定性执行层，尤其适合老系统与强审计流程。"
        };
      }
      return null;
    }

    function initSphereDecisionDashboard() {
      const list = document.getElementById("dimensionList");
      const canvas = document.getElementById("automation3dCanvas");
      if (!list || !canvas) return;

      function bestOption(item) {
        return [
          { key: "rpa", label: "RPA", score: item.rpa },
          { key: "agent", label: "Agent", score: item.agent },
          { key: "hybrid", label: "混合", score: item.hybrid }
        ].sort((a, b) => b.score - a.score)[0];
      }

      list.innerHTML = automationDimensions.map(item => {
        const best = bestOption(item);
        return '<div class="dimension-item" title="' + escapeHtml(item.note) + '">' +
          '<strong>' + escapeHtml(item.label) + '</strong>' +
          '<div class="meter">' +
            '<div class="meter-line rpa" style="--value:' + item.rpa.toFixed(1) + '"></div>' +
            '<div class="meter-line agent" style="--value:' + item.agent.toFixed(1) + '"></div>' +
            '<div class="meter-line hybrid" style="--value:' + item.hybrid.toFixed(1) + '"></div>' +
            '<div class="meter-note">蓝色 RPA / 橙色 Agent / 绿色 混合，均按 10 分制长度显示</div>' +
          '</div>' +
          '<span class="score-pill rpa">R ' + item.rpa.toFixed(1) + '</span>' +
          '<span class="score-pill agent">A ' + item.agent.toFixed(1) + '</span>' +
          '<span class="score-pill hybrid">H ' + item.hybrid.toFixed(1) + '</span>' +
          '<span class="best-badge ' + best.key + '">' + best.label + '</span>' +
          '</div>';
      }).join("");

      const ctx = canvas.getContext("2d");
      const palette = {
        rpa: "#2563eb",
        agent: "#f59e0b",
        hybrid: "#16a34a",
        grid: "rgba(51, 65, 85, .18)",
        ink: "#101828"
      };
      const state = { rotX: -0.22, rotY: 0.72, drag: false, x: 0, y: 0 };

      const series = [
        { key: "rpa", label: "RPA", color: palette.rpa, offset: -0.14 },
        { key: "agent", label: "Agent", color: palette.agent, offset: 0 },
        { key: "hybrid", label: "Hybrid", color: palette.hybrid, offset: 0.14 }
      ];

      function resize() {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.max(320, Math.round(rect.width * dpr));
        canvas.height = Math.max(420, Math.round(rect.height * dpr));
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      function rotate(point) {
        let { x, y, z } = point;
        const cy = Math.cos(state.rotY);
        const sy = Math.sin(state.rotY);
        const cx = Math.cos(state.rotX);
        const sx = Math.sin(state.rotX);
        const x1 = x * cy - z * sy;
        const z1 = x * sy + z * cy;
        const y1 = y * cx - z1 * sx;
        const z2 = y * sx + z1 * cx;
        return { x: x1, y: y1, z: z2 };
      }

      function project(point, radius, centerX, centerY) {
        const rotated = rotate(point);
        const depth = 2.8 + rotated.z;
        const scale = 1.05 / depth;
        return {
          x: centerX + rotated.x * radius * scale * 2.15,
          y: centerY + rotated.y * radius * scale * 2.15,
          z: rotated.z,
          scale
        };
      }

      function spherePoint(angle, score, offset = 0) {
        const normalized = Math.max(.16, Math.min(1, score / 10));
        const latitude = -0.12 + offset;
        const ring = Math.cos(latitude);
        return {
          x: Math.cos(angle) * ring * normalized,
          y: Math.sin(latitude) * normalized,
          z: Math.sin(angle) * ring * normalized
        };
      }

      function drawLabel(text, x, y, color, align = "center") {
        ctx.font = "700 12px Microsoft YaHei, Arial, sans-serif";
        ctx.textAlign = align;
        ctx.textBaseline = "middle";
        ctx.lineWidth = 4;
        ctx.strokeStyle = "rgba(255,255,255,.82)";
        ctx.strokeText(text, x, y);
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
      }

      function drawCallout(x, y, title, body, color, align = "left") {
        const width = 150;
        const height = 52;
        const left = align === "right" ? x - width : x;
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(left, y, width, height, 14);
        ctx.fillStyle = "rgba(255,255,255,.82)";
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.font = "800 12px Microsoft YaHei, Arial, sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText(title, left + 12, y + 9);
        ctx.fillStyle = "#475467";
        ctx.font = "700 11px Microsoft YaHei, Arial, sans-serif";
        ctx.fillText(body, left + 12, y + 29);
        ctx.restore();
      }

      function drawOrbit(centerX, centerY, radius) {
        ctx.save();
        ctx.strokeStyle = palette.grid;
        ctx.lineWidth = 1;
        for (let i = 1; i <= 4; i++) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius * i / 4, 0, Math.PI * 2);
          ctx.stroke();
        }

        for (let lat = -2; lat <= 2; lat++) {
          const points = [];
          for (let i = 0; i <= 96; i++) {
            const angle = i / 96 * Math.PI * 2;
            const latitude = lat * .28;
            const p = project({
              x: Math.cos(angle) * Math.cos(latitude),
              y: Math.sin(latitude),
              z: Math.sin(angle) * Math.cos(latitude)
            }, radius, centerX, centerY);
            points.push(p);
          }
          ctx.beginPath();
          points.forEach((p, index) => index ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
          ctx.stroke();
        }

        for (let i = 0; i < automationDimensions.length; i++) {
          const angle = i / automationDimensions.length * Math.PI * 2;
          const a = project({ x: Math.cos(angle), y: -.36, z: Math.sin(angle) }, radius, centerX, centerY);
          const b = project({ x: Math.cos(angle), y: .36, z: Math.sin(angle) }, radius, centerX, centerY);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        ctx.restore();
      }

      function drawSeries(centerX, centerY, radius) {
        const items = [];
        series.forEach(item => {
          const points = automationDimensions.map((dimension, index) => {
            const angle = index / automationDimensions.length * Math.PI * 2;
            const p3 = spherePoint(angle, dimension[item.key], item.offset);
            return { ...project(p3, radius, centerX, centerY), dimension, item };
          });
          items.push({ item, points });
        });

        items.sort((a, b) => {
          const za = a.points.reduce((sum, p) => sum + p.z, 0) / a.points.length;
          const zb = b.points.reduce((sum, p) => sum + p.z, 0) / b.points.length;
          return za - zb;
        });

        items.forEach(({ item, points }) => {
          ctx.save();
          ctx.beginPath();
          points.forEach((p, index) => index ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
          ctx.closePath();
          ctx.globalAlpha = item.key === "hybrid" ? .18 : .11;
          ctx.fillStyle = item.color;
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.strokeStyle = item.color;
          ctx.lineWidth = item.key === "hybrid" ? 4 : 3;
          ctx.stroke();
          points.forEach(p => {
            const dot = Math.max(4, 7 + p.z * 1.5);
            ctx.beginPath();
            ctx.fillStyle = item.color;
            ctx.arc(p.x, p.y, dot, 0, Math.PI * 2);
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgba(255,255,255,.9)";
            ctx.stroke();
          });
          ctx.restore();
        });

        automationDimensions.forEach((dimension, index) => {
          const angle = index / automationDimensions.length * Math.PI * 2;
          const edge = project({ x: Math.cos(angle), y: 0, z: Math.sin(angle) }, radius * 1.06, centerX, centerY);
          if (edge.z > -.35) drawLabel(dimension.label, edge.x, edge.y, "#334155");
        });
      }

      function render() {
        const rect = canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);
        const centerX = rect.width * .52;
        const centerY = rect.height * .52;
        const radius = Math.min(rect.width, rect.height) * .34;

        const gradient = ctx.createRadialGradient(centerX - radius * .35, centerY - radius * .45, radius * .1, centerX, centerY, radius * 1.16);
        gradient.addColorStop(0, "rgba(255,255,255,.98)");
        gradient.addColorStop(.58, "rgba(241,245,249,.72)");
        gradient.addColorStop(1, "rgba(18,181,203,.16)");
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 1.08, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        drawOrbit(centerX, centerY, radius);
        drawSeries(centerX, centerY, radius);
        if (rect.width > 760) {
          drawCallout(centerX - radius * 1.25, centerY - radius * .9, "RPA 区", "成本 + 稳定 + 审计", palette.rpa);
          drawCallout(centerX + radius * 1.28, centerY - radius * .72, "Agent 区", "变化 + 判断 + 生成", palette.agent, "right");
          drawCallout(centerX + radius * 1.18, centerY + radius * .68, "混合区", "理解 + 执行 + 治理", palette.hybrid, "right");
        }
        state.rotY += state.drag ? 0 : .0025;
        requestAnimationFrame(render);
      }

      function initLegendPanel() {
        const legend = document.getElementById("chartLegend");
        const toggle = document.getElementById("legendToggle");
        const shell = legend ? legend.closest(".chart-shell") : null;
        if (!legend || !toggle || !shell) return;

        function updateToggle() {
          const collapsed = legend.classList.contains("collapsed");
          toggle.textContent = collapsed ? "+" : "-";
          toggle.setAttribute("aria-label", collapsed ? "展开图例" : "收起图例");
        }

        toggle.addEventListener("click", event => {
          event.stopPropagation();
          legend.classList.toggle("collapsed");
          updateToggle();
        });

        let dragging = false;
        let startX = 0;
        let startY = 0;
        let startLeft = 0;
        let startTop = 0;

        function place(left, top) {
          const shellRect = shell.getBoundingClientRect();
          const legendRect = legend.getBoundingClientRect();
          const maxLeft = Math.max(0, shellRect.width - legendRect.width);
          const maxTop = Math.max(0, shellRect.height - legendRect.height);
          legend.style.left = Math.max(0, Math.min(maxLeft, left)) + "px";
          legend.style.top = Math.max(0, Math.min(maxTop, top)) + "px";
          legend.style.right = "auto";
        }

        legend.addEventListener("pointerdown", event => {
          if (event.target === toggle) return;
          const shellRect = shell.getBoundingClientRect();
          const legendRect = legend.getBoundingClientRect();
          dragging = true;
          startX = event.clientX;
          startY = event.clientY;
          startLeft = legendRect.left - shellRect.left;
          startTop = legendRect.top - shellRect.top;
          legend.classList.add("dragging");
          legend.setPointerCapture(event.pointerId);
        });

        legend.addEventListener("pointermove", event => {
          if (!dragging) return;
          place(startLeft + event.clientX - startX, startTop + event.clientY - startY);
        });

        function endDrag(event) {
          dragging = false;
          legend.classList.remove("dragging");
          if (event.pointerId && legend.hasPointerCapture(event.pointerId)) legend.releasePointerCapture(event.pointerId);
        }

        legend.addEventListener("pointerup", endDrag);
        legend.addEventListener("pointercancel", endDrag);
        updateToggle();
      }

      canvas.addEventListener("pointerdown", event => {
        state.drag = true;
        state.x = event.clientX;
        state.y = event.clientY;
        canvas.setPointerCapture(event.pointerId);
      });
      canvas.addEventListener("pointermove", event => {
        if (!state.drag) return;
        state.rotY += (event.clientX - state.x) * .008;
        state.rotX = Math.max(-.85, Math.min(.5, state.rotX + (event.clientY - state.y) * .006));
        state.x = event.clientX;
        state.y = event.clientY;
      });
      canvas.addEventListener("pointerup", () => { state.drag = false; });
      canvas.addEventListener("pointercancel", () => { state.drag = false; });
      window.addEventListener("resize", resize, { passive: true });

      initLegendPanel();
      resize();
      render();
    }

    function initTocPanel() {
      const layout = document.querySelector(".layout");
      const toggle = document.getElementById("tocToggle");
      if (!layout || !toggle) return;

      function sync() {
        const collapsed = layout.classList.contains("toc-collapsed");
        toggle.textContent = collapsed ? "+" : "-";
        toggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
        toggle.setAttribute("aria-label", collapsed ? "展开目录" : "隐藏目录");
      }

      toggle.addEventListener("click", () => {
        layout.classList.toggle("toc-collapsed");
        sync();
      });

      sync();
    }

    function syncDecisionSection() {
      const decision = document.getElementById("decision-3d");
      if (!decision) return;
      decision.hidden = activeIndex !== 0;
    }

    function renderToc() {
      toc.innerHTML = "";
      let visible = 0;
      sections.forEach((sec, index) => {
        visible++;
        const link = document.createElement("a");
        link.href = "#" + sec.id;
        link.textContent = displayTitle(sec.title);
        link.classList.toggle("active", index === activeIndex);
        link.addEventListener("click", event => {
          event.preventDefault();
          showSection(index);
        });
        toc.appendChild(link);
      });
      empty.style.display = visible ? "none" : "block";
    }

    function renderSection(sec) {
      const visual = sectionVisual(sec);
      const visualHtml = visual
        ? '<figure class="section-hero-image"><img src="' + visual.src + '" alt="' + escapeHtml(visual.caption) + '"><figcaption>' + escapeHtml(visual.caption) + '</figcaption></figure>'
        : "";
      const lines = sec.body.split("\n");
      articleBody.innerHTML = '<section id="' + sec.id + '" data-title="' + escapeHtml(sec.title) + '"><h2>' + inline(displayTitle(sec.title)) + '</h2>' + visualHtml + parseBlocks(lines).join("") + '<div class="section-actions"><button class="mini" id="prevSection" type="button">上一章</button><button class="mini" id="nextSection" type="button">下一章</button></div></section>';
      document.getElementById("prevSection").disabled = activeIndex === 0;
      document.getElementById("nextSection").disabled = activeIndex === sections.length - 1;
      document.getElementById("prevSection").addEventListener("click", () => showSection(Math.max(0, activeIndex - 1)));
      document.getElementById("nextSection").addEventListener("click", () => showSection(Math.min(sections.length - 1, activeIndex + 1)));
    }

    function showSection(index, updateHash = true) {
      activeIndex = Math.max(0, Math.min(sections.length - 1, index));
      syncDecisionSection();
      renderSection(sections[activeIndex]);
      renderToc();
      document.querySelectorAll(".chip").forEach(chip => {
        const targetIndex = sections.findIndex(sec => sec.title.includes(chip.dataset.locate));
        chip.classList.toggle("active", targetIndex === activeIndex);
      });
      if (updateHash) history.replaceState(null, "", "#" + sections[activeIndex].id);
      document.getElementById("article").scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function render() {
      syncDecisionSection();
      renderSection(sections[activeIndex]);
      renderToc();
    }

    document.querySelectorAll(".chip").forEach(chip => {
      chip.addEventListener("click", () => {
        document.querySelectorAll(".chip").forEach(item => item.classList.remove("active"));
        chip.classList.add("active");
        const targetTitle = chip.dataset.locate;
        const targetIndex = sections.findIndex(sec => sec.title.includes(targetTitle));
        if (targetIndex >= 0) showSection(targetIndex);
      });
    });

    document.getElementById("exportMarkdown").addEventListener("click", event => {
      const blob = new Blob([source], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "agent_vs_rpa_skill_marketplace_updated.md";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      event.currentTarget.textContent = "已导出";
      setTimeout(() => event.currentTarget.textContent = "导出 MD", 1300);
    });
    window.addEventListener("scroll", () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = "scaleX(" + (max > 0 ? scrollY / max : 0) + ")";
    }, { passive: true });

    render();
    initSphereDecisionDashboard();
  </script>
</body>
</html>`;

writeFileSync("index.html", html, "utf8");
