## 📚 GoodPages – Social Network for Books (Backend)

GoodPages là **backend service** cho một nền tảng mạng xã hội dành cho người yêu sách. 
Dự án tập trung vào việc xây dựng **API sạch, bảo mật, dễ mở rộng**, hỗ trợ đầy đủ cho các tính năng của một cộng đồng đọc sách hiện đại.

> **Mục tiêu**: Cung cấp nền tảng backend vững chắc để dễ dàng phát triển các ứng dụng web / mobile phục vụ review sách, gợi ý sách, quản lý thư viện cá nhân, và tương tác giữa các độc giả.

---

## 🧩 Tóm tắt tính năng

- **Xác thực & phân quyền hiện đại**
  - Đăng ký, đăng nhập, đổi mật khẩu bằng JWT.
  - Phân quyền theo vai trò (`ADMIN`, `AUTHOR`, `READER`).
- **Quản lý sách toàn diện**
  - CRUD sách, soft-delete, quản lý trạng thái (`DRAFT`, `PUBLISHED`, `ARCHIVED`).
  - Quản lý ISBN, thông tin xuất bản, format sách, thống kê rating / reviews.
  - Quan hệ many–to–many với tác giả và thể loại.
- **Tìm kiếm & phân trang**
  - Tìm kiếm sách với keyword, filter nâng cao, sort theo nhiều tiêu chí.
  - Phân trang có `meta` rõ ràng, tối ưu cho UI.
- **Seed dữ liệu demo**
  - Tự động seed roles, users, genres, authors, books để demo nhanh.
- **Hỗ trợ Docker đầy đủ**
  - Dev environment gần giống production với `Dockerfile` + `docker-compose`.

---

## 🛠️ Tech Stack

- **Runtime & Framework**
  - Node.js (v18+).
  - Express 5.1.0.
  - TypeScript 5.9.3.

- **Database & ORM**
  - MySQL / MariaDB.
  - Prisma 7.0.1 (`@prisma/client`, `@prisma/adapter-mariadb`).

- **Auth & Security**
  - Passport.js, passport-jwt.
  - jsonwebtoken (JWT signing & verify).
  - bcrypt (hash & so sánh mật khẩu).

- **Validation & Upload**
  - Zod – schema validation cho body / query.
  - Multer – upload ảnh bìa sách.

- **Dev Tools**
  - ts-node-dev – chạy môi trường dev với hot reload.
  - TypeScript – type checking & build.

---

## 📁 Cấu trúc dự án

```text
GoodPages/
├── prisma/
│   ├── migrations/              # Các migration của Prisma
│   └── schema.prisma            # Khai báo models, enums, quan hệ DB
├── src/
│   ├── app.ts                   # Entry point của ứng dụng Express
│   ├── configs/                 # Cấu hình hệ thống
│   │   ├── multer.config.ts     # Cấu hình Multer upload ảnh
│   │   ├── passport.config.ts   # Khởi tạo Passport + strategy
│   │   ├── passport.jwt.config.ts # Cấu hình JWT strategy
│   │   ├── prisma.client.config.ts # Tạo PrismaClient với MariaDB adapter
│   │   └── seed.ts              # Script seed dữ liệu (roles, users, authors, genres, books)
│   ├── constants/               # Hằng số dùng chung
│   │   ├── httpStatus.constanst.ts
│   │   └── message.constants.ts
│   ├── controllers/             # Xử lý request / response
│   │   ├── auth.controller.ts
│   │   └── book.controller.ts
│   ├── mappers/                 # Map dữ liệu giữa layer & DTO
│   │   ├── auth.mapper.ts
│   │   ├── book.mapper.ts
│   │   └── rest-response.mapper.ts
│   ├── middlewares/             # Middleware Express
│   │   ├── auth.middleware.ts   # Validate auth + check role
│   │   └── book.middleware.ts   # Validate book payload & search query
│   ├── responseDtos/            # Định nghĩa DTO trả về
│   │   ├── auth.dto.ts
│   │   ├── book.dto.ts
│   │   ├── meta.dto.ts
│   │   └── rest-response.dto.ts
│   ├── routers/                 # Khai báo routes & mount vào app
│   │   ├── auth.route.ts
│   │   ├── book.route.ts
│   │   └── router.ts            # Gắn `/auth`, `/books` vào Express app
│   ├── services/                # Business logic, thao tác DB
│   │   ├── auth.service.ts
│   │   ├── book.service.ts
│   │   └── user.service.ts
│   ├── utils/                   # Hàm tiện ích
│   │   ├── bcrypt.util.ts
│   │   ├── jwt.util.ts
│   │   └── time.utils.ts
│   ├── validations/             # Zod schemas cho validation
│   │   ├── auth.schema.ts
│   │   └── book.schema.ts
│   └── type.d.ts                # Kiểu dữ liệu mở rộng (UserWithRole, RestResponse, JwtPayload, ...)
├── package.json
├── tsconfig.json
└── README.md
```

