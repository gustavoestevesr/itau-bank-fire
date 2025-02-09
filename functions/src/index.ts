import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { gerarRelatorio, mock } from "./helpers/GerarRelatorio";
import { IRequestData } from "./models/IRequestData";

export const oncall_exportar_boleto_bancario = onRequest(
  async (request, response) => {
    logger.info("Cloud function oncall_exportar_boleto_bancario iniciada.");

    try {
      const requestData: IRequestData = request.body ?? mock();
      const html = await gerarRelatorio(requestData);

      response.setHeader("Content-Type", "text/html");
      response.status(200).send(html);
    } catch (error) {
      logger.error("Erro ao gerar relatório:", error);
      response.status(500).send("Erro interno ao gerar o relatório.");
    }
  }
);
