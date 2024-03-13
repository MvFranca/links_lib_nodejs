import { pegaArquivo } from "./index.js"
import fs from 'fs'
import { validacao } from "./http-valida.js"

const caminho = process.argv

const imprimirTexto = async (texto, arquivo, valida) => {
    
    if(valida){
        // if(arquivo) console.log("\narquivo: " + arquivo)
        const valida = await validacao(texto, arquivo)
        console.log(valida)
    }
    else{
        if(arquivo) console.log("\narquivo: " + arquivo)
        console.log(texto)
    }

}

async function processaTexto(argumentos){

    const caminho = await argumentos[2]
    const valida = await argumentos[3] === '--valida'

    try{

        fs.lstatSync(caminho)

    } catch(error){

        if(error.code === "ENOENT") console.log("Arquivo ou diretório não existe.")
        return
    }


    if(fs.lstatSync(caminho).isFile()){
        const resultado = await pegaArquivo(caminho)
        imprimirTexto(resultado, false, valida)

    } else if(fs.lstatSync(caminho).isDirectory()){
        const arquivos = await fs.promises.readdir(caminho)

        arquivos.forEach(async (arquivo) => {{
            const conteudos = await pegaArquivo(caminho + '/' + arquivo)
            imprimirTexto(conteudos, arquivo, valida)
        }})
    }



}

processaTexto(caminho)