Kiến trúc được tổ chức theo **layer** rõ ràng: `router → middleware → controller → service → Prisma (DB)`.

---

## 🚀 Cài đặt & Chạy dự án (Local)

### 1. Yêu cầu hệ thống

- Node.js: v18 hoặc cao hơn.
- MySQL / MariaDB (local hoặc remote).
- npm (hoặc yarn nếu tự cấu hình).

### 2. Clone source code

```bash
git clone <repository-url>
cd GoodPages-books-commnunity
```

### 3. Cài dependencies

```bash
npm install
```

### 4. Cấu hình môi trường

Ứng dụng sử dụng `prisma.client.config.ts` với MariaDB adapter, đọc cấu hình DB từ biến môi trường:

```ts
// prisma.client.config.ts (trích)
host: process.env.DATABASE_HOST,
user: process.env.DATABASE_USER,
password: process.env.DATABASE_PASSWORD,
database: process.env.DATABASE_NAME,
port: Number(process.env.DATABASE_PORT) || 3308,
```

Tạo file `.env` ở thư mục gốc:

```env
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=goodpages
```

> Lưu ý: JWT hiện tại đang dùng secret **hard-code** là `"duyphuongz"` trong `jwt.util.ts` và `passport.jwt.config.ts`. Có thể cải tiến đọc từ `.env` khi lên production.

### 5. Chạy migration & generate Prisma Client

```bash
npx prisma migrate dev
npx prisma generate
```

### 6. Seed dữ liệu (khuyến nghị)

Seed sẽ:

- Xoá toàn bộ dữ liệu cũ (theo thứ tự tránh lỗi foreign key).
- Reset auto-increment các bảng chính (`Role`, `User`, `Genre`, `Author`, `Book`, `Review`).
- Seed:
  - Roles: `ADMIN`, `AUTHOR`, `READER`.
  - Users: `admin`, `author1`, `reader1`.
  - Genres (các thể loại sách phổ biến).
  - Authors (một số tác giả mẫu).
  - Một số sách mẫu với quan hệ authors + genres.

Seed được gọi **tự động** trong `app.ts` thông qua `seed()` mỗi lần khởi động server:

```ts
// app.ts (trích)
seed();
```

Nếu muốn chạy seed độc lập:

```bash
ts-node src/configs/seed.ts
```

#### Tài khoản demo sau khi seed

> Mật khẩu các tài khoản seed **chưa được mã hoá** trong DB (phục vụ demo / dev, KHÔNG dùng cho production).

| Username | Password | Role   |
|----------|----------|--------|
| admin    | 123456   | ADMIN  |
| author1  | 123456   | AUTHOR |
| reader1  | 123456   | READER |

### 7. Chạy server

```bash
npm run dev
```

Mặc định server chạy tại: `http://localhost:3000`.

---

## 🐳 Chạy bằng Docker & docker-compose

Dự án đã được **container hoá** với Docker, giúp khởi chạy môi trường dev/preview cực nhanh.

### 1. Thành phần chính

- **Dockerfile**
  - Base image: `node:22-alpine`.
  - `WORKDIR /app`.
  - Copy `package*.json` và `npm install`.
  - Copy toàn bộ source code.
  - `EXPOSE 3000`.
  - `CMD ["npm", "run", "dev"]`.

- **.dockerignore**
  - Bỏ qua `node_modules`, `dist`, `.git`, log… để image nhỏ gọn.

