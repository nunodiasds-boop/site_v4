'use strict';

/* ── STATE ── */
var activeView = 'grid';
var modalModId = null;
var treeState  = {};

/* ── BOOT ── */
document.addEventListener('DOMContentLoaded', function () {
  renderCards();
  renderTable();
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
});

/* ════════════════════════════════════════════
   VIEW TOGGLE
════════════════════════════════════════════ */
function setView(v) {
  activeView = v;
  var isGrid = v === 'grid';
  document.getElementById('vbGrid').classList.toggle('on', isGrid);
  document.getElementById('vbTable').classList.toggle('on', !isGrid);
  document.getElementById('view-grid').classList.toggle('off', !isGrid);
  document.getElementById('view-table').classList.toggle('on', !isGrid);
}

/* ════════════════════════════════════════════
   CARD RENDERING
════════════════════════════════════════════ */
function renderCards() {
  var mal = MODS.filter(function (m) { return m.cat === 'maligna'; });
  var ben = MODS.filter(function (m) { return m.cat === 'benigna'; });
  document.getElementById('gridMal').innerHTML = mal.map(cardHTML).join('');
  document.getElementById('gridBen').innerHTML = ben.map(cardHTML).join('');
}

function getBadge(m) {
  if (!m.live) return {cls: 's-soon', txt: 'Em breve'};
  if (m.isNew)  return {cls: 's-new',  txt: 'Novo'};
  return          {cls: 's-avail', txt: 'Disponível'};
}

function cardHTML(m) {
  var ac       = AC[m.acc] || AC.navy;
  var dimCls   = m.live ? '' : ' dim';
  var liveCls  = m.live ? ' live' : '';
  var hasTree  = m.live && !!TREES[m.id];
  var badge    = getBadge(m);

  /* ── footer tabs ── */
  var footer = '';
  if (m.live) {
    var treeBtn = hasTree
      ? '<button class="ctab teal-tab" data-mod="' + m.id + '" onclick="toggleTree(\'' + m.id + '\',this)">🌿 Decisão</button>'
      : '';
    footer = '<div class="card-tabs">'
      + treeBtn
      + '<button class="ctab" onclick="openModal(\'' + m.id + '\')">📋 Referenciar</button>'
      + '<a href="' + m.url + '" class="ctab prime">Abrir →</a>'
      + '</div>';

    if (hasTree) {
      footer += '<div class="card-tree" id="ct_' + m.id + '">'
        + '<div class="ct-prog" id="ctp_' + m.id + '"></div>'
        + '<div id="ctb_' + m.id + '"></div>'
        + '<p class="ct-caveat">💡 Ajuda à decisão — o julgamento clínico prevalece sempre.</p>'
        + '</div>';
    }
  } else {
    footer = '<div class="card-soon-footer"><span style="font-size:14px;color:var(--muted2)">→</span></div>';
  }

  return '<div class="card a-' + m.acc + dimCls + liveCls + '">'
    + '<div class="card-h">'
    +   '<div class="card-ico" style="background:' + ac.bg + '">' + m.icon + '</div>'
    +   '<div>'
    +     '<div class="card-spec" style="color:' + ac.c + '">' + m.spec + '</div>'
    +     '<div class="card-title">' + m.title + '</div>'
    +   '</div>'
    +   '<span class="' + badge.cls + '">' + badge.txt + '</span>'
    + '</div>'
    + '<div class="card-b">'
    +   '<div class="card-desc">' + m.desc + '</div>'
    +   '<div class="tags">' + m.tags.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('') + '</div>'
    + '</div>'
    + '<div class="card-src"><div class="src-dot">U</div>' + m.group + '</div>'
    + footer
    + '</div>';
}

