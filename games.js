// Catálogo de juegos. Para añadir uno nuevo:
// 1) guarda el juego como <id>.html en la raíz
// 2) añade un objeto a esta lista. Nada más.
window.GAMES = [
  {
    id: 'pizzeria-don-marcos',
    name: "Don Marco's Pizzería",
    emoji: '🍕',
    tags: ['3D', 'Terror', 'Historia'],
    desc: 'Turno de noche en una pizzería cerrada desde 1994. Prepara tres pedidos, sigue las pistas y registra lo imposible antes de que suene el teléfono.',
    controls: 'WASD mover · ratón mirar · E usar · R registrar · F linterna · Shift correr · Esc pausa',
    colors: ['#d3442e', '#e7bd78'],
    disabled: true,
    status: 'Actualizando'
  },
  {
    id: 'turno-de-caja',
    name: 'Turno de Caja',
    emoji: '🛒',
    tags: ['3D', 'Simulador'],
    desc: 'Simulador 3D de supermercado: escanea pedidos, atiende a clientes con paciencia limitada, resuelve incidencias y repón estantes.',
    controls: 'WASD mover · ratón mirar · F escanear · E interactuar · Shift correr · Esc pausa',
    colors: ['#2f7d4f', '#b8ed6b'],
    disabled: true,
    status: 'Actualizando'
  },
  {
    id: 'saltation',
    name: 'Cuerda de Acero',
    emoji: '🪢',
    tags: ['3D', 'Ritmo', 'Tienda'],
    desc: 'Salta la cuerda de cable de grúa en Puerto Hierro. Cada salto limpio te hace más fuerte; desbloquea cuerdas y skins.',
    controls: 'Espacio o toque para saltar · mantén para salto alto',
    help: 'Salta cuando la cuerda baje; mantén pulsado para un salto alto (hace falta cuando la cuerda se duplica). Cada salto limpio da monedas (más si es perfecto) y músculo. Los fallos y el tiempo jugando lastiman los tobillos y reducen el salto: se curan con el tiempo real o vendándolos en el menú (30 monedas). Los capítulos se desbloquean al sumar saltos.',
    colors: ['#f4c20d', '#d8512f'],
    badge: 'Nuevo'
  },
  {
    id: 'fuga-3d',
    name: 'FUGA 3D',
    emoji: '🚔',
    tags: ['3D', 'Conducción', 'Acción'],
    desc: 'Huye de la policía, helicópteros, tanques y hasta Godzilla. Torreta, nitro, tráfico, power-ups, 10 modos, coches y skins.',
    controls: 'W/S acelerar · ←/→ girar · A / clic torreta · Shift nitro · Espacio freno',
    help: 'Huye de la policía, helicópteros y tanques. W/S aceleran, las flechas giran, A o clic usa la torreta, Shift da nitro y Espacio frena. Hay 10 modos, coches y skins. Usa el nitro para salir de apuros y la torreta para quitarte perseguidores.',
    colors: ['#ff3b5c', '#ffc53a'],
    badge: 'Destacado'
  },
  {
    id: 'neon-buggy',
    name: 'Neón Buggy Infinito',
    emoji: '🏎️',
    img: 'neon-buggy-icono.png',
    tags: ['3D', 'Conducción', 'Arcade'],
    desc: 'Viaja desde Villapeña huyendo de un monstruo gigante: Burgos, Madrid, Valencia (¡DANA!) y Marruecos. Pasos de cebra, abuelitas, cinemáticas, garaje y Pase Neón. ¡Turbo infinito!',
    controls: 'A/D girar · W turbo ∞ · S frenar · Espacio voltereta en el aire · botones en móvil',
    help: 'Mantén W (turbo) y esquiva muros y coches; las rampas te hacen volar y con Espacio haces volteretas en el aire. Recoge monedas y rompe cajas para comprar coches y subir el Pase Neón (se desliza desde abajo). Modo online: reto diario con tablas de distancia y oro, amigos, carreras con código de sala o al azar. En Ajustes hay tutorial, volumen, calidad, sensibilidad y contador de FPS. Si creas contraseña, tu progreso se guarda en la nube.',
    colors: ['#ff2bd6', '#19f2ff'],
    badge: 'Nuevo'
  },
  {
    id: 'orbe-runner',
    name: 'Orbe Runner 3D',
    emoji: '🔶',
    tags: ['3D', 'Plataformas'],
    desc: 'Salta entre islas flotantes, recoge monedas, pisa enemigos y llega al portal sin caer a la lava.',
    controls: 'WASD mover · Espacio saltar (doble) · Shift dash · Q/E o arrastrar: cámara',
    help: 'Salta entre islas flotantes con doble salto (Espacio) y dash (Shift). Los pads verdes dan súper salto, pisa a los enemigos rojos desde arriba, ojo con las plataformas móviles y no caigas a la lava. Recoge monedas y llega al portal.',
    colors: ['#ff7a1a', '#ffd400']
  },
  {
    id: 'demolicion-3d',
    name: 'Demolición 3D',
    emoji: '💥',
    tags: ['3D', 'Físicas', 'Puzles'],
    desc: 'Derriba las estructuras con tu cañón y destruye todas las bolas rojas. Munición normal, pesada y bombas.',
    controls: 'Ratón apuntar · mantén clic para cargar y suelta · 1/2/3 munición',
    help: 'Derriba muros y torres para alcanzar los barriles de pólvora y destruye todas las bolas rojas. Mantén clic para cargar la potencia y suelta para disparar; 1, 2 y 3 cambian entre munición normal, pesada y bombas. Apunta a la base de las estructuras para que caigan.',
    colors: ['#ff5a1f', '#8fcfff']
  },
  {
    id: 'pelotation',
    name: 'Pelotation',
    emoji: '🧱',
    tags: ['3D', 'Sandbox', 'Físicas'],
    desc: 'Sandbox de físicas en primera persona: dispara bolas, construye estructuras, haz explosiones y cambia la gravedad. Sin objetivos.',
    controls: 'WASD mover · ratón mirar · clic/Espacio usar · 1-5 herramientas · G gravedad · R limpiar',
    help: 'Es un sandbox sin objetivos. Elige herramienta con 1-5 (bola, bola pesada, poner caja, explosión, borrar), levanta estructuras con M, P, U, O e I, cambia la gravedad con G y el tiempo con T, y limpia todo con R. Las cajas no tienen límite, pero con miles puede ir lento.',
    colors: ['#3a8dde', '#87b5e0']
  },
  {
    id: 'snake',
    name: 'Snake 2025',
    emoji: '🐍',
    tags: ['2D', 'Arcade'],
    desc: 'El clásico de la serpiente con tienda, oro y mejoras.',
    controls: 'Flechas / WASD o deslizar el dedo',
    help: 'Come manzanas para crecer y ganar oro, y gástalo en skins y mejoras en la tienda. Evita chocarte contigo. Ojo: el juego tiene un cuadro de códigos secretos y escribir códigos incorrectos acarrea sanciones; el asistente no da esos códigos.',
    img: 'snake-icono.webp',
    colors: ['#4CAF50', '#1b5e20']
  },
  {
    id: 'survival-shooter',
    name: 'Survival Shooter',
    emoji: '🔫',
    tags: ['2D', 'Disparos', 'Supervivencia'],
    desc: 'Sobrevive a oleadas de enemigos y jefes, sube de nivel y mejora tu equipo en la tienda.',
    controls: 'Mando o teclado · Q bomba · E ataque cruz · C cofre · L cofre legendario',
    help: 'Sobrevive a las oleadas y a los jefes, sube de nivel y elige mejoras (si no las necesitas, pulsa Continuar). P o Esc pausan. Q lanza bomba, E ataque en cruz, C abre cofre y L cofre legendario. Compra equipo en la tienda. En el menú hay Configuraciones: números de daño, vibración de pantalla, FPS y color del menú.',
    img: 'survival-logo.webp',
    colors: ['#7b2cff', '#00e5ff']
  }
];