- **docker-compose.yml**
  - Service `api`:
    - `build: .` – sử dụng Dockerfile ở root.
    - `ports: "3000:3000"`.
    - Dùng `env_file: .env` + `environment` để ánh xạ biến môi trường DB.
    - Mount `.:/app` (sync code với host) và `/app/node_modules` (cài node_modules trong container).
    - `depends_on: mysql`.
  - Service `mysql`:
    - Image: `mysql:8`.
    - `ports: "3307:3306"` – có thể connect từ ngoài qua cổng 3307.
    - Dùng biến môi trường: `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD`.
    - Volume `mysql_data` để giữ data.

### 2. Chuẩn bị `.env` cho Docker

```env
# Cho API (Prisma adapter)
DATABASE_HOST=mysql
DATABASE_PORT=3306
DATABASE_USER=admin
DATABASE_PASSWORD=12345
DATABASE_NAME=goodpages_db

# Cho MySQL container
MYSQL_ROOT_PASSWORD=root_password
MYSQL_DATABASE=goodpages_db
MYSQL_USER=admin
MYSQL_PASSWORD=12345
```

Trong `docker-compose.yml` có sẵn `DATABASE_URL` mẫu:

```text
mysql://admin:12345@mysql:3306/goodpages_db
```

### 3. Chạy dự án bằng Docker – 3 bước

**Bước 1 – Build & khởi động toàn bộ stack**

```bash
docker-compose up --build
```

- API: `http://localhost:3000`
- MySQL: `localhost:3307`

**Bước 2 – Chạy migration & generate Prisma bên trong container**

```bash
docker-compose exec api npx prisma migrate dev
docker-compose exec api npx prisma generate
```

**Bước 3 – Seed dữ liệu (tuỳ chọn)**

```bash
docker-compose exec api ts-node src/configs/seed.ts
```

Sau 3 bước, bạn đã có:

- API chạy trong container Node.
- MySQL 8 chạy trong container riêng, có volume persist data.
- Schema DB đã migrate + có sẵn data demo.

---

## 📡 Thiết kế API (Tổng quan)

### 1. Chuẩn `RestResponse`

Tất cả response đều được chuẩn hoá qua `RestResponse`:

```json
{
  "statusCode": 200,
  "isSuccess": true,
  "message": "MESSAGE",
  "data": {},
  "error": null
}
```

### 2. Nhóm Authentication (`/auth`)

Base path: `/auth`

| Method | Endpoint                | Mô tả                 | Auth | Ghi chú                         |
|--------|-------------------------|-----------------------|------|---------------------------------|
| POST   | `/auth/sign-up`         | Đăng ký tài khoản     | ❌   | Validate bằng `signUpSchema`    |
| POST   | `/auth/sign-in`         | Đăng nhập             | ❌   | Validate bằng `signInSchema`    |
| POST   | `/auth/change-password` | Đổi mật khẩu          | ✅   | JWT + `changePasswordSchema`    |

**Ví dụ payload – `POST /auth/sign-in`**

```json
{
  "username": "reader1",
  "password": "Abc@1234"
}
```

Response trả về gồm:

- Thông tin user (kèm role).
- `accessToken` (hết hạn sau 1 ngày).
- `refreshToken` (hết hạn sau 7 ngày).

### 3. Nhóm Books (`/books`)

Base path: `/books`

| Method | Endpoint           | Mô tả                                 | Auth | Role   |
|--------|--------------------|---------------------------------------|------|--------|
| GET    | `/books/homepage` | Lấy danh sách sách cho trang chủ     | ❌   | -      |
| GET    | `/books`          | Lấy danh sách sách (phân trang)      | ❌   | -      |
| GET    | `/books/search`   | Tìm kiếm sách nâng cao               | ❌   | -      |
| POST   | `/books`          | Tạo sách mới                         | ✅   | ADMIN  |
| PUT    | `/books/:bookId`  | Cập nhật thông tin sách              | ✅   | ADMIN  |
| DELETE | `/books/:bookId`  | Archive (đánh dấu xoá) một cuốn sách | ✅   | ADMIN  |

**Ví dụ – GET `/books/search`**

