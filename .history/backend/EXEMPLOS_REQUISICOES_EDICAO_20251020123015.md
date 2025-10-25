# Exemplos de Requisições para Edição e Exclusão de Registros

## 1. Editar uma reflexão específica

**Método:** PUT  
**URL:** `http://localhost:3000/edicao-registros/reflexao/[ID_DA_REFLEXAO]/usuario/[ID_DO_USUARIO]`  
**Exemplo:** `http://localhost:3000/edicao-registros/reflexao/12345-abcde/usuario/67890-fghij`

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Body (JSON):**
```json
{
  "title": "Novo título da reflexão",
  "category": "TRABALHO",
  "content": "Conteúdo atualizado da reflexão...",
  "emotion": "ANSIOSO"
}
```

**Resposta de Sucesso:**
```json
{
  "id": "12345-abcde",
  "title": "Novo título da reflexão",
  "category": "TRABALHO",
  "content": "Conteúdo atualizado da reflexão...",
  "emotion": "ANSIOSO",
  "userId": "67890-fghij",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T14:45:00.000Z"
}
```

---

## 2. Excluir uma reflexão específica

**Método:** DELETE  
**URL:** `http://localhost:3000/edicao-registros/reflexao/[ID_DA_REFLEXAO]/usuario/[ID_DO_USUARIO]`  
**Exemplo:** `http://localhost:3000/edicao-registros/reflexao/12345-abcde/usuario/67890-fghij`

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Body:** Não é necessário

**Resposta de Sucesso:**
```json
{
  "message": "Reflexão excluída com sucesso."
}
```

---

## 3. Excluir múltiplas reflexões

**Método:** DELETE  
**URL:** `http://localhost:3000/edicao-registros/reflexoes/usuario/[ID_DO_USUARIO]`  
**Exemplo:** `http://localhost:3000/edicao-registros/reflexoes/usuario/67890-fghij`

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Body (JSON):**
```json
{
  "reflexaoIds": [
    "12345-abcde",
    "54321-edcba",
    "98765-zyxwv"
  ]
}
```

**Resposta de Sucesso:**
```json
{
  "message": "2 reflexão(ões) excluída(s) com sucesso.",
  "deletedCount": 2,
  "notFound": ["98765-zyxwv"]
}
```

---

## 4. Editar múltiplas reflexões

**Método:** PUT  
**URL:** `http://localhost:3000/edicao-registros/reflexoes/usuario/[ID_DO_USUARIO]`  
**Exemplo:** `http://localhost:3000/edicao-registros/reflexoes/usuario/67890-fghij`

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Body (JSON):**
```json
{
  "reflexaoIds": [
    "12345-abcde",
    "54321-edcba",
    "98765-zyxwv"
  ],
  "updateData": {
    "category": "FAMILIA",
    "emotion": "FELIZ"
  }
}
```

**Resposta de Sucesso:**
```json
{
  "message": "2 reflexão(ões) atualizada(s) com sucesso.",
  "updatedCount": 2,
  "notFound": ["98765-zyxwv"]
}
```

---

## Exemplos de Respostas de Erro

### Reflexão não encontrada ou não pertence ao usuário:
```json
{
  "statusCode": 404,
  "message": "Reflexão não encontrada ou não pertence a este usuário."
}
```

### Usuário não encontrado:
```json
{
  "statusCode": 404,
  "message": "Usuário não encontrado."
}
```

### Categoria inválida:
```json
{
  "statusCode": 400,
  "message": "Categoria inválida. Categorias válidas: PESSOAL, TRABALHO, FAMILIA, RELACIONAMENTO, SAUDE, ESTUDOS, OUTROS"
}
```

### Emoção inválida:
```json
{
  "statusCode": 400,
  "message": "Emoção inválida. Emoções válidas: FELIZ, TRISTE, ANSIOSO, CALMO, IRRITADO, ANIMADO, CANSADO, CONFUSO, GRATO, ESTRESSADO"
}
```

---

## Categorias Válidas:
- PESSOAL
- TRABALHO  
- FAMILIA
- RELACIONAMENTO
- SAUDE
- ESTUDOS
- OUTROS

## Emoções Válidas:
- FELIZ
- TRISTE
- ANSIOSO
- CALMO
- IRRITADO
- ANIMADO
- CANSADO
- CONFUSO
- GRATO
- ESTRESSADO

---

## Como Testar no Insomnia:

1. **Criar uma nova Request Collection** chamada "Edição e Exclusão de Reflexões"

2. **Para cada endpoint acima:**
   - Criar uma nova request
   - Definir o método HTTP (PUT ou DELETE)
   - Inserir a URL com IDs reais do banco
   - Adicionar headers se necessário
   - Inserir o body JSON quando aplicável

3. **Ordem de testes recomendada:**
   1. Primeiro criar algumas reflexões usando os endpoints de criação
   2. Testar edição de reflexão individual
   3. Testar edição múltipla
   4. Testar exclusão individual  
   5. Testar exclusão múltipla

4. **Verificar os resultados:**
   - Usar os endpoints de busca para confirmar as alterações
   - Verificar se apenas reflexões do usuário correto são afetadas
   - Testar com IDs inválidos para verificar tratamento de erros