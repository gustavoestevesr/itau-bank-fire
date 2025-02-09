import bwipjs from "bwip-js";
import { logger } from "firebase-functions";

export async function GerarCodigoBarras(codigoNumerico: string) {
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
