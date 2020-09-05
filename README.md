# mohdraza.me-be

# routes

#### Public Information Routes

These routes do **_not_** require a JSON token in the header.

| Method | Endpoint              | Access Control | Description      |
| ------ | --------------------- | -------------- | ---------------- |
| POST   | `/api/users/register` | none           | add new user     |
| POST   | `/api/users/login`    | none           | login user       |
| GET    | `/api/projects`       | none           | get all projects |
| POST   | `/api/email`          | none           | send email       |

#### Private Information Routes

| Method | Endpoint                 | Access Control | Description      |
| ------ | ------------------------ | -------------- | ---------------- |
| GET    | `/api/auth/projects`     | Authentication | get all projects |
| POST   | `/api/auth/projects`     | Authentication | add new project  |
| DELETE | `/api/auth/projects/:id` | Authentication | add new project  |
