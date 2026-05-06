// ==========================================
// 1. FUNCIONES DE BARAJADO Y DETECCIÓN DE ERRATAS
// ==========================================
function shuffleArray(array) {
    var newArray = array.slice();
    for (var i = newArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = temp;
    }
    return newArray;
}

function getLevenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    var matrix = [];
    for (var i = 0; i <= b.length; i++) { matrix[i] = [i]; }
    for (var j = 0; j <= a.length; j++) { matrix[0][j] = j; }
    for (var i = 1; i <= b.length; i++) {
        for (var j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
            }
        }
    }
    return matrix[b.length][a.length];
}

// ==========================================
// 2. BANCOS DE DATOS
// ==========================================
const vocabData = [
    { en: 'can', es: 'poder', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'could', es: 'podía / podría(s)', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'must', es: 'deber', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'should', es: 'debería', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'brother', es: 'hermano', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'grandfather', es: 'abuelo', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'grandmother', es: 'abuela', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'parents', es: 'padres', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'uncle', es: 'tio', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'husband', es: 'marido', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'niece', es: 'sobrina', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'wife', es: 'mujer', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'father', es: 'padre', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'mother', es: 'madre', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'stepson', es: 'hijastro', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'catch', es: 'Alcanzar, coger, pillar', cat: 'Página 3 (Vocabulario policial/crímenes)' },
    { en: 'while', es: 'mientras', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'was', es: 'Estaba', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'when', es: 'cuando', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'what', es: 'que', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'which', es: 'cual', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'where', es: 'donde', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'why', es: 'porque', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'who', es: 'quien', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'how', es: 'como', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'How often', es: 'con qué frecuencia', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'How long', es: 'cuánto tiempo', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'How much', es: 'cuánto', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'How many', es: 'cuántos', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'what time', es: 'a qué hora', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'clean up', es: 'limpiar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'cut down', es: 'talar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'damage', es: 'dañar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'donate', es: 'donar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'endanger', es: 'poner en peligro', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'fix', es: 'arreglar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'pick up', es: 'recoger', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'plant', es: 'plantar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'recycle', es: 'reciclar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'replace', es: 'reemplazar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'reuse', es: 'reutilizar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'throw', es: 'tirar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'use', es: 'gastar/usar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'waste', es: 'desperdiciar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'believe', es: 'Creer', cat: 'Página 8 (Verbos variados)' },
    { en: 'borrow', es: 'pedir prestado / tomar prestado', cat: 'Página 8 (Verbos variados)' },
    { en: 'crawl', es: 'arrastrarse', cat: 'Página 8 (Verbos variados)' },
    { en: 'cry', es: 'llorar', cat: 'Página 8 (Verbos variados)' },
    { en: 'forget', es: 'olvidar', cat: 'Página 8 (Verbos variados)' },
    { en: 'keep', es: 'mantener', cat: 'Página 8 (Verbos variados)' },
    { en: 'laugh', es: 'reír', cat: 'Página 8 (Verbos variados)' },
    { en: 'lend', es: 'dejar', cat: 'Página 8 (Verbos variados)' },
    { en: 'open', es: 'abrir', cat: 'Página 8 (Verbos variados)' },
    { en: 'promise', es: 'prometer', cat: 'Página 8 (Verbos variados)' },
    { en: 'purchase', es: 'comprar', cat: 'Página 8 (Verbos variados)' },
    { en: 'remember', es: 'recordar', cat: 'Página 8 (Verbos variados)' },
    { en: 'return', es: 'volver', cat: 'Página 8 (Verbos variados)' },
    { en: 'sell', es: 'vender', cat: 'Página 8 (Verbos variados)' },
    { en: 'shut', es: 'Cerrar', cat: 'Página 8 (Verbos variados)' },
    { en: 'smile', es: 'Sonrisa / sonreír', cat: 'Página 8 (Verbos variados)' }
];

