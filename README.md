# 📜 Gerador de Boletos com Node.js, Firebase e EJS  

Este projeto implementa a geração automática de boletos bancários para o Itaú utilizando **Node.js, Firebase Functions, EJS e bwip-js**. Ele permite criar códigos de barras válidos e renderizar boletos personalizados de forma dinâmica.  

## 🚀 Tecnologias Utilizadas  

- **Node.js**: Para a lógica do backend  
- **Firebase Functions**: Para escalabilidade e deploy serverless  
- **bwip-js**: Para geração do código de barras  
- **EJS**: Para renderizar o boleto em HTML  
- **date-fns**: Para manipulação de datas  
- **Base64**: Para embutir imagens no relatório  

## 📌 Funcionalidades  

1. **Gerar código de barras único** para cada boleto  
2. **Converter em imagem Base64** para exibição  
3. **Preencher dados automaticamente** do beneficiário e pagador  
4. **Renderizar um template EJS** para gerar um boleto pronto para impressão  
5. **Exportar HTML** para facilitar o uso e compartilhamento  

## 🛠 Como Usar  

### 1️⃣ Instale as dependências  

Antes de iniciar, instale as dependências do projeto:  

npm install

### 2️⃣ Configure o Firebase Functions

Caso ainda não tenha o Firebase CLI instalado, execute:

npm install -g firebase-tools

Depois, faça login e inicialize o ambiente do Firebase Functions:

firebase login
firebase init functions

### 3️⃣ Rode o projeto localmente

Para rodar a função localmente, utilize o emulador do Firebase:

cd functions
firebase emulators:start

### 4️⃣ Gere um boleto

A API expõe um endpoint para geração de boletos.

📍 Endpoint:

http://127.0.0.1:5001/itau-bank-fire/us-central1/oncall_exportar_boleto_bancario

📤 Exemplo de Request (JSON)

{
  "beneficiario": {
    "agencia_codigo": "123/54321-01",
    "nosso_numero": "123456789"
  },
  "pagador": {
    "nome": "Gustavo",
    "endereco": "Av. André Araujo, 999 - Aleixo - Amazonas - AM - 69060-000",
    "documento_principal": "123.456.789-00",
    "sacador_avalista": "Eduardo Silva",
    "documento_secundario": "123.456.789-01"
  },
  "documento": {
    "data_doc": "10/02/2025",
    "numero_doc": "123456",
    "especie_doc": "DM",
    "aceite_doc": "N",
    "data_processamento": "10/02/2025",
    "uso_do_banco": "",
    "carteira": "157",
    "especie": "R$",
    "quantidade": "1",
    "valor": "89.00",
    "instrucoes": "Pagar até o vencimento"
  },
  "boleto": {
    "data_vencimento": "15/02/2025",
    "valor_documento": "R$89,00",
    "descontos_abatimentos": "R$10,00",
    "juros_multas": "R$0,00",
    "valor_pago": "R$79,00",
    "local_pagamento": "QUALQUER BANCO ATÉ O VENCIMENTO"
  }
}

📥 Exemplo de Response

- Status 200 (Sucesso): O boleto é gerado em formato HTML
- Status 500 (Erro): "Erro interno ao gerar o relatório"