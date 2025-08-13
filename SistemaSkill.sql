-- =====================================================
-- SISTEMA DE SKILLS - MODELAGEM DO BANCO DE DADOS
-- =====================================================
-- Projeto: Desafio Técnico Neki
-- Descrição: Sistema para gerenciamento de habilidades técnicas dos usuários
-- Versão: 1.0
-- Data: 13/08/2025

-- =====================================================
-- CRIAÇÃO DAS SEQUENCES PARA AUTO INCREMENT
-- =====================================================

-- Sequence para tabela Usuario
CREATE SEQUENCE seq_usuario
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Sequence para tabela Skill
CREATE SEQUENCE seq_skill
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Sequence para tabela UsuarioSkill (associativa)
CREATE SEQUENCE seq_usuario_skill
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- =====================================================
-- CRIAÇÃO DAS TABELAS
-- =====================================================

-- Tabela USUARIO
-- Armazena informações dos usuários do sistema
CREATE TABLE usuario (
    id BIGINT NOT NULL DEFAULT nextval('seq_usuario'),
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints da tabela
    CONSTRAINT pk_usuario PRIMARY KEY (id),
    CONSTRAINT uk_usuario_email UNIQUE (email),
    
    -- Validações de campo
    CONSTRAINT ck_usuario_nome_not_empty CHECK (LENGTH(TRIM(nome)) > 0),
    CONSTRAINT ck_usuario_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT ck_usuario_senha_length CHECK (LENGTH(senha) >= 6)
);

-- Tabela SKILL
-- Armazena as habilidades/tecnologias disponíveis no sistema
CREATE TABLE skill (
    id BIGINT NOT NULL DEFAULT nextval('seq_skill'),
    nome VARCHAR(100) NOT NULL,
    imagem_url VARCHAR(500) NOT NULL,
    descricao VARCHAR(500),
    
    -- Constraints da tabela
    CONSTRAINT pk_skill PRIMARY KEY (id),
    CONSTRAINT uk_skill_nome UNIQUE (nome),
    
    -- Validações de campo
    CONSTRAINT ck_skill_nome_not_empty CHECK (LENGTH(TRIM(nome)) > 0),
    CONSTRAINT ck_skill_imagem_url_not_empty CHECK (LENGTH(TRIM(imagem_url)) > 0)
);

-- Tabela USUARIO_SKILL (Associativa)
-- Relaciona usuários com suas habilidades e níveis de conhecimento
CREATE TABLE usuario_skill (
    id BIGINT NOT NULL DEFAULT nextval('seq_usuario_skill'),
    usuario_id BIGINT NOT NULL,
    skill_id BIGINT NOT NULL,
    level INTEGER NOT NULL,
    
    -- Constraints da tabela
    CONSTRAINT pk_usuario_skill PRIMARY KEY (id),
    CONSTRAINT uk_usuario_skill_unique UNIQUE (usuario_id, skill_id),
    
    -- Foreign Keys
    CONSTRAINT fk_usuario_skill_usuario 
        FOREIGN KEY (usuario_id) 
        REFERENCES usuario(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    
    CONSTRAINT fk_usuario_skill_skill 
        FOREIGN KEY (skill_id) 
        REFERENCES skill(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    
    -- Validações de negócio
    CONSTRAINT ck_usuario_skill_level_range CHECK (level >= 1 AND level <= 10)
);


-- =====================================================
-- INSERÇÃO DE DADOS INICIAIS (SKILLS)
-- =====================================================

-- Skills de desenvolvimento web e mobile
INSERT INTO skill (nome, imagem_url, descricao) VALUES
('JavaScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', 'Linguagem de programação para desenvolvimento web frontend e backend'),
('TypeScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', 'Superset do JavaScript que adiciona tipagem estática'),
('React', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 'Biblioteca JavaScript para criação de interfaces de usuário'),
('React Native', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 'Framework para desenvolvimento de aplicações mobile'),
('Vue.js', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', 'Framework JavaScript progressivo para construção de UIs'),
('Angular', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg', 'Framework TypeScript para desenvolvimento de aplicações web'),
('Node.js', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', 'Runtime JavaScript para desenvolvimento backend'),
('Python', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', 'Linguagem de programação versátil e poderosa'),
('Java', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', 'Linguagem de programação orientada a objetos'),
('Spring Boot', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', 'Framework Java para desenvolvimento de aplicações'),
('PostgreSQL', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', 'Sistema de gerenciamento de banco de dados relacional'),
('MySQL', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', 'Sistema de gerenciamento de banco de dados'),
('MongoDB', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', 'Banco de dados NoSQL orientado a documentos'),
('Docker', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', 'Plataforma de containerização de aplicações'),
('Git', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', 'Sistema de controle de versão distribuído'),
('HTML5', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', 'Linguagem de marcação para estruturação de páginas web'),
('CSS3', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', 'Linguagem de estilos para páginas web'),
('Sass', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg', 'Pré-processador CSS com funcionalidades avançadas'),
('Express.js', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', 'Framework web minimalista para Node.js'),
('Flutter', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', 'Framework Google para desenvolvimento mobile'),
('Swift', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg', 'Linguagem de programação da Apple para iOS/macOS'),
('Kotlin', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg', 'Linguagem de programação moderna para desenvolvimento Android'),
('C#', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', 'Linguagem de programação da Microsoft'),
('.NET', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg', 'Framework de desenvolvimento da Microsoft'),
('AWS', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', 'Plataforma de computação em nuvem da Amazon');

-- =====================================================
-- INSTRUÇÕES PARA USO
-- =====================================================

/*
INSTRUÇÕES DE USO DO SCRIPT:

1. EXECUÇÃO:
   - Execute este script em um banco PostgreSQL limpo
   - Certifique-se de ter privilégios de criação de tabelas e sequences

2. CONFIGURAÇÃO DA APLICAÇÃO:
   - Ajuste a connection string no application.properties
   - Configure o usuário do banco com as permissões adequadas

3. DADOS INICIAIS:
   - O script inclui 25 skills populares pré-cadastradas
   - Um usuário administrador é criado para testes iniciais


-- =====================================================
-- FIM DO SCRIPT
-- =====================================================
