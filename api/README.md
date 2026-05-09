# SQA Social Media API

API REST desenvolvida em Spring Boot para gerenciamento de usuários e posts de uma rede social.

## 📋 Sobre o Projeto

Este projeto é uma API backend que oferece:
- **Autenticação de usuários** (signup, signin, reset password)
- **Integração com DummyJSON** para buscar posts mockados
- **Sistema de curtidas** em posts
- **Gerenciamento de posts curtidos** por usuário

A aplicação consome dados de posts da API pública [DummyJSON](https://dummyjson.com/docs) e armazena apenas as curtidas dos usuários no banco de dados.

## 🛠️ Tecnologias Utilizadas

- **Java 17**
- **Spring Boot 3.4.4**
- **Spring Web** - Para criação de APIs REST
- **Spring Data JPA** - Para persistência de dados
- **MySQL** - Banco de dados relacional
- **Jackson** - Para parsing de JSON
- **Maven** - Gerenciador de dependências

## 📦 Dependências

As principais dependências do projeto (definidas no `pom.xml`):

```xml
<!-- Framework web para APIs REST -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- JPA para persistência de dados -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- Driver MySQL para produção -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>

<!-- Parser JSON para consumir APIs externas -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>

<!-- Banco H2 em memória para testes -->
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>test</scope>
</dependency>

<!-- Framework de testes -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

## 🗄️ Banco de Dados

### MySQL (Configuração Padrão)

O projeto está configurado por padrão para usar **MySQL**. São criadas 2 tabelas:

#### `user`
- `id` (PK) - Long, auto incremento
- `email` - String
- `password` - String

#### `user_post_reaction`
- `id` (PK) - Long, auto incremento
- `user_id` - Long (FK para user)
- `post_id` - Long (ID do post do DummyJSON)

### Configuração do MySQL

No arquivo `src/main/resources/application.properties`:

```properties
spring.application.name=demo
spring.datasource.url=jdbc:mysql://localhost:3306/<SEU_BANCO_DE_DADOS>
spring.datasource.username=<SEU_USUARIO_DB>
spring.datasource.password=<SUA_SENHA_DB>
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

**Passo a passo:**
1. Crie um banco de dados no MySQL
2. Substitua `<SEU_BANCO_DE_DADOS>` pelo nome do banco
3. Substitua `<SEU_USUARIO_DB>` pelo usuário do MySQL
4. Substitua `<SUA_SENHA_DB>` pela senha do MySQL

**Exemplo:**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/social_media
spring.datasource.username=root
spring.datasource.password=12345
```

### Migrando para PostgreSQL

Para usar **PostgreSQL** ao invés de MySQL:

#### 1. Alterar dependência no `pom.xml`

Remova:
```xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```

Adicione:
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

#### 2. Alterar `application.properties`

```properties
spring.application.name=demo
spring.datasource.url=jdbc:postgresql://localhost:5432/<SEU_BANCO_DE_DADOS>
spring.datasource.username=<SEU_USUARIO_DB>
spring.datasource.password=<SUA_SENHA_DB>
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

**Exemplo:**
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/social_media
spring.datasource.username=postgres
spring.datasource.password=postgres
```

### Outros Bancos de Dados

O projeto pode ser facilmente adaptado para outros bancos. Exemplos:

**H2 (banco em memória para testes - já configurado no projeto):**
```xml
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>test</scope>  <!-- Apenas para testes -->
</dependency>
```

Para usar H2 em desenvolvimento também (opcional):
```properties
# src/main/resources/application-dev.properties
spring.datasource.url=jdbc:h2:mem:devdb
spring.datasource.driverClassName=org.h2.Driver
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

Execute com: `./mvnw spring-boot:run -Dspring-boot.run.profiles=dev`

**SQL Server:**
```xml
<dependency>
    <groupId>com.microsoft.sqlserver</groupId>
    <artifactId>mssql-jdbc</artifactId>
    <scope>runtime</scope>
</dependency>
```
```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=social_media
```

## Como Rodar o Projeto

### Pré-requisitos

- **Java 17** ou superior instalado
- **Maven** instalado (ou use o wrapper `./mvnw`)
- **MySQL** instalado e rodando (ou outro banco configurado)

### Passos

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd api
```

2. **Configure o banco de dados**

Edite o arquivo `src/main/resources/application.properties` com suas credenciais.

3. **Instale as dependências**
```bash
./mvnw clean install
```
Ou no Windows:
```bash
mvnw.cmd clean install
```

4. **Execute a aplicação**
```bash
./mvnw spring-boot:run
```
Ou no Windows:
```bash
mvnw.cmd spring-boot:run
```

5. **Acesse a API**

A aplicação estará rodando em: `http://localhost:8080`

### Verificar se está rodando

```bash
curl http://localhost:8080/test
```

## 📡 Endpoints Disponíveis

### Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/auth/signup` | Criar nova conta |
| POST | `/auth/signin` | Login |
| POST | `/auth/reset-password` | Resetar senha |

### Posts

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/posts` | Buscar posts (home) |
| GET | `/posts/liked` | Buscar posts curtidos |
| POST | `/posts/{postId}/like` | Curtir/descurtir post |

**Exemplos:**
```bash
# Buscar posts
GET http://localhost:8080/posts?userId=1&limit=10&skip=0

# Posts curtidos
GET http://localhost:8080/posts/liked?userId=1&limit=5

# Curtir post
POST http://localhost:8080/posts/1/like?userId=1
```

## 📁 Estrutura do Projeto

```
api/
├── src/
│   ├── main/
│   │   ├── java/com/demoapp/demo/
│   │   │   ├── config/                     # Configurações (RestTemplate)
│   │   │   ├── controller/                 # Controllers REST (AuthController, PostController)
│   │   │   ├── dto/                        # Data Transfer Objects
│   │   │   ├── model/                      # Entidades JPA (User, UserPostReaction)
│   │   │   ├── repository/                 # Repositórios JPA
│   │   │   ├── service/                    # Lógica de negócio
│   │   │   └── DemoApplication.java        # Classe principal
│   │   └── resources/
│   │       └── application.properties      # Configurações da aplicação
│   └── test/
│       └── java/com/demoapp/demo/
│           ├── service/                    # Testes dos Services
│           │   └── UserServiceTests.java
│           └── DemoApplicationTests.java   # Testes gerais
├── pom.xml                                 # Dependências Maven
└── README.md                               # Documentação
```

### 🧪 Diretório de Testes

O projeto inclui testes unitários que servem como exemplo para os alunos expandirem a cobertura de testes:

#### Testes Existentes:

- **`test/java/com/demoapp/demo/DemoApplicationTests.java`**
  - Testa se o contexto da aplicação Spring Boot carrega corretamente
  - Teste básico de "smoke test"
  
- **`test/java/com/demoapp/demo/service/UserServiceTests.java`**
  - Testes unitários do `UserService`
  - Exemplos de validação de email e senha
  - Usa `@SpringBootTest` para carregar contexto completo

#### Configuração de Testes:

- **`test/resources/application.properties`**
  - Configuração específica para testes
  - Usa banco H2 em memória (não precisa de MySQL)
  - Banco é criado e destruído automaticamente

## 🧪 Executando Testes

O projeto inclui testes unitários como base para os alunos expandirem. Os testes **usam H2 em memória** automaticamente (não precisa de MySQL).

### Executar todos os testes
```bash
./mvnw test
```
Ou no Windows:
```bash
mvnw.cmd test
```

### Executar um teste específico
```bash
./mvnw test -Dtest=UserServiceTests
```

### Executar testes em modo "watch" (reexecuta ao salvar)
```bash
./mvnw spring-boot:test-run
```

### 📊 Banco H2 para Testes (Já Configurado)

O projeto **já está configurado** para usar H2 em memória nos testes! 

**Arquivo:** `src/test/resources/application.properties`
```properties
spring.application.name=demo

# Banco H2 em memória para testes
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# Hibernate
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect
```

**Vantagens:**
- ✅ Testes rodam **sem precisar de MySQL instalado**
- ✅ Banco criado e destruído automaticamente a cada teste
- ✅ Execução **rápida** (tudo em memória)
- ✅ **Isolamento completo** entre testes

**Como funciona:**
- Produção (rodar app): Usa MySQL configurado em `src/main/resources/application.properties`
- Testes: Usa H2 em memória configurado em `src/test/resources/application.properties`

## 📚 Referências

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [DummyJSON API](https://dummyjson.com/docs)