const grammarData = [
    // ================== BLOQUE 1: FUTURE SIMPLE ==================
    // Ejercicio 1: Completa will/won't
    { block: "1", type: "input", question: "Tomorrow, the sun _____ (shine) all day.", correct: "will shine", explanation: "Usamos 'will' seguido del verbo tal cual para predicciones sobre el clima o el futuro general." },
    { block: "1", type: "input", question: "I _____ (not/go) to the party because I am sick.", correct: ["won't go", "will not go"], explanation: "La forma negativa de 'will' es 'won't' (o 'will not')." },
    { block: "1", type: "input", question: "Don't worry, my dad _____ (help) you with your homework.", correct: "will help", explanation: "Para ofrecimientos espontáneos ('Don't worry'), siempre usamos 'will'." },
    { block: "1", type: "input", question: "We _____ (not/travel) to London this summer. It's too expensive.", correct: ["won't travel", "will not travel"], explanation: "Negativa de will + verbo: won't travel." },
    { block: "1", type: "input", question: "I think robots _____ (do) all the dangerous jobs in the future.", correct: "will do", explanation: "¡Chivato 'I think'! Las opiniones personales sobre el futuro siempre llevan 'will'." },
    { block: "1", type: "input", question: "She _____ (not/eat) that burger. She is vegetarian.", correct: ["won't eat", "will not eat"], explanation: "Forma negativa de futuro: won't eat." },
    // Ejercicio 2: Une el problema (Test)
    { block: "1", type: "test", question: "Reacciona: 'It's very cold in this room!'", correct: "I will close the window.", distractors: ["I am going to close the window.", "I close the window."], explanation: "Decisión rápida tomada en el instante = WILL." },
    { block: "1", type: "test", question: "Reacciona: 'I'm very hungry.'", correct: "I will make a sandwich.", distractors: ["I make a sandwich.", "I am going to make a sandwich."], explanation: "Decisión rápida en el momento = WILL." },
    { block: "1", type: "test", question: "Reacciona: 'Oh no, I forgot my money!'", correct: "I will lend you some euros.", distractors: ["I lend you some euros.", "I am going to lend you some euros."], explanation: "Ofrecimiento espontáneo para ayudar a alguien = WILL." },
    { block: "1", type: "test", question: "Reacciona: 'The phone is ringing!'", correct: "I will answer it!", distractors: ["I answer it!", "I am going to answer it!"], explanation: "Acaba de sonar el teléfono, es una reacción inmediata = WILL." },
    { block: "1", type: "test", question: "Reacciona: 'This bag is very heavy.'", correct: "I will help you carry it.", distractors: ["I am going to help you.", "I help you."], explanation: "Te ofreces a ayudar sobre la marcha = WILL." },
    { block: "1", type: "test", question: "Reacciona: 'I don't understand this math exercise.'", correct: "I will explain it to you.", distractors: ["I am going to explain it.", "I explain it."], explanation: "Ofrecimiento de ayuda en el instante = WILL." },
    // Ejercicio 3: Corrige el error
    { block: "1", type: "test", question: "Elige la frase correcta (Corrige: She will goes to the university)", correct: "She will go to the university", distractors: ["She will goes to the university", "She is will go to the university"], explanation: "Detrás de 'will' NUNCA se pone la 's' de tercera persona. El verbo va en infinitivo." },
    { block: "1", type: "test", question: "Elige la frase correcta (Corrige: I think it will to rain tomorrow)", correct: "I think it will rain tomorrow", distractors: ["I think it will to rain tomorrow", "I think it is will rain tomorrow"], explanation: "'Will' jamás lleva 'to' detrás. Va pegado al verbo (will rain)." },
    { block: "1", type: "test", question: "Elige la frase correcta (Corrige: Do you will play football?)", correct: "Will you play football?", distractors: ["Do you will play football?", "Are you will play football?"], explanation: "Para preguntar en futuro no se usa 'Do', se pone 'Will' directamente al principio." },
    { block: "1", type: "test", question: "Elige la frase correcta (Corrige: We won't studying tonight)", correct: "We won't study tonight", distractors: ["We won't studying tonight", "We don't will study tonight"], explanation: "Después de won't, el verbo va normal, nunca con -ing." },
    { block: "1", type: "test", question: "Elige la frase correcta (Corrige: He don't will buy a phone)", correct: "He won't buy a phone", distractors: ["He don't will buy a phone", "He doesn't will buy a phone"], explanation: "La negación del futuro es simplemente 'won't', no se usa 'don't' ni 'doesn't'." },
    { block: "1", type: "test", question: "Elige la frase correcta (Corrige: Will they comes to the cinema?)", correct: "Will they come to the cinema?", distractors: ["Will they comes to the cinema?", "Do will they come to the cinema?"], explanation: "El verbo detrás de will NUNCA lleva 's', incluso en preguntas." },
    // Ejercicio 4: Ordena pregunta y respuesta
    { block: "1", type: "test", question: "Ordena: (you / be / famous / Will / in the future?)", correct: "Will you be famous in the future?", distractors: ["Will be you famous in the future?", "You will be famous in the future?"], explanation: "Estructura de pregunta: Will + sujeto + verbo." },
    { block: "1", type: "input", question: "Escribe la respuesta corta AFIRMATIVA para: 'Will you be famous?'", correct: "Yes, I will", explanation: "Respuesta corta afirmativa: Yes + pronombre + will." },
    { block: "1", type: "test", question: "Ordena: (Will / win / the match / Real Madrid?)", correct: "Will Real Madrid win the match?", distractors: ["Will win Real Madrid the match?", "Real Madrid will win the match?"], explanation: "Will + Sujeto (Real Madrid) + verbo (win) + complemento." },
    { block: "1", type: "input", question: "Escribe la respuesta corta NEGATIVA para: 'Will Real Madrid win?'", correct: ["No, it won't", "No, they won't"], explanation: "Respuesta corta negativa: No + pronombre + won't." },
    { block: "1", type: "test", question: "Ordena: (pass / the exam / they / Will?)", correct: "Will they pass the exam?", distractors: ["Will pass they the exam?", "They will pass the exam?"], explanation: "Will + sujeto + verbo." },
    { block: "1", type: "input", question: "Escribe la respuesta corta AFIRMATIVA para: 'Will they pass the exam?'", correct: "Yes, they will", explanation: "Yes + pronombre (they) + will." },
    { block: "1", type: "test", question: "Ordena: (live / Will / on Mars / people / in 2050?)", correct: "Will people live on Mars in 2050?", distractors: ["Will live people on Mars in 2050?", "People will live on Mars in 2050?"], explanation: "Will + Sujeto (people) + verbo (live)..." },
    { block: "1", type: "input", question: "Escribe la respuesta corta NEGATIVA para: 'Will people live on Mars?'", correct: "No, they won't", explanation: "No + pronombre (they) + won't." },
    // Ejercicio 5: Ordena frases
    { block: "1", type: "test", question: "Ordena: (won't / I / tell / your secret / anyone)", correct: "I won't tell anyone your secret", distractors: ["I won't tell your secret anyone", "I won't anyone tell your secret"], explanation: "Sujeto + won't + verbo + a quién + qué." },
    { block: "1", type: "test", question: "Ordena: (think / I / will / electric / be / all cars)", correct: "I think all cars will be electric", distractors: ["I think will be all cars electric", "I think all cars electric will be"], explanation: "Chivato 'I think' va delante, luego la frase normal (sujeto + will + verbo)." },
    { block: "1", type: "test", question: "Ordena: (open / the door / for you / will / I)", correct: "I will open the door for you", distractors: ["I will for you open the door", "I will open for you the door"], explanation: "Sujeto + will + verbo + objeto + para quién." },
    { block: "1", type: "test", question: "Ordena: (next year / won't / We / French / study)", correct: "We won't study French next year", distractors: ["We won't study next year French", "Next year we won't French study"], explanation: "El tiempo (next year) suele ir al final." },
    { block: "1", type: "test", question: "Ordena: (will / Where / live / you / when you are 30?)", correct: "Where will you live when you are 30?", distractors: ["Where you will live when you are 30?", "Where will live you when you are 30?"], explanation: "Partícula interrogativa (Where) + Will + Sujeto (you) + verbo." },
    { block: "1", type: "test", question: "Ordena: (probably / arrive / late / They / will)", correct: "They will probably arrive late", distractors: ["They probably will arrive late", "Probably they will arrive late"], explanation: "El adverbio 'probably' se coloca justo detrás de 'will'." },
    // Ejercicio 9: Traduce sujeto y verbo
    { block: "1", type: "input", question: "Traduce el inicio: (Yo iré) to the beach tomorrow.", correct: "I will go", explanation: "Sujeto (I) + will + verbo en infinitivo (go)." },
    { block: "1", type: "input", question: "Traduce el inicio: (Nosotros no comeremos) pizza tonight.", correct: ["we won't eat", "we will not eat"], explanation: "Sujeto (We) + won't + verbo en infinitivo (eat)." },
    { block: "1", type: "input", question: "Traduce el inicio: (¿Estudiará ella) for the exam?", correct: "will she study", explanation: "En pregunta, el 'Will' va antes del sujeto: Will + she + study." },
    { block: "1", type: "input", question: "Traduce el inicio: (Él será) a great doctor.", correct: "he will be", explanation: "Sujeto (He) + will + verbo ser (be)." },
    { block: "1", type: "input", question: "Traduce el inicio: (Ellos no jugarán) tennis on Sunday.", correct: ["they won't play", "they will not play"], explanation: "Sujeto (They) + won't + verbo (play)." },
    { block: "1", type: "input", question: "Traduce el inicio: (Tú viajarás) to Japan next year.", correct: "you will travel", explanation: "Sujeto (You) + will + verbo (travel)." },

    // ================== BLOQUE 2: CONDITIONAL SIMPLE ==================
    // Ejercicio 1: Completa would/wouldn't
    { block: "2", type: "input", question: "I _____ (travel) to Japan if I had the money.", correct: "would travel", explanation: "Es una situación hipotética (viajaría). Se forma con would + verbo." },
    { block: "2", type: "input", question: "She _____ (eat) that insect! It's disgusting.", correct: ["wouldn't eat", "would not eat"], explanation: "Negativa condicional: wouldn't + verbo (no comería)." },
    { block: "2", type: "input", question: "We _____ (buy) a big house with a swimming pool.", correct: "would buy", explanation: "Condicional: would + buy (compraríamos)." },
    { block: "2", type: "input", question: "My parents _____ (let) me go to the party on a Monday.", correct: ["wouldn't let", "would not let"], explanation: "Negativa condicional: wouldn't + let (no me dejarían)." },
    { block: "2", type: "input", question: "A dog _____ (be) a great pet for you.", correct: "would be", explanation: "Condicional: would + be (sería)." },
    { block: "2", type: "input", question: "I _____ (wear) that green shirt, it's horrible.", correct: ["wouldn't wear", "would not wear"], explanation: "Situación hipotética negativa: wouldn't + wear (no me pondría)." },
    // Ejercicio 2: Ordena would like
    { block: "2", type: "test", question: "Ordena: (like / I / would / to / a hamburger / eat)", correct: "I would like to eat a hamburger", distractors: ["I would like eat to a hamburger", "I would to like eat a hamburger"], explanation: "Estructura 'Me gustaría hacer algo': would like + to + verbo." },
    { block: "2", type: "test", question: "Ordena: (you / to / Would / come / to the cinema / like?)", correct: "Would you like to come to the cinema?", distractors: ["Would you like come to the cinema?", "Would like you to come to the cinema?"], explanation: "Pregunta educada: Would + sujeto + like + to + verbo." },
    { block: "2", type: "test", question: "Ordena: (wouldn't / to / like / She / study / on Saturday)", correct: "She wouldn't like to study on Saturday", distractors: ["She wouldn't like study on Saturday", "She don't would like to study on Saturday"], explanation: "Negativa: sujeto + wouldn't like + to + verbo." },
    { block: "2", type: "test", question: "Ordena: (like / We / would / to / the teacher / ask / a question)", correct: "We would like to ask the teacher a question", distractors: ["We would like to ask a question the teacher", "We would to like ask the teacher a question"], explanation: "Estructura: would like to + ask + a quién + qué." },
    { block: "2", type: "test", question: "Ordena: (play / would / They / like / to / PlayStation)", correct: "They would like to play PlayStation", distractors: ["They would like play to PlayStation", "They would to like play PlayStation"], explanation: "Sujeto + would like + to + verbo." },
    { block: "2", type: "test", question: "Ordena: (like / to / What / you / would / drink?)", correct: "What would you like to drink?", distractors: ["What you would like to drink?", "What would like you to drink?"], explanation: "Partícula (What) + Would + sujeto (you) + like to + verbo." },
    // Ejercicio 3: Corrige el error
    { block: "2", type: "test", question: "Corrige el error: 'He would plays football every day'", correct: "He would play football every day", distractors: ["He would plays football every day", "He would to play football every day"], explanation: "Detrás de would, el verbo JAMÁS lleva 's', aunque sea tercera persona." },
    { block: "2", type: "test", question: "Corrige el error: 'I would to go to the beach'", correct: "I would go to the beach", distractors: ["I would to go to the beach", "I would going to the beach"], explanation: "'Would' va directamente pegado al verbo. Nunca lleva 'to' en medio (a menos que uses 'like to')." },
    { block: "2", type: "test", question: "Corrige el error: 'Do you would help me?'", correct: "Would you help me?", distractors: ["Do you would help me?", "Are you would help me?"], explanation: "No se usa 'Do' para preguntar. Se pone 'Would' al principio." },
    { block: "2", type: "test", question: "Corrige el error: 'She don't would like to live here'", correct: "She wouldn't like to live here", distractors: ["She doesn't would like to live here", "She don't would like to live here"], explanation: "La negativa es 'wouldn't'. Los auxiliares don't/doesn't no pintan nada aquí." },
    { block: "2", type: "test", question: "Corrige el error: 'We wouldn't drinking that water'", correct: "We wouldn't drink that water", distractors: ["We wouldn't drinking that water", "We wouldn't to drink that water"], explanation: "El verbo detrás de would/wouldn't va en infinitivo normal, sin -ing." },
    { block: "2", type: "test", question: "Corrige el error: 'Would they comes to my party?'", correct: "Would they come to my party?", distractors: ["Would they comes to my party?", "Do would they come to my party?"], explanation: "Ni en pregunta lleva 's' el verbo. Infinitivo puro." },
    // Ejercicio 4: Une situación
    { block: "2", type: "test", question: "Termina la frase: 'If I had one million euros...'", correct: "I would buy a mansion for my family.", distractors: ["I wouldn't watch Netflix.", "I would run away very fast!"], explanation: "Lógica pura: si tuviera un millón, compraría una mansión." },
    { block: "2", type: "test", question: "Termina la frase: 'If I was the President of Spain...'", correct: "I would make school holidays longer.", distractors: ["I would eat coconuts every day.", "I wouldn't go out."], explanation: "Lógica: El presidente puede cambiar las vacaciones escolares." },
    { block: "2", type: "test", question: "Termina la frase: 'If I lived on a desert island...'", correct: "I would eat coconuts every day.", distractors: ["I wouldn't watch Netflix.", "I would make school holidays longer."], explanation: "En una isla desierta comerías cocos." },
    { block: "2", type: "test", question: "Termina la frase: 'If my TV was broken...'", correct: "I wouldn't watch Netflix.", distractors: ["I would run away very fast!", "I would buy a mansion."], explanation: "Si la tele está rota, no puedes ver Netflix." },
    { block: "2", type: "test", question: "Termina la frase: 'If it rained all weekend...'", correct: "I wouldn't go out, I would stay at home.", distractors: ["I would make school holidays longer.", "I would eat coconuts."], explanation: "Si llueve, te quedas en casa." },
    { block: "2", type: "test", question: "Termina la frase: 'If I saw a ghost...'", correct: "I would run away very fast!", distractors: ["I wouldn't watch Netflix.", "I wouldn't go out."], explanation: "Ante un fantasma, ¡corres!" },
    // Ejercicio 5: Respuestas cortas
    { block: "2", type: "input", question: "Escribe la respuesta corta: 'Would you travel to space?' (Sí)", correct: "Yes, I would", explanation: "Yes + pronombre (I) + would." },
    { block: "2", type: "input", question: "Escribe la respuesta corta: 'Would your brother jump from a plane?' (No)", correct: "No, he wouldn't", explanation: "No + pronombre (he) + wouldn't." },
    { block: "2", type: "input", question: "Escribe la respuesta corta: 'Would they win the match with Messi?' (Sí)", correct: "Yes, they would", explanation: "Yes + pronombre (they) + would." },
    { block: "2", type: "input", question: "Escribe la respuesta corta: 'Would we survive in the jungle?' (No)", correct: "No, we wouldn't", explanation: "No + pronombre (we) + wouldn't." },
    { block: "2", type: "input", question: "Escribe la respuesta corta: 'Would your parents buy you a motorbike?' (No)", correct: "No, they wouldn't", explanation: "No + pronombre de los padres (they) + wouldn't." },
    { block: "2", type: "input", question: "Escribe la respuesta corta: 'Would she like some tea?' (Sí)", correct: "Yes, she would", explanation: "Yes + pronombre (she) + would." },
    // Ejercicio 7: Traduce
    { block: "2", type: "input", question: "Traduce el inicio: (Nosotros iríamos)", correct: "we would go", explanation: "Sujeto (We) + would + verbo (go)." },
    { block: "2", type: "input", question: "Traduce el inicio: (Él no comería)", correct: ["he wouldn't eat", "he would not eat"], explanation: "Sujeto (He) + wouldn't + verbo (eat)." },
    { block: "2", type: "input", question: "Traduce el inicio: (Tú estudiarías)", correct: "you would study", explanation: "Sujeto (You) + would + verbo (study)." },
    { block: "2", type: "input", question: "Traduce el inicio: (A mí me gustaría)", correct: ["i would like", "i'd like"], explanation: "Expresión súper típica: 'I would like'." },
    { block: "2", type: "input", question: "Traduce el inicio: (¿Leerían ellos?)", correct: "would they read", explanation: "Al ser pregunta empezamos por Would: Would + they + read." },
    { block: "2", type: "input", question: "Traduce el inicio: (Ella no llamaría)", correct: ["she wouldn't call", "she would not call"], explanation: "Sujeto (She) + wouldn't + verbo (call)." },
    // Ejercicio 8: Contracciones
    { block: "2", type: "input", question: "Escribe de forma contraída (apóstrofe): 'I would' like to buy a new car.", correct: "I'd", explanation: "La contracción de I would es I'd." },
    { block: "2", type: "input", question: "Escribe de forma contraída (apóstrofe): 'She would' be a great doctor.", correct: "She'd", explanation: "La contracción de She would es She'd." },
    { block: "2", type: "input", question: "Escribe de forma contraída (apóstrofe): 'They would' help us.", correct: "They'd", explanation: "La contracción de They would es They'd." },
    { block: "2", type: "input", question: "Escribe de forma contraída (apóstrofe): 'We would' travel to Italy.", correct: "We'd", explanation: "La contracción de We would es We'd." },
    { block: "2", type: "input", question: "Escribe de forma contraída (apóstrofe): 'He would' love this video game.", correct: "He'd", explanation: "La contracción de He would es He'd." },
    { block: "2", type: "input", question: "Escribe de forma contraída (apóstrofe): 'You would' sleep all day!", correct: "You'd", explanation: "La contracción de You would es You'd." },
    // Ejercicio 9: Cambia presente a condicional
    { block: "2", type: "input", question: "Cambia la frase a hipotética: I don't live in a castle -> I _____ in a castle.", correct: "wouldn't live", explanation: "Para hacerla hipotética negativa usamos wouldn't + live." },
    { block: "2", type: "input", question: "Cambia la frase a hipotética: He speaks Chinese -> He _____ Chinese.", correct: "would speak", explanation: "Para hipótesis afirmativa usamos would + speak (recuerda quitarle la 's')." },
    { block: "2", type: "input", question: "Cambia la frase a hipotética: We don't eat vegetables -> We _____ vegetables.", correct: "wouldn't eat", explanation: "Hipótesis negativa: wouldn't + eat." },
    { block: "2", type: "input", question: "Cambia la frase a hipotética: They play the guitar -> They _____ the guitar.", correct: "would play", explanation: "Hipótesis afirmativa: would + play." },
    { block: "2", type: "input", question: "Cambia la frase a hipotética: She doesn't run -> She _____ in the marathon.", correct: "wouldn't run", explanation: "Hipótesis negativa: wouldn't + run." },
    { block: "2", type: "input", question: "Cambia la frase a hipotética: You listen to classical music -> You _____ to classical music.", correct: "would listen", explanation: "Hipótesis afirmativa: would + listen." },

    // ================== BLOQUE 3: FIRST CONDITIONAL ==================
    // Ejercicio 1: Match
    { block: "3", type: "test", question: "Termina la frase: 'If it rains tomorrow...'", correct: "we will stay at home and watch a film.", distractors: ["you will fail.", "we will catch the bus."], explanation: "Lógica de condicional: si llueve, la consecuencia es quedarse en casa." },
    { block: "3", type: "test", question: "Termina la frase: 'If you don't study for the exam...'", correct: "you will fail.", distractors: ["you will be very tired.", "she will have a stomachache."], explanation: "Si no estudias, suspendes (fail)." },
    { block: "3", type: "test", question: "Termina la frase: 'If we run fast...'", correct: "we will catch the bus.", distractors: ["we will stay at home.", "they will celebrate."], explanation: "Si corres, pillas el bus (catch the bus)." },
    { block: "3", type: "test", question: "Termina la frase: 'If she eats all that chocolate...'", correct: "she will have a stomachache.", distractors: ["you will be very tired.", "you will fail."], explanation: "Comer mucho chocolate = dolor de tripa." },
    { block: "3", type: "test", question: "Termina la frase: 'If you play video games all night...'", correct: "you will be very tired in the morning.", distractors: ["she will have a stomachache.", "we will catch the bus."], explanation: "Jugar toda la noche te deja cansado (tired)." },
    { block: "3", type: "test", question: "Termina la frase: 'If they win the match...'", correct: "they will celebrate with a big party.", distractors: ["we will stay at home.", "you will fail."], explanation: "Ganar el partido lleva a celebrar con una fiesta." },
    // Ejercicio 2: Completa consecuencia
    { block: "3", type: "input", question: "If I have time this afternoon, I _____ (help) you with your project.", correct: "will help", explanation: "Consecuencia del First Conditional: will + verbo." },
    { block: "3", type: "input", question: "If you don't wear a jacket, you _____ (catch) a cold.", correct: "will catch", explanation: "Consecuencia lógica probable: will + verbo." },
    { block: "3", type: "input", question: "If my dad cooks dinner, we _____ (eat) pizza.", correct: "will eat", explanation: "La consecuencia en el primer condicional lleva 'will'." },
    { block: "3", type: "input", question: "If it is sunny on Saturday, I _____ (not stay) at home.", correct: ["won't stay", "will not stay"], explanation: "Consecuencia negativa: won't + verbo." },
    { block: "3", type: "input", question: "If she passes all her exams, her parents _____ (buy) her a new phone.", correct: "will buy", explanation: "Consecuencia en afirmativa: will + verbo." },
    { block: "3", type: "input", question: "If we miss the train, we _____ (not arrive) on time.", correct: ["won't arrive", "will not arrive"], explanation: "Consecuencia negativa: won't + verbo." },
    // Ejercicio 3: Completa condición
    { block: "3", type: "input", question: "If you _____ (eat) vegetables, you will be strong.", correct: "eat", explanation: "La condición (parte del If) SIEMPRE va en Presente Simple." },
    { block: "3", type: "input", question: "If my brother _____ (play) loud music, I will get angry.", correct: "plays", explanation: "Parte del 'If' en Presente Simple. Al ser 'my brother' (He), el verbo lleva 's'." },
    { block: "3", type: "input", question: "If we _____ (not hurry), we will miss the start of the film.", correct: ["don't hurry", "do not hurry"], explanation: "Negativa en Presente Simple (para We usamos don't)." },
    { block: "3", type: "input", question: "If it _____ (not rain), we will go to the beach.", correct: ["doesn't rain", "does not rain"], explanation: "Negativa en Presente Simple (para It usamos doesn't)." },
    { block: "3", type: "input", question: "If the teacher _____ (give) us homework, I will do it tonight.", correct: "gives", explanation: "La profesora es tercera persona (She/He), así que en presente el verbo lleva 's' (gives)." },
    { block: "3", type: "input", question: "If I _____ (find) your keys, I will call you.", correct: "find", explanation: "Para 'I' en presente simple el verbo se queda igual." },
    // Ejercicio 4: Completa ambas (TEST)
    { block: "3", type: "test", question: "Elige la pareja correcta: If she (invite) me, I (go) to her party.", correct: "invites / will go", distractors: ["will invite / go", "invite / will go"], explanation: "Parte del 'If' = Presente (invites). Consecuencia = Futuro (will go)." },
    { block: "3", type: "test", question: "Elige la pareja correcta: If you (not sleep) well, you (feel) terrible tomorrow.", correct: "don't sleep / will feel", distractors: ["won't sleep / feel", "doesn't sleep / will feel"], explanation: "Parte del 'If' = Presente negativo (don't sleep). Consecuencia = Futuro (will feel)." },
    { block: "3", type: "test", question: "Elige la pareja correcta: If we (take) a taxi, we (not be) late.", correct: "take / won't be", distractors: ["will take / aren't", "takes / won't be"], explanation: "Parte del 'If' = Presente (take). Consecuencia = Futuro negativo (won't be)." },
    { block: "3", type: "test", question: "Elige la pareja correcta: They (not win) the game if they (not play) as a team.", correct: "won't win / don't play", distractors: ["don't win / won't play", "won't win / doesn't play"], explanation: "¡Está al revés! La parte SIN 'if' va en futuro (won't win). La parte CON 'if' en presente (don't play)." },
    { block: "3", type: "test", question: "Elige la pareja correcta: If he (forget) his umbrella, he (get) wet.", correct: "forgets / will get", distractors: ["forget / will get", "will forget / gets"], explanation: "Parte del 'If' = Presente 3ª persona (forgets). Consecuencia = Futuro (will get)." },
    // Ejercicio 5: Dar la vuelta
    { block: "3", type: "test", question: "Dále la vuelta a la frase: 'If I go to London, I will buy a souvenir.'", correct: "I will buy a souvenir if I go to London.", distractors: ["I will buy a souvenir, if I go to London.", "If I will buy a souvenir I go to London."], explanation: "Al darle la vuelta, la coma desaparece." },
    { block: "3", type: "test", question: "Dále la vuelta: 'You will learn a lot if you read books.'", correct: "If you read books, you will learn a lot.", distractors: ["If you read books you will learn a lot.", "If you will learn a lot, you read books."], explanation: "Si empezamos por el 'If', es OBLIGATORIO poner una coma en mitad de la frase." },
    { block: "3", type: "test", question: "Dále la vuelta: 'If she doesn't study, she will fail the test.'", correct: "She will fail the test if she doesn't study.", distractors: ["She will fail the test, if she doesn't study.", "If she will fail the test she doesn't study."], explanation: "El 'if' se queda en medio actuando de puente, y quitamos la coma." },
    { block: "3", type: "test", question: "Dále la vuelta: 'We will go to the park if the weather is good.'", correct: "If the weather is good, we will go to the park.", distractors: ["If the weather is good we will go to the park.", "If we will go to the park, the weather is good."], explanation: "Al poner el 'If' al principio, se necesita la coma para separar la condición de la consecuencia." },
    // Ejercicio 6: Corregir error grave
    { block: "3", type: "test", question: "Corrige el error GRAVE: 'If it will rain, we won't play tennis.'", correct: "If it rains, we won't play tennis.", distractors: ["If it rain, we won't play tennis.", "If it rains, we don't play tennis."], explanation: "¡Regla de oro! Detrás de 'If' JAMÁS puede ir un 'will'. Va en presente (rains)." },
    { block: "3", type: "test", question: "Corrige el error GRAVE: 'I will call you if I will have free time.'", correct: "I will call you if I have free time.", distractors: ["I call you if I will have free time.", "I will call you if I has free time."], explanation: "La parte del 'if' no puede llevar 'will'. Va en presente (have)." },
    { block: "3", type: "test", question: "Corrige el error GRAVE: 'If she don't come to the party, I will be sad.'", correct: "If she doesn't come to the party, I will be sad.", distractors: ["If she won't come to the party, I will be sad.", "If she not come to the party, I will be sad."], explanation: "En presente simple, para 'She', la negación correcta es 'doesn't'." },
    { block: "3", type: "test", question: "Corrige el error GRAVE: 'If you will eat that, you will be sick.'", correct: "If you eat that, you will be sick.", distractors: ["If you eat that, you are sick.", "If you will eat that, you are sick."], explanation: "El 'If' ahuyenta al 'will'. Esa primera parte va en presente simple (eat)." },
    { block: "3", type: "test", question: "Corrige el error GRAVE: 'He won't pass the exam if he doesn't studies.'", correct: "He won't pass the exam if he doesn't study.", distractors: ["He don't pass the exam if he doesn't study.", "He won't pass the exam if he don't study."], explanation: "Detrás de doesn't, el verbo recupera su forma normal (study), ya no lleva la 's'." },
    { block: "3", type: "test", question: "Corrige el error GRAVE: 'If we aren't hurry, we will miss the bus.'", correct: "If we don't hurry, we will miss the bus.", distractors: ["If we doesn't hurry, we will miss the bus.", "If we aren't hurry, we miss the bus."], explanation: "Para negar el verbo 'hurry' (darse prisa) en presente simple usamos 'don't', no el verbo To Be." },
    // Ejercicio 7: Supersticiones
    { block: "3", type: "input", question: "Superstición: If you _____ (break) a mirror, you will have bad luck.", correct: "break", explanation: "La parte del 'If' va en Presente Simple." },
    { block: "3", type: "input", question: "Superstición: If you walk under a ladder, you _____ (have) bad luck.", correct: "will have", explanation: "La consecuencia de la condición va en Futuro con 'will'." },
    { block: "3", type: "input", question: "Superstición: You will have good luck if you _____ (find) a four-leaf clover.", correct: "find", explanation: "La parte del 'if' va en Presente Simple, aunque esté en medio de la frase." },
    { block: "3", type: "input", question: "Superstición: If a black cat _____ (cross) your path, something bad will happen.", correct: "crosses", explanation: "Un gato (It) es tercera persona, así que el verbo 'cross' en presente lleva '-es'." },
    { block: "3", type: "input", question: "Superstición: You _____ (make) a wish come true if you blow out all the candles.", correct: "will make", explanation: "Es la consecuencia (va sin 'if'), por tanto requiere 'will'." },
    // Ejercicio 9: Traduce
    { block: "3", type: "test", question: "Traduce la pareja de verbos: (Si tú estudias), (tú aprobarás) the exam.", correct: "If you study / you will pass", distractors: ["If you will study / you pass", "If you study / you pass"], explanation: "If + Presente, y en la otra parte Futuro (will)." },
    { block: "3", type: "test", question: "Traduce la pareja: (Si llueve), (nosotros no saldremos).", correct: "If it rains / we won't go out", distractors: ["If it will rain / we don't go out", "If it rain / we won't go out"], explanation: "If + Presente (con 's' para It). Consecuencia en futuro negativo (won't)." },
    { block: "3", type: "test", question: "Traduce la pareja: (Si ella no viene), (yo estaré) sad.", correct: "If she doesn't come / I will be", distractors: ["If she don't come / I will be", "If she won't come / I am"], explanation: "Presente negativo para ella (doesn't come). Consecuencia futuro (will be)." },
    { block: "3", type: "test", question: "Traduce la pareja: (Él comprará) a car (si él tiene) money.", correct: "He will buy / if he has", distractors: ["He buys / if he will have", "He will buy / if he have"], explanation: "La consecuencia va primero en futuro (will buy). La condición en presente con 's' (has)." },
    { block: "3", type: "test", question: "Traduce la pareja: (Si nosotros corremos), (no llegaremos tarde).", correct: "If we run / we won't be late", distractors: ["If we will run / we aren't late", "If we run / we don't be late"], explanation: "If + Presente (run). Consecuencia en futuro negativo (won't be)." },

    // ================== BLOQUE 4: BE GOING TO ==================
    // Ejercicio 1: Completa afirmativa
    { block: "4", type: "input", question: "I _____ (visit) my grandparents this weekend.", correct: ["am going to visit", "'m going to visit"], explanation: "Para planes cerrados: am + going to + verbo." },
    { block: "4", type: "input", question: "She _____ (study) French next year.", correct: ["is going to study", "'s going to study"], explanation: "Para 'She' usamos: is + going to + verbo." },
    { block: "4", type: "input", question: "We _____ (play) football on Saturday morning.", correct: ["are going to play", "'re going to play"], explanation: "Para 'We' usamos: are + going to + verbo." },
    { block: "4", type: "input", question: "My brother _____ (buy) a new computer.", correct: ["is going to buy", "'s going to buy"], explanation: "Mi hermano = He. Por tanto: is + going to + verbo." },
    { block: "4", type: "input", question: "They _____ (watch) a film at the cinema tonight.", correct: ["are going to watch", "'re going to watch"], explanation: "Para 'They' usamos: are + going to + verbo." },
    { block: "4", type: "input", question: "You _____ (have) a great time at the party!", correct: ["are going to have", "'re going to have"], explanation: "Para 'You' usamos: are + going to + verbo." },
    // Ejercicio 2: Completa negativa
    { block: "4", type: "input", question: "I _____ (not/do) my homework today, I will do it tomorrow.", correct: ["am not going to do", "'m not going to do"], explanation: "Negativa para I: am not going to + verbo." },
    { block: "4", type: "input", question: "My dad _____ (not/cook) dinner tonight, we are ordering pizza.", correct: ["isn't going to cook", "is not going to cook"], explanation: "Negativa para 'He': isn't going to + verbo." },
    { block: "4", type: "input", question: "We _____ (not/travel) this summer because it's too expensive.", correct: ["aren't going to travel", "are not going to travel"], explanation: "Negativa para 'We': aren't going to + verbo." },
    { block: "4", type: "input", question: "Paula _____ (not/invite) him to her birthday.", correct: ["isn't going to invite", "is not going to invite"], explanation: "Negativa para 'She': isn't going to + verbo." },
    { block: "4", type: "input", question: "You _____ (not/wear) those dirty shoes inside the house!", correct: ["aren't going to wear", "are not going to wear"], explanation: "Negativa para 'You': aren't going to + verbo." },
    { block: "4", type: "input", question: "The dogs _____ (not/sleep) on my bed.", correct: ["aren't going to sleep", "are not going to sleep"], explanation: "The dogs = They (plural). Negativa: aren't going to + verbo." },
    // Ejercicio 3: Preguntas y respuestas
    { block: "4", type: "test", question: "Ordena la pregunta: (you / Are / study / going to / tomorrow?)", correct: "Are you going to study tomorrow?", distractors: ["Are going to you study tomorrow?", "You are going to study tomorrow?"], explanation: "Pregunta: Verbo To Be (Are) + sujeto + going to + verbo." },
    { block: "4", type: "input", question: "Respuesta corta AFIRMATIVA a: 'Are you going to study?'", correct: "Yes, I am", explanation: "Yes + I + am." },
    { block: "4", type: "test", question: "Ordena la pregunta: (going to / Is / rain / it?)", correct: "Is it going to rain?", distractors: ["Is going to it rain?", "It is going to rain?"], explanation: "Verbo To Be (Is) + sujeto (it) + going to + verbo." },
    { block: "4", type: "input", question: "Respuesta corta NEGATIVA a: 'Is it going to rain?'", correct: ["No, it isn't", "No, it is not"], explanation: "No + it + isn't." },
    { block: "4", type: "test", question: "Ordena la pregunta: (play / they / Are / going to / tennis?)", correct: "Are they going to play tennis?", distractors: ["Are going to they play tennis?", "They are going to play tennis?"], explanation: "Are + they + going to + verbo." },
    { block: "4", type: "input", question: "Respuesta corta AFIRMATIVA a: 'Are they going to play?'", correct: "Yes, they are", explanation: "Yes + they + are." },
    { block: "4", type: "test", question: "Ordena la pregunta: (he / going to / Is / pass / the exam?)", correct: "Is he going to pass the exam?", distractors: ["Is going to he pass the exam?", "He is going to pass the exam?"], explanation: "Is + he + going to + verbo." },
    { block: "4", type: "input", question: "Respuesta corta NEGATIVA a: 'Is he going to pass?'", correct: ["No, he isn't", "No, he is not"], explanation: "No + he + isn't." },
    // Ejercicio 4: Match predicción
    { block: "4", type: "test", question: "Predicción para: 'Look at those big black clouds!'", correct: "it is going to rain heavily.", distractors: ["they are going to be late.", "he is going to crash!"], explanation: "Nubes negras = predicción visual de lluvia." },
    { block: "4", type: "test", question: "Predicción para: 'Look at that boy on the bike! He is driving very fast...'", correct: "he is going to crash!", distractors: ["she is going to have a baby.", "it is going to rain heavily."], explanation: "Evidencia visual de peligro = se va a chocar (crash)." },
    { block: "4", type: "test", question: "Predicción para: 'The score is Real Madrid 5-0... 1 minute left.'", correct: "Real Madrid are going to win the match.", distractors: ["they are going to be late.", "she is going to feel sick."], explanation: "Falta un minuto y van 5-0. Es seguro que van a ganar." },
    { block: "4", type: "test", question: "Predicción para: 'She ate three big pizzas and a chocolate cake.'", correct: "she is going to feel sick.", distractors: ["it is going to rain heavily.", "he is going to crash!"], explanation: "Evidencia clara de que se va a encontrar mal (feel sick)." },
    { block: "4", type: "test", question: "Predicción para: 'It is 8:25 AM and the class starts at 8:30 AM. They are at home.'", correct: "they are going to be late for school.", distractors: ["Real Madrid are going to win.", "she is going to have a baby."], explanation: "Faltan 5 min y están en casa, evidencia matemática de que llegarán tarde." },
    { block: "4", type: "test", question: "Predicción para: 'Look at the pregnant lady's big belly!'", correct: "she is going to have a baby very soon.", distractors: ["she is going to feel sick.", "they are going to be late."], explanation: "Evidencia visual clara (tripa de embarazada) = va a tener un bebé." },
    // Ejercicio 5: Agenda
    { block: "4", type: "input", question: "Viendo la agenda: 'Friday: go to the cinema'. On Friday, Laura _____ to the cinema.", correct: ["is going to go", "'s going to go"], explanation: "Es su plan, así que usamos is + going to + verbo(go)." },
    { block: "4", type: "input", question: "Viendo la agenda: 'Saturday morning: play tennis'. On Saturday morning, she _____ tennis.", correct: ["is going to play", "'s going to play"], explanation: "Plan seguro = is going to + play." },
    { block: "4", type: "input", question: "Viendo la agenda: 'Saturday evening: NOT study'. On Saturday evening, she _____.", correct: ["isn't going to study", "is not going to study"], explanation: "Plan negativo = isn't going to + study." },
    { block: "4", type: "input", question: "Viendo la agenda: 'Sunday: visit grandma'. On Sunday, she _____ grandma.", correct: ["is going to visit", "'s going to visit"], explanation: "Plan seguro = is going to + visit." },
    // Ejercicio 6: Ordena
    { block: "4", type: "test", question: "Ordena: (is / going to / My sister / a new mobile phone / buy)", correct: "My sister is going to buy a new mobile phone", distractors: ["My sister is going to a new mobile phone buy", "My sister buy is going to a new mobile phone"], explanation: "Sujeto + is going to + verbo + objeto." },
    { block: "4", type: "test", question: "Ordena: (are / We / play / not / going to / today / basketball)", correct: "We are not going to play basketball today", distractors: ["We are going to not play basketball today", "We not are going to play basketball today"], explanation: "Sujeto + are not + going to + verbo." },
    { block: "4", type: "test", question: "Ordena: (going to / am / sleep / I / all morning)", correct: "I am going to sleep all morning", distractors: ["I am sleep going to all morning", "I going to am sleep all morning"], explanation: "Sujeto + am + going to + verbo." },
    { block: "4", type: "test", question: "Ordena: (going to / clean / They / their bedrooms / are)", correct: "They are going to clean their bedrooms", distractors: ["They are clean going to their bedrooms", "They going to are clean their bedrooms"], explanation: "Sujeto + are + going to + verbo." },
    { block: "4", type: "test", question: "Ordena: (a scary film / watch / isn't / going to / He)", correct: "He isn't going to watch a scary film", distractors: ["He isn't going to a scary film watch", "He going to isn't watch a scary film"], explanation: "Sujeto + isn't + going to + verbo." },
    { block: "4", type: "test", question: "Ordena: (am / I / going to / an email / send / not)", correct: "I am not going to send an email", distractors: ["I am going to not send an email", "I not am going to send an email"], explanation: "La negación 'not' va siempre pegada al verbo To Be (I am not)." },
    // Ejercicio 7: Corrige
    { block: "4", type: "test", question: "Corrige el error: 'I going to play video games'", correct: "I am going to play video games", distractors: ["I going to playing video games", "I is going to play video games"], explanation: "¡Te falta el verbo To Be! La estructura completa exige 'am' delante del going to." },
    { block: "4", type: "test", question: "Corrige el error: 'She is going to studies Maths'", correct: "She is going to study Maths", distractors: ["She is going to studies Maths", "She going to study Maths"], explanation: "El verbo detrás del 'going to' SIEMPRE va en infinitivo, sin 's' de tercera persona." },
    { block: "4", type: "test", question: "Corrige el error: 'We are going visit London'", correct: "We are going to visit London", distractors: ["We are going visit London", "We going to visit London"], explanation: "Te has comido la partícula 'to' que une el going con el verbo principal." },
    { block: "4", type: "test", question: "Corrige el error: 'He am going to buy a jacket'", correct: "He is going to buy a jacket", distractors: ["He am going to buy a jacket", "He are going to buy a jacket"], explanation: "El verbo To Be para 'He' es 'is', no 'am'." },
    { block: "4", type: "test", question: "Corrige el error: 'They aren't going to playing tennis'", correct: "They aren't going to play tennis", distractors: ["They aren't going to playing tennis", "They don't going to play tennis"], explanation: "El verbo principal va normal (play), el que lleva el '-ing' es solo el going." },
    { block: "4", type: "test", question: "Corrige el error: 'Is you going to watch the match?'", correct: "Are you going to watch the match?", distractors: ["Do you going to watch the match?", "Is you going to watch the match?"], explanation: "El verbo To Be para la persona 'you' es 'Are'." },
    // Ejercicio 9: Traduce
    { block: "4", type: "input", question: "Traduce la parte del plan: (Ella va a escuchar) music.", correct: "she is going to listen", explanation: "She + is + going to + listen." },
    { block: "4", type: "input", question: "Traduce la parte del plan: (Nosotros vamos a estudiar) for the exam.", correct: "we are going to study", explanation: "We + are + going to + study." },
    { block: "4", type: "input", question: "Traduce la parte del plan: (Ellos no van a jugar) today.", correct: ["they aren't going to play", "they are not going to play"], explanation: "They + aren't + going to + play." },
    { block: "4", type: "input", question: "Traduce la parte del plan: (Yo no voy a limpiar) the kitchen.", correct: ["i am not going to clean", "i'm not going to clean"], explanation: "I + am not + going to + clean." },
    { block: "4", type: "input", question: "Traduce la parte del plan: (¿Vas tú a ver) the football match?", correct: ["are you going to watch", "are you going to see"], explanation: "Pregunta: Are + you + going to + watch." },
    { block: "4", type: "input", question: "Traduce la parte del plan: (Él va a comprar) some bread.", correct: ["he is going to buy", "he's going to buy"], explanation: "He + is + going to + buy." },

    // ================== BLOQUE 5: THERE IS / THERE ARE ==================
    // Ejercicio 1:
    { block: "5", type: "test", question: "Elige la opción correcta: _____ a big supermarket in my town.", correct: "There is", distractors: ["There are", "Is there"], explanation: "Se habla de 'un supermercado' (singular afirmativo)." },
    { block: "5", type: "test", question: "Elige la opción correcta: _____ three bedrooms in my house.", correct: "There are", distractors: ["There is", "Are there"], explanation: "Se habla de 'tres habitaciones' (plural afirmativo)." },
    { block: "5", type: "test", question: "Elige la opción correcta: _____ an apple on the table.", correct: "There is", distractors: ["There are", "Is there"], explanation: "Se habla de 'una manzana' (singular afirmativo)." },
    { block: "5", type: "test", question: "Elige la opción correcta: _____ twenty students in the classroom.", correct: "There are", distractors: ["There is", "Are there"], explanation: "Veinte estudiantes es plural afirmativo." },
    { block: "5", type: "test", question: "Elige la opción correcta: _____ a lot of water in the bottle.", correct: "There is", distractors: ["There are", "Are there"], explanation: "El agua ('water') es incontable, y los incontables se tratan como singulares." },
    { block: "5", type: "test", question: "Elige la opción correcta: _____ two dogs playing in the park.", correct: "There are", distractors: ["There is", "Are there"], explanation: "Dos perros es plural afirmativo." },
    // Ejercicio 2: Negativa
    { block: "5", type: "input", question: "Transforma a negativa: There is a cinema. -> _____ a cinema.", correct: "There isn't", explanation: "La negativa de There is = There isn't." },
    { block: "5", type: "input", question: "Transforma a negativa: There are five parks. -> _____ five parks.", correct: "There aren't", explanation: "La negativa de There are = There aren't." },
    { block: "5", type: "input", question: "Transforma a negativa: There is a big hospital. -> _____ a big hospital.", correct: "There isn't", explanation: "La negativa de There is = There isn't." },
    { block: "5", type: "input", question: "Transforma a negativa: There are fast-food restaurants. -> _____ fast-food restaurants.", correct: "There aren't any", explanation: "OJO al detalle de nivel alto: si quitamos el número en negativa, añadimos 'any' (There aren't any)." },
    { block: "5", type: "input", question: "Transforma a negativa: There is an airport. -> _____ an airport.", correct: "There isn't", explanation: "La negativa de There is = There isn't." },
    { block: "5", type: "input", question: "Transforma a negativa: There are interesting museums. -> _____ interesting museums.", correct: "There aren't any", explanation: "Negativa de plural = There aren't any." },
    // Ejercicio 3: a/some/any
    { block: "5", type: "test", question: "Elige: There is _____ television in the living room.", correct: "a", distractors: ["some", "any"], explanation: "Televisión es singular contable, usamos 'a' (una)." },
    { block: "5", type: "test", question: "Elige: There aren't _____ chips in the kitchen.", correct: "any", distractors: ["some", "a"], explanation: "La regla de oro: oraciones negativas (aren't) siempre llevan 'any'." },
    { block: "5", type: "test", question: "Elige: Are there _____ messages for me?", correct: "any", distractors: ["a", "some"], explanation: "Para hacer preguntas en plural usamos 'any'." },
    { block: "5", type: "test", question: "Elige: There are _____ good films on Netflix today.", correct: "some", distractors: ["any", "a"], explanation: "En frases afirmativas de plural usamos 'some' (algunos)." },
    { block: "5", type: "test", question: "Elige: There isn't _____ egg in the fridge.", correct: "an", distractors: ["any", "some"], explanation: "¡Trampa! Aunque es negativa, 'egg' es singular. Para un singular siempre usamos 'a' o 'an'." },
    { block: "5", type: "test", question: "Elige: Is there _____ doctor in the hospital?", correct: "a", distractors: ["any", "some"], explanation: "Es pregunta, pero 'doctor' es singular, así que usamos 'a'." },
    // Ejercicio 4: Preguntas y respuestas
    { block: "5", type: "test", question: "Ordena la pregunta: (there / a / Is / bank / near here?)", correct: "Is there a bank near here?", distractors: ["There is a bank near here?", "Is a bank there near here?"], explanation: "Para preguntar en singular: Is there + a + objeto." },
    { block: "5", type: "input", question: "Respuesta AFIRMATIVA a: 'Is there a bank near here?'", correct: "Yes, there is", explanation: "Yes + there is." },
    { block: "5", type: "test", question: "Ordena la pregunta: (dogs / Are / there / in your house?)", correct: "Are there dogs in your house?", distractors: ["Are dogs there in your house?", "There are dogs in your house?"], explanation: "Para preguntar en plural: Are there + objeto." },
    { block: "5", type: "input", question: "Respuesta NEGATIVA a: 'Are there dogs in your house?'", correct: ["No, there aren't", "No, there are not"], explanation: "No + there aren't." },
    { block: "5", type: "test", question: "Ordena la pregunta: (any / Is / milk / there / in the fridge?)", correct: "Is there any milk in the fridge?", distractors: ["Is any milk there in the fridge?", "There is any milk in the fridge?"], explanation: "Para preguntar por incontables (milk): Is there any + objeto." },
    { block: "5", type: "input", question: "Respuesta AFIRMATIVA a: 'Is there any milk?'", correct: "Yes, there is", explanation: "Yes + there is." },
    { block: "5", type: "test", question: "Ordena la pregunta: (there / two / Are / teachers / in the classroom?)", correct: "Are there two teachers in the classroom?", distractors: ["Are two teachers there in the classroom?", "There are two teachers in the classroom?"], explanation: "Are there + número + objeto." },
    { block: "5", type: "input", question: "Respuesta NEGATIVA a: 'Are there two teachers?'", correct: ["No, there aren't", "No, there are not"], explanation: "No + there aren't." },
    // Ejercicio 6: Corregir
    { block: "5", type: "test", question: "Corrige el error: 'There is two beds in my bedroom.'", correct: "There are two beds in my bedroom.", distractors: ["There is two beds in my bedroom.", "There are two bed in my bedroom."], explanation: "Son dos camas (plural), necesitamos 'There are'." },
    { block: "5", type: "test", question: "Corrige el error: 'There aren't some people in the park.'", correct: "There aren't any people in the park.", distractors: ["There isn't some people in the park.", "There aren't some people in the park."], explanation: "En frases negativas NUNCA se usa 'some', se cambia por 'any'." },
    { block: "5", type: "test", question: "Corrige el error: 'Is there any cars in the street?'", correct: "Are there any cars in the street?", distractors: ["Is there any cars in the street?", "Are there a cars in the street?"], explanation: "Cars es plural, la pregunta debe empezar por 'Are there'." },
    { block: "5", type: "test", question: "Corrige el error: 'There are a orange in my bag.'", correct: "There is an orange in my bag.", distractors: ["There are an orange in my bag.", "There are a orange in my bag."], explanation: "Una naranja es singular ('There is') y al empezar por vocal requiere 'an'." },
    { block: "5", type: "test", question: "Corrige el error: 'There isn't any posters on the wall.'", correct: "There aren't any posters on the wall.", distractors: ["There isn't any posters on the wall.", "There aren't some posters on the wall."], explanation: "Pósters está en plural (con 's'), por tanto el verbo debe ser plural ('aren't')." },
    { block: "5", type: "test", question: "Corrige el error: 'Are there a hospital in your city?'", correct: "Is there a hospital in your city?", distractors: ["Are there a hospital in your city?", "Is there any hospital in your city?"], explanation: "Hospital es singular, la pregunta debe ser 'Is there a...?'" },
    // Ejercicio 7: Match
    { block: "5", type: "test", question: "Termina la frase: 'In the fridge, there is...'", correct: "some cold water and milk.", distractors: ["some pens and pencils.", "a lot of books."], explanation: "En la nevera guardas agua y leche." },
    { block: "5", type: "test", question: "Termina la frase: 'In the pencil case, there are...'", correct: "some pens and pencils.", distractors: ["a shower.", "any dinosaurs."], explanation: "En el estuche hay bolis y lápices." },
    { block: "5", type: "test", question: "Termina la frase: 'In my bedroom, there isn't...'", correct: "a TV, I only have a bed.", distractors: ["some cold water and milk.", "a lot of books."], explanation: "Habitación = tele y cama." },
    { block: "5", type: "test", question: "Termina la frase: 'In the library, there are...'", correct: "a lot of books.", distractors: ["some pens and pencils.", "any dinosaurs."], explanation: "En la biblioteca hay libros." },
    { block: "5", type: "test", question: "Termina la frase: 'In the bathroom, there is...'", correct: "a shower.", distractors: ["a lot of books.", "a TV, I only have a bed."], explanation: "En el baño hay una ducha (shower)." },
    { block: "5", type: "test", question: "Termina la frase: 'In the zoo, there aren't...'", correct: "any dinosaurs.", distractors: ["some cold water and milk.", "a shower."], explanation: "En el zoo no hay dinosaurios (¡menos mal!)." },
    // Ejercicio 9: Traduce
    { block: "5", type: "input", question: "Traduce el inicio: (Hay un) dog.", correct: "there is a", explanation: "Singular = There is + a/an." },
    { block: "5", type: "input", question: "Traduce el inicio: (Hay tres) cats.", correct: "there are three", explanation: "Plural = There are + número." },
    { block: "5", type: "input", question: "Traduce el inicio: (No hay) time!", correct: ["there is no", "there isn't any", "there is not any"], explanation: "Incontable negativo = There isn't any / There is no." },
    { block: "5", type: "input", question: "Traduce el inicio: (¿Hay alguna...?) library near here?", correct: "is there a", explanation: "Pregunta singular = Is there a...?" },
    { block: "5", type: "input", question: "Traduce el inicio: (No hay ningún) trees in this street.", correct: ["there aren't any", "there are not any"], explanation: "Plural negativo = There aren't any." },
    { block: "5", type: "input", question: "Traduce el inicio: (Hay algo de) milk.", correct: "there is some", explanation: "Incontable afirmativo = There is some." },

    // ================== BLOQUE 6: WILL VS BE GOING TO ==================
    // Ejercicio 1: Reglas
    { block: "6", type: "test", question: "Regla: Una decisión rápida tomada en el momento (ej. alguien llama a la puerta)...", correct: "WILL", distractors: ["BE GOING TO"], explanation: "Cualquier reacción instantánea sin haberlo pensado antes va con WILL." },
    { block: "6", type: "test", question: "Regla: Un plan que ya tenías pensado para el fin de semana...", correct: "BE GOING TO", distractors: ["WILL"], explanation: "Los planes y la organización van siempre con la estructura de BE GOING TO." },
    { block: "6", type: "test", question: "Regla: Una predicción porque ves una pista clara AHORA (ej. nubes oscuras)...", correct: "BE GOING TO", distractors: ["WILL"], explanation: "Si la evidencia te está entrando por los ojos, la predicción es muy segura = BE GOING TO." },
    { block: "6", type: "test", question: "Regla: Una promesa o un ofrecimiento para ayudar a alguien...", correct: "WILL", distractors: ["BE GOING TO"], explanation: "Las promesas (I promise) y ofrecerse voluntario van siempre con WILL." },
    { block: "6", type: "test", question: "Regla: Una predicción basada en tu opinión personal (usando 'I think')...", correct: "WILL", distractors: ["BE GOING TO"], explanation: "El chivato 'I think' o 'probably' denota inseguridad, por tanto usamos WILL." },
    { block: "6", type: "test", question: "Regla: Algo que va a pasar seguro porque tienes los billetes comprados...", correct: "BE GOING TO", distractors: ["WILL"], explanation: "Tener billetes/entradas lo convierte en un plan 100% oficial = BE GOING TO." },
    // Ejercicio 2: Subraya la palabra chivata (convertido a Test)
    { block: "6", type: "test", question: "I think robots _____ all the work in the future.", correct: "will do", distractors: ["are going to do"], explanation: "Opiniones personales ('I think') siempre van acompañadas de 'will'." },
    { block: "6", type: "test", question: "Look at that man on the ladder! He _____.", correct: "is going to fall", distractors: ["will fall"], explanation: "El chivato 'Look' nos dice que estamos viendo una evidencia ahora mismo." },
    { block: "6", type: "test", question: "\"We don't have sugar.\" - \"Oh, really? I _____ some right now.\"", correct: "will buy", distractors: ["am going to buy"], explanation: "Decisión espontánea ('right now'), tomada en el momento mismo de hablar: 'will'." },
    { block: "6", type: "test", question: "I promise I _____ your secret.", correct: "will keep", distractors: ["am going to keep"], explanation: "Las promesas siempre llevan 'will'." },
    { block: "6", type: "test", question: "We have the tickets. We _____ to Paris on Friday.", correct: "are going to travel", distractors: ["will travel"], explanation: "Tienen los billetes, es un plan cerrado. Corresponde 'are going to'." },
    { block: "6", type: "test", question: "Perhaps it _____ tomorrow.", correct: "will snow", distractors: ["is going to snow"], explanation: "El chivato 'Perhaps' (quizás) indica inseguridad, igual que 'I think'. Usamos 'will'." },
    // Ejercicio 3: Contextos
    { block: "6", type: "input", question: "Suena el teléfono. 'Don't get up, mom! I _____ (answer) it.'", correct: "will answer", explanation: "Reacción instantánea al oír el teléfono = WILL." },
    { block: "6", type: "input", question: "Tus vacaciones organizadas. 'Next week, we _____ (visit) my grandparents.'", correct: ["are going to visit", "'re going to visit"], explanation: "Es un plan para la semana que viene = ARE GOING TO." },
    { block: "6", type: "input", question: "Ves a una abuela con bolsas pesadas. 'Let me help you! I _____ (carry) those bags.'", correct: "will carry", explanation: "Te ofreces a ayudarla en el momento = WILL." },
    { block: "6", type: "input", question: "Llevas ropa deportiva. 'Because I _____ (play) basketball with Pedro.'", correct: ["am going to play", "'m going to play"], explanation: "Si llevas la ropa, es porque es un plan ya cerrado = AM GOING TO." },
    { block: "6", type: "input", question: "Se te cae el vaso. 'Oh no! Wait, I _____ (clean) it up.'", correct: "will clean", explanation: "Reacción inmediata al accidente = WILL." },
    { block: "6", type: "input", question: "Tus propósitos de curso. 'I _____ (study) harder next year, that's my plan.'", correct: ["am going to study", "'m going to study"], explanation: "El chivato final 'that's my plan' te lo dice todo = AM GOING TO." },
    // Ejercicio 4: Predicciones
    { block: "6", type: "input", question: "Look at those black clouds! It _____ (rain).", correct: ["is going to rain", "'s going to rain"], explanation: "Predicción visual con las nubes delante = IS GOING TO." },
    { block: "6", type: "input", question: "In the year 2060, people _____ (live) on the moon. I'm sure!", correct: "will live", explanation: "Predicción lejana sobre el mundo, típica de ciencia ficción = WILL." },
    { block: "6", type: "input", question: "Watch out! You _____ (drop) that glass! It's too near the edge.", correct: ["are going to drop", "'re going to drop"], explanation: "Lo estás viendo tambalearse en el borde = ARE GOING TO." },
    { block: "6", type: "input", question: "I don't think Real Madrid _____ (win) the Champions League next year.", correct: "will win", explanation: "Opinión personal ('I don't think') = WILL." },
    { block: "6", type: "input", question: "Look at the traffic! We _____ (be) late for school.", correct: ["are going to be", "'re going to be"], explanation: "Evidencia visual ('Look at the traffic') que provoca la predicción = ARE GOING TO." },
    { block: "6", type: "input", question: "Perhaps aliens _____ (visit) Earth one day.", correct: "will visit", explanation: "Opinión remota e insegura ('Perhaps' / 'one day') = WILL." },
    // Ejercicio 5: Diálogos
    { block: "6", type: "input", question: "A: It's hot. / B: You're right. I _____ (open) the window.", correct: "will open", explanation: "Decide abrirla en ese mismo momento al sentir calor = WILL." },
    { block: "6", type: "input", question: "A: What are your plans? / B: I _____ (watch) a film.", correct: ["am going to watch", "'m going to watch"], explanation: "La propia pregunta dice la palabra 'plans' = AM GOING TO." },
    { block: "6", type: "input", question: "A: I don't understand this. / B: Give it to me. I _____ (help) you.", correct: "will help", explanation: "Se ofrece a ayudar instantáneamente = WILL." },
    { block: "6", type: "input", question: "A: Why is she buying flour? / B: She _____ (make) a big cake.", correct: ["is going to make", "'s going to make"], explanation: "Comprar los ingredientes significa que el plan ya está en marcha = IS GOING TO." },
    { block: "6", type: "input", question: "A: Are you coming? / B: No, I _____ (stay) at home. I already told my mum.", correct: ["am going to stay", "'m going to stay"], explanation: "Ya se lo ha dicho a su madre ('I already told...'), por lo que el plan es firme = AM GOING TO." },
    { block: "6", type: "input", question: "A: I'm so hungry! / B: Me too. I _____ (make) some sandwiches.", correct: "will make", explanation: "Siente hambre en el momento y decide prepararlos de golpe = WILL." },
    // Ejercicio 7: Corrige el error
    { block: "6", type: "test", question: "Corrige: 'I am cold. I am going to put on a jacket.'", correct: "I will put on a jacket.", distractors: ["I am put on a jacket.", "I put on a jacket."], explanation: "¡Es una reacción rápida! Sientes frío y te la pones. Corresponde 'will'." },
    { block: "6", type: "test", question: "Corrige: 'Look at that car! It will crash into the tree!'", correct: "It is going to crash into the tree!", distractors: ["It crash into the tree!", "It is crash into the tree!"], explanation: "Tienes la evidencia visual delante ('Look!'). Tienes que usar 'is going to'." },
    { block: "6", type: "test", question: "Corrige: 'I think my brother is going to be a famous Youtuber.'", correct: "I think my brother will be a famous Youtuber.", distractors: ["I think my brother be a famous Youtuber.", "I think my brother is will be a famous Youtuber."], explanation: "Tu opinión personal pura ('I think') siempre arrastra al 'will'." },
    { block: "6", type: "test", question: "Corrige: 'We have a plan for the weekend: we will go to the beach.'", correct: "We are going to go to the beach.", distractors: ["We will going to the beach.", "We go to the beach."], explanation: "La propia frase lo dice: ¡es un plan! Hay que usar 'are going to'." },
    { block: "6", type: "test", question: "Corrige: 'I don't have money. - Don't worry, I am going to lend you some.'", correct: "I will lend you some.", distractors: ["I lend you some.", "I am lend you some."], explanation: "Ofrecer tu ayuda de forma espontánea requiere 'will'." },
    { block: "6", type: "test", question: "Corrige: 'I promise I am going to do my homework!'", correct: "I promise I will do my homework!", distractors: ["I promise I do my homework!", "I promise I am do my homework!"], explanation: "El chivato más grande de todos: 'I promise'. Directos a 'will'." },
    // Ejercicio 8: Continuación lógica
    { block: "6", type: "input", question: "Decisión rápida: I'm very thirsty. -> I _____ (drink) a glass of water.", correct: "will drink", explanation: "Decisión rápida = WILL." },
    { block: "6", type: "input", question: "Plan seguro: My sister has an appointment at the dentist today. -> She _____ (visit) the dentist.", correct: ["is going to visit", "'s going to visit"], explanation: "Plan seguro por la cita = IS GOING TO." },
    { block: "6", type: "input", question: "Predicción visual: The sky is very dark. -> It _____ (rain).", correct: ["is going to rain", "'s going to rain"], explanation: "Evidencia visual = IS GOING TO." },
    { block: "6", type: "input", question: "Promesa: Don't cry. -> I _____ (help) you find your dog.", correct: "will help", explanation: "Promesa/Ofrecimiento = WILL." },
    { block: "6", type: "input", question: "Opinión: I love this film. -> I think you _____ (like) it too.", correct: "will like", explanation: "Opinión ('I think') = WILL." },
    { block: "6", type: "input", question: "Plan: I have 50 euros in my piggy bank. -> I _____ (buy) a new video game.", correct: ["am going to buy", "'m going to buy"], explanation: "Tiene el dinero ahorrado para eso, es su plan = AM GOING TO." },
    // Ejercicio 9: Traduce pensando
    { block: "6", type: "input", question: "Traduce: (Creo que ganaremos) the match.", correct: "i think we will win", explanation: "Opinión -> I think we will win." },
    { block: "6", type: "input", question: "Traduce: (Voy a estudiar) tomorrow. (Es mi plan).", correct: ["i am going to study", "i'm going to study"], explanation: "Plan -> I am going to study." },
    { block: "6", type: "input", question: "Traduce: (¡Te ayudaré!) (Decisión rápida).", correct: "i will help you", explanation: "Espontáneo -> I will help you." },
    { block: "6", type: "input", question: "Traduce: (Mira las nubes. Va a llover).", correct: ["look at the clouds. it is going to rain", "look at the clouds it's going to rain", "it is going to rain", "it's going to rain"], explanation: "Visual -> It is going to rain." }, // Accept without the first part just in case
    { block: "6", type: "input", question: "Traduce: (Te prometo que no diré) anything.", correct: ["i promise i won't tell", "i promise i will not tell"], explanation: "Promesa -> I promise I won't tell." },
    { block: "6", type: "input", question: "Traduce: (Él va a viajar) to Madrid. (Tiene los billetes).", correct: ["he is going to travel", "he's going to travel"], explanation: "Plan cerrado -> He is going to travel." }
];