/* ════════════════════════════════════════════
   TABLE RENDERING
════════════════════════════════════════════ */
function renderTable() {
  var urgLbl = {urgente: '🔴 Urgente', electiva: '🟡 Electiva'};
  var urgCls = {urgente: 'ub urg',     electiva: 'ub ele'};
  var sexLbl = {M: '♂ Masc',          F: '♀ Fem',            MF: '⚥ Ambos'};

  var html = '';
  ['maligna', 'benigna'].forEach(function (cat) {
    var label = cat === 'maligna'
      ? '▸ Oncologia Urológica'
      : '▸ Urologia Funcional & Benigna';
    html += '<tr class="tsep"><td colspan="6">' + label + '</td></tr>';

    MODS.filter(function (m) { return m.cat === cat; }).forEach(function (m) {
      var stateBadge = m.isNew
        ? '<span class="ts novo">Novo ★</span>'
        : (m.live ? '<span class="ts live">Disponível</span>' : '<span class="ts soon">Em breve</span>');

      var acts = m.live
        ? '<a href="' + m.url + '" class="tbtn prime">Abrir →</a>'
          + '<button class="tbtn" onclick="openModal(\'' + m.id + '\')">📋</button>'
        : '<button class="tbtn" disabled>Em breve</button>';

      html += '<tr>'
        + '<td><div class="t-mod">'
        +   '<span class="t-mod-ico">' + m.icon + '</span>'
        +   '<div><div class="t-mod-name">' + m.title + '</div>'
        +        '<div class="t-mod-spec">' + m.spec + '</div></div>'
        + '</div></td>'
        + '<td><span class="t-sex">' + (sexLbl[m.sex] || m.sex) + '</span></td>'
        + '<td><span class="' + (urgCls[m.urg] || 'ub ele') + '">' + (urgLbl[m.urg] || m.urg) + '</span></td>'
        + '<td><span class="t-crit">' + m.refType + '</span></td>'
        + '<td>' + stateBadge + '</td>'
        + '<td><div class="t-acts">' + acts + '</div></td>'
        + '</tr>';
    });
  });

  document.getElementById('tblBody').innerHTML = html;
  document.getElementById('tblCount').textContent = MODS.length + ' módulos';
}

/* ════════════════════════════════════════════
   INLINE DECISION TREE
════════════════════════════════════════════ */
function toggleTree(modId, btn) {
  var panel = document.getElementById('ct_' + modId);
  if (!panel) return;
  var isOpen = panel.classList.contains('open');

  /* close all open trees */
  document.querySelectorAll('.card-tree.open').forEach(function (p) { p.classList.remove('open'); });
  document.querySelectorAll('.ctab.teal-tab[data-mod]').forEach(function (b) { b.textContent = '🌿 Decisão'; });

  if (!isOpen) {
    panel.classList.add('open');
    btn.textContent = '✕ Fechar';
    if (!treeState[modId]) treeState[modId] = {node: 's0', trail: []};
    renderTree(modId);
  }
}

function renderTree(modId) {
  var state   = treeState[modId];
  var T       = TREES[modId];
  var progEl  = document.getElementById('ctp_' + modId);
  var bodyEl  = document.getElementById('ctb_' + modId);
  var nodeKeys = Object.keys(T.nodes);

  /* progress dots */
  progEl.innerHTML = nodeKeys.map(function (k, i) {
    var done = i < state.trail.length;
    var cur  = i === state.trail.length && !!T.nodes[state.node];
    return (i > 0 ? '<div class="ct-line"></div>' : '')
      + '<div class="ct-dot' + (done ? ' done' : '') + (cur ? ' cur' : '') + '"></div>';
  }).join('');

  /* result node */
  if (T.results[state.node]) {
    var R = T.results[state.node];
    var trailHTML = buildTrailHTML(state.trail);
    var refBtn = R.ref
      ? '<button class="ct-ref-btn" onclick="openModal(\'' + modId + '\')">📋 Referenciar</button>'
      : '';
    bodyEl.innerHTML = trailHTML
      + '<div class="ct-result ' + R.cls + '">'
      +   '<div class="ct-res-lbl">' + R.lbl + '</div>'
      +   '<div class="ct-res-title">' + R.title + '</div>'
      +   '<div class="ct-res-body">' + R.body + '</div>'
      +   '<div class="ct-res-acts">'
      +     '<button class="ct-restart" onclick="resetTree(\'' + modId + '\')">↩ Recomeçar</button>'
      +     refBtn
      +   '</div>'
      + '</div>';
    return;
  }

  /* question node */
  var N = T.nodes[state.node];
  var noteHTML = N.note ? '<div class="ct-note">ℹ️ ' + N.note + '</div>' : '';
  bodyEl.innerHTML = buildTrailHTML(state.trail)
    + '<div class="ct-q">' + N.q + '</div>'
    + noteHTML
    + '<div class="ct-btns">'
    +   '<button class="ct-btn yes" onclick="stepTree(\'' + modId + '\',\'' + N.y + '\',\'Sim\')">✓ Sim</button>'
    +   '<button class="ct-btn no"  onclick="stepTree(\'' + modId + '\',\'' + N.n + '\',\'Não\')">✗ Não</button>'
    + '</div>';
}

function buildTrailHTML(trail) {
  if (!trail.length) return '';
  return '<div class="ct-trail">'
    + trail.map(function (t) { return '<div class="ct-trail-item">' + t + '</div>'; }).join('')
    + '</div>';
}

