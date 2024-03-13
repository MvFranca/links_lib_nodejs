function extraiLinks(arr){

    const links = arr.map( (item) => {
        return Object.values(item).join()
    })

    return links
}

function manejaErro(erro){
    if(erro.cause.code = 'ENOTFOUND'){
        return 'Link não encontrado'
    }
    else{
        return 'Ocorreu algum erro'
    }
}

async function checaLinks(arr){

        const verificados = Promise.all( 

            await arr.map( async(link) => {
                try{

                const res = await fetch(link) 
                return res.status

                }
                catch(erro){
                    return manejaErro(erro)
                }

            })
    
        )
    
       return verificados



}

export async function validacao(arr, arquivo){
    const links = await extraiLinks(arr)
    const status = await checaLinks(links)
    console.log('Arquivo:', arquivo )
    return arr.map( (objeto, index) => ({
           
                ...objeto,
                status: status[index]
          
    }) )


}

// [gatinho salsicha](http://gatinhosalsicha.com.br/)