// ==========================================
// 3. VARIABLES Y ELEMENTOS DEL DOM
// ==========================================
var currentMode = ''; 
var currentBlock = ''; 
var playerName = '';
var gameQuestions = []; 
var currentQuestionIndex;
var score = 0;
var errors = 0; 
var totalQuestions = 0; 
var scoreHistory = {}; 
var errorDetails = [];

// Elementos Menús
var mainMenu = document.getElementById('main-menu');
var modeMenu = document.getElementById('mode-menu');
var grammarMenu = document.getElementById('grammar-menu');
var quizMain = document.getElementById('quiz-main');
var playerNameInput = document.getElementById('player-name');

// Elementos Quiz
var questionContainer = document.getElementById('question-container');
var categoryText = document.getElementById('category-text');
var questionText = document.getElementById('question-text');
var answerButtonsElement = document.getElementById('answer-buttons');
var inputZone = document.getElementById('input-zone');
var grammarInput = document.getElementById('grammar-input');
var checkBtn = document.getElementById('check-btn');
var feedbackBox = document.getElementById('feedback-box');
var feedbackText = document.getElementById('feedback-text');

var statsBar = document.querySelector('.stats-bar'); 
var quizFooter = document.querySelector('.quiz-footer');
var nextButton = document.getElementById('next-btn');
var prevButton = document.getElementById('prev-btn'); 
var scoreText = document.getElementById('score-text');
var errorsText = document.getElementById('errors-text'); 
var endGameControls = document.getElementById('end-game-controls');
var resultText = document.getElementById('result-text');
var scoreboardContainer = document.getElementById('scoreboard-container');
var scoresList = document.getElementById('scores-list');