/* Guías ampliadas para el asistente de ayuda (asistente.js). Solo contienen datos reales de cada juego.
   alias: palabras con las que la gente nombra el juego · tuto: pasos del tutorial · tips: trucos de estrategia */
(function () {
  var X = {
    'saltation': {
      alias: ['cuerda', 'saltation', 'puerto hierro'],
      tuto: ['Salta cuando la cuerda baje: pulsa Espacio o toca la pantalla.', 'Mantén pulsado para hacer un salto alto; lo necesitas cuando la cuerda se duplica.', 'Cada salto limpio da monedas (más si es perfecto) y músculo.', 'Los fallos y el tiempo jugando lastiman los tobillos y reducen tu salto.', 'Cura los tobillos con el tiempo real o vendándolos en el menú (30 monedas).', 'Gasta monedas en cuerdas y skins; los capítulos se desbloquean al sumar saltos.'],
      tips: ['Busca el salto perfecto: da más monedas que uno normal.', 'No juegues con los tobillos muy dañados: el salto baja y fallarás más; véndalos antes.', 'Reserva el salto alto (mantener pulsado) para cuando la cuerda se duplica.']
    },
    'fuga-3d': {
      alias: ['fuga', 'godzilla', 'policia'],
      tuto: ['Elige modo (hay 10) y empieza: huyes de la policía, helicópteros, tanques y hasta Godzilla.', 'W acelera y S frena; las flechas (o Q/E) giran.', 'Shift usa el nitro y Espacio es el freno de mano para derrapar.', 'La torreta se dispara con A o con clic: úsala para quitarte perseguidores.', 'Si te quedas atascado, pulsa R para recolocar el coche; C cambia la cámara.', 'Con las monedas compras coches y skins en el Garaje y mejoras Chasis, Nitro y Torreta.'],
      tips: ['Guarda el nitro para salir de apuros, no lo gastes en rectas tranquilas.', 'Dispara la torreta mientras huyes para reducir perseguidores.', 'Usa el freno de mano (Espacio) para tomar curvas cerradas sin chocar.', 'Mejorar Chasis, Nitro y Torreta en el Garaje te hace más fácil aguantar.']
    },
    'neon-buggy': {
      alias: ['buggy', 'neon', 'villapena', 'pase neon'],
      tuto: ['Mantén W (turbo infinito) y gira con A/D; S frena. En móvil hay botones en pantalla.', 'Esquiva muros y coches; las rampas te hacen volar.', 'En el aire pulsa Espacio para hacer volteretas.', 'Recoge monedas y rompe cajas.', 'Con las monedas compras coches en el garaje y subes el Pase Neón (se desliza desde abajo).', 'En Ajustes hay tutorial, volumen, calidad, sensibilidad y contador de FPS.', 'Online: reto diario con tablas de distancia y oro, amigos y carreras con código de sala o al azar. Si creas contraseña, tu progreso se guarda en la nube.'],
      tips: ['Usa las rampas para volar y haz volteretas en el aire con Espacio.', 'Rompe cajas y recoge monedas por el camino: así subes antes el Pase Neón.', 'Si va lento, baja la calidad en Ajustes; si el giro es brusco, ajusta la sensibilidad.', 'Crea contraseña para no perder tu progreso (se guarda en la nube).']
    },
    'orbe-runner': {
      alias: ['orbe', 'runner'],
      tuto: ['Muévete con WASD o las flechas y salta con Espacio (se puede doble salto).', 'Shift hace un dash para cruzar huecos.', 'Gira la cámara arrastrando el ratón o con Q/E.', 'Los pads verdes dan súper salto; las plataformas moradas se mueven.', 'Pisa a los enemigos rojos desde arriba para derrotarlos.', 'Recoge monedas, evita la lava y llega al portal.'],
      tips: ['Combina doble salto y dash para los huecos largos.', 'Espera a que la plataforma móvil llegue a tu lado antes de saltar.', 'Pisa a los enemigos desde arriba: de frente te hacen daño.', 'Gira la cámara con Q/E para ver bien dónde aterrizas.']
    },
    'demolicion-3d': {
      alias: ['demolicion', 'asedio', 'canon'],
      tuto: ['Hay tres fortalezas (niveles) y un cañón.', 'Arrastra con el ratón (o WASD / flechas) para apuntar; la elevación empieza en 30°.', 'Mantén Espacio para cargar la pólvora (mira la potencia) y suelta para disparar.', 'Cambia de munición con 1, 2 y 3: normal, pesada y bombas.', 'Derriba muros y torres para llegar a los barriles de pólvora y destruye todas las bolas rojas.', 'R reinicia el nivel, M el sonido y P pausa.'],
      tips: ['Apunta a la base de las estructuras para que caigan enteras.', 'Usa la munición pesada contra muros y las bombas para los barriles.', 'No cargues siempre al máximo: ajusta la potencia al alcance.', 'Si un nivel se atasca, reinícialo con R y prueba otro ángulo.']
    },
    'pelotation': {
      alias: ['pelota', 'sandbox'],
      tuto: ['Es un sandbox sin objetivos: juega como quieras.', 'WASD mueve (Shift corre) y el ratón mira; haz clic para capturar el ratón y Esc lo suelta.', 'Clic o Espacio usan la herramienta elegida.', '1-5 cambian de herramienta: bola, bola pesada, poner caja, explosión y borrar.', 'Construye con M, P, U, O e I; G cambia la gravedad y T el tiempo.', 'R limpia todo. En móvil: izquierda mueve, derecha mira o toca para usar.'],
      tips: ['Construye una torre de cajas y derríbala con la bola pesada o una explosión.', 'Cambia la gravedad con G para ver cómo reaccionan las cajas.', 'Con miles de cajas puede ir lento: pulsa R para limpiar.']
    },
    'snake': {
      alias: ['snake', 'serpiente'],
      tuto: ['Pulsa Iniciar Juego y elige en Modos de Juego la dificultad y el número de manzanas.', 'Mueve la serpiente con las flechas o WASD (en móvil, deslizando el dedo).', 'Come manzanas para crecer y ganar oro; no te choques contigo.', 'K pausa o reanuda; + y - cambian la velocidad (salvo en Difícil y Extremo).', 'Gasta el oro en skins en la Tienda.', 'Si llenas todo el mapa ganas 50 de oro. Hay Eventos y una sección «Cómo jugar y preguntas».'],
      tips: ['Mantente cerca de los bordes al principio y deja espacio libre para girar.', 'Baja la velocidad con - mientras aprendes (no vale en Difícil ni Extremo).', 'Planifica el recorrido en zigzag cuando seas largo para no encerrarte.']
    },
    'survival-shooter': {
      alias: ['survival', 'shooter', 'oleadas'],
      tuto: ['En el menú pulsa Jugar, elige personaje y dificultad (Fácil, Normal, Difícil o Infierno).', 'Sobrevive a las oleadas y a los jefes; cada ronda es más difícil.', 'Al subir de nivel eliges una mejora (si no necesitas ninguna, pulsa Continuar).', 'Q lanza bomba, E ataque en cruz (△), C abre cofre y L cofre legendario. Con mando también funciona.', 'P o Esc pausan; puedes guardar la partida desde la pausa.', 'Con las monedas compras equipo en la tienda de partida; Rebirth cuesta 100 monedas.', 'En Configuraciones: números de daño, vibración de pantalla, FPS y color del menú.'],
      tips: ['Guarda las bombas y el ataque en cruz para cuando te rodeen o salga un jefe.', 'Muévete siempre: quedarte quieto en oleadas grandes es lo que más te mata.', 'Empieza en Fácil o Normal hasta conocer a los enemigos.', 'Mira el árbol de mejoras permanentes entre partidas.']
    },
    'pizzeria-don-marcos': { alias: ['pizzeria', 'pizza', 'marco'], tuto: [], tips: [] },
    'turno-de-caja': { alias: ['caja', 'supermercado'], tuto: [], tips: [] }
  };
  (window.GAMES || []).forEach(function (g) { var x = X[g.id]; if (x) { g.alias = x.alias; g.tuto = x.tuto; g.tips = x.tips; } });
})();
