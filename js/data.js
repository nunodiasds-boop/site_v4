'use strict';

/* ── ACCENT COLOUR MAP ── */
var AC = {
  red:   {c:'var(--red)',   bg:'var(--red-light)'},
  gold:  {c:'var(--gold)',  bg:'var(--gold-light)'},
  teal:  {c:'var(--teal)',  bg:'var(--teal-light)'},
  green: {c:'var(--green)', bg:'var(--green-light)'},
  navy:  {c:'var(--navy)',  bg:'var(--blue-light)'},
  blue:  {c:'var(--blue)',  bg:'var(--blue-light)'}
};

/* ═══════════════════════════════════════════════════
   MODULE CATALOGUE
   cat:    'maligna' | 'benigna'
   live:   true = activated
   isNew:  true = show "Novo" badge (recently launched)
   acc:    accent colour key (see AC above)
   url:    target page filename
   sex:    'M' | 'F' | 'MF'
   urg:    'urgente' | 'electiva'
   fields: referral modal form fields
═══════════════════════════════════════════════════ */
var MODS = [

  /* ── ONCOLOGIA UROLÓGICA ── */

  {
    id:'psa', cat:'maligna', live:true, isNew:true,
    acc:'red', icon:'🔬', url:'PSAelevado.html',
    title:'PSA Elevado', spec:'Cancro da Próstata', group:'Grupo Próstata',
    desc:'Quando pedir PSA, como interpretar valores e quando referenciar a Urologia.',
    tags:['PSA','EAU 2026','Rastreio','Biopsia'], sex:'M', urg:'urgente',
    refType:'Suspeita de doença maligna',
    fields:[
      {l:'PSA total (ng/mL)',            t:'number', p:'ex: 5.2'},
      {l:'PSA livre (ng/mL)',            t:'number', p:'ex: 0.8'},
      {l:'Toque Rectal (TR)',            t:'select', o:['Normal','Suspeito (nodulo/induracao)','Nao realizado']},
      {l:'Sintomas LUTS',               t:'select', o:['Ausentes','Ligeiros','Moderados','Graves / Retencao']},
      {l:'Antecedentes familiares',      t:'select', o:['Sem historia familiar','Familiar 1º grau <60 anos','Multiplos familiares']},
      {l:'Biopsias anteriores',          t:'select', o:['Sem biopsia previa','Benigna','PIN/ASAP']},
      {l:'Volume prostático (eco)',          t:'number', p:'ex: 30cc'},
      {l:'Observacoes clinicas',         t:'area',   p:'Informacao clinica adicional...', full:true}
    ]
  },

  {
    id:'hematuria', cat:'maligna', live:false, isNew:false,
    acc:'red', icon:'💧',
    title:'Hematuria', spec:'Diagnostico', group:'Grupo Bexiga',
    desc:'Avaliacao da hematuria micro e macroscopica. Criterios de referenciacao urgente vs. electiva.',
    tags:['Hematuria','Referenciacao','Urgencia'], sex:'MF', urg:'urgente',
    refType:'Urgente (macro total) / Electiva (micro persistente)',
    fields:[
      {l:'Tipo de hematuria',            t:'select', o:['Macroscopica total','Macroscopica terminal','Microscopica persistente (>3 eritrocitos/campo)']},
      {l:'Duracao (semanas)',            t:'number', p:'ex: 2'},
      {l:'Coagulos',                     t:'select', o:['Ausentes','Presentes - vermiformes','Presentes - irregulares']},
      {l:'Sintomas associados',          t:'select', o:['Ausentes','Disuria / Polaquiuria','Dor lombar','LUTS obstrutivos']},
      {l:'Tabagismo',                    t:'select', o:['Nao fumador','Ex-fumador (>10 anos)','Fumador activo']},
      {l:'Exposicao profissional',       t:'select', o:['Nao conhecida','Sim - anilinas / aminas aromaticas']},
      {l:'Anticoagulacao / Antiagregacao', t:'select', o:['Nao','NOAC','Varfarina','Antiagregante plaquetario']},
      {l:'Ecografia renal e vesical',    t:'select', o:['Nao realizada','Normal','Espessamento vesical','Massa renal','Hidronefrose']},
      {l:'Observacoes clinicas',         t:'area',   p:'Informacao clinica adicional...', full:true}
    ]
  },

  {
    id:'supra', cat:'maligna', live:false, isNew:false,
    acc:'gold', icon:'🧬',
    title:'Lesoes Supra-renais', spec:'Oncologia', group:'Grupo Rim',
    desc:'Abordagem do incidentaloma supra-renal. Avaliacao hormonal e criterios de referenciacao.',
    tags:['Incidentaloma','Supra-renal','Avaliacao Hormonal'], sex:'MF', urg:'electiva',
    refType:'Electiva (criterios imagiologicos e hormonais)',
    fields:[
      {l:'Dimensao (mm)',                    t:'number', p:'ex: 28'},
      {l:'Contexto de descoberta',           t:'select', o:['TC abdominal por outro motivo','Ecografia','RMN','Follow-up de neoplasia conhecida']},
      {l:'Caracteristicas TC (HU pre-contraste)', t:'number', p:'ex: 18'},
      {l:'Cortisol pos-dexametasona 1mg',    t:'select', o:['Nao realizado','< 1.8 mcg/dL (normal)','1.8-5 mcg/dL (hipersecrecao autonoma)','> 5 mcg/dL (Cushing)']},
      {l:'Metanefrinas (urinarias/plasmaticas)', t:'select', o:['Nao realizado','Normais','Elevadas - suspeita feocromocitoma']},
      {l:'Aldosterona/renina (se HTA ou hipocaliemia)', t:'select', o:['Nao realizado','Normal','Ratio elevado - suspeita hiperaldosteronismo primario']},
      {l:'DHEA-S',                           t:'select', o:['Nao realizado','Normal','Elevado - suspeita carcinoma adrenal']},
      {l:'Observacoes clinicas',             t:'area',   p:'Informacao clinica adicional...', full:true}
    ]
  },

  {
    id:'peniana', cat:'maligna', live:false, isNew:false,
    acc:'red', icon:'🩺',
    title:'Lesoes Penianas', spec:'Oncologia', group:'Grupo Andrologia',
    desc:'Reconhecimento de lesoes penianas suspeitas. Diagnostico diferencial e referenciacao urgente.',
    tags:['Lesoes Penianas','Carcinoma'], sex:'M', urg:'urgente',
    refType:'Urgente (suspeita de carcinoma peniano)',
    fields:[
      {l:'Localizacao da lesao',         t:'select', o:['Prepucio','Glande','Sulco balanoprepucial','Corpo peniano','Multiplas']},
      {l:'Aspecto',                      t:'select', o:['Ulcera','Placa eritematosa','Massa exofitica','Verruga / condiloma','Leucoplasia']},
      {l:'Duracao estimada',             t:'select', o:['< 1 mes','1-6 meses','> 6 meses','Desconhecida']},
      {l:'Fimose associada',             t:'select', o:['Ausente','Presente - visualizacao parcial','Presente - nao visualizado']},
      {l:'Adenopatias inguinais',        t:'select', o:['Ausentes','Presentes - reativas (< 2 cm)','Presentes - suspeitas (> 2 cm / duras)']},
      {l:'IST conhecida',                t:'select', o:['Nao','HPV / Condilomatose','Sifilis','Outra']},
      {l:'Observacoes clinicas',         t:'area',   p:'Descricao detalhada da lesao...', full:true}
    ]
  },

  {
    id:'massaRenal', cat:'maligna', live:false, isNew:false,
    acc:'red', icon:'🫁',
    title:'Massas Renais', spec:'Oncologia', group:'Grupo Rim',
    desc:'Abordagem de massas renais solidas. Caracterizacao por TC e criterios de referenciacao.',
    tags:['Massa Renal','Nodulo Renal','TC'], sex:'MF', urg:'electiva',
    refType:'Electiva (solida ou Bosniak III+)',
    fields:[
      {l:'Dimensao (mm)',                t:'number', p:'ex: 35'},
      {l:'Rim afectado',                 t:'select', o:['Direito','Esquerdo','Bilateral']},
      {l:'Caracteristicas imagiologicas',t:'select', o:['Solida - realce pos-contraste','Solida - sem realce','Solida - heterogenea','Componente quistico (Bosniak)']},
      {l:'HU pre-contraste',             t:'number', p:'ex: 42'},
      {l:'Sintomas',                     t:'select', o:['Assintomatico (incidental)','Hematuria','Dor lombar','Massa palpavel','Sindrome paraneoplasica']},
      {l:'TC com contraste',             t:'select', o:['Sim - reportado','Sim - por reportar','Nao - ecografia apenas']},
      {l:'Observacoes clinicas',         t:'area',   p:'Informacao clinica adicional...', full:true}
    ]
  },

  {
    id:'massaTest', cat:'maligna', live:false, isNew:false,
    acc:'red', icon:'🔵',
    title:'Massas Testiculares', spec:'Oncologia', group:'Centro de Referencia - Ca Testiculo',
    desc:'Massas escrotais suspeitas. Marcadores tumorais, ecografia e referenciacao urgente.',
    tags:['Massa Escrotal','Marcadores Tumorais'], sex:'M', urg:'urgente',
    refType:'Urgente (qualquer massa testicular solida)',
    fields:[
      {l:'Idade',                        t:'number', p:'ex: 28'},
      {l:'Testiculo afectado',           t:'select', o:['Direito','Esquerdo','Bilateral']},
      {l:'Dimensao na ecografia (mm)',   t:'number', p:'ex: 22'},
      {l:'Ecografia escrotal',           t:'select', o:['Nao realizada','Nodulo solido hipoecoico','Massa solida heterogenea','Calcificacoes','Hidrocelo associado']},
      {l:'AFP (ng/mL)',                  t:'number', p:'ex: 12.4'},
      {l:'Beta-HCG (mUI/mL)',           t:'number', p:'ex: 5.2'},
      {l:'LDH (U/L)',                    t:'number', p:'ex: 180'},
      {l:'Criptorquidia previa',         t:'select', o:['Nao','Sim - corrigida cirurgicamente','Sim - nao corrigida']},
      {l:'Observacoes clinicas',         t:'area',   p:'Informacao clinica adicional...', full:true}
    ]
  },

  {
    id:'quistos', cat:'maligna', live:false, isNew:false,
    acc:'gold', icon:'🫘',
    title:'Quistos Renais', spec:'Oncologia', group:'Grupo Rim',
    desc:'Classificacao de Bosniak. Vigilancia, referenciacao ou intervencao conforme categoria.',
    tags:['Bosniak','Quisto Renal','Follow-up'], sex:'MF', urg:'electiva',
    refType:'Conforme classificacao Bosniak (I-IV)',
    fields:[
      {l:'Classificacao Bosniak',        t:'select', o:['I - Simples benigno','II - Minimamente complicado','IIF - Follow-up necessario','III - Indeterminado','IV - Maligno']},
      {l:'Dimensao (mm)',                t:'number', p:'ex: 45'},
      {l:'Rim afectado',                 t:'select', o:['Direito','Esquerdo','Bilateral']},
      {l:'Septacoes / calcificacoes',    t:'select', o:['Ausentes','Septacoes finas','Septacoes espessas','Calcificacoes nodulares']},
      {l:'Realce pos-contraste',         t:'select', o:['Sem realce','Realce de septacoes','Realce de componente solido','Nao avaliavel']},
      {l:'Seguimento previo',            t:'select', o:['Novo diagnostico','Estavel > 2 anos','Crescimento documentado']},
      {l:'Observacoes clinicas',         t:'area',   p:'Informacao clinica adicional...', full:true}
    ]
  },

  /* ── UROLOGIA FUNCIONAL & BENIGNA ── */

  {
    id:'colica', cat:'benigna', live:true, isNew:true,
    acc:'gold', icon:'🪨', url:'colicarenal.html',
    title:'Colica Renal', spec:'Litiase', group:'Grupo Litiase',
    desc:'Avaliacao e abordagem inicial da colica renal. Indicacoes para referenciacao urgente e tratamento expulsivo em CSP.',
    tags:['Colica Renal','Tratamento Expulsivo','Alfa-bloqueador'], sex:'MF', urg:'urgente',
    refType:'Urgente (febre/rim unico) / Electiva (falha expulsiva)',
    fields:[
      {l:'Dimensao do calculo (mm)',     t:'number', p:'ex: 5'},
      {l:'Dias desde inicio',            t:'number', p:'ex: 3'},
      {l:'Localizacao',                  t:'select', o:['Ureter proximal','Ureter medio','Ureter distal / JUV','Pelvis renal','Nao visualizado']},
      {l:'Temperatura (C)',              t:'number', p:'ex: 36.8'},
      {l:'Hidronefrose',                 t:'select', o:['Ausente','Ligeira','Moderada','Grave']},
      {l:'Rim unico / transplantado',    t:'select', o:['Nao','Sim']},
      {l:'Tratamento expulsivo',         t:'select', o:['Nao iniciado','AINE','AINE + Tamsulosina','Intolerante / CI']},
      {l:'Observacoes clinicas',         t:'area',   p:'Informacao clinica adicional...', full:true}
    ]
  },

  {
    id:'bexigaHip', cat:'benigna', live:false, isNew:false,
    acc:'green', icon:'⚡',
    title:'Bexiga Hiperativa', spec:'Urologia Funcional', group:'Grupo Funcional',
    desc:'Diagnostico e tratamento da sindrome de bexiga hiperativa. Farmacoterapia de 1a linha.',
    tags:['Bexiga Hiperativa','Urgencia','Anticolinergicos'], sex:'MF', urg:'electiva',
    refType:'Electiva (falha de 2 linhas terapeuticas)',
    fields:[
      {l:'Sintoma predominante',         t:'select', o:['Urgencia isolada (OAB-dry)','Urgencia + Incontinencia (OAB-wet)','Mista (urgencia + esforco)','Frequencia / Nocturia']},
      {l:'Episodios de urgencia / dia',  t:'number', p:'ex: 6'},
      {l:'Perdas de urina / dia',        t:'number', p:'ex: 2'},
      {l:'Nocturia (no. episodios)',     t:'number', p:'ex: 3'},
      {l:'Tratamento 1a linha',          t:'select', o:['Nao iniciado','Exercicios pavimento pelvico','Fisioterapia + biofeedback','Treino vesical']},
      {l:'Anticolinergico em curso',     t:'select', o:['Nenhum','Solifenacina','Tolterodina','Oxibutinina','Fesoterodina']},
      {l:'Beta-3 agonista em curso',     t:'select', o:['Nenhum','Mirabegron (50 mg)','Vibegron']},
      {l:'Patologia neurologica',        t:'select', o:['Ausente','Esclerose Multipla','Doenca de Parkinson','AVC / Lesao Medular']},
      {l:'Observacoes clinicas',         t:'area',   p:'Informacao clinica adicional...', full:true}
    ]
  },

  {
    id:'cistite', cat:'benigna', live:false, isNew:false,
    acc:'teal', icon:'🧪',
    title:'Cistite de Repeticao', spec:'Infeccao Urinaria', group:'Servico de Urologia',
    desc:'Prevencao da cistite de repeticao. Profilaxia antibiotica e alternativas nao antibioticas.',
    tags:['ITU','Profilaxia','Mulher'], sex:'F', urg:'electiva',
    refType:'Electiva (casos refractarios ou complicados)',
    fields:[
      {l:'Frequencia de episodios',      t:'select', o:['2+ em 6 meses','3+ em 12 meses','4+ por ano']},
      {l:'Urocultura ultimo episodio',   t:'select', o:['Nao realizada','E. coli sensivel','E. coli resistente (ESBL)','Outro germe - especificar em obs.']},
      {l:'Relacao com actividade sexual',t:'select', o:['Nao relacionado','Possivel relacao','Claramente pos-coital']},
      {l:'Estado menopausico',           t:'select', o:['Pre-menopausa','Peri-menopausa','Pos-menopausa - sem TH local','Pos-menopausa - com TH local']},
      {l:'Profilaxia actual',            t:'select', o:['Nenhuma','Antibiotico diario','Antibiotico pos-coital','D-Manose','Arando vermelho (cranberry)']},
      {l:'Ecografia urinaria',           t:'select', o:['Normal','Nao realizada','Anomalia anatomica','Residuo pos-miccional > 100 mL']},
      {l:'Observacoes clinicas',         t:'area',   p:'Informacao clinica adicional...', full:true}
    ]
  },

  {
    id:'curvatura', cat:'benigna', live:false, isNew:false,
    acc:'blue', icon:'↩️',
    title:'Curvatura Peniana', spec:'Saude Sexual', group:'Grupo Andrologia',
    desc:'Doenca de Peyronie e curvatura congenita. Avaliacao e opcoes terapeuticas.',
    tags:['Peyronie','Curvatura','Saude Sexual'], sex:'M', urg:'electiva',
    refType:'Electiva (doenca estavel 12+ meses)',
    fields:[
      {l:'Etiologia provavel',           t:'select', o:['Doenca de Peyronie','Curvatura congenita','Pos-traumatica','Desconhecida']},
      {l:'Angulo estimado de curvatura', t:'select', o:['< 30 graus','30-60 graus','> 60 graus','Sem curvatura (encurtamento / indentacao)']},
      {l:'Placa palpavel',               t:'select', o:['Sim','Nao','Calcificacao extensa']},
      {l:'Fase da doenca',               t:'select', o:['Aguda (< 12 meses, progressiva)','Cronica estavel (> 12 meses)']},
      {l:'Disfuncao eretil associada',   t:'select', o:['Ausente','Ligeira-moderada (iPDE5 eficaz)','Grave (iPDE5 ineficaz)']},
      {l:'Actividade sexual preservada', t:'select', o:['Sim - sem dificuldade','Sim - com dificuldade','Nao - curvatura impede penetracao']},
      {l:'Observacoes clinicas',         t:'area',   p:'Informacao clinica adicional...', full:true}
    ]
  },

  {
    id:'de', cat:'benigna', live:false, isNew:false,
    acc:'blue', icon:'❤️',
    title:'Disfuncao Eretil', spec:'Saude Sexual', group:'Grupo Andrologia',
    desc:'Avaliacao em MGF. Factores cardiovasculares e farmacoterapia de 1a linha.',
    tags:['Disfuncao Eretil','iPDE5'], sex:'M', urg:'electiva',
    refType:'Electiva (falha iPDE5 em 2 farmacos)',
    fields:[
      {l:'Score IIEF-5 (0-25)',          t:'number', p:'ex: 12'},
      {l:'Duracao (meses)',              t:'number', p:'ex: 18'},
      {l:'Factores de risco cardiovascular', t:'select', o:['Ausentes','HTA isolada','HTA + Dislipidemia','Diabetes Mellitus','Sindrome Metabolico','Tabagismo activo']},
      {l:'Testosterona total (ng/dL)',   t:'number', p:'ex: 320'},
      {l:'iPDE5 ja tentado',             t:'select', o:['Nenhum','Sildenafil 50-100 mg','Tadalafil 10-20 mg / 5 mg diario','Vardenafil','Dois ou mais - sem eficacia']},
      {l:'Cirurgia pelvica / RT previa', t:'select', o:['Nao','Prostatectomia radical','RT prostatica','Outra cirurgia pelvica']},
      {l:'Hipogonadismo documentado',    t:'select', o:['Nao','Sim - em tratamento','Sim - sem tratamento']},
      {l:'Observacoes clinicas',         t:'area',   p:'Informacao clinica adicional...', full:true}
    ]
  },

  {
    id:'em', cat:'benigna', live:false, isNew:false,
    acc:'navy', icon:'🧠',
    title:'Esclerose Multipla', spec:'Neurourologia', group:'Grupo Funcional',
    desc:'Manifestacoes urologicas da EM. Disfuncao vesical neurogenica e articulacao com Neurourologia.',
    tags:['Bexiga Neurogenica','Neurourologia','EM'], sex:'MF', urg:'electiva',
    refType:'Electiva (sintomas vesicais na EM)',
    fields:[
      {l:'Tipo de EM',                   t:'select', o:['Recidivante-remitente (RRMS)','Progressiva primaria (PPMS)','Progressiva secundaria (SPMS)']},
      {l:'Sintoma urinario predominante',t:'select', o:['Urgencia / Urge-incontinencia','Frequencia excessiva','Retencao / Esvaziamento incompleto','Misto']},
      {l:'Residuo pos-miccional (mL)',   t:'number', p:'ex: 150'},
      {l:'Infeccoes urinarias recorrentes', t:'select', o:['Nao','Sim < 3/ano','Sim 3+ por ano (risco renal)']},
      {l:'Cateterismo intermitente',     t:'select', o:['Nao iniciado','Auto-cateterismo','Cateterismo assistido']},
      {l:'Medicacao vesical em curso',   t:'select', o:['Nenhuma','Anticolinergico','Beta-3 agonista','Combinacao']},
      {l:'Observacoes clinicas',         t:'area',   p:'Informacao clinica adicional...', full:true}
    ]
  },

  {
    id:'iueF', cat:'benigna', live:false, isNew:false,
    acc:'green', icon:'👩',
    title:'Incontinencia de Esforco Feminina', spec:'Urologia Funcional', group:'Grupo Funcional',
    desc:'Avaliacao e abordagem da incontinencia urinaria de esforco na mulher.',
    tags:['Incontinencia','Pavimento Pelvico','Mulher'], sex:'F', urg:'electiva',
    refType:'Electiva (apos 3 meses de fisioterapia sem melhoria)',
    fields:[
      {l:'Tipo de incontinencia',        t:'select', o:['Esforco puro','Mista (esforco + urgencia)','Urgencia dominante']},
      {l:'Grau de perdas (ICIQ-SF)',     t:'select', o:['Ligeiro (1-5 pts)','Moderado (6-12 pts)','Grave (13-18 pts)','Muito grave (19-21 pts)']},
      {l:'Partos vaginais (no.)',        t:'number', p:'ex: 2'},
      {l:'Peso ao nascer do maior filho (g)', t:'number', p:'ex: 3800'},
      {l:'IMC',                          t:'number', p:'ex: 27.5'},
      {l:'Fisioterapia pavimento pelvico', t:'select', o:['Nao realizada','Em curso (< 3 meses)','Realizada - sem beneficio','Realizada - beneficio parcial']},
      {l:'Prolapso associado',           t:'select', o:['Ausente','Cistocelo grau I-II','Cistocelo grau III-IV','Prolapso apical']},
      {l:'Observacoes clinicas',         t:'area',   p:'Informacao clinica adicional...', full:true}
    ]
  },

  {
    id:'iueM', cat:'benigna', live:false, isNew:false,
    acc:'green', icon:'👨',
    title:'Incontinencia de Esforco Masculina', spec:'Urologia Funcional', group:'Grupo Funcional',
    desc:'Incontinencia urinaria de esforco no homem, frequentemente pos-prostatectomia.',
    tags:['IUE Masculina','Pos-prostatectomia'], sex:'M', urg:'electiva',
    refType:'Electiva (12+ meses pos-cirurgia prostatica)',
    fields:[
      {l:'Causa provavel',               t:'select', o:['Pos-prostatectomia radical (LRP/RARP/RAP)','Pos-RTU-P','Pos-radioterapia prostatica','Idiopatica']},
      {l:'Tempo pos-cirurgia (meses)',   t:'number', p:'ex: 14'},
      {l:'Pensos / dia',                 t:'number', p:'ex: 3'},
      {l:'Pad test 24h (g)',             t:'number', p:'ex: 180'},
      {l:'Fisioterapia pavimento pelvico', t:'select', o:['Nao realizada','Em curso (< 12 meses)','Realizada - sem beneficio']},
      {l:'Radioterapia previa',          t:'select', o:['Nao','Sim - EBRT','Sim - Braquiterapia','Sim - EBRT + Braquiterapia']},
      {l:'Observacoes clinicas',         t:'area',   p:'Informacao clinica adicional...', full:true}
    ]
  },

  {
    id:'luts', cat:'benigna', live:false, isNew:false,
    acc:'green', icon:'🩺',
    title:'LUTS / HBP', spec:'Sintomas LUTS', group:'Grupo Prostata',
    desc:'Abordagem dos LUTS. Tratamento medico em MGF, criterios de referenciacao e HoLEP.',
    tags:['LUTS','HBP','Alfa-bloqueadores','HoLEP'], sex:'M', urg:'electiva',
    refType:'Electiva (falha medica, complicacoes ou retencao)',
    fields:[
      {l:'Score IPSS (0-35)',            t:'number', p:'ex: 18'},
      {l:'Qualidade de vida IPSS (0-6)', t:'number', p:'ex: 4'},
      {l:'Fluxo maximo Qmax (mL/s)',    t:'number', p:'ex: 9'},
      {l:'Residuo pos-miccional (mL)',   t:'number', p:'ex: 120'},
      {l:'PSA (ng/mL)',                  t:'number', p:'ex: 2.8'},
      {l:'Volume prostatico estimado (mL)', t:'number', p:'ex: 55'},
      {l:'Medicacao actual',             t:'select', o:['Nenhuma','Alfa-bloqueador','5-alfa-redutase','Alfa-bloqueador + 5AR','Outro']},
      {l:'Retencao urinaria aguda previa', t:'select', o:['Nao','Sim - 1 episodio','Sim - recorrente']},
      {l:'Observacoes clinicas',         t:'area',   p:'Informacao clinica adicional...', full:true}
    ]
  },

  {
    id:'litiase', cat:'benigna', live:false, isNew:false,
    acc:'gold', icon:'💎',
    title:'Litiase Urinaria', spec:'Litiase', group:'Grupo Litiase',
    desc:'Prevencao da recorrencia da litiase. Avaliacao metabolica e medidas dieteticas.',
    tags:['Litiase','Prevencao','Metabolismo'], sex:'MF', urg:'electiva',
    refType:'Electiva (recorrente, coraliforme ou refractaria)',
    fields:[
      {l:'No. de episodios previos',     t:'number', p:'ex: 3'},
      {l:'Composicao do calculo (se conhecida)', t:'select', o:['Desconhecida','Oxalato de calcio monohidrato','Oxalato de calcio di-hidrato','Acido urico','Estruvite','Cistina']},
      {l:'Localizacao habitual',         t:'select', o:['Rim direito','Rim esquerdo','Bilateral','Ureteres']},
      {l:'Calcio serico (mg/dL)',        t:'number', p:'ex: 10.2'},
      {l:'Acido urico serico (mg/dL)',   t:'number', p:'ex: 6.8'},
      {l:'Ingestao hidrica estimada (L/dia)', t:'number', p:'ex: 1.5'},
      {l:'Avaliacao metabolica urina 24h', t:'select', o:['Nao realizada','Normal','Hipercalciuria','Hiperoxaluria','Hipocitraturia','Hiperuricosuria']},
      {l:'Observacoes clinicas',         t:'area',   p:'Informacao clinica adicional...', full:true}
    ]
  },

  {
    id:'neuro', cat:'benigna', live:false, isNew:false,
    acc:'navy', icon:'⚡',
    title:'Neurourologia', spec:'Neurourologia', group:'Grupo Funcional',
    desc:'Disfuncao vesical em Parkinson, lesao medular e AVC. Avaliacao urodinamica.',
    tags:['Neurourologia','Bexiga Neurogenica','Urodinamica'], sex:'MF', urg:'electiva',
    refType:'Electiva',
    fields:[
      {l:'Patologia neurologica de base',t:'select', o:['Doenca de Parkinson','Lesao Medular','AVC','Esclerose Multipla','Espinha Bifida','Outra']},
      {l:'Nivel lesao medular (se LM)',  t:'select', o:['N/A','Cervical (C1-C8)','Toracico (T1-T12)','Lombar','Sacral']},
      {l:'Sintoma predominante',         t:'select', o:['Urgencia / Urge-incontinencia','Retencao cronica','Dissinergia detrusor-esfinter','Misto']},
      {l:'Residuo pos-miccional (mL)',   t:'number', p:'ex: 200'},
      {l:'CIC (cateterismo intermitente)', t:'select', o:['Nao realizado','Auto-CIC','CIC assistido','Cateter permanente']},
      {l:'ITU recorrente (por ano)',     t:'select', o:['Nao','1-2/ano','3+ por ano']},
      {l:'Observacoes clinicas',         t:'area',   p:'Informacao clinica adicional...', full:true}
    ]
  },

  {
    id:'nocturia', cat:'benigna', live:false, isNew:false,
    acc:'navy', icon:'🌙',
    title:'Nocturia', spec:'Urologia Funcional', group:'Grupo Prostata',
    desc:'Abordagem da nocturia. Diagnostico diferencial e opcoes incluindo desmopressina.',
    tags:['Nocturia','Diario Miccional','Desmopressina'], sex:'MF', urg:'electiva',
    refType:'Electiva (3+ episodios/noite refractarios)',
    fields:[
      {l:'Episodios de nocturia por noite', t:'number', p:'ex: 3'},
      {l:'Diario miccional realizado',   t:'select', o:['Nao','Sim - poliuria nocturna (> 33% debito diario)','Sim - capacidade vesical reduzida','Sim - misto']},
      {l:'Causa provavel',               t:'select', o:['Poliuria nocturna','Bexiga hiperativa','LUTS / HBP','Apneia do sono','Insuficiencia cardiaca / Venosa','Polidipsia']},
      {l:'Producao urinaria nocturna (mL)', t:'number', p:'ex: 1200'},
      {l:'Desmopressina ja tentada',     t:'select', o:['Nao','Sim - eficaz','Sim - sem eficacia','Contraindicada (hiponatremia / ICC)']},
      {l:'Sodio serico (mEq/L)',         t:'number', p:'ex: 138'},
      {l:'Observacoes clinicas',         t:'area',   p:'Informacao clinica adicional...', full:true}
    ]
  },

  {
    id:'prolapso', cat:'benigna', live:false, isNew:false,
    acc:'green', icon:'🔽',
    title:'Prolapso de Orgaos Pelvicos', spec:'Urologia Funcional', group:'Grupo Funcional',
    desc:'Avaliacao e estadiamento do prolapso. Abordagem conservadora em MGF.',
    tags:['Prolapso','Pavimento Pelvico','Mulher'], sex:'F', urg:'electiva',
    refType:'Electiva (grau II+ sintomatico)',
    fields:[
      {l:'Tipo de prolapso',             t:'select', o:['Cistocelo (parede anterior)','Rectocelo (parede posterior)','Prolapso apical (utero/cupula)','Prolapso total','Misto']},
      {l:'Grau POP-Q',                   t:'select', o:['Grau I (acima do himen)','Grau II (ao nivel do himen)','Grau III (alem do himen < 2 cm)','Grau IV (eversao completa)']},
      {l:'Sintomas de esvaziamento',     t:'select', o:['Ausentes','Jacto fraco','Esvaziamento incompleto','Retencao / Manobra de reducao']},
      {l:'Incontinencia urinaria associada', t:'select', o:['Ausente','Esforco','Urgencia','Oculta (surge apos reducao)']},
      {l:'Pesario vaginal tentado',      t:'select', o:['Nao','Sim - com beneficio','Sim - sem tolerancia','Contraindicado']},
      {l:'Fisioterapia pavimento pelvico', t:'select', o:['Nao realizada','Em curso','Realizada - beneficio insuficiente']},
      {l:'Observacoes clinicas',         t:'area',   p:'Informacao clinica adicional...', full:true}
    ]
  }

];

