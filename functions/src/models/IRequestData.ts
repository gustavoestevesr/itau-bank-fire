export interface IBeneficiario {
  agencia_codigo: string;
  nosso_numero: string;
}

export interface IPagador {
  nome: string;
  endereco: string;
  documento_principal: string;
  sacador_avalista: string;
  documento_secundario: string;
}

export interface IDocumento {
  data_doc: string;
  numero_doc: string;
  especie_doc: string;
  aceite_doc: string;
  data_processamento: string;
  uso_do_banco: string;
  carteira: string;
  especie: string;
  quantidade: string;
  valor: string;
  instrucoes: string;
}

export interface IBoleto {
  codigo?: string;
  codigo_barras?: string;
  data_vencimento: string;
  valor_documento: string;
  descontos_abatimentos: string;
  juros_multas: string;
  valor_pago: string;
  local_pagamento: string;
}

export interface IRequestData {
  logo_empresa?: string;
  beneficiario: IBeneficiario;
  pagador: IPagador;
  documento: IDocumento;
  boleto: IBoleto;
}