// ==========================================
// 4. FLUJO DE PANTALLAS Y MENÚS
// ==========================================
document.getElementById('start-game-btn').addEventListener('click', function() {
    playerName = playerNameInput.value.trim();
    if (playerName === "") {
        alert("Por favor, introduce tu nombre antes de empezar.");
        return;
    }
    mainMenu.classList.add('hide');
    modeMenu.classList.remove('hide');
    fadeUpScreens(modeMenu);
});

document.getElementById('btn-vocab').addEventListener('click', function() {
    currentMode = 'vocab';
    startGame();
});

document.getElementById('btn-grammar').addEventListener('click', function() {
    modeMenu.classList.add('hide');
    grammarMenu.classList.remove('hide');
    fadeUpScreens(grammarMenu);
});

document.querySelectorAll('.block-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        currentMode = 'grammar';
        currentBlock = this.getAttribute('data-block');
        startGame();
    });
});

document.querySelectorAll('.go-back-name').forEach(btn => {
    btn.addEventListener('click', () => {
        modeMenu.classList.add('hide');
        mainMenu.classList.remove('hide');
        fadeUpScreens(mainMenu);
    });
});

document.querySelectorAll('.go-back-mode').forEach(btn => {
    btn.addEventListener('click', () => {
        grammarMenu.classList.add('hide');
        modeMenu.classList.remove('hide');
        fadeUpScreens(modeMenu);
    });
});

