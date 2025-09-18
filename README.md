## Introdução

Faaaaaaala, dev! Parabéns por chegar até aqui! 💜 Chegou a hora de aplicar toda a teoria que você aprendeu até aqui colocando a mão na massa! Este é o momento de transformar conhecimento em ação, desenvolvendo um projeto que vai consolidar suas habilidades e te preparar um pouco mais para os desafios reais!

Vamos lá? 🚀

---

### Descrição

Seu principal objetivo é desenvolver uma API para um sistema Gerenciador de tarefas, onde os usuários podem criar contas, autenticar-se e gerenciar tarefas. As tarefas podem ser atribuídas a membros do time, categorizadas por status e prioridade, e acompanhadas.

### **Tecnologias e Recursos:**

- **Backend Node.js:**
  - Framework: Express.js
  - Banco de dados: PostgreSQL
  - ORM: Prisma
- **Testes:**
  - Framework de testes: Jest
- **Deploy:**
  - Deploy do backend em **Render**.
- **Outros:**
  - Docker
  - TypeScript
  - Validação com Zod
  - JWT

### Funcionalidades da aplicação

**Autenticação e Autorização:**

- Deve ser possível criar uma conta e iniciar uma sessão.
- JWT para autenticação.
- Níveis de acesso:
  - **Administrador**: gerencia usuários e equipes.
  - **Membro**: gerencia tarefas atribuídas.

**Gerenciamento de Times:**

- Apenas o usuário admin pode criar e editar times.
- Apenas o usuário admin pode adicionar ou remover membros do time.

**Tarefas:**

- CRUD de tarefas (criar, ler, atualizar, deletar).
- Status: "Pendente", "Em progresso", "Concluído".
- Prioridade: "Alta", "Média", "Baixa".
- Atribuição de tarefas para membros específicos.

**Usuário Admin:**

- Visualizar e gerenciar todas as tarefas, usuários e times.

**Member:**

- Visualiza tarefas do time
- Pode editar apenas suas tarefas

### Exemplo de estrutura para o banco de dados

---

### **1. Tabela: `users`**

Armazena informações dos usuários do sistema.

| Campo        | Tipo                    | Descrição                  |
| ------------ | ----------------------- | -------------------------- |
| `id`         | INTEGER                 | Unique identifier (PK).    |
| `name`       | VARCHAR(100)            | User's name.               |
| `email`      | VARCHAR(150)            | User's email (unique).     |
| `password`   | VARCHAR(255)            | User's hashed password.    |
| `role`       | ENUM('admin', 'member') | User's access level.       |
| `created_at` | TIMESTAMP               | Creation date and time.    |
| `updated_at` | TIMESTAMP               | Last update date and time. |

---

### **2. Tabela: `teams`**

Representa os times/equipes de trabalho.

| Campo         | Tipo         | Descrição                         |
| ------------- | ------------ | --------------------------------- |
| `id`          | INTEGER      | Unique identifier (PK).           |
| `name`        | VARCHAR(100) | Team's name.                      |
| `description` | TEXT         | Optional description of the team. |
| `created_at`  | TIMESTAMP    | Creation date and time.           |
| `updated_at`  | TIMESTAMP    | Last update date and time.        |

---

### **3. Tabela: `team_members`**

Relaciona usuários com times.

| Campo        | Tipo      | Descrição                           |
| ------------ | --------- | ----------------------------------- |
| `id`         | INTEGER   | Unique identifier (PK).             |
| `user_id`    | INTEGER   | Reference to the user (`users.id`). |
| `team_id`    | INTEGER   | Reference to the team (`teams.id`). |
| `created_at` | TIMESTAMP | Creation date and time.             |

**Relacionamento:**

- `user_id` → FK para `users.id`
- `team_id` → FK para `teams.id`

---

### **4. Tabela: `tasks`**

Armazena as tarefas criadas no sistema.

