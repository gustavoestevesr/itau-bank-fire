import bwipjs from "bwip-js";
import { logger } from "firebase-functions";

export abstract class CodigoBarras {
  public static async GerarCodigoBarras(codigoNumerico: string) {
    const barcode = await new Promise<Buffer>((resolve, reject) => {
      bwipjs.toBuffer(
        {
          bcid: "interleaved2of5", // código de barras para boleto bancário, o formato correto é FEBRABAN, que usa o padrão interleaved 2 of 5 (ITF-14).
          text: codigoNumerico,
          scale: 3,
          height: 8,
          width: 80,
        },
        (err, buffer) => {
          if (err) {
            logger.error("Erro na função GerarCodigoBarras(): ", err);
            reject(err);
          } else {
            logger.info("Código de barras gerado com sucesso.");
            resolve(buffer);
          }
        }
      );
    });

    return barcode;
  }

  public static GerarCodigoUnico(len: number): string {
    const listaNumeros = "0123456789";
    let codigo = "";

    for (let index = 0; index < len; index++) {
      const indiceAleatorio = Math.floor(Math.random() * listaNumeros.length);
      codigo += listaNumeros[indiceAleatorio];
    }

    logger.info("Código único de " + len + " dígitos gerado com sucesso.");

    return codigo;
  }

  public static formatarCodigoBoleto(codigo: string): string {
    if (codigo.length !== 47) {
      throw new Error("O código deve ter exatamente 47 dígitos.");
    }

    return (
      codigo.slice(0, 5) +
      "." +
      codigo.slice(5, 10) +
      " " +
      codigo.slice(10, 15) +
      "." +
      codigo.slice(15, 21) +
      " " +
      codigo.slice(21, 26) +
      "." +
      codigo.slice(26, 32) +
      " " +
      codigo.slice(32, 33) +
      " " +
      codigo.slice(33, 47)
    );
  }
}