document.getElementById('menu-btn').addEventListener('click', showMainMenu);
document.getElementById('restart-btn').addEventListener('click', showMainMenu);
document.getElementById('close-scores-btn').addEventListener('click', showMainMenu);
document.getElementById('view-scores-btn').addEventListener('click', showScoreboard);

// ==========================================
// 5. GENERACIÓN DEL QUIZ
// ==========================================
function startGame() {
    modeMenu.classList.add('hide');
    grammarMenu.classList.add('hide');
    endGameControls.classList.add('hide');
    scoreboardContainer.classList.add('hide');
    
    // Mostramos la caja principal y sus elementos internos
    quizMain.classList.remove('hide');
    document.getElementById('quiz-header').classList.remove('hide');
    questionContainer.classList.remove('hide');
    quizFooter.classList.remove('hide');
    statsBar.classList.remove('hide'); 

    score = 0;
    errors = 0;
    errorDetails = []; 
    scoreHistory = {};
    
    if (currentMode === 'vocab') {
        document.getElementById('quiz-title').innerText = "Vocabulario";
        gameQuestions = generateVocabQuiz();
    } else {
        if(currentBlock === 'all') {
            document.getElementById('quiz-title').innerText = "Gramática: Mezclado";
        } else {
            document.getElementById('quiz-title').innerText = "Gramática: Bloque " + currentBlock;
        }
        gameQuestions = generateGrammarQuiz(currentBlock);
    }
    
    totalQuestions = gameQuestions.length;
    updateStats(); 
    
    currentQuestionIndex = 0;
    showQuestion(gameQuestions[currentQuestionIndex]);

    fadeUpScreens([quizMain, quizFooter, statsBar]); 
}

