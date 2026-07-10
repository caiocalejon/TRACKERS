// =====================================================================
// SISTEMA DE ESTATÍSTICAS E PLACAR
// =====================================================================
const STATS = {
    data: {
        plays: 0,
        volupia: { ambulancia: 0, preso: 0, tetopreto: 0, darkroom: 0, trisal: 0 },
        targets: { loiro: 0, moreno: 0, volatille: 0, ruivo: 0, negro: 0, thomas: 0 }
    },
    init() {
        const saved = localStorage.getItem('trackers_stats_v2');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                this.data = { ...this.data, ...parsed };
                if(!this.data.volupia) this.data.volupia = { ambulancia: 0, preso: 0, tetopreto: 0, darkroom: 0, trisal: 0 };
            } catch(e) { console.error("Erro ao ler estatísticas."); }
        }
    },
    save() {
        localStorage.setItem('trackers_stats_v2', JSON.stringify(this.data));
    },
    addPlay() {
        this.data.plays++;
        this.save();
    },
    addVolupia(type) {
        if(this.data.volupia[type] !== undefined) {
            this.data.volupia[type]++;
            this.save();
        }
    },
    addEnding(targetId1, targetId2 = null) {
        if(targetId1 && this.data.targets[targetId1] !== undefined) this.data.targets[targetId1]++;
        if(targetId2 && this.data.targets[targetId2] !== undefined) this.data.targets[targetId2]++;
        this.save();
    }
};

function toggleScoreboard() {
    const overlay = document.getElementById('scoreboard-overlay');
    if(overlay.style.display === 'none') {
        STATS.init();
        document.getElementById('sb-plays').innerText = STATS.data.plays;
        
        document.getElementById('sb-ambulancia').innerText = STATS.data.volupia.ambulancia;
        document.getElementById('sb-preso').innerText = STATS.data.volupia.preso;
        document.getElementById('sb-tetopreto').innerText = STATS.data.volupia.tetopreto;
        document.getElementById('sb-darkroom').innerText = STATS.data.volupia.darkroom;
        document.getElementById('sb-trisal').innerText = STATS.data.volupia.trisal;

        for(let key in STATS.data.targets) {
            const el = document.getElementById(`sb-${key}`);
            if(el) el.innerText = STATS.data.targets[key];
        }
        overlay.style.display = 'flex';
    } else {
        overlay.style.display = 'none';
    }
}

const ASSETS = {
    UBER_SVG: `<svg viewBox="0 0 160 80" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto;"><rect x="12" y="26" width="136" height="34" fill="#2a2a2a" rx="2"/><rect x="20" y="16" width="80" height="18" fill="#3a3a3a" rx="2"/><rect x="22" y="14" width="76" height="6" fill="#4a4a4a" rx="1"/><rect x="26" y="18" width="16" height="12" fill="#88ccff" rx="1"/><rect x="48" y="18" width="16" height="12" fill="#88ccff" rx="1"/><rect x="70" y="18" width="16" height="12" fill="#88ccff" rx="1"/><rect x="28" y="20" width="6" height="2" fill="rgba(255,255,255,0.3)"/><rect x="50" y="20" width="6" height="2" fill="rgba(255,255,255,0.3)"/><rect x="72" y="20" width="6" height="2" fill="rgba(255,255,255,0.3)"/><rect x="8" y="32" width="8" height="6" fill="#ffee00" rx="1"/><rect x="144" y="32" width="8" height="6" fill="#ff4444" rx="1"/><rect x="6" y="30" width="4" height="10" fill="#ffaa00" rx="1"/><rect x="150" y="30" width="4" height="10" fill="#cc2222" rx="1"/><rect x="16" y="34" width="6" height="12" fill="#555" rx="1"/><rect x="16" y="40" width="6" height="2" fill="#777"/><rect x="32" y="58" width="18" height="14" fill="#111" rx="2"/><rect x="36" y="60" width="10" height="10" fill="#444" rx="1"/><rect x="38" y="62" width="6" height="6" fill="#666" rx="1"/><rect x="110" y="58" width="18" height="14" fill="#111" rx="2"/><rect x="114" y="60" width="10" height="10" fill="#444" rx="1"/><rect x="116" y="62" width="6" height="6" fill="#666" rx="1"/><rect x="16" y="46" width="128" height="2" fill="#444"/><rect x="22" y="50" width="116" height="2" fill="#555"/><rect x="0" y="18" width="16" height="2" fill="rgba(255,255,255,0.3)"/><rect x="4" y="28" width="22" height="2" fill="rgba(255,255,255,0.25)"/><rect x="0" y="38" width="26" height="2" fill="rgba(255,255,255,0.2)"/><rect x="80" y="12" width="18" height="2" fill="rgba(255,255,255,0.25)"/><rect x="90" y="22" width="14" height="2" fill="rgba(255,255,255,0.2)"/></svg>`,
    METRO_SVG: `<svg viewBox="0 0 160 80" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto;"><rect x="10" y="20" width="140" height="38" fill="#1a3a5a" rx="2"/><rect x="15" y="15" width="130" height="12" fill="#2a4a6a" rx="2"/><rect x="25" y="22" width="14" height="14" fill="#aaddff" rx="1"/><rect x="43" y="22" width="14" height="14" fill="#aaddff" rx="1"/><rect x="61" y="22" width="14" height="14" fill="#aaddff" rx="1"/><rect x="79" y="22" width="14" height="14" fill="#aaddff" rx="1"/><rect x="97" y="22" width="14" height="14" fill="#aaddff" rx="1"/><rect x="115" y="22" width="14" height="14" fill="#aaddff" rx="1"/><rect x="28" y="28" width="4" height="6" fill="#a67c52"/><rect x="46" y="28" width="4" height="6" fill="#a67c52"/><rect x="64" y="28" width="4" height="6" fill="#a67c52"/><rect x="82" y="28" width="4" height="6" fill="#a67c52"/><rect x="100" y="28" width="4" height="6" fill="#a67c52"/><rect x="118" y="28" width="4" height="6" fill="#a67c52"/><rect x="36" y="22" width="10" height="20" fill="#88aacc" rx="1"/><rect x="54" y="22" width="10" height="20" fill="#88aacc" rx="1"/><rect x="72" y="22" width="10" height="20" fill="#88aacc" rx="1"/><rect x="90" y="22" width="10" height="20" fill="#88aacc" rx="1"/><rect x="22" y="60" width="18" height="8" fill="#222" rx="1"/><rect x="120" y="60" width="18" height="8" fill="#222" rx="1"/><rect x="24" y="62" width="14" height="4" fill="#333" rx="1"/><rect x="122" y="62" width="14" height="4" fill="#333" rx="1"/><rect x="0" y="28" width="36" height="2" fill="rgba(200,200,255,0.4)"/><rect x="8" y="40" width="54" height="2" fill="rgba(200,200,255,0.3)"/><rect x="60" y="12" width="44" height="2" fill="rgba(200,200,255,0.3)"/><rect x="40" y="50" width="80" height="2" fill="rgba(200,200,255,0.2)"/></svg>`,
    AMBULANCIA_SVG: `<svg viewBox="0 0 160 80" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto;"><rect x="10" y="25" width="140" height="35" fill="#fff" rx="2"/><rect x="20" y="15" width="80" height="18" fill="#fff" rx="2"/><rect x="22" y="13" width="76" height="6" fill="#eee" rx="1"/><rect x="26" y="18" width="16" height="12" fill="#88ccff" rx="1"/><rect x="48" y="18" width="16" height="12" fill="#88ccff" rx="1"/><rect x="70" y="18" width="16" height="12" fill="#88ccff" rx="1"/><rect x="28" y="20" width="6" height="2" fill="rgba(255,255,255,0.3)"/><rect x="50" y="20" width="6" height="2" fill="rgba(255,255,255,0.3)"/><rect x="72" y="20" width="6" height="2" fill="rgba(255,255,255,0.3)"/><rect x="95" y="28" width="30" height="6" fill="#ff0000"/><rect x="104" y="22" width="12" height="18" fill="#ff0000"/><rect x="6" y="32" width="8" height="6" fill="#ffee00" rx="1"/><rect x="146" y="32" width="8" height="6" fill="#ff4444" rx="1"/><rect x="4" y="30" width="4" height="10" fill="#ffaa00" rx="1"/><rect x="150" y="30" width="4" height="10" fill="#cc2222" rx="1"/><rect x="32" y="58" width="18" height="14" fill="#111" rx="2"/><rect x="36" y="60" width="10" height="10" fill="#444" rx="1"/><rect x="38" y="62" width="6" height="6" fill="#666" rx="1"/><rect x="110" y="58" width="18" height="14" fill="#111" rx="2"/><rect x="114" y="60" width="10" height="10" fill="#444" rx="1"/><rect x="116" y="62" width="6" height="6" fill="#666" rx="1"/></svg>`,
    POLICIA_SVG: `<svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto;"><rect x="20" y="30" width="260" height="50" fill="#ffffff" rx="4" stroke="#ccc" stroke-width="2"/><rect x="30" y="20" width="160" height="25" fill="#ffffff" rx="3" stroke="#ccc" stroke-width="2"/><rect x="130" y="10" width="40" height="14" fill="#ff0000" rx="4" class="police-sirene"/><rect x="135" y="8" width="8" height="6" fill="#ff4444" class="police-sirene" style="animation-delay:0.1s;"/><rect x="157" y="8" width="8" height="6" fill="#ff4444" class="police-sirene" style="animation-delay:0.2s;"/><rect x="35" y="24" width="18" height="14" fill="#88ccff" rx="1"/><rect x="58" y="24" width="18" height="14" fill="#88ccff" rx="1"/><rect x="81" y="24" width="18" height="14" fill="#88ccff" rx="1"/><rect x="104" y="24" width="18" height="14" fill="#88ccff" rx="1"/><rect x="127" y="24" width="18" height="14" fill="#88ccff" rx="1"/><rect x="150" y="24" width="18" height="14" fill="#88ccff" rx="1"/><rect x="14" y="40" width="10" height="8" fill="#ffee00" rx="2"/><rect x="276" y="40" width="10" height="8" fill="#ff4444" rx="2"/><rect x="40" y="72" width="30" height="18" fill="#111" rx="3"/><rect x="46" y="74" width="18" height="14" fill="#333" rx="2"/><rect x="230" y="72" width="30" height="18" fill="#111" rx="3"/><rect x="236" y="74" width="18" height="14" fill="#333" rx="2"/><rect x="30" y="52" width="220" height="4" fill="#444"/><rect x="40" y="60" width="200" height="4" fill="#555"/><rect x="40" y="64" width="180" height="6" fill="#1a3a8a" rx="1"/></svg>`,
    SMARTPHONE_SVG: `<svg viewBox="0 0 200 300" style="width:150px; height:auto; filter: drop-shadow(0 10px 10px rgba(0,0,0,0.8));">
        <rect x="20" y="20" width="160" height="260" fill="#222" rx="15" stroke="#444" stroke-width="2"/>
        <rect x="30" y="40" width="140" height="220" fill="#1a1a2e" rx="4"/>
        <circle cx="100" cy="270" r="6" fill="#111"/>
        <rect x="80" y="25" width="40" height="4" fill="#111" rx="2"/>
        <path d="M 40 180 C 80 140 120 190 160 100" fill="transparent" stroke="#00ff88" stroke-width="4" stroke-dasharray="5,5" class="map-route"/>
        <circle cx="160" cy="100" r="6" fill="#ff0055" class="blinking"/>
        <rect x="50" y="110" width="100" height="30" fill="#111" rx="4" opacity="0.8"/>
        <text x="100" y="130" fill="#fff" font-size="10" font-family="'Press Start 2P', cursive" text-anchor="middle">TRACKERS</text>
        <rect x="40" y="200" width="120" height="40" fill="#000" rx="5"/>
        <text x="100" y="225" fill="#0f8" font-size="12" font-family="'Press Start 2P', cursive" text-anchor="middle">UBER</text>
    </svg>`
};