```http
GET /books/search?keyword=harry&page=1&limit=10&sort=asc&searchByTarget=title&sortByTarget=title&bookStatus=PUBLISHED
```

---

## 🗄️ Database Schema (Prisma – Tóm tắt)

Các model chính trong `schema.prisma`:

- **User**
  - Fields: `id`, `username`, `email`, `password`, `bio`, `avatarUrl`, `roleId`, timestamps.
  - Quan hệ: `authorProfile`, `reviews`, `favorites`, `role`.
- **Role**
  - Enum `RoleName`: `ADMIN`, `READER`, `AUTHOR`.
  - Bảng role chứa mô tả và danh sách users.
- **Book**
  - Trường: `title`, `description`, `publishDate`, `language`, `pageCount`, `isbn10`, `isbn13`, `publisher`, `format`, `coverImageUrl`.
  - Thống kê: `averageRating`, `ratingsCount`, `reviewsCount`.
  - Quan hệ: `authors`, `genres`, `reviews`, `favoritedBy`.
  - Enum `BookStatus`: `DRAFT`, `PUBLISHED`, `ARCHIVED`.
- **Author**
  - Thông tin tác giả + quan hệ với `User` (optional) & `Book[]`.
- **Genre**
  - Tên thể loại, mô tả, quan hệ many–to–many với `Book`.
- **Favorite**
  - Khoá chính: `@@id([userId, bookId])`.
- **Review**
  - `title`, `content`, `rating`, `hasSpoiler`, timestamps.
  - Constraint: `@@unique([userId, bookId])` – mỗi user chỉ review 1 lần / sách.

Enums chính:

- **BookFormat**: `HARDCOVER`, `PAPERBACK`, `EBOOK`, `AUDIOBOOK`.
- **BookStatus**: `DRAFT`, `PUBLISHED`, `ARCHIVED`.

---

## 🔒 Authentication & Authorization (Chi tiết)

- **JWT payload**:

```json
{
  "username": "admin",
  "role": "ADMIN"
}
```

- JWT được ký bằng `signToken(payload, expiresIn)` với:
  - Secret: `"duyphuongz"`.
  - `issuer`: `"goodpages"`.
  - `audience`: `"user"`.
  - `expiresIn`: `"1d"` cho access token, `"7d"` cho refresh token.

- **Passport JWT Strategy**
  - Lấy token từ header `Authorization: Bearer <token>`.
  - Decode, lấy `username`, tìm `User` trong DB.
  - Gắn `req.user = { username, email, role }`.

- **Middlewares role**
  - `isAdmin`: chỉ cho phép nếu `role === "ADMIN"`.
  - `isAuthor`: `role === "AUTHOR"`.
  - `isUser`: `role === "READER"`.

---

## 🧱 Kiến trúc & Best Practices

- **Layered Architecture**
  - Rõ ràng giữa các layer: Router → Middleware → Controller → Service → Repository (Prisma).
- **DTO & Mapper Pattern**
  - Sử dụng DTO (`responseDtos`) + `mappers` để chuẩn hoá dữ liệu trả về cho client.
- **Middleware-driven Validation**
  - Mọi request quan trọng đều đi qua Zod schema trước khi vào controller.
- **Type-safe**
  - TypeScript + Prisma Client mang lại type mạnh, giảm thiểu bug runtime.

---

## 🧭 Định hướng phát triển

- Bổ sung API cho:
  - Review / rating chi tiết.
  - Favorite / bookshelf cá nhân.
  - Social features (follow user, comment, activity feed,...).
- Tách JWT secret, config bảo mật ra `.env`, chuẩn bị cho môi trường production.
- Xây dựng bộ test (unit / integration) cho core services.

---

## 🙋‍♂️ Tác giả

- **Tên**: duyphuongz  
- **Vai trò**: Backend Developer – yêu sách, thích xây hệ thống rõ ràng, dễ mở rộng.

---

## 📄 License

Project được phát hành dưới giấy phép **ISC**.

---

**Ghi chú**: Dự án vẫn đang trong quá trình hoàn thiện; một số tính năng (review, favorite, profile UI, v.v.) có thể chưa được expose đầy đủ qua API hoặc còn đang phát triển.