function generateVocabQuiz() {
    let shuffledVocab = shuffleArray(vocabData);
    let totalItems = shuffledVocab.length;
    let esToEnCount = Math.floor(totalItems * 0.7);
    let generatedQuestions = [];

    shuffledVocab.forEach((item, index) => {
        let isEsToEn = index < esToEnCount;
        let questionWord = isEsToEn ? item.es : item.en;
        let correctWord = isEsToEn ? item.en : item.es;
        
        let sameCategoryDistractors = vocabData.filter(v => v !== item && v.cat === item.cat);
        let finalDistractors = [];
        
        if (sameCategoryDistractors.length >= 2) {
            finalDistractors = shuffleArray(sameCategoryDistractors).slice(0, 2);
        } else {
            finalDistractors = [...sameCategoryDistractors];
            let otherCategoryDistractors = vocabData.filter(v => v !== item && v.cat !== item.cat);
            let shuffledOthers = shuffleArray(otherCategoryDistractors);
            while (finalDistractors.length < 2) {
                finalDistractors.push(shuffledOthers.pop());
            }
        }
        
        let answers = [
            { text: correctWord, correct: true },
            { text: isEsToEn ? finalDistractors[0].en : finalDistractors[0].es, correct: false },
            { text: isEsToEn ? finalDistractors[1].en : finalDistractors[1].es, correct: false }
        ];

        generatedQuestions.push({
            category: item.cat,
            question: questionWord,
            type: 'test',
            answers: shuffleArray(answers),
            isAnswered: false
        });
    });

    return shuffleArray(generatedQuestions);
}

