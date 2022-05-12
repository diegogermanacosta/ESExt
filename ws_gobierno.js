function gobierno()
{ 	var gobernante=[];
	for( i=1 ; i<=30 ; i++)
	{
		gobernante[i]= $("#region"+i).text().trim().substring(0,3);
		console.log(gobernante[i]);
		
	}
	LOCAL.setGobernantes(gobernante);
}