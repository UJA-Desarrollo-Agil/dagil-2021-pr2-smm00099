// ---------------------------------------------------------------------------
// Edit this file to define your game. It should have at least four
// sets of content: undum.game.situations, undum.game.start,
// undum.game.qualities, and undum.game.init.
// ---------------------------------------------------------------------------

/* A unique id for your game. This is never displayed. I use a UUID,
 * but you can use anything that is guaranteed unique (a URL you own,
 * or a variation on your email address, for example). */
undum.game.id = "be1c95b9-cbc7-48c6-8e6a-89837aa9113e";

/* A string indicating what version of the game this is. Versions are
 * used to control saved-games. If you change the content of a game,
 * the saved games are unlikely to work. Changing this version number
 * prevents Undum from trying to load the saved-game and crashing. */
undum.game.version = "1.0";

// En modo depuraciÃ³n, que no haya efectos de jquery
jQuery.fx.off=false

/* A variable that changes the fade out speed of the option text on
 * a mobile. */
undum.game.mobileHide = 2000

/* A variable that changes the options fade out speed. */
undum.game.fadeSpeed = 1500

/* A variable that changes the slide up speed after clicking on an
 * option. */
undum.game.slideUpSpeed = 500

/* The situations that the game can be in. Each has a unique ID. */
undum.game.situations = {
    inicio: new undum.SimpleSituation(
        "<h1>La odisea de la baguette comienza</h1>\
		<h1> El salón </h1>\
        <p>Es un lunes cualquiera. Son las 13:15 y estás en pijama en el salón de tu casa haciendo\
		el proyecto de Desarrollo Ágil que tienes que entregar esta noche y que acabas de empezar\
        cuando de repente suena el teléfono.\
        ¿Lo <a href='cogerlo'> cogerás </a> o <a href='nocogerlo'> dejaras que suene</a>?</p>"
    ),
    nocogerlo: new undum.SimpleSituation(
        "<p class='transient'>Dejas que suene mientras sigues con tu proyecto individual sobre ir a comprar.\
        A las 14:00 más o menos tus padres llegan a casa y te preguntan si has comprado pan.</p>\
		<p class='transient'>Acabaras el proyecto a tiempo pero has tenido que pagar un gran precio. Vas a tener que comer sin pan.</p>\
		<p class='transient'><a href='inicio'> Volver a intentarlo </a></p>"
		
    ),
    cogerlo: new undum.SimpleSituation(
        "<p>Coges el teléfono y ves que te está llamando tu madre.</p>\
        <p class='dialogo'>-¿Estás ocupado?</p>\
		<p class='dialogo'>+Pues sí, estoy en mitad de un proyecto de Desarrollo Ágil\
		haciendo unas tarjetas en Trello.</p>\
		<p class='dialogo'>-¿Tre qué? Bueno, baja un momento a la panadería de aquí al lado y compra una baguette \
		que a tu padre y a mi se nos ha pasado y para cuando salgamos de trabajar ya no quedaran.</p>\
        \
        <p>Viendo que bajar no es negociable sales raudo y veloz hacia tu habitación para cambiarte y\
		llevar a cabo el recado cuanto antes y poder continuar tu proyecto.</p>",
		{
			enter:function(character, system, from) {
					system.doLink('habitacion');
			}
		}

    ),
	
	habitacion: new undum.SimpleSituation(
		"<h1>Tu habitación</h1>\
	    <p>Estás en tu habitación, sobre el escritorio ves <a href='./cogercarteraymascarilla' class='once'>tu cartera, una mascarilla</a> y tus llaves al lado de la hoja donde has escrito las\
		situaciones de tu proyecto.</p>",
			{
				actions:{
					'cogercarteraymascarilla': function( character, system, action){
						system.setQuality( "dinero", 10 );
						system.setQuality( "mascarilla", true);
						system.write("<p>Ahora tienes 10€ y la mascarilla puesta</p>")
						system.write("<p>Ya estas listo para salir a <a href='salircalle'>la calle</a></p>")
					}
				}
			}
    ),
    salircalle: new undum.SimpleSituation(
        "<h1>La calle</h1>\
		<p>Sales a la calle, ¿qué haces?:</p>\
		<p class='transient'><a href='panaderiaesquina'>1)Ir a la panadería de la esquina</p>\
		<p class='transient'><a href='supermercado'>2)Ir al supermercado</p>"
    ),
	salircalleintento: new undum.SimpleSituation(
        "<h1>La calle</h1>\
		<p>Sales a la calle, ¿qué haces?:</p>\
		<p class='transient'><a href='supermercado'>1)Ir al supermercado</p>\
		<p class='transient'><a href='casanobaguette'>2)Volver a casa</a></p>"
    ),
    panaderiaesquina: new undum.SimpleSituation(
        "<h1>La panadería de la esquina</h1>\
		<p>Entras en la panadería y ves que está abarrotada de gente </p>,\
		<p class='transient'>¿<a href='esperar1'>Esperas tu turno</a> o <a href='./salir1'> te vas</a>?</p>\
        ",
		{
			actions:{
				'salir1': function (character, system, action){
					system.doLink('salircalleintento');
				}
			}
		}
    ),
    esperar1: new undum.SimpleSituation(
        "<p>Sigues esperando en la panadería y ves como cada vez hay menos baguettes </p>,\
		<p class='transient'>¿<a href='esperar2'>Esperas tu turno</a> o <a href='./salir2'> te vas</a>?</p>\
        ",
		{
			actions:{
				'salir2': function (character, system, action){
					system.doLink('salircalleintento');
				}
			}
		}
    ),
	esperar2: new undum.SimpleSituation(
        "<p>Sigues esperando en la panadería y ves que quedan muy pocas baguettes </p>,\
		<p class='transient'>¿<a href='esperar3'>Esperas tu turno</a> o <a href='./salir3'> te vas</a>?</p>\
        ",
		{
			actions:{
				'salir3': function (character, system, action){
					system.doLink('salircalleintento');
				}
			}
		}
    ),
	esperar3: new undum.SimpleSituation(
        "<p>La persona que está delante de ti se lleva la última baguette así que <a href='salircalleintento'> te vas decepcionado</a>.</p>"
    ),
	supermercado: new undum.SimpleSituation(
		"<h1>El supermercado</h1>\
		<p>Entras al supermercado y miras hacia arriba para ver en que pasillo esta el pan.<p>\
		<p>Cuando alzas la vista ves que no están los carteles que indican lo que hay en cada pasillo</p>\
		<p> Por suerte, este supermercado solo tiene 3 pasillos así que no deberías tardar mucho en encontrarlo.</p>\
		",
		{
			enter:function(character, system, from) {
					system.doLink('selecpasillo');
			}
		}
	),
	selecpasillo: new undum.SimpleSituation(
	"<p class='transient'> Hay 3 pasillos: uno a la <a href='pizquierda'>izquierda</a>, uno en el <a href='pcentro'>centro</a> y \
		otro a la <a href='pderecha'>derecha</a>.</p>"
	),
	pizquierda: new undum.SimpleSituation(
		"<p>Vas al pasillo de la izquierda</p>\
		<p>Ves la seccion de especias y salsas</p>\
		<p>Aquí no está la sección del pan.</p>\
		<br>\
		<p class='transient'><a href='selecpasillo'> Volver</a></p>\
		"
	),
	pcentro: new undum.SimpleSituation(
		"<p>Vas al pasillo del centro</p>\
		<p>Ves la sección bebidas azucaradas y energéticas</p>\
		<p>Entre las bebidas energéticas ves la bebida del momento, <a href='./cogermonstro'>Mostro™</a>, la bebida con la que tendrás tanta energía que no podrás cerrar los ojos ni aunque quieras</p>\
		<p>Aquí no está la sección del pan.</p>\
		<br>\
		<p class='transient'><a href='selecpasillo'> Volver.</a></p>",
		{
			actions:{
				'cogermonstro': function(character,system,action){
				system.write("<p>Has cogido un Mostro™</p>");
				system.setQuality("bebidaEner",true);
				system.setQuality("dinero",(character.qualities.dinero-1));
				}
			}
		}
	),
	pderecha: new undum.SimpleSituation(
		"<p>Vas al pasillo de la derecha</p>\
		<p>Ves la sección de panadería y ves la <a href='./cogerbaguette'>baguette</a> que tanto has buscado</p>\
		",
		{
			actions:{
				'cogerbaguette': function(character,system,action){
				system.write("<p>Por fin, la baguette es tuya</p>");
				system.setQuality("baguette",true);
				system.write("<p class='transient'><a href='casa'>Volver a casa</a></p>");
				system.setQuality("dinero",(character.qualities.dinero-1));
				}
			}
		}
	),
	casa: new undum.SimpleSituation(
		"<p>Vuelves a casa con tu flamante baguette y comes con tus padres.</p>",
		{
			enter:function( character, system, from ) {
						if( character.qualities.bebidaEner ) {
							system.doLink( 'finmostro');
						} else {
							system.doLink( 'finnomostro');
						}
			}
		}
	),
	finnomostro: new undum.SimpleSituation(
	"<p>Una vez que has acabado de comer, sigues con la proyecto de Desarrollo Ágil y lo acabas justo 5 minutos antes del tiempo límite</p>\
	<p>Esta vez has tenido suerte</p>\
	<h1>¡Fin!</h1>"
	),
	finmostro: new undum.SimpleSituation(
	"<p>Una vez que has acabado de comer, te dispones a seguir con el proyecto de Desarrollo Ágil pero antes decides darle un sorbo \
	a la bebida energética que has comprado y te pones a trabajar.</p>\
	<p>Te despiertas al día siguiente y miras tu ordenador para ver que ha pasado.</p>\
	<p>Al parecer durante el tiempo que no recuerdas has hecho todos las prácticas y \
	has contestado correctamente a todas las posibles preguntas de todas las asignaturas del grado \
	y de todos los posibles másteres relacionados con la carrera, así que, has completado el grado \
	y todos los másteres en 1 día.</p>\
	<p>En tu estado de euforia tras este giro de los acontecimiento intentas desbloquear el \
	teléfono para contárselo a tus compañeros de carrera y ves que no puedes</p>\
	<p>Al parecer te has quedado sin huellas dactilares al teclear tanto en un día<\p>\
	<h1>¡Fin!</h1>"
	),
	casanobaguette: new undum.SimpleSituation(
	"<p>Te vuelves a casa triste por no haber podido comprar la baguette.</p>\
	<p>Al entrar por la puerta escuchas un documental de la 2 sobre ritos de invocación de las tribus antiguas</p>\
	<p class='dialogo'>... para sus ritos de invocación pronunciaban los nombres de los dioses, sobre todo, los de los relacionados con lo que desearan invocar.</p>\
	<p>No pierdo nada por probar.</p>\
	<p>Te acercas a la mesa y te inclinas hacia ella</p>\
	<p id='invo' class='dialogo'>Baguette, yo te invoco por el poder que me conceden los dioses de Bimbo.</p>",
	{
		enter: function( character, system, from ) {
					if( system.rnd.random()>0.5 ) {
						system.write("<p>¡Ha aparecido una baguette!</p>",'invo' );
						system.doLink('fininvocacion');
					} else {
						system.write( "<p>A pesar de tu intento no has tenido éxito.</p>",'invo');
						system.doLink('finnoinvocacion');
					}
				}
	}
	),
	fininvocacion: new undum.SimpleSituation(
			"<p>Justo cuando aparece en la mesa tus padres abren la puerta</p>\
			<p class='dialogo'>-Que bien, has podido comprar una, pensaba que a estas horas no quedarían. </p>\
			<p class='dialogo'>+Sí, la he &quot comprado &quot.</p>\
			<p>Los años de decirle a los profesores que llevas bien la práctica cuando todavía no la has llegado a empezar han dado su fruto y tus padres te creen.</p>\
			<p>Cuando acabas de comer piensas probar suerte a ver si te aparece el proyecto hecho invocando a los dioses de Undum pero no quieres tentar a la suerte y continuas con el proyecto acabándolo un par de minutos antes de la hora límite.</p>\
			<h1>¡Fin!</h1>"
			
	),
	finnoinvocacion: new undum.SimpleSituation(
			"<p>Justo en ese momento miras la puerta y ves a tus padres preguntándose que han hecho mal para que hayas intentado invocar una baguette</p>\
			<p>Coméis el silencio pero de vez en cuando ves como se le escapa alguna risa a tus padres.</p>\
			<p>Cuando acabas de comer continúas con el proyecto y lo acabas 5 minutos antes de la hora límite, así que por lo menos eso sí que te ha salido bien.</p>\
			<h1>¡Fin!</h1>"
			
	)
};

