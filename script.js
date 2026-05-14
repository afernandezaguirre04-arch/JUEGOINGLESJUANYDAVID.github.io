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
    { block: "1", type: "input", question: "Tomorrow, the sun _____ (shine) all day.", correct: "will shine", explanation: "Fíjate en el chivato 'Tomorrow'. Al ser una predicción general sobre el clima, usamos 'will' seguido del verbo tal cual." },
    { block: "1", type: "input", question: "I _____ (not/go) to the party because I am sick.", correct: ["won't go", "will not go"], explanation: "La forma negativa de 'will' es 'won't'." },
    { block: "1", type: "input", question: "Don't worry, my dad _____ (help) you with your homework.", correct: "will help", explanation: "Para ofrecimientos espontáneos ('Don't worry'), siempre usamos 'will'." },
    { block: "1", type: "input", question: "I think robots _____ (do) all the dangerous jobs in the future.", correct: "will do", explanation: "¡Ojo al chivato 'I think'! Cualquier predicción basada en tu opinión personal requiere 'will'." },
    { block: "1", type: "test", question: "\"I can't open this bottle!\" - \"Don't worry, I _____ it for you.\"", correct: "will open", distractors: ["open", "opening"], explanation: "Como es una decisión rápida tomada en el instante, usamos 'will'." },
    { block: "1", type: "test", question: "Do you think you _____ rich in the future?", correct: "will be", distractors: ["are", "will to be"], explanation: "Chivato 'think' (opinión). Recuerda que 'will' NUNCA lleva un 'to' detrás." },
    { block: "1", type: "test", question: "I promise I _____ my room tonight!", correct: "will clean", distractors: ["won't to clean", "clean"], explanation: "¡Chivato 'promise'! Las promesas son el uso más clásico del 'will'." },

    // ================== BLOQUE 2: CONDITIONAL SIMPLE ==================
    { block: "2", type: "input", question: "I _____ (travel) to Japan if I had the money.", correct: "would travel", explanation: "Situación imaginaria (viajaría). Para formar el condicional necesitamos 'would' delante del verbo." },
    { block: "2", type: "input", question: "She _____ (eat) that insect! It's disgusting.", correct: ["wouldn't eat", "would not eat"], explanation: "Es un caso hipotético en negativo (ella no se lo comería). La negación de would es 'wouldn't'." },
    { block: "2", type: "input", question: "A dog _____ (be) a great pet for you.", correct: "would be", explanation: "Estás imaginando un escenario ('un perro sería...'). Condicional: would + be." },
    { block: "2", type: "test", question: "I am very tired. I _____ like to go to bed now.", correct: "would", distractors: ["will", "do"], explanation: "La estructura 'would like' es una forma educada de decir 'me gustaría' o 'quiero'." },
    { block: "2", type: "test", question: "My sister _____ live in London. She prefers Madrid.", correct: "wouldn't", distractors: ["don't would", "wouldn't to"], explanation: "La negativa es 'wouldn't' y va seguida directamente del verbo en infinitivo, sin 'to'." },
    { block: "2", type: "test", question: "_____ you like a glass of water?", correct: "Would", distractors: ["Do", "Are"], explanation: "Para ofrecer algo educadamente, empezamos la pregunta con 'Would you like...?'." },

    // ================== BLOQUE 3: FIRST CONDITIONAL ==================
    { block: "3", type: "input", question: "If I have time this afternoon, I _____ (help) you with your project.", correct: "will help", explanation: "En el Primer Condicional, si la parte del 'If' está en Presente, la consecuencia va con 'will'." },
    { block: "3", type: "input", question: "If you don't wear a jacket, you _____ (catch) a cold.", correct: "will catch", explanation: "La condición está en presente ('don't wear'), la consecuencia lógica va en futuro con 'will'." },
    { block: "3", type: "input", question: "If you _____ (eat) vegetables, you will be strong.", correct: "eat", explanation: "La regla manda: la parte que lleva el 'If' siempre tiene que ir conjugada en Presente Simple." },
    { block: "3", type: "input", question: "If my brother _____ (play) loud music, I will get angry.", correct: "plays", explanation: "La condición ('If') va en Presente Simple. Como el sujeto es 'my brother' (He), al verbo hay que añadirle la 's'." },
    { block: "3", type: "test", question: "We _____ to the beach if it is cold tomorrow.", correct: "won't go", distractors: ["don't go", "aren't going"], explanation: "La frase está al revés. La consecuencia que NO lleva el 'if' necesita ir en futuro (will o won't)." },
    { block: "3", type: "test", question: "I will tell you a secret if you _____ anyone!", correct: "don't tell", distractors: ["won't tell", "doesn't tell"], explanation: "La parte del 'if' NUNCA lleva will. Va en Presente Simple." },

    // ================== BLOQUE 4: BE GOING TO ==================
    { block: "4", type: "input", question: "I _____ (visit) my grandparents this weekend.", correct: ["am going to visit", "'m going to visit"], explanation: "Para un plan que ya tenías pensado, usamos el verbo To Be (am) + going to + el verbo principal." },
    { block: "4", type: "input", question: "She _____ (study) French next year.", correct: ["is going to study", "'s going to study"], explanation: "Al ser un plan futuro: sujeto + To Be (is) + going to + el verbo." },
    { block: "4", type: "input", question: "My dad _____ (not/cook) dinner tonight, we are ordering pizza.", correct: ["isn't going to cook", "is not going to cook"], explanation: "La forma negativa requiere negar el verbo To be: 'isn't going to'." },
    { block: "4", type: "test", question: "I _____ travel to Italy this summer. I have the tickets!", correct: "am going to", distractors: ["am going", "going to"], explanation: "¡Chivato 'tickets'! Es un plan 100% cerrado. Usa la estructura completa: am + going to." },
    { block: "4", type: "test", question: "Look out! That glass is near the edge of the table. It _____ fall!", correct: "is going to", distractors: ["going to", "am going to"], explanation: "Hay una evidencia visual clara en el presente. La predicción es segura y requiere 'is going to'." },
    { block: "4", type: "test", question: "My brother and I _____ going to walk to school today.", correct: "are", distractors: ["am", "is"], explanation: "'My brother and I' somos nosotros (We). El verbo To Be en plural es 'are'." },

    // ================== BLOQUE 5: THERE IS / THERE ARE ==================
    { block: "5", type: "input", question: "_____ a big supermarket in my town.", correct: ["there is", "there's"], explanation: "Hablamos de 'un' supermercado (singular), usamos 'There is'." },
    { block: "5", type: "input", question: "_____ three bedrooms in my house.", correct: "there are", explanation: "Al hablar de 'tres' habitaciones (plural), necesitamos 'There are'." },
    { block: "5", type: "input", question: "I am thirsty, but _____ any water in the fridge.", correct: ["there isn't", "there is not"], explanation: "El agua es incontable, y los incontables en inglés se tratan siempre como singulares." },
    { block: "5", type: "test", question: "_____ a big whiteboard in our classroom.", correct: "There is", distractors: ["There are", "Is there"], explanation: "Es singular afirmativo ('una gran pizarra')." },
    { block: "5", type: "test", question: "_____ any messages for me on the mobile phone?", correct: "Are there", distractors: ["Is there", "There are"], explanation: "Es una pregunta sobre un plural ('mensajes'). Empezamos por 'Are there'." },
    { block: "5", type: "test", question: "_____ three dogs playing in the park right now.", correct: "There are", distractors: ["There is", "Are there"], explanation: "Tres perros es un plural afirmativo." },
    { block: "5", type: "test", question: "_____ a hospital near your house?", correct: "Is there", distractors: ["Are there", "There is"], explanation: "Pregunta en singular ('un hospital'). Empezamos por 'Is there'." },
    { block: "5", type: "test", question: "_____ some students in the library studying for the exam.", correct: "There are", distractors: ["There is", "Are there"], explanation: "Varios estudiantes ('some students') es plural afirmativo." },
    { block: "5", type: "test", question: "There aren't _____ chips in the kitchen.", correct: "any", distractors: ["some"], explanation: "La regla de oro: oraciones negativas (aren't) siempre llevan 'any'." },

    // ================== BLOQUE 6: WILL VS BE GOING TO ==================
    { block: "6", type: "input", question: "Look at those black clouds! It _____ (rain) a lot.", correct: ["is going to rain", "'s going to rain"], explanation: "Las nubes negras son una evidencia visual en el presente. Predicción segura = IS GOING TO." },
    { block: "6", type: "input", question: "The phone is ringing! - Don't worry, I _____ (answer) it.", correct: "will answer", explanation: "Una decisión rápida tomada en el momento (suena el teléfono) requiere WILL." },
    { block: "6", type: "input", question: "Tomorrow at 5:00 PM, I _____ (visit) the dentist. I have the appointment confirmed.", correct: ["am going to visit", "'m going to visit"], explanation: "¡Chivato! Tienes la cita confirmada, es un plan cerrado = AM GOING TO." },
    { block: "6", type: "input", question: "I promise I _____ (clean) my bedroom tonight!", correct: "will clean", explanation: "Las promesas (I promise) siempre van con WILL." },
    { block: "6", type: "input", question: "Next week, we _____ (travel) to London. We have the tickets!", correct: ["are going to travel", "'re going to travel"], explanation: "Tener billetes significa que el plan ya está organizado. Usamos ARE GOING TO." },
    { block: "6", type: "input", question: "My brother _____ (buy) a new computer. He is saving money for it.", correct: ["is going to buy", "'s going to buy"], explanation: "Ahorrar dinero es señal de que ya es un plan pensado = IS GOING TO." },
    { block: "6", type: "test", question: "I think robots _____ all the work in the future.", correct: "will do", distractors: ["are going to do"], explanation: "Opiniones personales ('I think') siempre van acompañadas de 'will'." },
    { block: "6", type: "test", question: "Look at the time! It's 8:25 and the class starts at 8:30. We _____ be late!", correct: "are going to", distractors: ["will", "is going to"], explanation: "Tenemos el chivato visual (el reloj). Como predecimos basándonos en esa prueba, usamos 'are going to'." },

    // ================== BLOQUE 7: PRESENT SIMPLE VS CONTINUOUS ==================
    { block: "7", type: "input", question: "Where is mum? - She _____ (read) a book in the living room right now.", correct: ["is reading", "'s reading"], explanation: "El chivato 'right now' (ahora mismo) exige Presente Continuo: to be + verbo con -ing." },
    { block: "7", type: "input", question: "My dad _____ (work) in a bank from Monday to Friday.", correct: "works", explanation: "De lunes a viernes indica una rutina (Presente Simple). Como el sujeto es 'My dad' (He), le añadimos la 's' al verbo." },
    { block: "7", type: "input", question: "Shhh! Be quiet! The baby _____ (sleep) in the bedroom.", correct: ["is sleeping", "'s sleeping"], explanation: "El chivato 'Be quiet!' indica que la acción está ocurriendo en este mismo instante (Presente Continuo)." },
    { block: "7", type: "input", question: "_____ (you/listen) to music every day when you study?", correct: "do you listen", explanation: "Pregunta sobre una rutina ('every day'). El Presente Simple usa el auxiliar 'Do' para preguntar." },
    { block: "7", type: "input", question: "Look! The dog _____ (run) very fast!", correct: ["is running", "'s running"], explanation: "El chivato 'Look!' indica que está ocurriendo AHORA mismo ante tus ojos. Usamos Presente Continuo." },
    { block: "7", type: "input", question: "My sister usually _____ (play) tennis on Fridays, but today she is playing football.", correct: "plays", explanation: "El chivato 'usually' y 'on Fridays' indican una rutina. Usamos Presente Simple normal (con 's' para ella)." },
    { block: "7", type: "input", question: "I _____ (not/like) vegetables, I prefer fruit.", correct: ["don't like", "do not like"], explanation: "El verbo 'like' es un verbo de estado, NO se puede usar en continuo ('I am not liking') para expresar gustos." },
    { block: "7", type: "input", question: "(Ella está leyendo) a book.", correct: ["she is reading", "she's reading"], explanation: "Traducción de continuo: Sujeto + is + verbo en -ing." },
    { block: "7", type: "test", question: "My brother _____ video games every weekend.", correct: "plays", distractors: ["is playing", "play"], explanation: "'Every weekend' es una rutina, y como es tercera persona, lleva 's'." },
    { block: "7", type: "test", question: "We can't go to the park because it _____ right now.", correct: "is raining", distractors: ["rains", "rain"], explanation: "Te dicen que no puedes salir porque está lloviendo en este momento." },
    { block: "7", type: "test", question: "I _____ vegetables, I prefer fruit!", correct: "don't like", distractors: ["am not liking", "doesn't like"], explanation: "¡Trampa! El verbo 'like' es de sentimiento. Nunca se usa en continuo (no se dice 'no me está gustando')." },
    { block: "7", type: "test", question: "Why _____ that heavy box? Let me help you!", correct: "are you carrying", distractors: ["do you carry", "you carry"], explanation: "Estás viendo a la persona cargar la caja AHORA, por eso usas el continuo en pregunta." },

    // ================== BLOQUE 8: PAST SIMPLE ==================
    { block: "8", type: "input", question: "Yesterday, I _____ (go) to the cinema with my friends.", correct: "went", explanation: "Acción pasada ('Yesterday'). El pasado irregular de 'go' es 'went'." },
    { block: "8", type: "input", question: "We _____ (eat) a delicious pizza for dinner last night.", correct: "ate", explanation: "Acción terminada. El pasado irregular de 'eat' es 'ate'." },
    { block: "8", type: "input", question: "My brother _____ (not/do) his homework on Sunday.", correct: ["didn't do", "did not do"], explanation: "En negativas de pasado usamos el auxiliar 'didn't' y el verbo principal se queda normal (do)." },
    { block: "8", type: "input", question: "_____ (they/watch) the football match yesterday afternoon?", correct: "did they watch", explanation: "Las preguntas en pasado empiezan siempre por 'Did' + sujeto + verbo normal." },
    { block: "8", type: "input", question: "She _____ (buy) a new T-shirt two days ago.", correct: "bought", explanation: "Irregular básico. El pasado de 'buy' es 'bought'." },
    { block: "8", type: "input", question: "I _____ (not/study) for the History exam, so I failed.", correct: ["didn't study", "did not study"], explanation: "Negativa en pasado: didn't + verbo en infinitivo." },
    { block: "8", type: "input", question: "Last summer, my family and I _____ (travel) to Paris.", correct: ["travelled", "traveled"], explanation: "Verbo regular en pasado. Se le añade '-ed'." },
    { block: "8", type: "input", question: "_____ (you/visit) the museum when you were in London?", correct: "did you visit", explanation: "Pregunta en pasado: Did + sujeto + verbo en infinitivo." },
    { block: "8", type: "test", question: "She didn't _____ the movie.", correct: "like", distractors: ["liked", "likes"], explanation: "¡OJO! El auxiliar 'didn't' ya lleva el pasado. El verbo principal que le sigue NO puede llevar -ed." },
    { block: "8", type: "test", question: "Where _____ last night?", correct: "did you go", distractors: ["you went", "went you"], explanation: "Estructura de pregunta: Partícula (Where) + Did + sujeto + verbo normal." },
    { block: "8", type: "test", question: "Did he _____ his bedroom?", correct: "clean", distractors: ["cleaned", "cleans"], explanation: "Como está el 'Did' haciendo la pregunta, el verbo principal pierde la -ed y vuelve a infinitivo." },

    // ================== BLOQUE 9: COMPARATIVES & SUPERLATIVES ==================
    { block: "9", type: "input", question: "A Ferrari is _____ (expensive) than a bicycle.", correct: "more expensive", explanation: "Comparamos dos cosas. 'Expensive' es un adjetivo largo (3 sílabas), así que usamos 'more' en lugar de '-er'." },
    { block: "9", type: "input", question: "I am 14 years old. My friend is 14 too. I am _____ (old) as my friend.", correct: "as old", explanation: "Estructura de igualdad: 'as' + adjetivo + 'as' (tan mayor como)." },
    { block: "9", type: "input", question: "The cheetah is _____ (fast) animal in the world!", correct: "the fastest", explanation: "Hablamos del más rápido del MUNDO (superlativo). Como 'fast' es corto, añadimos '-est' y el artículo 'the'." },
    { block: "9", type: "input", question: "A mouse is _____ (dangerous) than a lion.", correct: "less dangerous", explanation: "Comparativo de inferioridad para adjetivos largos: usamos 'less' (menos)." },
    { block: "9", type: "input", question: "Mount Everest is _____ (high) mountain on Earth.", correct: "the highest", explanation: "Superlativo corto. Lleva 'the' y terminación '-est'." },
    { block: "9", type: "input", question: "My English teacher is _____ (funny) than my Maths teacher.", correct: "funnier", explanation: "Comparamos. Si termina en 'y', se cambia por 'i' y se añade '-er'." },
    { block: "9", type: "input", question: "This is _____ (bad) film I have ever seen!", correct: "the worst", explanation: "¡Cuidado, irregular! El superlativo de 'bad' no es baddest, es 'the worst'." },
    { block: "9", type: "test", question: "Science is _____ Art. I love Science!", correct: "more interesting than", distractors: ["less interesting as", "the interestingest"], explanation: "Comparación de adjetivo largo. Nunca olvides el 'than' (que) al comparar dos cosas." },
    { block: "9", type: "test", question: "My sister is _____ person in my family.", correct: "the shortest", distractors: ["the short", "shorter as"], explanation: "Superlativo (destaca sobre toda la familia). Se necesita 'the' + adjetivo con '-est'." },
    { block: "9", type: "test", question: "A turtle is exactly _____ a snail.", correct: "as slow as", distractors: ["more slow than", "the slowest"], explanation: "Si dos cosas son exactamente iguales usamos 'as ... as' (tan lento como)." },
    { block: "9", type: "test", question: "Winter in Spain is _____ summer.", correct: "colder than", distractors: ["more cold than", "less hot than"], explanation: "Comparamos dos estaciones. 'Cold' es corto, lleva '-er' y siempre acompañado de 'than'." },
    { block: "9", type: "test", question: "The Burj Khalifa in Dubai is _____ building in the world.", correct: "the tallest", distractors: ["taller than", "as tall as"], explanation: "Es un extremo absoluto ('in the world'), necesita superlativo con 'the'." },

    // ================== BLOQUE 10: MODAL VERBS ==================
    { block: "10", type: "input", question: "It is a bad idea to go to bed at 3:00 AM. -> You _____ go to bed at 3:00 AM.", correct: ["shouldn't", "should not"], explanation: "Dar un consejo negativo ('no deberías') se hace con shouldn't." },
    { block: "10", type: "input", question: "It is obligatory to stop at a red traffic light. -> You _____ stop.", correct: "must", explanation: "Las obligaciones fuertes y leyes de tráfico van siempre con 'must'." },
    { block: "10", type: "input", question: "I don't have the ability to play the piano. -> I _____ play the piano.", correct: ["can't", "cannot"], explanation: "Falta de habilidad ('no sé / no puedo') se expresa con can't." },
    { block: "10", type: "input", question: "It is forbidden to use mobile phones in the exam. -> You _____ use mobile phones.", correct: ["mustn't", "must not"], explanation: "Prohibición estricta o regla del colegio. Se usa mustn't." },
    { block: "10", type: "input", question: "It is a good idea to study every day. -> You _____ study every day.", correct: "should", explanation: "Dar un buen consejo o recomendación ('deberías') se hace con should." },
    { block: "10", type: "test", question: "You _____ smoke inside a hospital. It is strictly prohibited!", correct: "mustn't", distractors: ["shouldn't", "couldn't"], explanation: "No es un simple consejo, es una prohibición absoluta y por ley." },
    { block: "10", type: "test", question: "When I was five years old, I _____ speak English, but now I can.", correct: "couldn't", distractors: ["mustn't", "shouldn't"], explanation: "Habla de una habilidad en el pasado (no sabía/no podía). Pasado de can = could." },
    { block: "10", type: "test", question: "You have a terrible headache. I think you _____ take an aspirin.", correct: "should", distractors: ["must", "can"], explanation: "Es una recomendación o un buen consejo de salud ('deberías')." },
    { block: "10", type: "test", question: "My dog is very intelligent. It _____ do a lot of tricks!", correct: "can", distractors: ["must", "should"], explanation: "Se trata de una habilidad o capacidad que tiene el perro." },
    { block: "10", type: "test", question: "When my grandfather was young, he _____ run very fast.", correct: "could", distractors: ["can", "must"], explanation: "Nos habla del pasado ('was young'). El pasado de can (saber/poder hacer algo) es 'could'." },
    { block: "10", type: "test", question: "I am very tired today. ->", correct: "You should go to sleep early", distractors: ["You must run fast", "You can't sleep"], explanation: "Si estás cansado, el consejo lógico es irte a dormir temprano." },

    // ================== BLOQUE 11: ERROR CORRECTION ==================
    { block: "11", type: "input", question: "Corrige: 'There is two dogs playing in the park.'", correct: "There are two dogs playing in the park", explanation: "Hablamos de dos perros (plural). Se usa 'There are'." },
    { block: "11", type: "input", question: "Corrige: 'Look at Pedro! He runs in the street right now.'", correct: "He is running in the street right now", explanation: "El chivato 'Right now' obliga a usar Presente Continuo (is running)." },
    { block: "11", type: "input", question: "Corrige: 'Yesterday I go to the cinema with my family.'", correct: "Yesterday I went to the cinema with my family", explanation: "'Yesterday' es pasado. El pasado irregular de go es 'went'." },
    { block: "11", type: "input", question: "Corrige: 'A Ferrari is more fast than a bicycle.'", correct: "A Ferrari is faster than a bicycle", explanation: "'Fast' es un adjetivo corto, por lo que lleva '-er'. Nunca uses 'more' con adjetivos cortos." },
    { block: "11", type: "input", question: "Corrige: 'You don't must smoke in this building.'", correct: "You mustn't smoke in this building", explanation: "Los verbos modales se niegan a sí mismos (mustn't). NUNCA llevan don't ni doesn't." },
    { block: "11", type: "input", question: "Corrige: 'I am sure that tomorrow it is going to rain. (Opinión/Predicción sin pistas)'.", correct: "I am sure that tomorrow it will rain", explanation: "Si la predicción se basa en lo que tú piensas o estás seguro (I am sure), debes usar 'will'." },
    { block: "11", type: "input", question: "Corrige: 'She didn't played tennis yesterday.'", correct: "She didn't play tennis yesterday", explanation: "Al poner 'didn't', el verbo principal vuelve a infinitivo y pierde la '-ed'." },
    { block: "11", type: "input", question: "Corrige: 'I am more taller than my brother.'", correct: "I am taller than my brother", explanation: "'Tall' es corto, por lo que ya lleva '-er'. Es un error muy grave poner 'more' y '-er' a la vez." },
    { block: "11", type: "input", question: "Corrige: 'Are you listen to me?'", correct: "Are you listening to me", explanation: "En el Presente Continuo, si usas el verbo To Be (Are), el verbo principal debe llevar '-ing'." },
    { block: "11", type: "test", question: "Elige la correcta SIN ERRORES:", correct: "We didn't go to the park.", distractors: ["We didn't went to the park.", "We not go to the park."], explanation: "El auxiliar negativo de pasado es 'didn't', y obliga a que el verbo principal vaya en infinitivo puro (go)." },
    { block: "11", type: "test", question: "Elige la correcta SIN ERRORES:", correct: "She is the tallest girl.", distractors: ["She is the most tall girl.", "She is the taller girl."], explanation: "Superlativo de adjetivo corto: lleva 'the' delante y se le añade la terminación '-est'." },
    { block: "11", type: "test", question: "Elige la correcta SIN ERRORES:", correct: "You shouldn't eat that.", distractors: ["You shouldn't to eat that.", "You don't should eat that."], explanation: "Los modales como 'should' o 'must' NUNCA llevan un 'to' detrás ni se niegan con 'don't'." }
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
            document.getElementById('quiz-title').innerText = "Gramática: Desafío Mezclado";
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
    
    // Convertimos la respuesta a minúsculas, quitamos espacios al final y signos de puntuación
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