| Campo         | Tipo                                        | Descrição                                                |
| ------------- | ------------------------------------------- | -------------------------------------------------------- |
| `id`          | INTEGER                                     | Unique identifier (PK).                                  |
| `title`       | VARCHAR(200)                                | Task's title.                                            |
| `description` | TEXT                                        | Optional detailed description of the task.               |
| `status`      | ENUM('pending', 'in_progress', 'completed') | Task's status.                                           |
| `priority`    | ENUM('high', 'medium', 'low')               | Task's priority.                                         |
| `assigned_to` | INTEGER                                     | Reference to the user assigned to the task (`users.id`). |
| `team_id`     | INTEGER                                     | Reference to the team the task belongs to (`teams.id`).  |
| `created_at`  | TIMESTAMP                                   | Creation date and time.                                  |
| `updated_at`  | TIMESTAMP                                   | Last update date and time.                               |

**Relacionamento:**

- `assigned_to` → FK para `users.id`
- `team_id` → FK para `teams.id`

---

### **5. Tabela: `task_history` (opcional)**

Armazena mudanças de status e atualizações das tarefas.

| Campo        | Tipo      | Descrição                                               |
| ------------ | --------- | ------------------------------------------------------- |
| `id`         | INTEGER   | Unique identifier (PK).                                 |
| `task_id`    | INTEGER   | Reference to the task (`tasks.id`).                     |
| `changed_by` | INTEGER   | Reference to the user who made the change (`users.id`). |
| `old_status` | ENUM      | Previous status of the task.                            |
| `new_status` | ENUM      | New status of the task.                                 |
| `changed_at` | TIMESTAMP | Date and time of the change.                            |

**Relacionamento:**

- `task_id` → FK para `tasks.id`
- `changed_by` → FK para `users.id`

---

### **Relacionamentos Resumidos:**

1. **`users` → `teams` via `team_members`.**
2. **`users` → `tasks` via `assigned_to`.**
3. **`teams` → `tasks` via `team_id`.**
4. **`tasks` → `task_history` via `task_id`.**

---

### Outras Ferramentas (opcionais):

- Use https://drawsql.app/ para desenhar e visualizar seu banco de dados
- Crie um README para seu repositório no Github com informações sobre o projeto e como executar o projeto em ambiente local.

## Entrega

Após concluir os exercícios desse desafio, você deve enviar o link do seu código no GitHub para a plataforma.

Após concluir o desafio, se você se sentir confortável, o que acha de postar no LinkedIn contando como foi a sua experiência compartilhando o seu projeto e o seu aprendizado? É uma excelente forma de demonstrar seus conhecimentos e atrair novas oportunidades! 👀

E pode marcar a gente, viu? Vai ser incrível acompanhar toda a sua evolução! 💜

---

## Considerações finais

Lembre-se que o intuito de um desafio é te impulsionar, por isso, dependendo do desafio, pode ser que você precise ir além do que foi discutido em sala de aula. Mas isso não é algo ruim: ter autonomia para buscar informações extras é uma habilidade muito valiosa e vai ser ótimo pra você treinar ela aqui com a gente!

E lembre-se: **tenha calma**! Enfrentar desafios faz parte do seu processo de aprendizado!

Se precisar de alguma orientação ou suporte, estamos aqui com você! Bons estudos e boa prática! 💜

---

<aside> <img src="https://prod-files-secure.s3.us-west-2.amazonaws.com/08f749ff-d06d-49a8-a488-9846e081b224/8a262faf-804f-467d-828c-37c228ac33c9/symbol.svg" alt="https://prod-files-secure.s3.us-west-2.amazonaws.com/08f749ff-d06d-49a8-a488-9846e081b224/8a262faf-804f-467d-828c-37c228ac33c9/symbol.svg" width="40px" /> Feito com 💜 por Rocketseat

</aside>

[**Backlog estruturado em épicos**](https://www.notion.so/Backlog-estruturado-em-picos-22a9513b36df80f3b946f72d4f33c071?pvs=21)

[Passo a Passo](https://www.notion.so/Passo-a-Passo-2719513b36df80a3abdbe5a3ad2187e0?pvs=21)
