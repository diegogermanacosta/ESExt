function gobierno()
{ 	var gobernante=[];
	var n_regiones=15;
	switch (GLOBAL.getPartida())
	{
		case 'KENARON':
		case 'GARDIS':
			n_regiones= 30;
			break;
		case 'ZULA':
		case 'NUMIAN':
			n_regiones=16;
			break;
		case 'FANTASY':
			n_regiones=15;
	}
	for( i=1 ; i<=n_regiones ; i++)
	{
		gobernante[i]= $("#region"+i).text().trim().substring(0,3);
		console.log(gobernante[i]);
		
	}
	LOCAL.setGobernantes(gobernante);
}