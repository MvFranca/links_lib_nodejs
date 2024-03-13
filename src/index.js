import fs from 'fs';
import chalk from 'chalk';

// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.promises.readFile(caminhoDoArquivo, encoding).then((texto) => {
//         console.log(chalk.green(texto))
//     }).catch((erro) => {
//         throw Error(chalk.red(erro.code, "Erro no caminho do arquivo!"))    
//     })
// }


function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)]
    const resultados = capturas.map((captura) => ({
        [captura[1]]: captura[2]
    }))
    return  resultados.length !== 0 ? resultados : "Não tem links disponíveis no arquivo."
}

export async function pegaArquivo(caminhoDoArquivo) {

    try{
        const encoding = 'utf-8';
        const arquivo = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return extraiLinks(arquivo)

    } catch(erro){

        throw Error(chalk.red(erro.code, "Erro no caminho do arquivo!"))    

    }
    
}