const TEXTOS = {
    apresentacao: "O caradura é expressão genuína da atualidade; sua aplicação é infalível e ninguém resiste à sua força! Caradura é filho legítimo da Ilustríssima Excelentíssima Senhora Dona Sem-Vergonha e do célebre espanhol D. Descarado Sem Ninguna Pinga de Las Ditas, rapaz fino e de boa educação, tira partido de tudo e sabe levar a água ao seu moinho! Caio do imaginário bêbado popular coletivo.",
    rua_inicio: "Rua Augusta. Frio do Centro. Antes da festa, precisa fazer o corre.",
    rua_retorno: "Você voltou para o ar frio da Rua Augusta. A Trackers está logo ali.",
    festa_chegada: "Prédio abandonado na esquina da Dom José de Barros. O elevador não funciona. Techno estourando. É a Voodoohop na Trackers! O que você quer fazer?",
    festa_retorno: "Você está de volta à festa na Trackers! O que você quer fazer?",
    explorar_predio: "🏢 Você está na Trackers, um prédio art déco histórico. Para onde você quer ir?",
    carlos_aparece: "🎭 CARLOS CAPSLOCK APARECEU! Ele começa a dançar de forma alucinante! A música fica INSANA!",
    carlos_foge: "💨 Carlos Capslock sumiu pulando para o lado direito! Onde será que ele foi?",
    carlos_retorna: "🎭 Carlos Capslock volta! Com um brilho estranho nos olhos... 'Quer experimentar uns comprimidos? É pra ficar LOUCO!'",
    carlos_aceitou: "💊 VOCÊ ACEITOU! Carlos se aproxima e vocês começam a dançar LOUCAMENTE! Vocês estão em outra dimensão!",
    carlos_onda: "🌀 Vocês dançaram por horas! Carlos já foi embora. Você ganhou +20 AXÉ e +15 de Flerte!",
    carlos_recusou: "❌ Você recusou os comprimidos. Carlos Capslock fica bravo! 'Tá bom, fica aí na sua onda careta então!'",
    carlos_recusou_fuga: "😤 Carlos Capslock sumiu. Você perdeu a chance de uma experiência única... Mas pelo menos está sóbrio.",
    pista_arraso: "Sua Performance da Dança do Acasalamento foi um sucesso absoluto na Trackers!",
    pista_dancando: "Balançando no ritmo! (+5 AXÉ) Continue na pista fazendo a Performance da Dança do Acasalamento!",
    alvo_sucesso: "te notou e vocês dançaram juntos a noite toda na Trackers!",
    alvo_fracasso: "Ele te mediu e virou as costas. Fora seco. Ego ferido.",
    cama_final: "te puxou para um dos andares abandonados... A madrugada em São Paulo termina quente. Voodoohop vibes.",
    teto_preto: "TETO PRETO",
    vitoria_absoluta: "VITÓRIA ABSOLUTA!",
    area_inativa: "Esta área do jogo foi desativada no código.",
    preso_nu: "🚨 Preso por estar pelado na rua! 🚨",
    carlos_voltar: "🔙 Voltar",
    escolha_transporte: "Como você quer ir para a Trackers?",
    uber_nu_titulo: "🚨 Tenho que avisar o Uber que estou NU!",
    uber_recusou: "❌ O Uber recusou a corrida! Quer pedir novamente?",
    uber_aceitou: "✅ O Uber aceitou! Vamos para a Trackers!",
    thomas_after: "Thomas diz: Calejon, vamos para o After lá em casa!"
};

const camaTexts = {
    'loiro': "O Loiro Gymrat te convidou para dormir no apartamento dele. Lençóis de fio egípcio e muita energia gasta. Vocês aproveitaram a noite toda!",
    'moreno': "O Moreno te puxou pro apartamento dele no Centro. Fumaça, luz baixa e uma noite intensa que você não vai esquecer.",
    'volatille': "Volatille te levou para um estúdio de arte na República. Uma experiência livre, maluca e maravilhosa até de manhã.",
    'ruivo': "O Ruivo te convidou pro apê dele, lotado de discos de vinil. O som rolou a noite toda, junto com os amassos.",
    'negro': "O Negro Sedutor te guiou até o apartamento dele. Uma noite cheia de charme, suor e conversas ao pé do ouvido.",
    'thomas': "Thomas diz: Calejon, vamos para o After lá em casa!"
};

const CONFIG = {
    avanco_rapido_texto_ON: true, final_cama_ON: true, penalidade_bafo_ON: true,
    limite_danca_rei: 6, velocidade_texto_ms: 35, usar_png_protagonista_ON: false,
    url_png_protagonista: 'img/caio.png', usar_png_npcs_ON: false, uber_cost: 60
};

const CONFIG_FESTA = { alvos_na_pista: ['loiro', 'moreno', 'ruivo', 'negro', 'volatille', 'thomas'], quantidade_de_sombras: 6 };

const ESTADO = {
    money: 500, axe: 0, flirtBonus: 0, drinks: 0, drinks_before_invite: 0, currentCrush: null,
    inventory: [], typing: false, skipTyping: false, waitingNext: false, resolveNext: null,
    conqueredTarget: null, danceCount: 0, danceVariantIndex: 0,
    uiBlocked: false, jaVisitouTrackers: false, mostrarMensagemBoasVindas: true, carlosCapslockInteragiu: false,
    carlosCapslockPills: false, isHigh: false, roupas: { shirt: null, pants: null, shoes: null, perfume: null },
    victoryMusicPlaying: false, pillsTaken: 0, isNaked: false, naRuaTransporteBloqueado: false, chamandoUber: false
};

const AUDIO = {
    sfxSynth: null, leadSynth: null, bassSynth: null, kickSynth: null, arpSynth: null,
    acidSynth: null, acidFilter: null, acidLFO: null, noiseSynth: null,
    currentLoop: null, currentPart: null, currentTrack: null,
    lead2Synth: null, lead3Synth: null, padSynth: null, afterLoop: null,

    async init() {
        if (Tone.context.state !== 'running') await Tone.start();
        this.sfxSynth = new Tone.PolySynth(Tone.Synth, { oscillator: { type: 'sine' } }).toDestination(); this.sfxSynth.volume.value = -20;
        this.leadSynth = new Tone.Synth({ oscillator: { type: 'square' }, envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.5 } }).toDestination(); this.leadSynth.volume.value = -12;
        this.lead2Synth = new Tone.Synth({ oscillator: { type: 'square' }, envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.5 } }).toDestination(); this.lead2Synth.volume.value = -12;
        this.lead3Synth = new Tone.Synth({ oscillator: { type: 'sawtooth' }, envelope: { attack: 0.02, decay: 0.2, sustain: 0.3, release: 0.6 } }).toDestination(); this.lead3Synth.volume.value = -10;
        this.bassSynth = new Tone.Synth({ oscillator: { type: 'sawtooth' }, envelope: { attack: 0.05, decay: 0.2, sustain: 0.4, release: 0.8 } }).toDestination(); this.bassSynth.volume.value = -8;
        this.kickSynth = new Tone.MembraneSynth().toDestination(); this.kickSynth.volume.value = -2;
        this.arpSynth = new Tone.Synth({ oscillator: { type: 'square' }, envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.2 } }).toDestination(); this.arpSynth.volume.value = -10;
        this.acidSynth = new Tone.Synth({ oscillator: { type: 'sawtooth' }, envelope: { attack: 0.01, decay: 0.2, sustain: 0.3, release: 0.5 } }); this.acidSynth.volume.value = -10;
        this.acidFilter = new Tone.Filter({ type: 'lowpass', frequency: 600, Q: 2 }).toDestination(); this.acidSynth.connect(this.acidFilter);
        this.acidLFO = new Tone.LFO({ frequency: 1.5, type: 'sine', min: 200, max: 3500 }); this.acidLFO.connect(this.acidFilter.frequency);
        this.noiseSynth = new Tone.Noise({ type: 'brown', playbackRate: 0.5 }).toDestination(); this.noiseSynth.volume.value = -25;
        this.padSynth = new Tone.PolySynth(Tone.Synth, { oscillator: { type: 'sine' }, envelope: { attack: 0.5, decay: 0.5, sustain: 0.6, release: 1.5 } }).toDestination(); this.padSynth.volume.value = -14;
    },
    stopAll() {
        if (this.currentLoop) {
            if (typeof this.currentLoop.stop === 'function') this.currentLoop.stop();
            else if (this.currentLoop.patterns) this.currentLoop.patterns.forEach(p => p.stop());
        }
        if (this.currentPart) this.currentPart.stop();
        if (this.afterLoop) { this.afterLoop.stop(); this.afterLoop = null; }
        Tone.Transport.stop(); Tone.Transport.cancel(0);
        if (this.noiseSynth) this.noiseSynth.stop();
        if (this.acidLFO) this.acidLFO.stop();
        this.currentTrack = null; ESTADO.victoryMusicPlaying = false;
    },
    playSfx(type) {
        if (!this.sfxSynth) return;
        if (type === 'type') this.sfxSynth.triggerAttackRelease('C5', '64n');
        if (type === 'select') this.sfxSynth.triggerAttackRelease(['E5', 'C6'], '16n');
        if (type === 'error') this.sfxSynth.triggerAttackRelease('A2', '8n');
        if (type === 'kiss') this.sfxSynth.triggerAttackRelease(['C5', 'E5', 'G5', 'C6'], '4n');
    },
    playMetro() {
        this.stopAll(); this.currentTrack = 'metro'; Tone.Transport.bpm.value = 110;
        const noisePattern = new Tone.Sequence((time, vel) => {
            this.noiseSynth.volume.value = vel; this.noiseSynth.start(time).stop(time + 0.1);
        }, [-20, -35, -25, -35], '16n');
        const bassPattern = new Tone.Sequence((time) => { this.bassSynth.triggerAttackRelease('C1', '8n', time); }, [0, null, 2, null], '4n');
        noisePattern.start(0); bassPattern.start(0); Tone.Transport.start();
        this.currentLoop = { stop: () => { noisePattern.stop(); bassPattern.stop(); }, patterns: [noisePattern, bassPattern] };
    },
    playUber() {
        this.stopAll(); this.currentTrack = 'uber'; Tone.Transport.bpm.value = 125;
        this.acidFilter.frequency.value = 150; 
        const kickPattern = new Tone.Sequence((time) => { this.kickSynth.triggerAttackRelease('C1', '8n', time); }, [0,1,2,3], '4n');
        const bassPattern = new Tone.Sequence((time, note) => { this.acidSynth.triggerAttackRelease(note, '8n', time); }, ['C2','C2','C2','Eb2'], '4n');
        kickPattern.start(0); bassPattern.start(0); Tone.Transport.start();
        this.currentLoop = { stop: () => { kickPattern.stop(); bassPattern.stop(); this.acidFilter.frequency.value = 600; }, patterns: [kickPattern, bassPattern] };
    },
    playDarkRoom() {
        this.stopAll(); this.currentTrack = 'darkroom'; Tone.Transport.bpm.value = 130;
        const kickPattern = new Tone.Sequence((time) => { this.kickSynth.triggerAttackRelease('C0', '8n', time); }, [0,1,2,3], '4n');
        const bassPattern = new Tone.Sequence((time, note) => { if(note) this.bassSynth.triggerAttackRelease(note, '16n', time); }, ['C1', null, 'C1', null, 'Eb1', null, 'C1', null], '8n');
        kickPattern.start(0); bassPattern.start(0); Tone.Transport.start();
        this.currentLoop = { stop: () => { kickPattern.stop(); bassPattern.stop(); }, patterns: [kickPattern, bassPattern] };
    },
    playPartyBase() {
        if (ESTADO.victoryMusicPlaying) return;
        this.stopAll(); this.currentTrack = 'party'; Tone.Transport.bpm.value = 135;
        const loop = new Tone.Sequence((time, step) => {
            if (step % 4 === 0) this.kickSynth.triggerAttackRelease('C1', '8n', time);
            if (step % 4 === 2) this.bassSynth.triggerAttackRelease('C1', '16n', time);
            if (step % 2 === 0) this.leadSynth.triggerAttackRelease(['C3','Eb3','F3','C4'][Math.floor(Math.random()*4)], '32n', time);
        }, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], '16n');
        loop.start(0); Tone.Transport.start(); this.currentLoop = { stop: () => loop.stop(), patterns: [loop] };
    },
    tocarPista() {
        if (ESTADO.victoryMusicPlaying) return;
        const variants = [1,2,3]; const idx = (ESTADO.danceVariantIndex % variants.length) + 1;
        this.playBGM(`party_dance${idx}`); ESTADO.danceVariantIndex++;
    },
    tocarMenu() {
        if (ESTADO.victoryMusicPlaying) return;
        this.playPartyBase();
    },
    playCarlosWild() {
        this.stopAll(); this.currentTrack = 'carlos_wild'; Tone.Transport.bpm.value = 140;
        const padPattern = new Tone.Sequence((time, chord) => { this.padSynth.triggerAttackRelease(chord, '2n', time); }, [['C3','E3','G3','C4'], ['G3','B3','D4','G4'], ['A3','C4','E4','A4'], ['E3','G3','B3','E4']], '2n');
        const kickPattern = new Tone.Sequence((time) => { this.kickSynth.triggerAttackRelease('C1', '8n', time); if (Math.random() > 0.6) { this.noiseSynth.start(time); this.noiseSynth.stop(time + 0.03); } }, [0, 2, 4, 6], '8n');
        const bassPattern = new Tone.Sequence((time, note) => { this.bassSynth.triggerAttackRelease(note, '4n', time); }, ['C2','E2','G2','A2'], '4n');
        this.acidLFO.frequency.value = 2; this.acidLFO.min = 300; this.acidLFO.max = 5000; this.acidLFO.start();
        const acidPattern = new Tone.Sequence((time, note) => { this.acidSynth.triggerAttackRelease(note, '8n', time); }, ['C3','E3','G#3','C4','E4','G#4','E4','C4'], '8n');
        const arpPattern = new Tone.Sequence((time, note) => { this.arpSynth.triggerAttackRelease(note, '8n', time); }, ['C4','E4','G4','C5','G4','E4','C4','G3'], '8n');
        padPattern.start(0); kickPattern.start(0); bassPattern.start(0); acidPattern.start(0); arpPattern.start(0); Tone.Transport.start();
        this.currentLoop = { stop: () => { padPattern.stop(); kickPattern.stop(); bassPattern.stop(); acidPattern.stop(); arpPattern.stop(); this.acidLFO.stop(); }, patterns: [padPattern, kickPattern, bassPattern, acidPattern, arpPattern] };
    },
    playAfterMusic() {
        this.stopAll(); this.currentTrack = 'after_music'; Tone.Transport.bpm.value = 124; 
        const kickPattern = new Tone.Sequence((time) => { this.kickSynth.triggerAttackRelease('C1', '8n', time); }, [0, 1, 2, 3], '4n');
        const hatPattern = new Tone.Sequence((time) => { this.noiseSynth.start(time); this.noiseSynth.stop(time + 0.03); }, [null, 0, null, 0], '8n');
        const bassPattern = new Tone.Sequence((time, note) => { if (note) this.bassSynth.triggerAttackRelease(note, '16n', time); }, ['C2', null, null, 'C2', 'Eb2', null, 'F2', null, 'C2', null, 'Bb1', null, 'C2', null, null, null], '16n');
        const chordPattern = new Tone.Sequence((time, chord) => { if(chord) this.leadSynth.triggerAttackRelease(chord, '8n', time); }, [null, null, ['C3','Eb3','G3','Bb3'], null, null, ['F3','Ab3','C4','Eb4'], null, null], '8n');
        kickPattern.start(0); hatPattern.start(0); bassPattern.start(0); chordPattern.start(0); Tone.Transport.start();
        this.afterLoop = { stop: () => { kickPattern.stop(); hatPattern.stop(); bassPattern.stop(); chordPattern.stop(); }, patterns: [kickPattern, hatPattern, bassPattern, chordPattern] };
        this.currentLoop = this.afterLoop;
    },
    playBGM(track) {
        if (ESTADO.victoryMusicPlaying) return;
        this.stopAll(); this.currentTrack = track;
        if (track === 'start') {
            Tone.Transport.bpm.value = 90;
            const padPattern = new Tone.Sequence((time, chord) => { this.padSynth.triggerAttackRelease(chord, '2n', time); }, [['C3','E3','G3','C4'], ['G3','B3','D4','G4'], ['A3','C4','E4','A4'], ['E3','G3','B3','E4']], '2n');
            const kickPattern = new Tone.Sequence((time) => { this.kickSynth.triggerAttackRelease('C1', '8n', time); }, [0, 2, 4, 6], '8n');
            const bassPattern = new Tone.Sequence((time, note) => { this.bassSynth.triggerAttackRelease(note, '4n', time); }, ['C2', 'G2', 'E2', 'A2'], '4n');
            const arpPattern = new Tone.Sequence((time, note) => { this.arpSynth.triggerAttackRelease(note, '8n', time); }, ['C4','E4','G4','C5','G4','E4','C4','G3'], '8n');
            padPattern.start(0); kickPattern.start(0); bassPattern.start(0); arpPattern.start(0); Tone.Transport.start();
            this.currentLoop = { stop: () => { padPattern.stop(); kickPattern.stop(); bassPattern.stop(); arpPattern.stop(); }, patterns: [padPattern, kickPattern, bassPattern, arpPattern] };
        } else if (track === 'room') {
            Tone.Transport.bpm.value = 105;
            this.currentPart = new Tone.Part((time, value) => { this.leadSynth.triggerAttackRelease(value.note, value.dur, time); }, [{ time: '0:0', note: 'C3', dur: '4n' }, { time: '0:2', note: 'E3', dur: '4n' }, { time: '0:3', note: 'G2', dur: '8n' }]).start(0);
            this.currentPart.loop = true; this.currentPart.loopEnd = '1m'; Tone.Transport.start();
        } else if (track === 'street') {
            Tone.Transport.bpm.value = 98;
            this.currentLoop = new Tone.Sequence((time, note) => { this.bassSynth.triggerAttackRelease(note, '8n', time); }, ['A1', null, 'A1', 'C2', 'E1', null, 'G1', null], '8n').start(0); Tone.Transport.start();
        } else if (track === 'party_dance1') {
            Tone.Transport.bpm.value = 135;
            this.currentLoop = new Tone.Sequence((time, step) => {
                if (step % 4 === 0) this.kickSynth.triggerAttackRelease('C1', '8n', time);
                if (step % 4 === 2) this.bassSynth.triggerAttackRelease('C1', '16n', time);
                if (step % 2 === 0) this.lead2Synth.triggerAttackRelease(['C3','Eb3','F3','C4','G3','Bb3','C4','Eb4'][Math.floor(Math.random()*8)], '16n', time);
                if (step % 4 === 1) this.leadSynth.triggerAttackRelease(['C3','Eb3','F3','C4'][Math.floor(Math.random()*4)], '16n', time);
            }, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], '16n').start(0); Tone.Transport.start();
        } else if (track === 'party_dance2') {
            Tone.Transport.bpm.value = 135;
            this.currentLoop = new Tone.Sequence((time, step) => {
                if (step % 4 === 0) this.kickSynth.triggerAttackRelease('C1', '8n', time);
                if (step % 4 === 2) this.bassSynth.triggerAttackRelease('C1', '16n', time);
                if (step % 2 === 0) this.lead3Synth.triggerAttackRelease(['C3','D#3','F3','G3','A#3','C4','D#4','F4'][Math.floor(Math.random()*8)], '16n', time);
                if (step % 4 === 3) this.leadSynth.triggerAttackRelease(['C3','Eb3','F3','C4'][Math.floor(Math.random()*4)], '16n', time);
            }, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], '16n').start(0); Tone.Transport.start();
        } else if (track === 'party_dance3') {
            Tone.Transport.bpm.value = 135;
            this.currentLoop = new Tone.Sequence((time, step) => {
                if (step % 4 === 0) this.kickSynth.triggerAttackRelease('C1', '8n', time);
                if (step % 4 === 2) this.bassSynth.triggerAttackRelease('C1', '16n', time);
                if (step % 2 === 0) this.lead2Synth.triggerAttackRelease(['C3','Eb3','F3','G3','A#3','C4','D#4','F4'][Math.floor(Math.random()*8)], '16n', time);
                if (step % 4 === 1) this.lead3Synth.triggerAttackRelease(['C3','D#3','F3','G3','A#3','C4','D#4','F4'][Math.floor(Math.random()*8)], '16n', time);
            }, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], '16n').start(0); Tone.Transport.start();
        } else if (track === 'happy') {
            Tone.Transport.bpm.value = 120;
            const kp = new Tone.Sequence((time) => { this.kickSynth.triggerAttackRelease('C1', '8n', time); }, [0,1,2,3,4,5,6,7], '8n');
            const bp = new Tone.Sequence((time, note) => { this.bassSynth.triggerAttackRelease(note, '4n', time); }, ['C2','E2','G2','C2','E2','G2','C2','E2'], '2n');
            const mp = new Tone.Sequence((time, note) => { this.leadSynth.triggerAttackRelease(note, '8n', time); }, ['C4','E4','G4','C5','G4','E4','C4','E4','G4','C5','G4','E4'], '8n');
            kp.start(0); bp.start(0); mp.start(0); Tone.Transport.start();
            this.currentLoop = { stop: () => { kp.stop(); bp.stop(); mp.stop(); }, patterns: [kp, bp, mp] };
        }
    }
};

