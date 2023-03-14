// SELETORES GERAIS

const form = document.querySelector("#form");

const selectAmbiente = document.querySelector(".ambiente");
const selectIluminacao = document.querySelector(".iluminacao");
const aviso = document.querySelector("#aviso");
const inputDimensao = document.querySelector(".dimensao");
const resultado = document.querySelector("#resultado");

const selecionarLampadas = document.querySelector("#mostra-lampadas");
const selectTipoLampada = document.querySelector(".tipo-lampada");

const potenciaInc = document.querySelector("#potencia-incandescente");
const potenciaHal = document.querySelector("#potencia-halogena");
const potenciaLFC = document.querySelector("#potencia-lfc");
const potenciaLED = document.querySelector("#potencia-led");

const selectWattsInc = document.querySelector(".watts-incandescente");
const selectWattsHal = document.querySelector(".watts-halogena");
const selectWattsLFC = document.querySelector(".watts-lfc");
const selectWattsLED = document.querySelector(".watts-led");

const aviso2 = document.querySelector("#aviso2");
const final = document.querySelector("#final");

// FUNÇÕES

function defineLuxMedio() {
    const ambiente = selectAmbiente.value;
    let iluminacao = selectIluminacao.value;

    let tipoIluminacao;

    if (ambiente === "sala" || ambiente === "quarto" || ambiente === "banheiro") {
        tipoIluminacao = {
            lumensGeral: 150,
            lumensLocal: 500
        };
    } else if (ambiente === "cozinha") {
        tipoIluminacao = {
            lumensGeral: 150,
            lumensLocal: 300
        };
    } else if (ambiente === "hall-escada-garagem") {
        tipoIluminacao = {
            lumensGeral: 100,
            lumensLocal: 500
        };
    };

    if (iluminacao === "geral") {
        return tipoIluminacao.lumensGeral;
    } else if (iluminacao === "local") {
        return tipoIluminacao.lumensLocal;
    };
};

function calculaLumens() {
    const dimensao = inputDimensao.value;
    const resultado = (defineLuxMedio() * dimensao);
    return resultado;
};

function verificaLampada() {
    const lampada = selectTipoLampada.value;

    if (lampada === "incandescente") {
        potenciaInc.classList.remove("hide");

        potenciaHal.classList.add("hide");
        potenciaLED.classList.add("hide");
        potenciaLFC.classList.add("hide");
    } else if (lampada === "halogena") {
        potenciaHal.classList.remove("hide");

        potenciaInc.classList.add("hide");
        potenciaLED.classList.add("hide");
        potenciaLFC.classList.add("hide");
    } else if (lampada === "lfc") {
        potenciaLFC.classList.remove("hide");

        potenciaHal.classList.add("hide");
        potenciaLED.classList.add("hide");
        potenciaInc.classList.add("hide");
    } else if (lampada === "led") {
        potenciaLED.classList.remove("hide");

        potenciaHal.classList.add("hide");
        potenciaInc.classList.add("hide");
        potenciaLFC.classList.add("hide");

    } else {
        potenciaLED.classList.add("hide");
        potenciaHal.classList.add("hide");
        potenciaInc.classList.add("hide");
        potenciaLFC.classList.add("hide");
    };

    return lampada;
};

function appendTextPotencia(msg, calculo) {
    final.classList.remove("hide");
    final.innerHTML = "";
    let paragrafo = document.createElement("p");
    if (!calculo) {
        paragrafo.innerHTML = `${msg}`;
        final.appendChild(paragrafo);
        return;
    };
    paragrafo.innerHTML = `${msg} "${Math.round(calculo)}" unidade(s).`;
    final.appendChild(paragrafo);
};