// ---------------------------------------------------------------------------
/* The Id of the starting situation. */
undum.game.start = "inicio";

// ---------------------------------------------------------------------------
/* Here we define all the qualities that our characters could
 * possess. We don't have to be exhaustive, but if we miss one out then
 * that quality will never show up in the character bar in the UI. */
undum.game.qualities = {
	mascarilla: new undum.OnOffQuality(
		"Mascarilla", {priority:"0001", group:'oculto'}
	),
    dinero: new undum.NumericQuality(
        "Dinero", {priority:"0001", group:'bolsillo'}
    ),
    llaves: new undum.OnOffQuality(
        "Llaves de casa", {priority:"0002", group:'bolsillo'}
    ),
    baguette: new undum.OnOffQuality(
        "Baguette", {priority:"0001", group:'bolsa'}
    ),
	bebidaEner: new undum.OnOffQuality(
		"Mostro™", {priority:"0003", group:'bolsa'}
	)
};

// ---------------------------------------------------------------------------
/* The qualities are displayed in groups in the character bar. This
 * determines the groups, their heading (which can be null for no
 * heading) and ordering. QualityDefinitions without a group appear at
 * the end. It is an error to have a quality definition belong to a
 * non-existent group. */
undum.game.qualityGroups = {
    bolsillo: new undum.QualityGroup('Bolsillo', {priority:"0002"}),
    bolsa: new undum.QualityGroup('Bolsa', {priority:"0003"}),
	oculto: new undum.QualityGroup(null,{priority:"0001"})
};

// ---------------------------------------------------------------------------
/* This function gets run before the game begins. It is normally used
 * to configure the character at the start of play. */
undum.game.init = function(character, system) {
	system.setQuality("mascarilla", false);
    system.setQuality("dinero", 0);
    system.setQuality("llaves", false);
    system.setQuality("baguette" , false);
    system.setQuality("bebidaEner" , false);
};
