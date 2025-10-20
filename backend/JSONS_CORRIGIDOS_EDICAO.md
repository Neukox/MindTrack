# 🔄 JSONs Corrigidos para Teste de Edição de Registros

## ⚠️ **ENUMS CORRETOS DO PRISMA**

### **📂 Categorias Válidas:**
- `ESTUDO`
- `PESSOAL` 
- `ESTAGIO`
- `PESQUISA`

### **😊 Emoções Válidas:**
- `ALEGRIA`
- `CALMA`
- `ANSIEDADE`
- `REFLEXAO`
- `MOTIVACAO`
- `TRISTEZA`

---

## 🧪 **JSONs de Teste Corrigidos**

### **1. 🔄 Editar Reflexão Individual (CORRIGIDO)**

**Método:** `PUT`  
**URL:** `http://localhost:3000/edicao-registros/reflexao/cmgwirkij0001wekcrwa9hplg/usuario/cmgwakeho0000weu8r3vl9r3q`

**Body JSON:**
```json
{
  "title": "Reflexão sobre estudos atualizada",
  "category": "ESTUDO",
  "content": "Hoje foi um dia muito produtivo nos estudos. Consegui finalizar o projeto que estava desenvolvendo há semanas e recebi feedback positivo da equipe. Me sinto realizado e motivado para os próximos desafios.",
  "emotion": "MOTIVACAO"
}
```

### **2. 🔄 Atualização Parcial - Apenas Categoria e Emoção**

```json
{
  "category": "PESSOAL",
  "emotion": "ALEGRIA"
}
```

### **3. 🔄 Exemplo para Estágio**

```json
{
  "title": "Reflexão sobre o estágio",
  "category": "ESTAGIO", 
  "content": "Hoje aprendi muito durante o estágio. As atividades foram desafiadoras mas consegui superá-las com ajuda da supervisora.",
  "emotion": "REFLEXAO"
}
```

### **4. 🔄 Exemplo para Pesquisa**

```json
{
  "title": "Avanços na pesquisa",
  "category": "PESQUISA",
  "content": "Consegui coletar dados importantes para minha pesquisa hoje. Os resultados preliminares são promissores.",
  "emotion": "CALMA"
}
```

---

## 📦 **Operações em Lote (Corrigidas)**

### **5. 🔄 Editar Múltiplas Reflexões**

**Método:** `PUT`  
**URL:** `http://localhost:3000/edicao-registros/reflexoes/usuario/cmgwakeho0000weu8r3vl9r3q`

```json
{
  "reflexaoIds": [
    "cmgwirkij0001wekcrwa9hplg",
    "cmgwirkij0002wekcrwa9hplh"
  ],
  "updateData": {
    "category": "ESTUDO",
    "emotion": "MOTIVACAO"
  }
}
```

### **6. 🗑️ Excluir Múltiplas Reflexões**

**Método:** `DELETE`  
**URL:** `http://localhost:3000/edicao-registros/reflexoes/usuario/cmgwakeho0000weu8r3vl9r3q`

```json
{
  "reflexaoIds": [
    "cmgwirkij0003wekcrwa9hpli",
    "cmgwirkij0004wekcrwa9hplj"
  ]
}
```

---

## 🎯 **Cenários de Teste Específicos**

### **Cenário 1: Estudante em Período Acadêmico**
```json
{
  "title": "Preparação para provas",
  "category": "ESTUDO",
  "content": "Estudei durante toda a tarde para as provas da semana que vem. Me sinto preparado mas ainda um pouco ansioso.",
  "emotion": "ANSIEDADE"
}
```

### **Cenário 2: Reflexão Pessoal**
```json
{
  "title": "Autoconhecimento",
  "category": "PESSOAL", 
  "content": "Hoje tive um momento de introspecção importante. Compreendi melhor alguns padrões de comportamento meus.",
  "emotion": "REFLEXAO"
}
```

### **Cenário 3: Experiência de Estágio**
```json
{
  "title": "Primeiro dia no estágio",
  "category": "ESTAGIO",
  "content": "Foi emocionante começar o estágio hoje. A equipe me recebeu muito bem e já consegui contribuir em algumas atividades.",
  "emotion": "ALEGRIA"
}
```

### **Cenário 4: Progresso na Pesquisa**
```json
{
  "title": "Descoberta importante",
  "category": "PESQUISA",
  "content": "Hoje fiz uma descoberta que pode mudar o rumo da minha pesquisa. Estou muito animado com as possibilidades.",
  "emotion": "MOTIVACAO"
}
```

---

## ❌ **Teste de Validação de Erros**

### **Categoria Inválida (vai dar erro):**
```json
{
  "category": "TRABALHO"
}
```
**Erro esperado:** "Categoria inválida. Categorias válidas: ESTUDO, PESSOAL, ESTAGIO, PESQUISA"

### **Emoção Inválida (vai dar erro):**
```json
{
  "emotion": "FELIZ"
}
```
**Erro esperado:** "Emoção inválida. Emoções válidas: ALEGRIA, CALMA, ANSIEDADE, REFLEXAO, MOTIVACAO, TRISTEZA"

---

## 🚀 **Teste Rápido para Você**

**Use este JSON exato com o ID que você tem:**

```json
{
  "title": "Reflexão sobre estudos atualizada",
  "category": "ESTUDO",
  "content": "Hoje foi um dia muito produtivo nos estudos. Consegui finalizar o projeto que estava desenvolvendo há semanas e recebi feedback positivo da equipe. Me sinto realizado e motivado para os próximos desafios.",
  "emotion": "MOTIVACAO"
}
```

**URL:** `PUT http://localhost:3000/edicao-registros/reflexao/cmgwirkij0001wekcrwa9hplg/usuario/cmgwakeho0000weu8r3vl9r3q`

---

## 📋 **Checklist de Testes**

- [ ] ✅ Edição individual com dados válidos
- [ ] ✅ Edição parcial (apenas alguns campos)
- [ ] ✅ Teste com cada categoria (ESTUDO, PESSOAL, ESTAGIO, PESQUISA)
- [ ] ✅ Teste com cada emoção (ALEGRIA, CALMA, ANSIEDADE, REFLEXAO, MOTIVACAO, TRISTEZA)
- [ ] ✅ Edição em lote
- [ ] ✅ Exclusão individual
- [ ] ✅ Exclusão em lote
- [ ] ❌ Teste de erro com categoria inválida
- [ ] ❌ Teste de erro com emoção inválida