function verificaPotencia() {

    const lampada = selectTipoLampada.value;

    const wattsInc = selectWattsInc.value;
    const wattsHal = selectWattsHal.value;
    const wattsLFC = selectWattsLFC.value;
    const wattsLED = selectWattsLED.value;

    let setLampada;
    let calculo;

    if (lampada === "incandescente") {
        setLampada = {
            "12-15w": 90,
            "25w": 270,
            "30w": 360,
            "40w": 450,
            "60w": 800,
            "75w": 1100,
            "100w": 1600,
            "150w": 2600
        };

        if (wattsInc === "12-15w") {
            setLampada["12-15w"];
        } else if (wattsInc === "25w") {
            setLampada["25w"];
        } else if (wattsInc === "30w") {
            setLampada["30w"];
        } else if (wattsInc === "40w") {
            setLampada["40w"];
        } else if (wattsInc === "60w") {
            setLampada["60w"];
        } else if (wattsInc === "75w") {
            setLampada["75w"];
        } else if (wattsInc === "100w") {
            setLampada["100w"];
        } else if (wattsInc === "150w") {
            setLampada["150w"];
        };
        calculo = calculaLumens() / setLampada[wattsInc];
        if (!calculo || calculo <= 0) {
            let msg = "Selecione os dados corretamente!";
            appendTextPotencia(msg);
        };

        if (calculaLumens() > 2601) {
            let msg = "A quantidade recomendada para essa lâmpada é de:";
            appendTextPotencia(msg, Math.ceil(calculo));
        } else {
            let msg = "A quantidade recomendada para essa lâmpada é de:";
            appendTextPotencia(msg, calculo);
        };

    } else if (lampada === "halogena") {
        setLampada = {
            "18w": 270,
            "25w": 360,
            "35w": 450,
            "42w": 800,
            "70w": 1100
        };

        if (wattsHal === "18w") {
            setLampada["18w"];
        } else if (wattsHal === "25w") {
            setLampada["25w"];
        } else if (wattsHal === "35w") {
            setLampada["35w"];
        } else if (wattsHal === "42w") {
            setLampada["42w"];
        } else if (wattsHal === "70w") {
            setLampada["70w"];
        };
        calculo = calculaLumens() / setLampada[wattsHal];
        if (!calculo || calculo <= 0) {
            let msg = "Selecione e/ou Insira os dados corretamente!";
            appendTextPotencia(msg);
        };

        if (calculaLumens() > 1101) {
            let msg = "A quantidade recomendada para essa lâmpada é de:";
            appendTextPotencia(msg, Math.ceil(calculo));
        } else {
            let msg = "A quantidade recomendada para essa lâmpada é de:";
            appendTextPotencia(msg, calculo);
        };

    } else if (lampada === "lfc") {
        setLampada = {
            "5-6w": 270,
            "7-9w": 360,
            "9-13w": 450,
            "13-15w": 800,
            "18-23w": 1100,
            "25-30w": 1600,
            "30-52w": 2600
        };

        if (wattsLFC === "5-6w") {
            setLampada["5-6w"];
        } else if (wattsLFC === "7-9w") {
            setLampada["7-9w"];
        } else if (wattsLFC === "9-13w") {
            setLampada["9-13w"];
        } else if (wattsLFC === "13-15w") {
            setLampada["13-15w"];
        } else if (wattsLFC === "18-23w") {
            setLampada["18-23w"];
        } else if (wattsLFC === "25-30w") {
            setLampada["25-30w"];
        } else if (wattsLFC === "30-52w") {
            setLampada["30-52w"];
        };
        calculo = calculaLumens() / setLampada[wattsLFC];
        if (!calculo || calculo <= 0) {
            let msg = "Selecione e/ou Insira os dados corretamente!";
            appendTextPotencia(msg);
        };

        if (calculaLumens() > 2601) {
            let msg = "A quantidade recomendada para essa lâmpada é de:";
            appendTextPotencia(msg, Math.ceil(calculo));
        } else {
            let msg = "A quantidade recomendada para essa lâmpada é de:";
            appendTextPotencia(msg, calculo);
        };

    } else if (lampada === "led") {
        setLampada = {
            "1w": 90,
            "3w": 270,
            "4w": 360,
            "6-9w": 450,
            "8-12w": 800,
            "13-15w": 1100,
            "16-20w": 1600,
            "25-28w": 2600
        };

        if (wattsLED === "1w") {
            setLampada["1w"];
        } else if (wattsLED === "3w") {
            setLampada["3w"];
        } else if (wattsLED === "4w") {
            setLampada["4w"];
        } else if (wattsLED === "6-9w") {
            setLampada["6-9w"];
        } else if (wattsLED === "8-12w") {
            setLampada["8-12w"];
        } else if (wattsLED === "13-15w") {
            setLampada["13-15w"];
        } else if (wattsLED === "16-20w") {
            setLampada["16-20w"];
        } else if (wattsLED === "25-28w") {
            setLampada["25-28w"];
        };
        calculo = calculaLumens() / setLampada[wattsLED];
        if (!calculo || calculo <= 0) {
            let msg = "Selecione e/ou Insira os dados corretamente!";
            appendTextPotencia(msg);
        };

        if (calculaLumens() > 2601) {
            let msg = "A quantidade recomendada para essa lâmpada é de:";
            appendTextPotencia(msg, Math.ceil(calculo));
        } else {
            let msg = "A quantidade recomendada para essa lâmpada é de:";
            appendTextPotencia(msg, calculo);
        };
    };

    return setLampada;
};

function verificaLumen() {
    let valorLumen;
    
    const wattsInc = selectWattsInc.value;
    const wattsHal = selectWattsHal.value;
    const wattsLFC = selectWattsLFC.value;
    const wattsLED = selectWattsLED.value;

    let incandescente;
    let halogena;
    let lfc;
    let led;

    if (verificaLampada() === "incandescente") {
        incandescente = {
            "12-15w": 90,
            "25w": 270,
            "30w": 360,
            "40w": 450,
            "60w": 800,
            "75w": 1100,
            "100w": 1600,
            "150w": 2600
        };
        valorLumen = incandescente[wattsInc];

    } else if (verificaLampada() === "halogena") {
        halogena = {
            "18w": 270,
            "25w": 360,
            "35w": 450,
            "42w": 800,
            "70w": 1100
        };
        valorLumen = halogena[wattsHal];

    } else if (verificaLampada() === "lfc") {
        lfc = {
            "5-6w": 270,
            "7-9w": 360,
            "9-13w": 450,
            "13-15w": 800,
            "18-23w": 1100,
            "25-30w": 1600,
            "30-52w": 2600
        };
        valorLumen = lfc[wattsLFC];

    } else if (verificaLampada() === "led") {
        led = {
            "1w": 90,
            "3w": 270,
            "4w": 360,
            "6-9w": 450,
            "8-12w": 800,
            "13-15w": 1100,
            "16-20w": 1600,
            "25-28w": 2600
        };
        valorLumen = led[wattsLED];
    };

    return valorLumen;
};