const buildClothes = (shirtC, pantsC, shoesC, isRegata = false, isShorts = false) => {
    let svg = '';
    if(shirtC !== 'none') {
        if(isRegata) {
            svg += `<rect x="22" y="46" width="36" height="44" fill="${shirtC}"/><rect x="38" y="46" width="4" height="44" fill="var(--skin-base)"/>`;
        } else {
            svg += `<rect x="22" y="46" width="36" height="44" fill="${shirtC}"/><rect x="12" y="46" width="12" height="24" fill="${shirtC}"/><rect x="56" y="46" width="12" height="24" fill="${shirtC}"/>`;
        }
    }
    if(pantsC !== 'none') {
        const pH = isShorts ? 14 : 34;
        svg += `<rect x="24" y="88" width="32" height="6" fill="#111"/><rect x="24" y="94" width="12" height="${pH}" fill="${pantsC}"/><rect x="44" y="94" width="12" height="${pH}" fill="${pantsC}"/>`;
    }
    if(shoesC !== 'none') {
        svg += `<rect x="16" y="122" width="20" height="6" fill="${shoesC}"/><rect x="44" y="122" width="20" height="6" fill="${shoesC}"/>`;
    }
    return svg;
};

const BANCO_PERSONAGENS = {
    gerarSVG_NPC(skin, shade, hairC, hairSVG, facialSVG, clothesSVG) {
        return `
            <rect x="24" y="12" width="32" height="34" fill="${skin}"/>
            <rect x="22" y="34" width="36" height="12" fill="${shade}"/>
            ${hairSVG}
            <rect x="28" y="26" width="6" height="6" fill="#fff"/>
            <rect x="30" y="26" width="4" height="4" fill="#111"/>
            <rect x="46" y="26" width="6" height="6" fill="#fff"/>
            <rect x="46" y="26" width="4" height="4" fill="#111"/>
            <rect x="26" y="22" width="10" height="2" fill="${hairC}"/>
            <rect x="44" y="22" width="10" height="2" fill="${hairC}"/>
            ${facialSVG}
            <rect x="24" y="46" width="32" height="44" fill="${skin}"/>
            <rect x="12" y="46" width="12" height="40" fill="${skin}"/>
            <rect x="56" y="46" width="12" height="40" fill="${skin}"/>
            <rect x="24" y="90" width="12" height="38" fill="${skin}"/>
            <rect x="44" y="90" width="12" height="38" fill="${skin}"/>
            ${clothesSVG}
        `;
    },
    gerarCarlosCapslockSVG() {
        return `
            <rect x="24" y="12" width="32" height="34" fill="#fce4d6"/><rect x="26" y="14" width="10" height="10" fill="#f5d4b8"/><rect x="22" y="34" width="36" height="12" fill="#e8c8a0"/>
            <rect x="18" y="4" width="44" height="8" fill="#fbbf24"/><rect x="16" y="8" width="48" height="8" fill="#fbbf24"/><rect x="14" y="12" width="10" height="10" fill="#fbbf24"/><rect x="56" y="12" width="10" height="10" fill="#fbbf24"/><rect x="20" y="16" width="6" height="6" fill="#fbbf24"/><rect x="54" y="16" width="6" height="6" fill="#fbbf24"/>
            <rect x="24" y="22" width="14" height="10" fill="#111" opacity="0.6"/><rect x="42" y="22" width="14" height="10" fill="#111" opacity="0.6"/><rect x="38" y="24" width="4" height="6" fill="#111"/>
            <rect x="26" y="24" width="10" height="6" fill="#fff"/><rect x="44" y="24" width="10" height="6" fill="#fff"/><circle cx="31" cy="27" r="2" fill="#000"/><circle cx="49" cy="27" r="2" fill="#000"/>
            <rect x="28" y="36" width="24" height="8" fill="#8b0000" rx="2"/><rect x="30" y="36" width="4" height="6" fill="#fff"/><rect x="36" y="36" width="4" height="6" fill="#fff"/><rect x="42" y="36" width="4" height="6" fill="#fff"/><rect x="48" y="36" width="4" height="6" fill="#fff"/>
            <rect x="22" y="46" width="36" height="44" fill="#4a7c59"/><rect x="12" y="46" width="12" height="40" fill="#4a7c59"/><rect x="56" y="46" width="12" height="40" fill="#4a7c59"/><rect x="36" y="48" width="8" height="20" fill="#8b0000" transform="rotate(5, 40, 48)"/>
            <rect x="24" y="90" width="12" height="38" fill="#2c3e50"/><rect x="44" y="90" width="12" height="38" fill="#2c3e50"/>
            <rect x="16" y="122" width="20" height="6" fill="#2c3e50"/><rect x="44" y="122" width="20" height="6" fill="#2c3e50"/>
        `;
    },
    construirCaioSVG(apagado = false, bedMode = false) {
        const shirt = ESTADO.roupas.shirt; const pants = ESTADO.roupas.pants; const shoes = ESTADO.roupas.shoes; const isHigh = ESTADO.isHigh;
        const tilt = (apagado || bedMode) ? 0 : Math.min(ESTADO.drinks * 1.5, 12);
        const styleStr = bedMode ? "width:80px; height:128px; overflow:visible;" : "width:100%; height:auto; overflow:visible;";
        const attrStr = bedMode ? 'width="80" height="128"' : '';
        let svg = `
            <svg viewBox="0 0 80 128" ${attrStr} xmlns="http://www.w3.org/2000/svg" style="${styleStr}">
            <g transform="rotate(${tilt}, 40, 128)">
                <rect x="24" y="12" width="32" height="34" fill="var(--skin-base)"/><rect x="26" y="14" width="10" height="10" fill="var(--skin-highlight)"/><rect x="22" y="34" width="36" height="12" fill="var(--skin-shade)"/>
                <rect x="24" y="6" width="32" height="6" fill="var(--hair-color)"/><rect x="22" y="10" width="36" height="6" fill="var(--hair-color)"/><rect x="20" y="14" width="4" height="12" fill="var(--hair-color)"/><rect x="56" y="14" width="4" height="12" fill="var(--hair-color)"/>
        `;
        if (apagado) {
            svg += `<line x1="28" y1="28" x2="32" y2="32" stroke="#111" stroke-width="1.5"/><line x1="32" y1="28" x2="28" y2="32" stroke="#111" stroke-width="1.5"/><line x1="46" y1="28" x2="50" y2="32" stroke="#111" stroke-width="1.5"/><line x1="50" y1="28" x2="46" y2="32" stroke="#111" stroke-width="1.5"/><rect x="34" y="34" width="12" height="4" fill="#333" rx="1"/>`;
        } else if (isHigh) {
            svg += `<rect x="24" y="24" width="16" height="10" fill="#fff" rx="2"/><rect x="40" y="24" width="16" height="10" fill="#fff" rx="2"/><circle cx="30" cy="29" r="3" fill="#000"/><circle cx="50" cy="29" r="3" fill="#000"/><rect x="30" y="36" width="20" height="6" fill="#fff" rx="2"/><rect x="34" y="38" width="12" height="2" fill="#000" rx="1"/>`;
        } else {
            svg += `<rect x="28" y="26" width="6" height="6" fill="#fff"/><rect x="30" y="26" width="4" height="4" fill="#111"/><rect x="46" y="26" width="6" height="6" fill="#fff"/><rect x="46" y="26" width="4" height="4" fill="#111"/>`;
        }
        svg += `<rect x="26" y="22" width="10" height="2" fill="var(--hair-color)"/><rect x="44" y="22" width="10" height="2" fill="var(--hair-color)"/><rect x="24" y="34" width="32" height="2" fill="var(--hair-color)"/><rect x="22" y="36" width="36" height="2" fill="var(--hair-color)"/><rect x="22" y="38" width="6" height="2" fill="var(--hair-color)"/><rect x="30" y="38" width="6" height="2" fill="var(--hair-color)"/><rect x="38" y="38" width="6" height="2" fill="var(--hair-color)"/><rect x="46" y="38" width="6" height="2" fill="var(--hair-color)"/><rect x="54" y="38" width="4" height="2" fill="var(--hair-color)"/><rect x="24" y="46" width="32" height="44" fill="var(--skin-base)"/><rect x="12" y="46" width="12" height="40" fill="var(--skin-base)"/><rect x="56" y="46" width="12" height="40" fill="var(--skin-base)"/><rect x="24" y="90" width="12" height="38" fill="var(--skin-base)"/><rect x="44" y="90" width="12" height="38" fill="var(--skin-base)"/>`;
        
        if (shirt && shirt.c !== 'none') {
            const sleeveL = shirt.s ? `<rect x="12" y="46" width="12" height="24" fill="${shirt.c}"/>` : '';
            const sleeveR = shirt.s ? `<rect x="56" y="46" width="12" height="24" fill="${shirt.c}"/>` : '';
            const openPart = shirt.o ? `<rect x="38" y="46" width="4" height="44" fill="var(--skin-base)"/>` : '';
            if (shirt.floral) svg += `<rect x="22" y="46" width="36" height="44" fill="url(#global-floral)"/>${sleeveL}${sleeveR}${openPart}`;
            else if (shirt.bolinhas) svg += `<rect x="22" y="46" width="36" height="44" fill="url(#global-polka)"/>${sleeveL}${sleeveR}${openPart}`;
            else svg += `<rect x="22" y="46" width="36" height="44" fill="${shirt.c}"/>${sleeveL}${sleeveR}${openPart}`;
        }
        if (pants) {
            const pantsHeight = pants.h || 34;
            if (pants.xadrez) svg += `<rect x="24" y="88" width="32" height="6" fill="#111"/><rect x="24" y="94" width="12" height="${pantsHeight}" fill="url(#global-plaid)"/><rect x="44" y="94" width="12" height="${pantsHeight}" fill="url(#global-plaid)"/>`;
            else svg += `<rect x="24" y="88" width="32" height="6" fill="#111"/><rect x="24" y="94" width="12" height="${pantsHeight}" fill="${pants.c}"/><rect x="44" y="94" width="12" height="${pantsHeight}" fill="${pants.c}"/>`;
        }
        if (shoes) svg += `<rect x="16" y="${shoes.y || 122}" width="20" height="${shoes.h || 6}" fill="${shoes.c}"/><rect x="44" y="${shoes.y || 122}" width="20" height="${shoes.h || 6}" fill="${shoes.c}"/>`;
        svg += `</g></svg>`;
        return svg;
    },
    TARGETS: {}
};

