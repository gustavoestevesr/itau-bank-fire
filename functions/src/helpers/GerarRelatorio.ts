import ejs from "ejs";
import { logger } from "firebase-functions";
import fs from "fs/promises"; // Usa a versão assíncrona do fs
import path from "path";
import { IRequestData } from "../models/IRequestData";

import { format } from "date-fns";
import { CodigoBarras } from "./CodigoBarras";

export function mock() {
  const dataAtual = format(new Date(), "dd/MM/yyyy");

  return {
    beneficiario: {
      agencia_codigo: "123/54321-01",
      nosso_numero: "123456789",
    },
    pagador: {
      nome: "Gustavo",
      endereco: "Av. André Araujo, 999 - Aleixo - Amazonas - AM - 69060-000",
      documento_principal: "123.456.789-00",
      sacador_avalista: "Eduardo",
      documento_secundario: "123.456.789-01",
    },
    documento: {
      data_doc: dataAtual,
      numero_doc: "123",
      especie_doc: "DM",
      aceite_doc: "N",
      data_processamento: dataAtual,
      uso_do_banco: "",
      carteira: "157",
      especie: "R$",
      quantidade: "",
      valor: "",
      instrucoes: "",
    },
    boleto: {
      data_vencimento: dataAtual,
      valor_documento: "R$89,00",
      descontos_abatimentos: "R$10,00",
      juros_multas: "",
      valor_pago: "",
      local_pagamento: "QUALQUER BANCO ATÉ O VENCIMENTO",
    },
  };
}

export async function gerarRelatorio(
  requestData: IRequestData
): Promise<string> {
  logger.info("Iniciando a função gerarRelatorio().");

  try {
    // Caminhos dos arquivos
    const templatePath = path.resolve(
      __dirname,
      "..",
      "..",
      "src",
      "templates",
      "boleto.ejs"
    );
    const logoItauPath = path.resolve(
      __dirname,
      "..",
      "..",
      "src",
      "assets",
      "logo-itau.png"
    );

    // Geração dos códigos
    const codigo = CodigoBarras.GerarCodigoUnico(47);
    const codigoBarras = await CodigoBarras.GerarCodigoBarras(codigo);
    const codigoBarrasImagem = `data:image/png;base64,${codigoBarras.toString(
      "base64"
    )}`;

    // Leitura da imagem de forma assíncrona
    const logoItauBuffer = await fs.readFile(logoItauPath);
    const logoItauImagem = `data:image/png;base64,${Buffer.from(
      logoItauBuffer
    ).toString("base64")}`;

    // Dados para a template EJS
    const data: IRequestData = {
      ...requestData,
      logo_empresa: logoItauImagem,
      boleto: {
        ...requestData.boleto,
        codigo: CodigoBarras.formatarCodigoBoleto(codigo),
        codigo_barras: codigoBarrasImagem,
      },
    };

    // Renderiza o template EJS
    const html: string = await ejs.renderFile(templatePath, data);
    logger.info("Template EJS renderizado com sucesso.");

    return html;
  } catch (error) {
    logger.error("Erro ao gerar o relatório:", error);
    throw new Error("Falha ao gerar o relatório."); // Lança erro para ser tratado na função chamadora
  }
}