/* ═══════════════════════════════════════════════════
   DECISION TREES
   Only PSA and Colica Renal have full validated trees.
   Additional trees will be added progressively.
═══════════════════════════════════════════════════ */
var TREES = {

  psa: {
    nodes: {
      // Fluxo Inicial: Esperança de Vida
      s0: {
        q: 'O doente tem esperança média de vida estimada > 10 anos?',
        y: 'sB0', n: 'sA1'
      },

      // --- FLUXO A (Esperança de vida < 10 anos) ---
      sA1: {
        q: 'O PSA total é superior a 40 ng/mL?',
        y: 'rUrgent', n: 'sA11'
      },
      sA11: {
        q: 'Existem sintomas de doença avançada (dor óssea, astenia, anorexia, perda de peso)?',
        y: 'rUrgent', n: 'rStopPSA'
      },

      // --- FLUXO B (Esperança de vida > 10 anos) ---
      sB0: {
        q: 'O Toque Rectal [se realizado - opcional] é suspeito (nódulo endurecido, bordos irregulares ou induração)?',
        y: 'rRefer', n: 'sB1'
      },
      sB1: {
        q: 'O PSA é > 10 ng/mL?',
        y: 'rReferTests', n: 'sB2'
      },
      sB2: {
        q: 'O PSA está entre 3 e 10 ng/mL?',
        y: 'sB2_CheckDone', n: 'sUS_Check_B3'
      },
      sB2_CheckDone: {
        q: 'Já realizou PSA livre/total e Ecografia Transrectal (V. Prostático)?',
        y: 'sB21', n: 'rRepeatTests'
      },
      sB21: {
        q: 'Algum critério de gravidade: Rácio L/T < 18% ou Densidade PSA > 0.15 ou risco cancro clinicamente significativo >5% em calculador de risco (ex: riskcalc.org/PCPTRC )?',
        y: 'rRefer', n: 'sUS_Check_B2'
      },

      // --- Pergunta Adicional Final (Ecografia) para Fluxos B ---
      sUS_Check_B2: {
        q: 'Ecografia Prostática suspeita (Nódulo > 1.5cm, bordos irregulares ou cápsula irregular)?',
        y: 'rRefer', n: 'rMonitor1y'
      },
      sUS_Check_B3: {
        q: 'Ecografia Prostática suspeita (Nódulo > 1.5cm, bordos irregulares ou cápsula irregular)?',
        y: 'rRefer', n: 'rMonitor2y'
      }
    },
    results: {
      rUrgent:      {cls:'r-urg', lbl:'REFERENCIAÇÃO URGENTE',  title:'Referenciar para Urologia',                      body:'Suspeita de doença avançada ou PSA muito elevado em doente com baixa esperança de vida.',                                                                    ref:true},
      rRefer:       {cls:'r-ele', lbl:'REFERENCIAR UROLOGIA',   title:'Referenciar para consulta de especialidade',     body:'Critérios de referenciação preenchidos (TR suspeito, PSA elevado com fatores de risco ou ECO suspeita).',                                                  ref:true},
      rReferTests:  {cls:'r-ele', lbl:'REFERENCIAR UROLOGIA',   title:'Pedir exames e referenciar',                     body:'PSA > 10. Solicitar PSA Livre/Total e Ecografia Transrectal (vol. prostático) e encaminhar para Urologia.',                                               ref:true},
      rStopPSA:     {cls:'r-mgf', lbl:'CESSAR RASTREIO',        title:'Sem indicação para referenciação',               body:'Esperança de vida < 10 anos. Sugere-se não realizar novos doseamentos de PSA, exceto se surgirem novos sintomas.',                                         ref:false},
      rRepeatTests: {cls:'r-mon', lbl:'PEDIR EXAMES',           title:'Completar estudo analítico e imagiológico',      body:'PSA entre 3-10. Necessário dosear PSA livre/total e realizar Eco Transrectal antes da decisão de referenciação.',                                          ref:false},
      rMonitor1y:   {cls:'r-mon', lbl:'VIGILÂNCIA 1 ANO',       title:'Repetir avaliação em 12 meses',                  body:'PSA 3-10 com rácio, densidade e ecografia normais. Manter seguimento em MGF.',                                                                             ref:false},
      rMonitor2y:   {cls:'r-mgf', lbl:'VIGILÂNCIA 2 ANOS',      title:'Repetir avaliação em 24 meses',                  body:'PSA < 3 ng/mL e avaliação clínica/ecográfica normal. Manter rastreio oportunista em MGF.',                                                               ref:false}
    }
  },

  colica: {
    nodes: {
      s0: {
        q:'Existe febre > 38 graus C ou sinais clinicos de sepsis (taquicardia, hipotensao)?',
        note:'Colica + febre = emergencia urologica. Nao enviar para domicilio.',
        y:'rUrgSepsis', n:'s1'
      },
      s1: {
        q:'O doente tem rim unico funcional, rim transplantado ou obstrucao bilateral documentada?',
        y:'rUrgRim', n:'s2'
      },
      s2: {
        q:'O calculo visualizado em imagem tem dimensao > 10 mm?',
        y:'rElectiveLarge', n:'s3'
      },
      s3: {
        q:'A colica tem mais de 7 dias de evolucao sem melhoria clinica ou expulsao documentada?',
        y:'rElectiveFail', n:'rExpulsive'
      }
    },
    results: {
      rUrgSepsis:     {cls:'r-urg', lbl:'EMERGENCIA UROLOGICA',       title:'Enviar para SU - sepsis urinaria obstrutiva',          body:'Sepsis urinaria obstrutiva requer drenagem urgente (cateter JJ ou nefrostomia). Accionar emergencia ou transporte urgente para SU com urologista de chamada.',  ref:false},
      rUrgRim:        {cls:'r-urg', lbl:'REFERENCIACAO URGENTE',      title:'Contactar Urologia - rim unico ou obstrucao bilateral',body:'Qualquer grau de obstrucao num rim unico funcional e urgencia urologica. Contactar directamente o urologista de chamada. Nao aguardar consulta electiva.',   ref:false},
      rElectiveLarge: {cls:'r-ele', lbl:'REFERENCIACAO ELECTIVA',     title:'Referenciar - calculo com baixa probabilidade expulsiva', body:'Calculos > 10 mm raramente expulsam espontaneamente. Referenciar para avaliacao de intervencao activa (ureteroscopia ou ESWL). Analgesia de suporte.',     ref:true},
      rElectiveFail:  {cls:'r-ele', lbl:'REFERENCIACAO ELECTIVA',     title:'Referenciar - falha de tratamento expulsivo',          body:'Apos 7 dias sem expulsao, a probabilidade de expulsao espontanea diminui significativamente. Referenciar para avaliacao de intervencao.',                      ref:true},
      rExpulsive:     {cls:'r-mgf', lbl:'TRATAMENTO EXPULSIVO EM CSP', title:'Iniciar tratamento expulsivo - manter em MGF',         body:'Calculo <= 10 mm, afebreto, rim nao unico, < 7 dias de evolucao. Iniciar Tamsulosina 0.4 mg/dia + AINE. Reavaliar em 2-4 semanas com Rx simples.',       ref:false}
    }
  }

};