BANCO_PERSONAGENS.TARGETS = {
    'loiro': { name: 'Loiro Gymrat', req: 55, shirtC: '#e5e5e5', pantsC: '#222', shoesC: '#eee', desc: 'Não perde nenhuma VOODOOHOP na Trackers e ama o CARLOS CAPSLOCK!', icon: '👱‍♂️',
        npcClothes: { shirt: '#e5e5e5', pants: '#111', shoes: '#fff' },
        svg: BANCO_PERSONAGENS.gerarSVG_NPC('#fcdbb6', '#eab308', '#fbbf24',
            `<rect x="24" y="4" width="32" height="8" fill="#fbbf24"/><rect x="22" y="10" width="36" height="6" fill="#fbbf24"/>`, '',
            `<rect x="26" y="46" width="28" height="44" fill="#e5e5e5"/>
             <rect x="24" y="90" width="14" height="14" fill="#111"/><rect x="42" y="90" width="14" height="14" fill="#111"/>
             <rect x="20" y="120" width="16" height="8" fill="#fff"/><rect x="44" y="120" width="16" height="8" fill="#fff"/>
             <rect x="28" y="52" width="24" height="4" fill="#ff4444"/>`
        ), url_png: 'img/loiro.png' },
    'moreno': { name: 'Moreno Cafajeste', req: 40, shirtC: '#7f1d1d', pantsC: '#1a202c', shoesC: '#4a3018', desc: 'Vive na escadaria da Trackers, sempre com um baseado na mão.', icon: '🧔🏽',
        npcClothes: { shirt: '#7f1d1d', pants: '#333', shoes: '#222' },
        svg: BANCO_PERSONAGENS.gerarSVG_NPC('#8b5a2b', '#5c3a21', '#111',
            `<rect x="24" y="6" width="32" height="6" fill="#111"/><rect x="22" y="10" width="36" height="6" fill="#111"/>`, `<rect x="24" y="38" width="32" height="8" fill="#111" opacity="0.8"/>`,
            `<rect x="20" y="46" width="40" height="44" fill="#7f1d1d"/><rect x="36" y="46" width="8" height="44" fill="#8b5a2b"/><rect x="12" y="46" width="12" height="24" fill="#7f1d1d"/><rect x="56" y="46" width="12" height="24" fill="#7f1d1d"/>
             <rect x="24" y="90" width="14" height="34" fill="#333"/><rect x="42" y="90" width="14" height="34" fill="#333"/>
             <rect x="20" y="120" width="18" height="8" fill="#222"/><rect x="42" y="120" width="18" height="8" fill="#222"/>`
        ), url_png: 'img/moreno.png' },
    'volatille': { name: 'Volatille', req: 48, shirtC: 'none', pantsC: 'none', shoesC: 'none', desc: 'Sempre exótico. Está completamente nu na pista.', icon: '🦄',
        npcClothes: { shirt: 'none', pants: 'none', shoes: 'none' },
        svg: BANCO_PERSONAGENS.gerarSVG_NPC('#fce4d6', '#e8c8b0', '#8a2be2',
            `<rect x="24" y="4" width="32" height="8" fill="#8a2be2"/><rect x="22" y="10" width="36" height="6" fill="#8a2be2"/>`, `<rect x="28" y="26" width="6" height="6" fill="#fff"/><rect x="30" y="26" width="4" height="4" fill="#111"/><rect x="46" y="26" width="6" height="6" fill="#fff"/><rect x="46" y="26" width="4" height="4" fill="#111"/>`, ``
        ), url_png: 'img/volatille.png' },
    'ruivo': { name: 'Ruivo Indie', req: 35, shirtC: '#064e3b', pantsC: '#1e3a8a', shoesC: '#6b21a8', desc: 'DJ das madrugadas na Trackers, toca vinil na sala do fundo.', icon: '🧑‍🦰',
        npcClothes: { shirt: '#064e3b', pants: '#1e3a8a', shoes: '#6b21a8' },
        svg: BANCO_PERSONAGENS.gerarSVG_NPC('#fee2e2', '#fca5a5', '#c2410c',
            `<rect x="20" y="4" width="40" height="12" fill="#c2410c"/>`, `<rect x="22" y="22" width="14" height="10" fill="#000" opacity="0.8"/><rect x="44" y="22" width="14" height="10" fill="#000" opacity="0.8"/>`,
            `<rect x="22" y="46" width="36" height="44" fill="#064e3b"/><rect x="12" y="46" width="12" height="24" fill="#064e3b"/><rect x="56" y="46" width="12" height="24" fill="#064e3b"/><rect x="30" y="50" width="20" height="4" fill="#ffaa00"/>
             <rect x="24" y="90" width="14" height="34" fill="#1e3a8a"/><rect x="42" y="90" width="14" height="34" fill="#1e3a8a"/>
             <rect x="20" y="120" width="18" height="8" fill="#6b21a8"/><rect x="42" y="120" width="18" height="8" fill="#6b21a8"/>`
        ), url_png: 'img/ruivo.png' },
    'negro': { name: 'Negro Sedutor', req: 45, shirtC: '#1e3a8a', pantsC: '#f59e0b', shoesC: '#111', desc: 'Membro do coletivo Voodoohop, organiza as festas na Trackers.', icon: '👨🏿',
        npcClothes: { shirt: '#1e3a8a', pants: '#f59e0b', shoes: '#111' },
        svg: BANCO_PERSONAGENS.gerarSVG_NPC('#2a1610', '#1a0e0a', '#000',
            `<rect x="24" y="8" width="32" height="4" fill="#000"/>`, `<rect x="30" y="36" width="20" height="2" fill="#000"/>`,
            `<rect x="22" y="46" width="14" height="44" fill="#1e3a8a"/><rect x="44" y="46" width="14" height="44" fill="#1e3a8a"/><rect x="38" y="50" width="4" height="14" fill="#fbbf24"/><rect x="12" y="46" width="12" height="24" fill="#1e3a8a"/><rect x="56" y="46" width="12" height="24" fill="#1e3a8a"/>
             <rect x="24" y="90" width="14" height="34" fill="#f59e0b"/><rect x="42" y="90" width="14" height="34" fill="#f59e0b"/>
             <rect x="20" y="120" width="18" height="8" fill="#111"/><rect x="42" y="120" width="18" height="8" fill="#111"/>`
        ), url_png: 'img/negro.png' },
    'thomas': { name: 'Thomas (Voodoohop)', req: 50, shirtC: '#ff7300', pantsC: '#111', shoesC: '#fff', desc: 'O alemão que criou a Voodoohop. Mora na Roosevelt e toca na Trackers.', icon: '💀',
        npcClothes: { shirt: '#ff7300', pants: '#111', shoes: '#fff' },
        svg: BANCO_PERSONAGENS.gerarSVG_NPC('#fce4d6', '#d9b8a0', '#c0a060',
            `<rect x="24" y="4" width="32" height="8" fill="#c0a060"/><rect x="22" y="10" width="36" height="6" fill="#c0a060"/>`, `<rect x="30" y="36" width="20" height="3" fill="#c0a060"/>`,
            `<rect x="22" y="46" width="36" height="44" fill="#ff7300"/><rect x="38" y="46" width="4" height="44" fill="var(--skin-base)"/><rect x="12" y="46" width="12" height="24" fill="#ff7300"/><rect x="56" y="46" width="12" height="24" fill="#ff7300"/><rect x="28" y="50" width="24" height="4" fill="#ffaa00"/><rect x="32" y="54" width="16" height="4" fill="#ff4444"/>
             <rect x="24" y="90" width="14" height="34" fill="#111"/><rect x="42" y="90" width="14" height="34" fill="#111"/>
             <rect x="20" y="120" width="18" height="8" fill="#fff"/><rect x="42" y="120" width="18" height="8" fill="#fff"/>`
        ), url_png: 'img/thomas.png' }
};