function generateGrammarQuiz(blockId) {
    let pool = blockId === 'all' ? grammarData : grammarData.filter(q => q.block === blockId);
    let questions = [];
    
    pool.forEach(item => {
        let qObj = { 
            category: "Bloque " + item.block, 
            question: item.question, 
            type: item.type,
            correct: item.correct,
            explanation: item.explanation,
            isAnswered: false 
        };
        
        if (item.type === 'test') {
            let answers = [{ text: item.correct, correct: true }];
            item.distractors.forEach(d => {
                answers.push({ text: d, correct: false });
            });
            qObj.answers = shuffleArray(answers);
        }
        
        questions.push(qObj);
    });

    return shuffleArray(questions);
}

// ==========================================
// 6. MOSTRAR PREGUNTA Y COMPROBACIONES
// ==========================================
function showQuestion(question) {
    answerButtonsElement.innerHTML = '';
    grammarInput.value = '';
    grammarInput.classList.remove('input-error', 'input-correct');
    grammarInput.disabled = false;
    feedbackBox.classList.add('hide');
    
    categoryText.innerText = question.category;
    questionText.innerText = question.question; 
    
    prevButton.classList.add('invisible');

    if (question.type === 'test') {
        inputZone.classList.add('hide');
        answerButtonsElement.classList.remove('hide');
        
        question.answers.forEach(function(ans) {
            var btn = document.createElement('button');
            btn.innerText = ans.text;
            btn.classList.add('btn');
            if (ans.correct) btn.dataset.correct = true;
            if (!question.isAnswered) btn.addEventListener('click', selectTestAnswer);
            answerButtonsElement.appendChild(btn);
        });
        
    } else if (question.type === 'input') {
        answerButtonsElement.classList.add('hide');
        inputZone.classList.remove('hide');
        checkBtn.onclick = checkInputAnswer;
        grammarInput.focus();
    }

    nextButton.classList.add('invisible');
}