function stepTree(modId, next, ans) {
  var state = treeState[modId];
  var T     = TREES[modId];
  var q     = T.nodes[state.node] ? T.nodes[state.node].q : '';
  var short = q.length > 52 ? q.substring(0, 52) + '…' : q;
  state.trail.push(short + ' → ' + ans);
  state.node = next;
  renderTree(modId);
}

function resetTree(modId) {
  treeState[modId] = {node: 's0', trail: []};
  renderTree(modId);
}

/* ════════════════════════════════════════════
   REFERRAL MODAL
════════════════════════════════════════════ */
function openModal(id) {
  var m = MODS.filter(function (x) { return x.id === id; })[0];
  if (!m) return;
  modalModId = id;

  document.getElementById('mhIco').textContent   = m.icon;
  document.getElementById('mhTitle').textContent = m.title;

  document.getElementById('fgrid').innerHTML = (m.fields || []).map(function (f) {
    var fid = 'f_' + f.l.replace(/\W+/g, '_');
    var cls = f.full ? 'ff full' : 'ff';

    if (f.t === 'select') {
      return '<div class="' + cls + '"><label class="fl">' + f.l + '</label>'
        + '<select class="fs" id="' + fid + '"><option value="">— seleccionar —</option>'
        + f.o.map(function (o) { return '<option>' + o + '</option>'; }).join('')
        + '</select></div>';
    }
    if (f.t === 'area') {
      return '<div class="' + cls + '"><label class="fl">' + f.l + '</label>'
        + '<textarea class="fta" id="' + fid + '" placeholder="' + (f.p || '') + '"></textarea></div>';
    }
    return '<div class="' + cls + '"><label class="fl">' + f.l + '</label>'
      + '<input type="' + f.t + '" class="fi" id="' + fid + '" placeholder="' + (f.p || '') + '"></div>';
  }).join('');

  document.getElementById('outWrap').classList.remove('on');
  document.getElementById('overlay').classList.add('on');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('overlay').classList.remove('on');
  document.body.style.overflow = '';
}

function genReferral() {
  var m = MODS.filter(function (x) { return x.id === modalModId; })[0];
  if (!m) return;

  var today = new Date().toLocaleDateString('pt-PT', {day: '2-digit', month: 'long', year: 'numeric'});

  var fields = '';
  (m.fields || []).forEach(function (f) {
    var el = document.getElementById('f_' + f.l.replace(/\W+/g, '_'));
    if (el && el.value && el.value !== '— seleccionar —') {
      fields += '  - ' + f.l + ': ' + el.value + '\n';
    }
  });

  var letter = 'PEDIDO DE CONSULTA DE UROLOGIA\n'
    + 'Servico de Urologia · ULS de Sao Joao · Porto\n'
    + '------------------------------------------------\n\n'
    + 'Data: ' + today + '\n'
    + 'Modulo: ' + m.title + ' (' + m.spec + ')\n'
    + 'Referencia: Cuidados Partilhados Urologia & MGF\n\n'
    + 'DADOS CLINICOS:\n'
    + (fields || '  (nao foram introduzidos dados)\n')
    + '\nCRITERIO DE REFERENCIACAO:\n  ' + m.refType
    + '\n\n------------------------------------------------\n'
    + 'Gerado via plataforma Cuidados Partilhados · ULS Sao Joao\n'
    + 'triagem.urologia@ulssjoao.min-saude.pt · 961 314 163';

  document.getElementById('outTxt').textContent = letter;
  document.getElementById('outWrap').classList.add('on');

  var btn = document.getElementById('copyBtn');
  btn.className   = 'copy-btn';
  btn.textContent = '📋 Copiar para clipboard';
}

function copyRef() {
  var text = document.getElementById('outTxt').textContent;
  navigator.clipboard.writeText(text).then(function () {
    var btn = document.getElementById('copyBtn');
    btn.className   = 'copy-btn ok';
    btn.textContent = '✓ Copiado!';
    setTimeout(function () {
      btn.className   = 'copy-btn';
      btn.textContent = '📋 Copiar para clipboard';
    }, 2200);
  }).catch(function () {
    /* fallback for browsers without clipboard API */
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity  = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    var btn = document.getElementById('copyBtn');
    btn.className   = 'copy-btn ok';
    btn.textContent = '✓ Copiado!';
    setTimeout(function () {
      btn.className   = 'copy-btn';
      btn.textContent = '📋 Copiar para clipboard';
    }, 2200);
  });
}