const CENAS = {
    'boot': {
        ativa: true,
        iniciar: () => {
            document.getElementById('boot-screen').style.display = 'none';
            document.getElementById('splash-screen').style.display = 'flex';
            AUDIO.playBGM('start');
        }
    },
    'apresentacao': {
        ativa: true,
        iniciar: () => {
            STATS.addPlay();
            document.getElementById('splash-screen').style.display = 'none';
            document.getElementById('hud').style.display = 'flex';
            document.getElementById('visual-area').style.display = 'flex';
            document.getElementById('control-panel').style.display = 'flex';

            AUDIO.playBGM('room'); MOTOR.atualizarFundo('bg-room'); MOTOR.atualizarVisibilidadeProtagonista();
            MOTOR.typeText(TEXTOS.apresentacao, () => { MOTOR.renderMenu([{ icon: '👔', text: 'Vestir-se', action: () => CENAS.apresentacao._submenuVestir('shirt'), full: true }]); });
        },
        _submenuVestir(categoria) {
            if (ESTADO.uiBlocked) return;
            MOTOR.atualizarFundo('bg-dressing-room');
            let titulo = categoria === 'shirt' ? 'Escolha sua Camisa:' : categoria === 'pants' ? 'Escolha sua Calça ou Shorts:' : categoria === 'shoes' ? 'Escolha o Calçado:' : 'Escolha seu Perfume:';
            const opcoes = BANCO_ITENS.WARDROBE[categoria].map((item) => ({ icon: item.icon, text: item.text, action: () => CENAS.apresentacao._equipar(categoria, item) }));
            MOTOR.typeText(titulo, () => MOTOR.renderMenu(opcoes));
        },
        _equipar(categoria, item) {
            if (ESTADO.uiBlocked) return;
            if (item.cost && ESTADO.money < item.cost) return AUDIO.playSfx('error');
            if (item.cost) ESTADO.money -= item.cost;
            if (item.axe) ESTADO.axe += item.axe;
            if (item.bonus) ESTADO.flirtBonus += item.bonus;

            if (item.c === 'none' && item.h === 0) ESTADO.roupas[categoria] = null;
            else ESTADO.roupas[categoria] = item;
            
            MOTOR.atualizarVisibilidadeProtagonista();

            const ordem = ['shirt', 'pants', 'shoes', 'perfume'];
            const idx = ordem.indexOf(categoria);
            if (idx < 3) CENAS.apresentacao._submenuVestir(ordem[idx + 1]);
            else { MOTOR.updateHUD(); MOTOR.carregarCena('escolha_transporte'); }

            const spr = CONFIG.usar_png_protagonista_ON ? document.getElementById('caio-img') : document.getElementById('caio-sprite');
            spr.classList.add('dressing'); setTimeout(() => spr.classList.remove('dressing'), 300);
        }
    },
    'escolha_transporte': {
        ativa: true,
        iniciar: () => {
            document.getElementById('party-fx').style.display = 'none';
            MOTOR.atualizarFundo('bg-street'); MOTOR.atualizarVisibilidadeProtagonista();
            MOTOR.typeText(TEXTOS.escolha_transporte, () => {
                MOTOR.renderMenu([
                    { icon: '🚕', text: `Uber (R$${CONFIG.uber_cost}) - Direto para a Trackers`, action: () => MOTOR.chamarUber('trackers') },
                    { icon: '🚶', text: 'Ir para Rua Augusta (comprar itens)', action: () => {
                        if(ESTADO.chamandoUber || ESTADO.uiBlocked) return;
                        MOTOR.carregarCena('rua') 
                    } },
                ]);
            });
        }
    },
    'rua': {
        ativa: true,
        iniciar: () => {
            document.getElementById('party-fx').style.display = 'none';
            AUDIO.playBGM('street'); MOTOR.atualizarFundo('bg-street'); MOTOR.atualizarVisibilidadeProtagonista();
            const introTexto = ESTADO.jaVisitouTrackers ? TEXTOS.rua_retorno : TEXTOS.rua_inicio;
            
            MOTOR.typeText(introTexto, () => {
                if (ESTADO.isNaked) {
                    ESTADO.uiBlocked = true; 
                    setTimeout(() => {
                        if (document.getElementById('visual-area').className.includes('bg-street')) {
                            MOTOR.carregarCena('preso_policia');
                        }
                    }, 3000);
                } else {
                    CENAS.rua._menuRua();
                }
            });
        },
        _menuRua() {
            if (ESTADO.uiBlocked) return;
            let opts = [];
            if (!ESTADO.inventory.includes('Cigarro')) opts.push({ icon: '🚬', text: 'Cigarro (R$15)', action: () => CENAS.rua._comprar('Cigarro', 15, 5) });
            if (!ESTADO.inventory.includes('Bala')) opts.push({ icon: '🍬', text: 'Bala (R$5)', action: () => CENAS.rua._comprar('Bala', 5, 3) });
            if (!ESTADO.inventory.includes('Veneno')) opts.push({ icon: '💊', text: 'Veneno (R$80)', action: () => CENAS.rua._comprar('Veneno', 80, 15) });

            if (ESTADO.jaVisitouTrackers) {
                opts.push({ icon: '🏢', text: 'Voltar para a Trackers', action: () => { ESTADO.mostrarMensagemBoasVindas = true; MOTOR.carregarCena('trackers'); } });
            } else {
                opts.push({ icon: '🚕', text: `Uber (R$${CONFIG.uber_cost})`, action: () => MOTOR.chamarUber('trackers') });
                opts.push({ icon: '🚇', text: 'Metrô (R$5)', action: () => CENAS.rua._viajar('metro') });
            }
            MOTOR.renderMenu(opts);
        },
        _comprar(item, cost, axeBonus) {
            if (ESTADO.uiBlocked) return;
            if (ESTADO.money >= cost) {
                ESTADO.money -= cost; ESTADO.inventory.push(item); ESTADO.axe += axeBonus;
                if (item === 'Bala') ESTADO.flirtBonus += 5;
                MOTOR.updateHUD(); AUDIO.playSfx('select'); CENAS.rua._menuRua();
            } else AUDIO.playSfx('error');
        },
        async _viajar(transport) {
            if (ESTADO.uiBlocked || ESTADO.naRuaTransporteBloqueado) return;
            ESTADO.uiBlocked = true; document.getElementById('menu-area').style.pointerEvents = 'none';
            document.getElementById('menu-area').innerHTML = '';

            const cost = transport === 'uber' ? CONFIG.uber_cost : 5;
            if (ESTADO.money < cost) { AUDIO.playSfx('error'); ESTADO.uiBlocked = false; document.getElementById('menu-area').style.pointerEvents = 'auto'; return; }
            ESTADO.money -= cost; if (transport === 'metro') ESTADO.axe -= 10;
            MOTOR.updateHUD();

            document.getElementById('caio-sprite').style.display = 'none'; document.getElementById('caio-img').style.display = 'none';
            
            if (transport === 'uber') AUDIO.playUber(); else AUDIO.playMetro();

            if (transport === 'uber') {
                const smartContainer = document.createElement('div'); smartContainer.style.position = 'absolute'; smartContainer.style.bottom = '-50px'; smartContainer.style.zIndex = '70';
                smartContainer.innerHTML = ASSETS.SMARTPHONE_SVG; document.getElementById('visual-area').appendChild(smartContainer);
                await new Promise((r) => setTimeout(r, 1500)); smartContainer.remove();
            } else {
                MOTOR.atualizarFundo('bg-void');
            }

            const visual = document.getElementById('visual-area');
            const container = document.createElement('div'); container.className = 'vehicle-container';
            const svgContent = transport === 'uber' ? ASSETS.UBER_SVG : ASSETS.METRO_SVG;
            container.innerHTML = `<div style="position:relative; width:100%; height:80px; overflow:visible;"><div class="vehicle-svg" style="width:80%;">${svgContent}</div></div>`;
            visual.appendChild(container); await new Promise((r) => setTimeout(r, 800)); container.remove();

            const foiPrimeiraVez = !ESTADO.jaVisitouTrackers;
            ESTADO.jaVisitouTrackers = true; ESTADO.mostrarMensagemBoasVindas = true;
            
            await CENAS.trackers._animacaoChegada();
            ESTADO.uiBlocked = false; document.getElementById('menu-area').style.pointerEvents = 'auto';
            MOTOR.carregarCena('trackers', { primeiraVez: foiPrimeiraVez });
        }
    },
    'trackers': {
        ativa: true,
        iniciar: (params) => {
            AUDIO.tocarMenu(); MOTOR.atualizarFundo('bg-party'); document.getElementById('party-fx').style.display = 'block';
            MOTOR.esconderNPC(); MOTOR.atualizarVisibilidadeProtagonista();

            if (ESTADO.mostrarMensagemBoasVindas) {
                const texto = (params && params.primeiraVez) ? TEXTOS.festa_chegada : TEXTOS.festa_retorno;
                ESTADO.mostrarMensagemBoasVindas = false;
                MOTOR.typeText(texto, () => CENAS.trackers._menuTrackers());
            } else CENAS.trackers._menuTrackers();
        },
        async _animacaoChegada() {
            const visual = document.getElementById('visual-area');
            const overlay = document.createElement('div'); overlay.className = 'arrival-scene';
            overlay.innerHTML = `<div class="predio-container"><svg viewBox="0 0 200 340" style="width:100%; height:100%; object-fit:contain;">
                <rect x="0" y="0" width="200" height="340" fill="transparent"/>
                <path d="M 70 340 L 70 60 Q 100 40 130 60 L 130 340 Z" fill="#181828"/>
                <path d="M 70 60 Q 100 40 130 60 L 130 80 Q 100 60 70 80 Z" fill="#2a2a3a"/>
                <path d="M 10 340 L 10 100 L 70 80 L 70 340 Z" fill="#11111a"/>
                <path d="M 10 100 L 70 80 L 70 100 L 10 120 Z" fill="#1f1f2f"/>
                <path d="M 190 340 L 190 100 L 130 80 L 130 340 Z" fill="#0d0d14"/>
                <path d="M 190 100 L 130 80 L 130 100 L 190 120 Z" fill="#1f1f2f"/>
                <g class="janelas">
                    <rect x="25" y="140" width="10" height="15" fill="#ffcc00" class="janela-piscante" style="animation-delay:0.1s;" transform="skewY(-15)"/>
                    <rect x="45" y="135" width="10" height="15" fill="#ffcc00" class="janela-piscante" style="animation-delay:0.4s;" transform="skewY(-15)"/>
                    <rect x="25" y="180" width="10" height="15" fill="#ffcc00" class="janela-piscante" style="animation-delay:0.7s;" transform="skewY(-15)"/>
                    <rect x="45" y="175" width="10" height="15" fill="#ffcc00" class="janela-piscante" style="animation-delay:0.2s;" transform="skewY(-15)"/>
                    <rect x="25" y="220" width="10" height="15" fill="#ffcc00" class="janela-piscante" style="animation-delay:0.5s;" transform="skewY(-15)"/>
                    <rect x="45" y="215" width="10" height="15" fill="#111" transform="skewY(-15)"/>
                    <rect x="25" y="260" width="10" height="15" fill="#111" transform="skewY(-15)"/>
                    <rect x="45" y="255" width="10" height="15" fill="#ffcc00" class="janela-piscante" style="animation-delay:0.8s;" transform="skewY(-15)"/>
                </g>
                <g class="janelas">
                    <rect x="80" y="100" width="12" height="18" fill="#ffcc00" class="janela-piscante" style="animation-delay:0.3s;"/>
                    <rect x="108" y="98" width="12" height="18" fill="#ffcc00" class="janela-piscante" style="animation-delay:0.9s;"/>
                    <rect x="80" y="140" width="12" height="18" fill="#ffcc00" class="janela-piscante" style="animation-delay:0.1s;"/>
                    <rect x="108" y="138" width="12" height="18" fill="#111"/>
                    <rect x="80" y="180" width="12" height="18" fill="#ffcc00" class="janela-piscante" style="animation-delay:0.6s;"/>
                    <rect x="108" y="178" width="12" height="18" fill="#ffcc00" class="janela-piscante" style="animation-delay:0.4s;"/>
                    <rect x="80" y="220" width="12" height="18" fill="#111"/>
                    <rect x="108" y="218" width="12" height="18" fill="#ffcc00" class="janela-piscante" style="animation-delay:0.2s;"/>
                    <rect x="80" y="260" width="12" height="18" fill="#ffcc00" class="janela-piscante" style="animation-delay:0.7s;"/>
                    <rect x="108" y="258" width="12" height="18" fill="#ffcc00" class="janela-piscante" style="animation-delay:0.5s;"/>
                </g>
                <g class="janelas">
                    <rect x="145" y="105" width="10" height="15" fill="#ffcc00" class="janela-piscante" style="animation-delay:0.2s;" transform="skewY(15)"/>
                    <rect x="165" y="110" width="10" height="15" fill="#ffcc00" class="janela-piscante" style="animation-delay:0.5s;" transform="skewY(15)"/>
                    <rect x="145" y="145" width="10" height="15" fill="#111" transform="skewY(15)"/>
                    <rect x="165" y="150" width="10" height="15" fill="#ffcc00" class="janela-piscante" style="animation-delay:0.8s;" transform="skewY(15)"/>
                    <rect x="145" y="185" width="10" height="15" fill="#ffcc00" class="janela-piscante" style="animation-delay:0.1s;" transform="skewY(15)"/>
                    <rect x="165" y="190" width="10" height="15" fill="#ffcc00" class="janela-piscante" style="animation-delay:0.4s;" transform="skewY(15)"/>
                    <rect x="145" y="225" width="10" height="15" fill="#ffcc00" class="janela-piscante" style="animation-delay:0.7s;" transform="skewY(15)"/>
                    <rect x="165" y="230" width="10" height="15" fill="#111" transform="skewY(15)"/>
                    <rect x="145" y="265" width="10" height="15" fill="#111" transform="skewY(15)"/>
                    <rect x="165" y="270" width="10" height="15" fill="#ffcc00" class="janela-piscante" style="animation-delay:0.2s;" transform="skewY(15)"/>
                </g>
                <rect x="65" y="320" width="70" height="20" fill="#000"/>
                <text x="100" y="335" font-size="8" fill="#ff0055" text-anchor="middle" font-family="'Press Start 2P', cursive">TRACKERS</text>
            </svg></div>`;
            visual.appendChild(overlay); await new Promise((r) => setTimeout(r, 3500));
            overlay.style.opacity = '0'; await new Promise((r) => setTimeout(r, 800)); overlay.remove();
        },
        _menuTrackers() {
            if (ESTADO.uiBlocked) return;
            MOTOR.atualizarFundo('bg-party');
            MOTOR.renderMenu([
                { icon: '🍺', text: 'Bar', action: () => { ESTADO.mostrarMensagemBoasVindas = false; MOTOR.carregarCena('bar'); } },
                { icon: '🏢', text: 'Explorar a Trackers', action: () => CENAS.trackers._explorarTrackers() },
                { icon: '🕺', text: 'Dançar na Pista', action: () => CENAS.trackers._dancar() },
                { icon: '🎭', text: 'Carlos Capslock', action: () => { ESTADO.mostrarMensagemBoasVindas = false; MOTOR.carregarCena('carlos_capslock'); } },
                { icon: '👀', text: 'Ver os CRUSH\'S', action: () => CENAS.trackers._listarHomens() },
                { icon: '🏙️', text: 'Voltar para a Rua', action: () => MOTOR.carregarCena('rua') },
            ]);
        },
        _explorarTrackers() { MOTOR.typeText(TEXTOS.explorar_predio, () => { MOTOR.renderFloorSelector(); }); },
        _explorarAndar(andar) {
            AUDIO.playSfx('select'); 
            const mensagens = { 
                1: '🚽 Você foi ao Banheiro. Deu uma respirada, lavou o rosto. +5 AXÉ!', 
                3: '🚧 Área em desenvolvimento! +10 AXÉ!', 
                5: '🚧 Área em desenvolvimento! +5 AXÉ!', 
                7: '🚧 Área em desenvolvimento! +5 AXÉ!', 
                10: '🚧 Área em desenvolvimento! +5 AXÉ!', 
                'telhado': '🚧 Área em desenvolvimento! +15 AXÉ!' 
            };
            const bonus = { 1:5, 3:10, 5:5, 7:5, 10:5, 'telhado':15 };
            ESTADO.axe += bonus[andar] || 5; MOTOR.updateHUD();
            MOTOR.typeText(mensagens[andar] || `Você explorou a Trackers.`, () => { CENAS.trackers._menuTrackers(); });
        },
        async _dancar() {
            if (ESTADO.uiBlocked) return;
            ESTADO.uiBlocked = true; ESTADO.danceCount++; AUDIO.tocarPista();
            MOTOR.atualizarFundo('bg-pista');
            const stage = document.getElementById('stage');
            const caioOriginal = document.getElementById('caio-sprite'); const npcOriginal = document.getElementById('npc-sprite');
            caioOriginal.style.display = 'none'; npcOriginal.style.display = 'none';

            const container = document.createElement('div');
            container.style.cssText = 'display:flex; flex-wrap:wrap; justify-content:center; align-items:center; gap:12px; width:100%; padding:8px;';
            stage.appendChild(container);

            let danceElements = [];
            danceElements.push({ type: 'caio', html: `<div class="dance-mini-sprite player-dancing">${BANCO_PERSONAGENS.construirCaioSVG(false)}</div>` });

            const alvos = [...CONFIG_FESTA.alvos_na_pista];
            for (let i = 0; i < alvos.length; i++) {
                const npc = BANCO_PERSONAGENS.TARGETS[alvos[i]];
                if (npc) danceElements.push({ type: 'npc', html: `<div class="dance-mini-sprite dancing"><svg viewBox="0 0 80 128" style="overflow:visible;">${npc.svg_codigo || npc.svg}</svg></div>` });
            }

            const sombraSVG = `<svg viewBox="0 0 80 128"><rect x="24" y="12" width="32" height="34" fill="#111"/><rect x="22" y="34" width="36" height="12" fill="#222"/><rect x="24" y="6" width="32" height="6" fill="#000"/><rect x="28" y="26" width="6" height="6" fill="#333"/><rect x="46" y="26" width="6" height="6" fill="#333"/><rect x="24" y="34" width="32" height="2" fill="#000"/><rect x="22" y="36" width="36" height="2" fill="#000"/><rect x="24" y="46" width="32" height="44" fill="#111"/><rect x="12" y="46" width="12" height="40" fill="#111"/><rect x="56" y="46" width="12" height="40" fill="#111"/><rect x="24" y="90" width="12" height="38" fill="#111"/><rect x="44" y="90" width="12" height="38" fill="#111"/></svg>`;
            for(let i=0; i<4; i++){
                danceElements.push({ type: 'sombra', html: `<div class="dance-mini-sprite dancing" style="opacity:0.4">${sombraSVG}</div>` });
            }

            danceElements.sort(() => Math.random() - 0.5);
            let finalHtml = '';
            danceElements.forEach(el => finalHtml += el.html);
            
            container.innerHTML = finalHtml;
            await new Promise((r) => setTimeout(r, 4000)); container.remove();

            caioOriginal.style.display = 'block'; MOTOR.atualizarVisibilidadeProtagonista(); MOTOR.atualizarFundo('bg-party');
            ESTADO.axe += 5; MOTOR.updateHUD(); ESTADO.uiBlocked = false;

            if (ESTADO.danceCount >= CONFIG.limite_danca_rei) {
                ESTADO.uiBlocked = true; 
                
                MOTOR.typeText(TEXTOS.pista_arraso, async () => {
                    let eligible = [];
                    for (const [id, target] of Object.entries(BANCO_PERSONAGENS.TARGETS)) {
                        if (ESTADO.axe >= target.req) { eligible.push({id, req: target.req}); }
                    }
                    eligible.sort((a,b) => b.req - a.req);

                    if (eligible.length >= 2) {
                        let id1 = eligible[0].id;
                        let id2 = eligible[1].id;
                        await CENAS.trackers._dancaTrisal(id1, id2);
                        for (let i = 0; i < 20; i++) {
                            const heart = document.createElement('div'); heart.className = 'heart-multi'; heart.innerText = '❤️';
                            heart.style.left = Math.random() * 80 + 10 + '%'; heart.style.bottom = '20%'; heart.style.animationDelay = Math.random() * 0.5 + 's';
                            document.getElementById('visual-area').appendChild(heart); setTimeout(() => heart.remove(), 1500);
                        }
                        ESTADO.uiBlocked = false;
                        MOTOR.typeText(`Sua performance foi tão magnética que atraiu dois ao mesmo tempo! ${BANCO_PERSONAGENS.TARGETS[id1].name} e ${BANCO_PERSONAGENS.TARGETS[id2].name} te notaram!`, () => {
                            MOTOR.carregarCena('final_trisal', {id1, id2});
                        });
                    } else {
                        let bestTarget = eligible.length > 0 ? eligible[0].id : 'ruivo';
                        await CENAS.trackers._dancaCasal(bestTarget);
                        for (let i = 0; i < 16; i++) {
                            const heart = document.createElement('div'); heart.className = 'heart-multi'; heart.innerText = '❤️';
                            heart.style.left = Math.random() * 80 + 10 + '%'; heart.style.bottom = '20%'; heart.style.animationDelay = Math.random() * 0.5 + 's';
                            document.getElementById('visual-area').appendChild(heart); setTimeout(() => heart.remove(), 1500);
                        }
                        ESTADO.uiBlocked = false;
                        MOTOR.typeText(`O ${BANCO_PERSONAGENS.TARGETS[bestTarget].name} ` + TEXTOS.alvo_sucesso, () => {
                            if (CONFIG.final_cama_ON) MOTOR.carregarCena('final_cama', bestTarget);
                            else MOTOR.carregarCena('fim_jogo', TEXTOS.vitoria_absoluta);
                        });
                    }
                });
            } else MOTOR.typeText(TEXTOS.pista_dancando, () => { CENAS.trackers._menuTrackers(); });
        },
        async _dancaCasal(targetId) {
            const stage = document.getElementById('stage');
            const caioOriginal = document.getElementById('caio-sprite'); const npcOriginal = document.getElementById('npc-sprite');
            caioOriginal.style.display = 'none'; npcOriginal.style.display = 'none';
            MOTOR.atualizarFundo('bg-pista');
            
            const container = document.createElement('div');
            container.style.cssText = 'display:flex; flex-wrap:wrap; justify-content:center; align-items:center; gap:8px; width:100%; padding:8px;';
            stage.appendChild(container);

            const npc = BANCO_PERSONAGENS.TARGETS[targetId];
            container.innerHTML = `<div class="dance-mini-sprite player-dancing">${BANCO_PERSONAGENS.construirCaioSVG(false)}</div><div class="dance-mini-sprite dancing"><svg viewBox="0 0 80 128" style="overflow:visible;">${npc.svg_codigo || npc.svg}</svg></div>`;
            await new Promise((r) => setTimeout(r, 4000)); container.remove();

            caioOriginal.style.display = 'block'; npcOriginal.style.display = 'block'; MOTOR.atualizarFundo('bg-party');
            MOTOR.atualizarVisibilidadeProtagonista(); npcOriginal.innerHTML = npc.svg_codigo || npc.svg;
        },
        async _dancaTrisal(id1, id2) {
            const stage = document.getElementById('stage');
            const caioOriginal = document.getElementById('caio-sprite'); const npcOriginal = document.getElementById('npc-sprite');
            caioOriginal.style.display = 'none'; npcOriginal.style.display = 'none';
            MOTOR.atualizarFundo('bg-pista');
            
            const container = document.createElement('div');
            container.style.cssText = 'display:flex; flex-wrap:nowrap; justify-content:center; align-items:center; gap:8px; width:100%; padding:8px;';
            container.id = 'trisal-stage';
            stage.appendChild(container);

            const npc1 = BANCO_PERSONAGENS.TARGETS[id1];
            const npc2 = BANCO_PERSONAGENS.TARGETS[id2];
            container.innerHTML = `
                <div class="dance-mini-sprite dancing" style="flex:1; max-width:80px;"><svg viewBox="0 0 80 128" style="width:100%;height:auto;overflow:visible;">${npc1.svg_codigo || npc1.svg}</svg></div>
                <div class="dance-mini-sprite player-dancing" style="flex:1; max-width:80px;">${BANCO_PERSONAGENS.construirCaioSVG(false)}</div>
                <div class="dance-mini-sprite dancing" style="flex:1; max-width:80px;"><svg viewBox="0 0 80 128" style="width:100%;height:auto;overflow:visible;">${npc2.svg_codigo || npc2.svg}</svg></div>
            `;
            await new Promise((r) => setTimeout(r, 4000));
            
            container.innerHTML = `
                <div class="dance-mini-sprite" style="flex:1; max-width:80px;"><svg viewBox="0 0 80 128" style="width:100%;height:auto;overflow:visible;">${npc1.svg_codigo || npc1.svg}</svg></div>
                <div class="dance-mini-sprite player-dancing" style="flex:1; max-width:80px;">${BANCO_PERSONAGENS.construirCaioSVG(false)}</div>
                <div class="dance-mini-sprite" style="flex:1; max-width:80px;"><svg viewBox="0 0 80 128" style="width:100%;height:auto;overflow:visible;">${npc2.svg_codigo || npc2.svg}</svg></div>
            `;
            MOTOR.atualizarFundo('bg-party');
        },
        _listarHomens() {
            if (ESTADO.uiBlocked) return;
            MOTOR.atualizarFundo('bg-party');
            const opcoes = Object.entries(BANCO_PERSONAGENS.TARGETS).map(([id, target]) => ({
                icon: target.icon || '👤', text: target.name || target.nome, action: () => CENAS.trackers._flerte(id)
            }));
            opcoes.push({ icon: '🔙', text: 'Recuar', action: () => CENAS.trackers._menuTrackers(), full: true });
            MOTOR.renderMenu(opcoes);
        },
        _flerte: function(id) {
            if (ESTADO.uiBlocked) return;
            const target = BANCO_PERSONAGENS.TARGETS[id];
            const npc_svg = document.getElementById('npc-sprite');
            
            npc_svg.classList.remove('jumping-right', 'jumping-left', 'wild-dancing', 'dancing', 'kiss-npc');
            npc_svg.style.display = 'block'; 
            npc_svg.innerHTML = target.svg_codigo || target.svg;

            MOTOR.typeText(`O ${target.nome || target.name} na mira. ${target.desc} O Arteiro prepara o bote.`, () => {
                MOTOR.renderMenu([
                    { icon: '💋', text: 'Chegar Junto (Flerte)', action: () => CENAS.trackers._resolverFlerte(id, false) },
                    { icon: '🍺', text: 'Convidar para o Bar', action: async () => {
                        ESTADO.uiBlocked = true; document.getElementById('menu-area').innerHTML = '';
                        await MOTOR.todosPulamEsquerda(); ESTADO.uiBlocked = false;
                        MOTOR.carregarCena('bar_crush', id);
                    }},
                    { icon: '🔙', text: 'Recuar', action: () => {
                        MOTOR.esconderNPC();
                        const retreatTexts = {
                            'loiro': "Você mediu o Loiro de cima a baixo, mas decidiu que não é a vibe agora.",
                            'moreno': "O Moreno soltou uma fumaça... melhor deixar pra depois.",
                            'volatille': "O Volatille é muita intensidade, você deu um passo pra trás.",
                            'ruivo': "O Ruivo parece ocupado com a música, você recuou.",
                            'negro': "Você hesitou e se afastou do Negro Sedutor.",
                            'thomas': "Alemão doido... você preferiu dar uma volta antes."
                        };
                        MOTOR.typeText(retreatTexts[id] || "Você recuou e voltou a observar a festa.", () => CENAS.trackers._menuTrackers());
                    }},
                ]);
            });
        },
        async _resolverFlerte(id, isFromBar) {
            if (ESTADO.uiBlocked) return;
            ESTADO.uiBlocked = true;
            let score = ESTADO.axe + ESTADO.flirtBonus;
            let req = BANCO_PERSONAGENS.TARGETS[id].req;
            let motive = "";

            const hasCigarro = ESTADO.inventory.includes('Cigarro');
            const hasBala = ESTADO.inventory.includes('Bala');
            const hasVeneno = ESTADO.inventory.includes('Veneno');
            const hasPerfumePrada = ESTADO.roupas.perfume && ESTADO.roupas.perfume.cost === 150;

            if (id === 'volatille') {
                if (!hasVeneno) { motive = "Ele só interage com quem está na mesma sintonia (precisa de Veneno!)."; score = 0; }
                else if (ESTADO.isNaked) { score += 30; motive = "Volatille amou a sua ousadia de estar nu!"; }
            }
            else if (id === 'loiro') {
                if (hasCigarro && !hasBala) { score -= 25; motive = "O bafo de cigarro afastou ele!"; }
                else if (hasPerfumePrada) { score += 20; motive = "Ele adorou o seu perfume Prada!"; }
            }
            else if (id === 'moreno') {
                if (hasVeneno) { score += 30; motive = "Ele curtiu a sua vibe alterada!"; }
                if (hasPerfumePrada) { score -= 15; motive = "Ele te achou muito 'patricinho' com esse perfume caro."; }
            }
            else if (id === 'ruivo') {
                if (hasCigarro) { score += 25; motive = "Vocês dividiram um cigarro na escada."; }
            }
            else if (id === 'negro') {
                if (hasBala) { score += 20; motive = "A bala que você ofereceu quebrou o gelo!"; }
            }
            else if (id === 'thomas') {
                if (hasVeneno) score += 15;
                if (hasPerfumePrada) score += 15;
            }

            if (score >= req) {
                AUDIO.playSfx('kiss');
                const caioSpr = document.getElementById('caio-sprite'); const npcSpr = document.getElementById('npc-sprite');
                caioSpr.classList.add('kiss-caio'); npcSpr.classList.add('kiss-npc');
                for (let i = 0; i < 16; i++) {
                    const heart = document.createElement('div'); heart.className = 'heart-multi'; heart.innerText = '❤️';
                    heart.style.left = Math.random() * 80 + 10 + '%'; heart.style.bottom = '20%'; heart.style.animationDelay = Math.random() * 0.5 + 's';
                    document.getElementById('visual-area').appendChild(heart); setTimeout(() => heart.remove(), 1500);
                }
                ESTADO.conqueredTarget = id;
                await CENAS.trackers._dancaCasal(id);

                let successMsg = `O ${BANCO_PERSONAGENS.TARGETS[id].name} gostou de você. `;
                
                if (id === 'thomas') {
                    successMsg = "Thomas diz: Calejon, vamos para o After lá em casa!";
                } else if (isFromBar) {
                    const barTexts = {
                        'loiro': "O Loiro te puxa pela cintura no balcão, impressionado com a sua pegada.",
                        'moreno': "O Moreno sorri de canto, te oferecendo um trago antes do beijo.",
                        'volatille': "Volatille te abraça intensamente, adorando a conexão surreal.",
                        'ruivo': "O Ruivo te olha fundo nos olhos e sussurra algo no seu ouvido.",
                        'negro': "O Negro te envolve em uma dança sensual ali mesmo encostado no bar.",
                    };
                    successMsg = barTexts[id] || successMsg;
                } else {
                    if (motive) successMsg += motive;
                }

                MOTOR.typeText(successMsg, () => {
                    if (id === 'thomas') {
                        MOTOR.carregarCena('after_party');
                    } else if (isFromBar && ESTADO.drinks_before_invite >= 4) {
                        MOTOR.carregarCena('final_dark_room', id);
                    } else {
                        if (CONFIG.final_cama_ON) MOTOR.carregarCena('final_cama', id);
                        else MOTOR.carregarCena('fim_jogo', TEXTOS.vitoria_absoluta);
                    }
                });
            } else {
                AUDIO.playSfx('error');
                await MOTOR.npcFoge(); 
                ESTADO.uiBlocked = false;
                
                let failMsg = TEXTOS.alvo_fracasso;
                if (motive && score > 0) failMsg += ` (${motive})`;
                
                MOTOR.typeText(failMsg, () => { 
                    CENAS.trackers._menuTrackers(); 
                });
            }
        }
    },
    
    'bar_crush': {
        ativa: true,
        iniciar: (id) => {
            ESTADO.currentCrush = id;
            ESTADO.drinks_before_invite = ESTADO.drinks;
            
            MOTOR.atualizarFundo('bg-bar'); 
            const target = BANCO_PERSONAGENS.TARGETS[id];
            
            MOTOR.atualizarVisibilidadeProtagonista();
            const npc_svg = document.getElementById('npc-sprite');
            npc_svg.classList.remove('jumping-right', 'jumping-left', 'wild-dancing', 'dancing', 'kiss-npc');
            npc_svg.innerHTML = target.svg_codigo || target.svg;
            npc_svg.style.display = 'block';

            MOTOR.typeText(`Você chamou ${target.name} para o bar. Escolha sua bebida:`, () => {
                MOTOR.renderMenu([
                    { icon: '🍺', text: 'Cerveja (R$20)', action: () => CENAS.bar_crush._beberCaio('cerveja', 20, 3) },
                    { icon: '🍸', text: 'Gin (R$40)', action: () => { ESTADO.flirtBonus += 5; CENAS.bar_crush._beberCaio('gin', 40, 8); } },
                    { icon: '🥃', text: 'Catuaba (R$15)', action: () => CENAS.bar_crush._beberCaio('catuaba', 15, 5) },
                    { icon: '🔙', text: 'Amarelar e Voltar', action: () => { 
                        MOTOR.esconderNPC();
                        ESTADO.mostrarMensagemBoasVindas = false; 
                        MOTOR.typeText("Você desistiu de beber e deixou ele de lado.", () => MOTOR.carregarCena('trackers'));
                    } }
                ]);
            });
        },
        _beberCaio: (type, cost, axeBonus) => {
            if (ESTADO.uiBlocked) return;
            if (ESTADO.money < cost) { AUDIO.playSfx('error'); return; }
            
            ESTADO.money -= cost;
            ESTADO.drinks++;
            ESTADO.axe += axeBonus;
            MOTOR.updateHUD();

            const limit = (ESTADO.inventory.includes('Veneno') || ESTADO.pillsTaken >= 1) ? 10 : 7;
            if (ESTADO.drinks >= limit) {
                MOTOR.carregarCena('ambulancia');
                return;
            }

            MOTOR.typeText(`Você escolheu ${type}!\n\n"O que você vai querer beber Baby?"`, () => {
                setTimeout(() => CENAS.bar_crush._respostaNPC(type, axeBonus), 800);
            });
        },
        _respostaNPC: (caioType, axeBonus) => {
            const drinks = ['uma Cerveja', 'um Gin', 'uma Catuaba'];
            const choice = drinks[Math.floor(Math.random() * drinks.length)];
            
            const drinkDiv1 = document.createElement('div'); drinkDiv1.className = 'big-drink left-drink';
            drinkDiv1.innerText = caioType === 'cerveja' ? '🍺' : caioType === 'gin' ? '🍸' : '🥃';

            const drinkDiv2 = document.createElement('div'); drinkDiv2.className = 'big-drink right-drink';
            drinkDiv2.innerText = choice === 'uma Cerveja' ? '🍺' : choice === 'um Gin' ? '🍸' : '🥃';

            document.getElementById('visual-area').appendChild(drinkDiv1);
            document.getElementById('visual-area').appendChild(drinkDiv2);
            setTimeout(() => { drinkDiv1.remove(); drinkDiv2.remove(); }, 1500);

            const caioSprite = document.getElementById('caio-sprite');
            caioSprite.classList.add('drinking'); setTimeout(() => caioSprite.classList.remove('drinking'), 400);

            const npcSprite = document.getElementById('npc-sprite');
            npcSprite.classList.add('drinking'); setTimeout(() => npcSprite.classList.remove('drinking'), 400);

            MOTOR.atualizarVisibilidadeProtagonista(); 

            MOTOR.typeText(`Ele pediu ${choice} e vocês brindaram juntos. (+${axeBonus} AXÉ). O clima está propício...`, () => {
                MOTOR.renderMenu([
                    { icon: '💋', text: 'Chegar Junto (Flerte)', action: () => CENAS.trackers._resolverFlerte(ESTADO.currentCrush, true) },
                    { icon: '🔙', text: 'Amarelar e Voltar', action: () => { 
                        MOTOR.esconderNPC();
                        ESTADO.mostrarMensagemBoasVindas = false; 
                        const escapeTexts = {
                            'loiro': "Você arregou pro Loiro e o deixou bebendo sozinho.",
                            'moreno': "Deixou o Moreno no bar e sumiu na fumaça.",
                            'volatille': "Fugiu do Volatille antes que as coisas ficassem loucas.",
                            'ruivo': "Deixou o Ruivo esperando com o copo na mão.",
                            'negro': "Você inventou uma desculpa e saiu de perto do Negro.",
                            'thomas': "Thomas riu enquanto você dava meia volta."
                        };
                        MOTOR.typeText(escapeTexts[ESTADO.currentCrush] || "Você amarelou e foi embora.", () => MOTOR.carregarCena('trackers'));
                    } },
                ]);
            });
        }
    },

    'bar': {
        ativa: true,
        iniciar: () => {
            if (ESTADO.uiBlocked) return;
            MOTOR.atualizarFundo('bg-bar');
            MOTOR.renderMenu([
                { icon: '🍺', text: 'Cerveja (R$20)', action: () => CENAS.bar._beber('cerveja', 20, 3) },
                { icon: '🍸', text: 'Gin (R$40)', action: () => { ESTADO.flirtBonus += 5; CENAS.bar._beber('gin', 40, 8); } },
                { icon: '🥃', text: 'Catuaba (R$15)', action: () => CENAS.bar._beber('catuaba', 15, 5) },
                { icon: '🔙', text: 'Voltar', action: () => { ESTADO.mostrarMensagemBoasVindas = false; MOTOR.carregarCena('trackers'); } },
            ]);
        },
        _beber(type, cost, axeBonus) {
            if (ESTADO.uiBlocked) return;
            if (ESTADO.money < cost) { AUDIO.playSfx('error'); return; }
            ESTADO.money -= cost; ESTADO.drinks++; ESTADO.axe += axeBonus; MOTOR.updateHUD();

            const drinkDiv = document.createElement('div'); drinkDiv.className = 'big-drink';
            drinkDiv.innerText = type === 'cerveja' ? '🍺' : type === 'gin' ? '🍸' : '🥃';
            document.getElementById('visual-area').appendChild(drinkDiv); setTimeout(() => drinkDiv.remove(), 1500);

            const limit = (ESTADO.inventory.includes('Veneno') || ESTADO.pillsTaken >= 1) ? 10 : 7;
            
            if (ESTADO.drinks >= limit) {
                MOTOR.carregarCena('ambulancia');
            } else {
                MOTOR.typeText(`🍺 Bebeu ${type}! (+${axeBonus} AXÉ)`, () => MOTOR.carregarCena('bar'));
            }

            const targetSprite = document.getElementById('caio-sprite');
            targetSprite.classList.add('drinking'); setTimeout(() => targetSprite.classList.remove('drinking'), 400);
            MOTOR.atualizarVisibilidadeProtagonista(); 
        }
    },
    'carlos_capslock': {
        ativa: true,
        iniciar: () => {
            const targetSprite = document.getElementById('caio-sprite');
            if (!ESTADO.carlosCapslockInteragiu) {
                ESTADO.carlosCapslockInteragiu = true; AUDIO.playCarlosWild(); MOTOR.mostrarCarlosCapslock();
                document.getElementById('npc-sprite').classList.add('wild-dancing'); targetSprite.classList.remove('dancing', 'wild-dancing');
                MOTOR.typeText(TEXTOS.carlos_aparece, async () => {
                    await MOTOR.carlosPulaDireita(); AUDIO.tocarMenu();
                    MOTOR.typeText(TEXTOS.carlos_foge, () => { ESTADO.mostrarMensagemBoasVindas = false; MOTOR.carregarCena('trackers'); });
                });
            } else {
                MOTOR.mostrarCarlosCapslock(); document.getElementById('npc-sprite').classList.add('dancing');
                MOTOR.typeText(TEXTOS.carlos_retorna, () => {
                    MOTOR.renderMenu([
                        { icon: '💊', text: 'Aceitar os comprimidos', action: () => CENAS.carlos_capslock._carlosPillsAceitar() },
                        { icon: '❌', text: 'Recusar os comprimidos', action: () => CENAS.carlos_capslock._carlosPillsRecusar() },
                    ]);
                });
            }
        },
        _carlosPillsAceitar() {
            const targetSprite = document.getElementById('caio-sprite');
            MOTOR.mostrarCarlosCapslock();
            const carlosSprite = document.getElementById('npc-sprite');

            AUDIO.playCarlosWild(); carlosSprite.classList.add('wild-dancing'); targetSprite.classList.add('wild-dancing');
            ESTADO.pillsTaken++; ESTADO.carlosCapslockPills = true; ESTADO.isHigh = true; MOTOR.atualizarVisibilidadeProtagonista();

            if (ESTADO.pillsTaken >= 3) {
                MOTOR.typeText(TEXTOS.carlos_aceitou, () => {
                    ESTADO.axe += 20; ESTADO.flirtBonus += 15; MOTOR.updateHUD();
                    MOTOR.carregarCena('fim_jogo', { msg: 'TETO PRETO', showFallen: true });
                });
                return;
            }

            MOTOR.typeText(TEXTOS.carlos_aceitou, () => {
                ESTADO.axe += 20; ESTADO.flirtBonus += 15; MOTOR.updateHUD();
                MOTOR.typeText(TEXTOS.carlos_onda, () => {
                    carlosSprite.classList.remove('wild-dancing'); targetSprite.classList.remove('wild-dancing');
                    MOTOR.esconderNPC(); MOTOR.atualizarVisibilidadeProtagonista(); AUDIO.tocarMenu();
                    MOTOR.typeText('Você está diferente...', () => { ESTADO.mostrarMensagemBoasVindas = false; MOTOR.carregarCena('trackers'); });
                });
            });
        },
        _carlosPillsRecusar() {
            const carlosSprite = document.getElementById('npc-sprite');
            MOTOR.typeText(TEXTOS.carlos_recusou, async () => {
                carlosSprite.classList.remove('dancing'); await MOTOR.carlosPulaDireita();
                MOTOR.typeText(TEXTOS.carlos_recusou_fuga, () => {
                    ESTADO.mostrarMensagemBoasVindas = false;
                    MOTOR.renderMenu([{ icon: '🔙', text: 'Voltar', action: () => MOTOR.carregarCena('trackers'), full: true }]);
                });
            });
        }
    },
    'ambulancia': {
        ativa: true,
        iniciar: () => {
            STATS.addVolupia('ambulancia');
            
            AUDIO.stopAll(); MOTOR.atualizarFundo('bg-street'); document.getElementById('party-fx').style.display = 'none';
            document.getElementById('caio-sprite').style.display = 'none'; document.getElementById('npc-sprite').style.display = 'none';

            const scene = document.createElement('div'); scene.className = 'ambulance-scene';
            scene.innerHTML = `<div class="ambulance-container"><div class="ambulance-svg">${ASSETS.AMBULANCIA_SVG}</div></div>`;
            document.getElementById('visual-area').appendChild(scene);

            ESTADO.uiBlocked = true;
            MOTOR.typeText('Caramba, que tontura... O chão tá girando rápido demais! 🤢 DEU PT! Você bebeu todas e foi resgatado pela ambulância!', () => {
                ESTADO.uiBlocked = false;
                MOTOR.renderMenu([{ icon: '🔄', text: 'JOGAR NOVAMENTE', action: () => { location.reload(); }, full: true }]);
            });
        }
    },
    'preso_policia': {
        ativa: true,
        iniciar: () => {
            STATS.addVolupia('preso');

            AUDIO.stopAll(); MOTOR.atualizarFundo('bg-street'); document.getElementById('party-fx').style.display = 'none';
            document.getElementById('caio-sprite').style.display = 'none'; document.getElementById('npc-sprite').style.display = 'none';

            const scene = document.createElement('div'); scene.className = 'police-scene';
            scene.innerHTML = `<div class="police-car-wrapper"><div class="police-car-svg">${ASSETS.POLICIA_SVG}</div></div>`;
            document.getElementById('visual-area').appendChild(scene);

            ESTADO.uiBlocked = true;
            MOTOR.typeText(TEXTOS.preso_nu, () => {
                ESTADO.uiBlocked = false;
                MOTOR.renderMenu([{ icon: '🔄', text: 'JOGAR NOVAMENTE', action: () => { location.reload(); }, full: true }]);
            });
        }
    },
    'after_party': {
        ativa: true,
        iniciar: () => {
            STATS.addEnding('thomas');

            ESTADO.uiBlocked = false; 
            AUDIO.playAfterMusic();
            MOTOR.atualizarFundo('bg-after'); document.getElementById('party-fx').style.display = 'block';
            document.getElementById('caio-sprite').style.display = 'none'; document.getElementById('npc-sprite').style.display = 'none';

            const scene = document.createElement('div'); scene.className = 'after-scene';
            scene.innerHTML += `<div class="after-text">🎉 AFTER PARTY COM THOMAS E A GALERA! 🎉</div>`;

            let html = '<div class="after-room">';
            const drinks = ['🍺', '🍸', '🥃', '🍷', '🍾', '🧊'];
            for(let i=0; i<6; i++) {
                html += `<div style="position:absolute; font-size:20px; left:${Math.random()*80 + 10}%; bottom:${Math.random()*30 + 10}%; z-index: 1;">${drinks[i]}</div>`;
            }

            const alvos = ['caio', ...CONFIG_FESTA.alvos_na_pista].sort(() => Math.random() - 0.5);
            for (const id of alvos) {
                const left = Math.random() * 70 + 10;
                const bottom = Math.random() * 40 + 20;
                const zIndex = Math.floor(100 - bottom);

                if (id === 'caio') {
                    html += `<div class="after-sprite" style="position:absolute; left:${left}%; bottom:${bottom}%; z-index:${zIndex};">${BANCO_PERSONAGENS.construirCaioSVG(false)}</div>`;
                } else {
                    const npc = BANCO_PERSONAGENS.TARGETS[id];
                    if (npc) {
                        html += `<div class="after-sprite" style="position:absolute; left:${left}%; bottom:${bottom}%; z-index:${zIndex};">
                            <svg viewBox="0 0 80 128" style="overflow:visible;">${npc.svg_codigo || npc.svg}</svg>
                            ${Math.random() < 0.4 ? `<div class="cigarro">🚬</div>` : ''}
                        </div>`;
                    }
                }
            }
            html += '</div>';
            scene.innerHTML += html; document.getElementById('visual-area').appendChild(scene);

            MOTOR.typeText('A festa continua! Todos dançam ao som de house animado!', () => {
                MOTOR.renderMenu([{ icon: '🔄', text: 'JOGAR NOVAMENTE', action: () => { location.reload(); }, full: true }]);
            });
        }
    },

    'final_dark_room': {
        ativa: true,
        iniciar: (targetId) => {
            STATS.addVolupia('darkroom');
            STATS.addEnding(targetId);

            AUDIO.playUber(); 
            MOTOR.atualizarFundo('bg-void'); 
            document.getElementById('party-fx').style.display = 'none';
            document.getElementById('caio-sprite').style.display = 'none'; 
            document.getElementById('npc-sprite').style.display = 'none';

            const scene = document.createElement('div');
            scene.style.position = 'absolute'; scene.style.inset = '0';
            scene.style.display = 'flex'; scene.style.justifyContent = 'center'; scene.style.alignItems = 'center';
            
            const target = BANCO_PERSONAGENS.TARGETS[targetId] || BANCO_PERSONAGENS.TARGETS['ruivo'];

            scene.innerHTML = `
                <div class="dark-room-bump-left" style="filter: brightness(0) drop-shadow(0 0 10px rgba(255,0,0,0.5)); z-index:2; width: 150px;">
                    ${BANCO_PERSONAGENS.construirCaioSVG(false)}
                </div>
                <div class="dark-room-bump-right" style="filter: brightness(0) drop-shadow(0 0 10px rgba(255,0,0,0.5)); z-index:1; animation-delay: 0.2s; width: 150px;">
                    <svg viewBox="0 0 80 128" style="width:100%;height:auto;overflow:visible;">${target.svg_codigo || target.svg}</svg>
                </div>
            `;
            document.getElementById('visual-area').appendChild(scene);

            ESTADO.uiBlocked = false;
            MOTOR.typeText(`Vocês foram para a escuridão de um andar abandonado... O clima esquenta e os beijos se misturam ao som abafado do techno.\n\nFINAL SECRETO: DARK ROOM!`, () => {
                MOTOR.renderMenu([{ icon: '🔄', text: 'JOGAR NOVAMENTE', action: () => { location.reload(); }, full: true }]);
            });
        }
    },

    'final_trisal': {
        ativa: true,
        iniciar: (alvos) => {
            STATS.addVolupia('trisal');
            STATS.addEnding(alvos.id1, alvos.id2);

            const ts = document.getElementById('trisal-stage');
            if (ts) ts.remove();

            AUDIO.playBGM('happy'); ESTADO.isHigh = false;
            const t1 = BANCO_PERSONAGENS.TARGETS[alvos.id1] || BANCO_PERSONAGENS.TARGETS['ruivo'];
            const t2 = BANCO_PERSONAGENS.TARGETS[alvos.id2] || BANCO_PERSONAGENS.TARGETS['loiro'];
            
            MOTOR.atualizarFundo('bg-bedroom'); document.getElementById('party-fx').style.display = 'none';
            document.getElementById('caio-sprite').style.display = 'none'; document.getElementById('npc-sprite').style.display = 'none';

            const pClothes = {
                shirt: ESTADO.roupas.shirt ? (ESTADO.roupas.shirt.floral ? 'url(#global-floral)' : (ESTADO.roupas.shirt.bolinhas ? 'url(#global-polka)' : ESTADO.roupas.shirt.c)) : 'none',
                pants: ESTADO.roupas.pants ? (ESTADO.roupas.pants.xadrez ? 'url(#global-plaid)' : ESTADO.roupas.pants.c) : 'none',
                shoes: ESTADO.roupas.shoes ? ESTADO.roupas.shoes.c : 'none'
            };
            const m1Clothes = t1.npcClothes || { shirt: 'none', pants: 'none', shoes: 'none' };
            const m2Clothes = t2.npcClothes || { shirt: 'none', pants: '