function selectTestAnswer(e) {
    var selectedBtn = e.target;
    var isCorrect = selectedBtn.dataset.correct === "true";
    var currentQ = gameQuestions[currentQuestionIndex];
    currentQ.isAnswered = true;

    if (isCorrect) {
        scoreHistory[currentQuestionIndex] = 1;
        anime({ targets: selectedBtn, scale: [1, 1.15, 1], duration: 400, easing: 'easeInOutQuad' });
    } else {
        scoreHistory[currentQuestionIndex] = 0;
        errors++;
        
        let correctText = currentQ.answers.find(a => a.correct === true).text;
        let etiqueta = currentMode === 'vocab' ? '[VOCABULARIO]' : '[GRAMÁTICA]';
        errorDetails.push(`${etiqueta} ${currentQ.question} (respondió: ${selectedBtn.innerText}, era: ${correctText})`);
        
        anime({ targets: selectedBtn, translateX: [0, -10, 10, -10, 10, 0], duration: 450, easing: 'easeInOutSine' });
        
        if (currentMode === 'grammar' && currentQ.explanation) {
            feedbackText.innerHTML = `<strong>Respuesta correcta:</strong> ${correctText}<br><br><strong>Análisis:</strong> ${currentQ.explanation}`;
            feedbackBox.classList.remove('hide');
            fadeUpScreens(feedbackBox);
        }
    }

    Array.from(answerButtonsElement.children).forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.correct === "true") btn.classList.add('correct');
        else if (btn === selectedBtn && !isCorrect) btn.classList.add('wrong');
    });

    finalizeQuestion();
}

function checkInputAnswer() {
    let currentQ = gameQuestions[currentQuestionIndex];
    if (currentQ.isAnswered || grammarInput.value.trim() === '') return; 
    
    currentQ.isAnswered = true;
    grammarInput.disabled = true;
    
    // Convertimos la respuesta a minúsculas, quitamos espacios al final y signos de puntuación rebeldes
    let userAnswer = grammarInput.value.trim().toLowerCase().replace(/[.¡!¿?]/g, '');
    let isCorrect = false;
    let primaryCorrectAnswer = ""; 

    if (Array.isArray(currentQ.correct)) {
        let possibleAnswers = currentQ.correct.map(a => a.toLowerCase().replace(/[.¡!¿?]/g, ''));
        isCorrect = possibleAnswers.includes(userAnswer);
        primaryCorrectAnswer = currentQ.correct[0]; 
    } else {
        let targetCorrect = currentQ.correct.toLowerCase().replace(/[.¡!¿?]/g, '');
        isCorrect = userAnswer === targetCorrect;
        primaryCorrectAnswer = currentQ.correct;
    }
    
    if (isCorrect) {
        scoreHistory[currentQuestionIndex] = 1;
        grammarInput.classList.add('input-correct');
        anime({ targets: grammarInput, scale: [1, 1.05, 1], duration: 400, easing: 'easeInOutQuad' });
    } else {
        scoreHistory[currentQuestionIndex] = 0;
        errors++;
        errorDetails.push(`[GRAMÁTICA] ${currentQ.question} (escribió: ${grammarInput.value}, era: ${primaryCorrectAnswer})`);
        
        grammarInput.classList.add('input-error');
        anime({ targets: grammarInput, translateX: [0, -10, 10, -10, 10, 0], duration: 450, easing: 'easeInOutSine' });
        
        let distance = getLevenshteinDistance(userAnswer, primaryCorrectAnswer.toLowerCase());
        
        // Tolerancia a erratas
        let isTypo = (distance > 0 && distance <= 2 && primaryCorrectAnswer.length > 3);

        if (isTypo) {
            feedbackText.innerHTML = `<strong>¡Casi!</strong> Tienes la idea principal, pero ha habido un ligero error de teclado (letra o espacio).<br><br>Lo que has escrito: <em>${grammarInput.value}</em><br>La escritura exacta es: <strong style="color:var(--color-correcto);">${primaryCorrectAnswer}</strong>.`;
        } else {
            feedbackText.innerHTML = `<strong>Respuesta correcta:</strong> ${primaryCorrectAnswer}<br><br><strong>Análisis del profesor:</strong> ${currentQ.explanation}`;
        }
        
        feedbackBox.classList.remove('hide');
        fadeUpScreens(feedbackBox);
    }
    
    finalizeQuestion();
}

function finalizeQuestion() {
    recalculateScore(); 
    updateStats(); 
    
    if (gameQuestions.length > currentQuestionIndex + 1) {
        nextButton.innerText = "Siguiente";
    } else {
        nextButton.innerText = "Finalizar Quiz";
    }
    nextButton.classList.remove('invisible');
}

function recalculateScore() {
    score = 0;
    for (var key in scoreHistory) {
        score += scoreHistory[key];
    }
}

function updateStats() {
    scoreText.innerText = 'Puntuación: ' + score + ' / ' + totalQuestions;
    errorsText.innerText = 'Errores: ' + errors; 
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < gameQuestions.length) {
        showQuestion(gameQuestions[currentQuestionIndex]);
    } else {
        endQuiz();
    }
});

grammarInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkInputAnswer();
    }
});

// ==========================================
// 7. FIN DEL JUEGO Y GUARDADO DE PUNTUACIÓN
// ==========================================
function endQuiz() {
    // Ocultamos solo el contenido de la pregunta, NO la caja principal entera
    document.getElementById('quiz-header').classList.add('hide');
    questionContainer.classList.add('hide');
    answerButtonsElement.classList.add('hide');
    inputZone.classList.add('hide');
    feedbackBox.classList.add('hide');
    quizFooter.classList.add('hide');
    statsBar.classList.add('hide'); 
    
    var finalScore = (score / totalQuestions) * 10;
    
    resultText.innerHTML = `
        <h2>¡Juego completado, ${playerName}!</h2>
        <p>Tu puntuación final es: <strong>${score} de ${totalQuestions}</strong>.</p>
        <p>Total de errores: <strong>${errors}</strong></p>
        <h3 style="color:var(--color-primario); font-size:1.8em; margin-top:15px;">Nota: ${finalScore.toFixed(1)}/10</h3>
    `;
    
    endGameControls.classList.remove('hide');
    fadeUpScreens(endGameControls);
    saveScoreToHistory(finalScore.toFixed(1));
}

function showMainMenu() {
    quizMain.classList.add('hide');
    quizFooter.classList.add('hide'); 
    statsBar.classList.add('hide'); 
    endGameControls.classList.add('hide');
    scoreboardContainer.classList.add('hide');
    
    mainMenu.classList.remove('hide');
    playerNameInput.value = ''; 
    fadeUpScreens(mainMenu);
}

function saveScoreToHistory(grade) {
    var history = JSON.parse(localStorage.getItem('englishQuizScores')) || {};
    if (!history[playerName]) { history[playerName] = []; }
    var fechaActual = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    var errorString = errorDetails.length > 0 ? errorDetails.join(' | ') : 'Ninguno';
    var modalidadTexto = currentMode === 'vocab' ? 'Vocabulario' : ('Gramática B' + currentBlock);

    history[playerName].push({
        mode: modalidadTexto,
        score: score,
        total: totalQuestions,
        errors: errors,
        errorList: errorString, 
        grade: grade,
        date: fechaActual
    });
    localStorage.setItem('englishQuizScores', JSON.stringify(history));

    var scriptURL = 'https://script.google.com/macros/s/AKfycbwk-hLFeqDNjVv-hUBAYn_gAV7uwDMP6ETxl2ar_KVIqjOxKv3BT86TlcNm7Tp5NozxnA/exec'; 
    
    var data = {
        nombre: playerName + " (" + modalidadTexto + ")", 
        nota: grade,
        errores: errors,
        fecha: fechaActual,
        errores_detalle: errorString 
    };

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data)
    })
    .then(response => console.log('Petición enviada a Google Sheets.'))
    .catch(error => console.error('Error al enviar a Sheets:', error));
}

function showScoreboard() {
    mainMenu.classList.add('hide');
    modeMenu.classList.add('hide');
    grammarMenu.classList.add('hide');
    quizMain.classList.add('hide');
    endGameControls.classList.add('hide');
    
    scoreboardContainer.classList.remove('hide');
    
    var history = JSON.parse(localStorage.getItem('englishQuizScores')) || {};
    scoresList.innerHTML = ''; 
    
    if (Object.keys(history).length === 0) {
        scoresList.innerHTML = '<p style="text-align:center; color:#6c757d; font-size: 1.2em;">Aún no hay puntuaciones registradas.</p>';
        fadeUpScreens(scoreboardContainer);
        return;
    }
    
    for (var player in history) {
        var partidas = history[player];
        
        partidas.forEach(function(partida, index) {
            var entryDiv = document.createElement('div');
            entryDiv.classList.add('score-entry');
            var numPartida = index + 1;
            
            entryDiv.innerHTML = `
                <span class="score-name">${player} - ${partida.mode || 'N/A'} (Partida ${numPartida})</span><br>
                <span class="score-detail">Nota: <strong>${partida.grade}/10</strong> | Errores: ${partida.errors} | Fecha: ${partida.date}</span><br>
                <span class="score-detail" style="color: var(--color-incorrecto); font-size: 0.9em; display:block; margin-top: 5px;"><strong>Fallos:</strong> ${partida.errorList || 'Ninguno'}</span>
            `;
            scoresList.appendChild(entryDiv);
        });
    }

    fadeUpScreens(scoreboardContainer);
}

// ==========================================
// 8. OTRAS FUNCIONALIDADES Y ANIMACIONES
// ==========================================
document.getElementById('clear-scores-btn').addEventListener('click', function() {
    if (confirm('¿Estás seguro de que quieres borrar TODAS las puntuaciones registradas en este ordenador?')) {
        localStorage.removeItem('englishQuizScores');
        showScoreboard(); 
    }
});

anime({
  targets: '#ink-svg path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 2500,
  delay: 300,
  direction: 'alternate',
  loop: true
});

function fadeUpScreens(elements) {
    anime({
        targets: elements,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'easeOutQuad'
    });
}