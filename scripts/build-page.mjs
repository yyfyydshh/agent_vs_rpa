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
    .search {
      width: min(34vw, 360px);
      min-width: 180px;
      border: 1px solid var(--line);
      border-radius: 999px;
      padding: 10px 14px;
      background: rgba(255,255,255,.86);
      color: var(--ink);
      outline: none;
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
    }
    .toc h2 {
      margin: 0 0 10px;
      font-size: 13px;
      text-transform: uppercase;
      color: var(--muted);
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
    }
    @media (max-width: 720px) {
      .topbar { align-items: stretch; flex-direction: column; }
      .top-actions { width: 100%; }
      .search { width: 100%; min-width: 0; }
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
        <input class="search" id="search" type="search" placeholder="搜索：Skill、RPA、应用市场..." />
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
          <h2>目录</h2>
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
    const search = document.getElementById("search");
    const empty = document.getElementById("empty");
    const progress = document.getElementById("progress");
    const readTime = document.getElementById("readTime");

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

    function renderToc() {
      const q = search.value.trim().toLowerCase();
      toc.innerHTML = "";
      let visible = 0;
      sections.forEach((sec, index) => {
        const haystack = (sec.title + "\n" + sec.body).toLowerCase();
        if (q && !haystack.includes(q)) return;
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
      if (q && visible && !toc.querySelector("a.active")) {
        const firstTitle = toc.querySelector("a")?.textContent;
        const firstIndex = sections.findIndex(sec => sec.title === firstTitle);
        if (firstIndex >= 0) showSection(firstIndex, false);
      }
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

    search.addEventListener("input", renderToc);
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
  </script>
</body>
</html>`;

writeFileSync("index.html", html, "utf8");
