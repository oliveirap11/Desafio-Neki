# 📊 **MODELAGEM DO BANCO DE DADOS - SISTEMA SKILL**

## 🗄️ **Arquivo de Script SQL**

**Arquivo:** `SistemaSkill.sql`  
**Localização:** Raiz do projeto  
**Banco:** PostgreSQL  

## 🎯 **Estrutura Implementada**

### **📋 Tabelas Criadas:**

1. **`usuario`** - Dados dos usuários do sistema
2. **`skill`** - Habilidades/tecnologias disponíveis  
3. **`usuario_skill`** - Relacionamento usuário ↔ skill (associativa)

### **🔧 Sequences Criadas:**

1. **`seq_usuario`** - Auto increment para tabela usuario
2. **`seq_skill`** - Auto increment para tabela skill  
3. **`seq_usuario_skill`** - Auto increment para tabela usuario_skill

### **🛡️ Constraints Implementadas:**

**Primary Keys:**
- `pk_usuario` - Chave primária da tabela usuario
- `pk_skill` - Chave primária da tabela skill
- `pk_usuario_skill` - Chave primária da tabela usuario_skill

**Unique Constraints:**
- `uk_usuario_email` - Email único por usuário
- `uk_skill_nome` - Nome único por skill
- `uk_usuario_skill_unique` - Evita duplicação usuário+skill

**Foreign Keys:**
- `fk_usuario_skill_usuario` - Referência para usuario
- `fk_usuario_skill_skill` - Referência para skill

**Check Constraints:**
- `ck_usuario_nome_not_empty` - Nome não pode ser vazio
- `ck_usuario_email_format` - Validação formato de email
- `ck_usuario_senha_length` - Senha mínimo 6 caracteres
- `ck_skill_nome_not_empty` - Nome da skill não vazio
- `ck_skill_imagem_url_not_empty` - URL da imagem obrigatória
- `ck_usuario_skill_level_range` - Level entre 1 e 10

## 🚀 **Como Executar o Script**

### **1. Pré-requisitos:**
```bash
- PostgreSQL 12+ instalado
- Usuário com privilégios de criação
- Banco de dados criado (ex: sistemaskill)
```

### **2. Execução via psql:**
```bash
# Conectar ao PostgreSQL
psql -h localhost -U postgres -d sistemaskill

# Executar o script
\i SistemaSkill.sql

# Ou via linha de comando
psql -h localhost -U postgres -d sistemaskill -f SistemaSkill.sql
```

### **3. Execução via pgAdmin:**
```
1. Abrir pgAdmin
2. Conectar ao servidor PostgreSQL
3. Selecionar o banco de dados
4. Ir em Tools > Query Tool
5. Abrir o arquivo SistemaSkill.sql
6. Executar (F5)
```

## 📊 **Dados Iniciais Incluídos**

### **Skills Pré-cadastradas (25 tecnologias):**
- **Frontend:** JavaScript, TypeScript, React, Vue.js, Angular, HTML5, CSS3, Sass
- **Mobile:** React Native, Flutter, Swift, Kotlin
- **Backend:** Node.js, Python, Java, Spring Boot, Express.js, C#, .NET
- **Banco:** PostgreSQL, MySQL, MongoDB
- **DevOps:** Docker, Git, AWS

## 🎯 **Benefícios da Modelagem**

### **✅ Integridade de Dados:**
- Constraints garantem dados consistentes
- Foreign keys mantêm relacionamentos íntegros
- Check constraints validam regras de negócio

### **✅ Manutenibilidade:**
- Código SQL bem documentado
- Estrutura clara e organizada
- Comentários explicativos em tabelas/campos

### **✅ Escalabilidade:**
- Prepared para crescimento de dados
- Estrutura flexível para novas features
- Relacionamentos bem definidos

**✅ O script SQL está completo e pronto para uso em produção!**  
**📊 Todas as especificações do requisito foram atendidas:**  
- ✅ Modelagem completa com constraints corretas
- ✅ Script salvo como SistemaSkill.sql no repositório  
- ✅ Sequences criadas para todas as tabelas
- ✅ IDs usando sequences configuradas
- ✅ Entidades Java atualizadas para usar sequences