function setResultado(msg) {
    resultado.classList.remove("hide");
    resultado.innerHTML = "";
    const paragrafo = document.createElement("p");
    paragrafo.innerHTML = msg;
    resultado.appendChild(paragrafo);
};

function mostraAviso2(msg) {
    aviso2.classList.remove("hide");
    aviso2.innerHTML = "";
    const span = document.createElement("span");
    span.innerHTML = msg;
    aviso2.appendChild(span);
};

// EVENTOS

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!calculaLumens() || calculaLumens() <= 0) {
        let msg = `Insira um número válido (maior que zero).`;
        setResultado(msg);
        return;
    };
    let msg = `A quantidade média de Lúmens necessária para o seu ambiente é de: <mark> ${calculaLumens()}lm </mark>`;
    setResultado(msg);
    selecionarLampadas.classList.remove("hide");
});

form.addEventListener('reset', (e) => {
    e.preventDefault();

    const ambiente = selectAmbiente.value;
    let iluminacao = selectIluminacao.value;
    const mensagem = [
        "Indicado para iluminação geral do Ambiente.",
        "Indicado para iluminação focal (leitura, escrita, bordado, etc).",
        "Indicado para iluminação focal (fogão, pia, mesa, etc).",
        "Indicado para iluminação focal (cama, espelho, penteadeira, etc).",
        "Indicado para iluminação focal (espelho).",
        "Indicado para iluminação focal (plantas, decorações, armários, etc)."
    ];

    if (iluminacao === "geral") {
        aviso.innerHTML = "";
        const span = document.createElement("span");
        span.innerHTML = mensagem[0];
        aviso.appendChild(span);
    } else if (ambiente === "sala" && iluminacao === "local") {
        aviso.innerHTML = "";
        const span = document.createElement("span");
        span.innerHTML = mensagem[1];
        aviso.appendChild(span);
    } else if (ambiente === "cozinha" && iluminacao === "local") {
        aviso.innerHTML = "";
        const span = document.createElement("span");
        span.innerHTML = mensagem[2];
        aviso.appendChild(span);
    } else if (ambiente === "quarto" && iluminacao === "local") {
        aviso.innerHTML = "";
        const span = document.createElement("span");
        span.innerHTML = mensagem[3];
        aviso.appendChild(span);
    } else if (ambiente === "banheiro" && iluminacao === "local") {
        aviso.innerHTML = "";
        const span = document.createElement("span");
        span.innerHTML = mensagem[4];
        aviso.appendChild(span);
    } else if (ambiente === "hall-escada-garagem" && iluminacao === "local") {
        aviso.innerHTML = "";
        const span = document.createElement("span");
        span.innerHTML = mensagem[5];
        aviso.appendChild(span);
    };
});

selecionarLampadas.addEventListener('submit', (e) => {
    e.preventDefault();

    verificaLampada();
});

potenciaInc.addEventListener('submit', (e) => {
    e.preventDefault();

    verificaPotencia();
    if (!verificaLumen()) {
        let msg = "Selecione os dados corretamente.";
        mostraAviso2(msg);
        return;
    };
    let msg = `Essa lâmpada possui em média ${verificaLumen()} lúmens cada.`;
    mostraAviso2(msg);
});

potenciaHal.addEventListener('submit', (e) => {
    e.preventDefault();

    verificaPotencia();
    if (!verificaLumen()) {
        let msg = "Selecione os dados corretamente.";
        mostraAviso2(msg);
        return;
    };
    let msg = `Essa lâmpada possui em média ${verificaLumen()} lúmens cada.`;
    mostraAviso2(msg);
});

potenciaLFC.addEventListener('submit', (e) => {
    e.preventDefault();

    verificaPotencia();
    if (!verificaLumen()) {
        let msg = "Selecione os dados corretamente.";
        mostraAviso2(msg);
        return;
    };
    let msg = `Essa lâmpada possui em média ${verificaLumen()} lúmens cada.`;
    mostraAviso2(msg);
});

potenciaLED.addEventListener('submit', (e) => {
    e.preventDefault();

    verificaPotencia();
    if (!verificaLumen()) {
        let msg = "Selecione os dados corretamente.";
        mostraAviso2(msg);
        return;
    };
    let msg = `Essa lâmpada possui em média ${verificaLumen()} lúmens cada.`;
    mostraAviso2(msg);
});
