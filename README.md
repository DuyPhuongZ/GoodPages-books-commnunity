## 📚 GoodPages – Social Network for Books (Backend)

GoodPages là **backend service** cho một nền tảng mạng xã hội dành cho người yêu sách, cho phép:

- **Đăng ký / đăng nhập / đổi mật khẩu** với JWT.
- **Quản lý sách, tác giả, thể loại** với quan hệ many–to–many.
- **Tìm kiếm, phân trang, lọc sách** theo nhiều tiêu chí.
- **Phân quyền theo vai trò (Role-based Authorization)**: `ADMIN`, `AUTHOR`, `READER`.
- **Seed dữ liệu mẫu** (roles, users, authors, genres, books) để demo nhanh.

---

## ✨ Tính năng chính

### 🔐 Xác thực & Phân quyền

- Đăng ký tài khoản mới với username, email, password.
- Đăng nhập bằng username + password, trả về **Access Token** và **Refresh Token**.
- Đổi mật khẩu (yêu cầu đăng nhập, xác thực JWT).
- Phân quyền theo vai trò:
  - `ADMIN`: quản trị hệ thống, CRUD sách.
  - `AUTHOR`: tài khoản tác giả (mở rộng sau).
  - `READER`: người dùng đọc sách.

### 📖 Quản lý sách (Books)

- Xem danh sách sách với **phân trang**.
- Xem sách cho **trang chủ** (homepage) với meta paging.
- **Tạo / cập nhật / xóa (soft-delete)** sách (role `ADMIN`).
- Upload ảnh bìa sách thông qua `multer` (hiện tại lưu local và xóa sau khi xử lý).
- Mỗi sách có:
  - Thông tin cơ bản: `title`, `description`, `publishDate`, `language`, `pageCount`.
  - ISBN: `isbn10`, `isbn13`.
  - Publisher, `format` (`BookFormat` enum).
  - Thống kê: `averageRating`, `ratingsCount`, `reviewsCount`.
  - Quan hệ nhiều–nhiều với `Author`, `Genre`.

### 🔍 Tìm kiếm & Lọc

- Endpoint **search book** với:
  - `keyword`, `page`, `limit`.
  - `sort` (`asc` / `desc`).
  - `searchByTarget`, `sortByTarget` (title, author, publishDate, isbn10, isbn13, rating, reviews, genres).
  - `bookStatus` (`DRAFT`, `PUBLISHED`, `ARCHIVED`).
- Trả về dữ liệu + `meta` (phân trang).

### 👤 Người dùng, Tác giả, Thể loại (trong DB)

- `User`:
  - Username, email, password (hash bằng **bcrypt** khi sign up / change password).
  - Avatar, bio, role.
  - Quan hệ với `Review`, `Favorite`, `Author`.
- `Author`:
  - Tên, bio, ảnh, quan hệ one-to-one (optional) với `User` để claim profile.
- `Genre`:
  - Tên thể loại, mô tả, quan hệ many–to–many với `Book`.
- `Review` & `Favorite`:
  - `Review`: mỗi user chỉ review 1 lần cho mỗi sách.
  - `Favorite`: primary key là `(userId, bookId)`.

---

## 🛠️ Tech Stack

- **Runtime & Framework**
  - **Node.js** (v18+).
  - **Express 5.1.0** – web framework.
  - **TypeScript 5.9.3**.

- **Database & ORM**
  - **MySQL / MariaDB**.
  - **Prisma 7.0.1** (`@prisma/client`, `@prisma/adapter-mariadb`).

- **Auth & Security**
  - **Passport.js**, **passport-jwt** – JWT strategy.
  - **jsonwebtoken** – ký & verify JWT.
  - **bcrypt** – hash & so sánh mật khẩu.

- **Validation & Upload**
  - **Zod** – schema validation cho body / query.
  - **Multer** – upload file (ảnh bìa sách).

- **Dev Tools**
  - **ts-node-dev** – chạy dev với hot reload.
  - **TypeScript** – type checking & build.

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
│   ├── generated/
│   │   └── prisma/              # Prisma Client & enums được generate
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

---

## 🚀 Cài đặt & Chạy dự án

### 1. Yêu cầu hệ thống

- **Node.js**: v18 hoặc cao hơn.
- **MySQL / MariaDB** đang chạy (local hoặc remote).
- **npm** (hoặc **yarn** nếu bạn muốn tự cấu hình).

### 2. Clone source code

```bash
git clone <repository-url>
cd GoodPages-books-commnunity   # hoặc tên folder bạn đặt
```

### 3. Cài dependencies

```bash
npm install
```

### 4. Cấu hình môi trường

Ứng dụng đang sử dụng `prisma.client.config.ts` với **MariaDB adapter**, đọc cấu hình DB từ biến môi trường:

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

> Lưu ý: JWT hiện tại đang dùng secret **hard-code** là `"duyphuongz"` trong `jwt.util.ts` và `passport.jwt.config.ts` (có thể nâng cấp sau để đọc từ `.env`).

### 5. Chạy migration & generate Prisma Client

```bash
npx prisma migrate dev
npx prisma generate
```

### 6. Seed dữ liệu (tuỳ chọn nhưng khuyến nghị)

Seed sẽ:

- Xoá toàn bộ dữ liệu cũ (theo đúng thứ tự tránh lỗi foreign key).
- Reset auto-increment các bảng chính (`role`, `User`, `Genre`, `Author`, `Book`, `review`).
- Seed:
  - Roles: `ADMIN`, `AUTHOR`, `READER`.
  - Users: `admin`, `author1`, `reader1`.
  - Genres (10 thể loại phổ biến).
  - Authors (5 tác giả).
  - 6 cuốn sách mẫu với quan hệ authors + genres.

Seed được gọi **tự động** trong `app.ts` thông qua `seed()` mỗi lần khởi động server, nên khi chạy `npm run dev` lần đầu, DB sẽ được reset + seed:

```ts
// app.ts (trích)
seed();
```

Nếu muốn chạy seed độc lập:

```bash
ts-node src/configs/seed.ts
```

### 7. Chạy server

```bash
npm run dev
```

Mặc định server chạy tại: `http://localhost:3000`.

---

## 📡 API Design

### 1. Chuẩn RestResponse

Tất cả response đều được chuẩn hoá thông qua `RestResponse` + `responseMapper`, với cấu trúc:

```json
{
  "statusCode": 200,
  "isSuccess": true,
  "message": "MESSAGE",
  "data": { /* payload */ },
  "error": null
}
```

### 2. Authentication (`/auth`)

Base path: `/auth`

| Method | Endpoint              | Mô tả                     | Auth | Ghi chú |
|--------|-----------------------|---------------------------|------|--------|
| POST   | `/auth/sign-up`       | Đăng ký tài khoản mới     | ❌   | Validate bằng `signUpSchema` |
| POST   | `/auth/sign-in`       | Đăng nhập                 | ❌   | Validate bằng `signInSchema` |
| POST   | `/auth/change-password` | Đổi mật khẩu            | ✅   | `passport.authenticate("jwt")` + `changePasswordSchema` |

**Request body – `POST /auth/sign-up`**

```json
{
  "username": "reader1",
  "email": "reader1@example.com",
  "password": "Abc@1234",
  "confirmPassword": "Abc@1234"
}
```

**Request body – `POST /auth/sign-in`**

```json
{
  "username": "reader1",
  "password": "Abc@1234"
}
```

**Request body – `POST /auth/change-password`**  
Yêu cầu header:

```http
Authorization: Bearer <access_token>
```

Body:

```json
{
  "oldPassword": "Abc@1234",
  "newPassword": "Xyz@1234",
  "confirmNewPassword": "Xyz@1234"
}
```

Response cho `sign-in` / `sign-up` bao gồm:

- Thông tin user (kèm role).
- `accessToken` (hết hạn sau 1 ngày).
- `refreshToken` (hết hạn sau 7 ngày).

### 3. Books (`/books`)

Base path: `/books`

| Method | Endpoint           | Mô tả                                  | Auth | Role   |
|--------|--------------------|----------------------------------------|------|--------|
| GET    | `/books/homepage` | Lấy danh sách sách cho trang chủ      | ❌   | -      |
| GET    | `/books`          | Lấy danh sách sách (phân trang)       | ❌   | -      |
| GET    | `/books/search`   | Tìm kiếm sách với filter nâng cao     | ❌   | -      |
| POST   | `/books`          | Tạo sách mới                          | ✅   | ADMIN  |
| PUT    | `/books/:bookId`  | Cập nhật thông tin sách               | ✅   | ADMIN  |
| DELETE | `/books/:bookId`  | Archive (đánh dấu xoá) một cuốn sách  | ✅   | ADMIN  |

#### 3.1. GET `/books`

**Query params:**

- `page`: số trang (mặc định `1`, trong code sử dụng `page - 1` để tính offset).
- `limit`: số bản ghi mỗi trang (mặc định `10`).

Ví dụ:

```http
GET /books?page=1&limit=10
```

#### 3.2. GET `/books/search`

Validate bằng `searchBookSchema`.

**Query params chính:**

- `keyword`: chuỗi tìm kiếm (optional, mặc định `""`).
- `page`: trang hiện tại (bắt buộc, dạng string, ví dụ `"1"`).
- `limit`: số lượng mỗi trang (bắt buộc, dạng string).
- `sort`: `"asc"` hoặc `"desc"` (mặc định `"asc"`).
- `searchByTarget`: một trong `["title", "author", "publishDate", "isbn10", "isbn13", "rating", "reviews", "genres"]` (mặc định `"title"`).
- `sortByTarget`: như `searchByTarget`.
- `bookStatus`: `DRAFT` / `PUBLISHED` / `ARCHIVED` (mặc định `PUBLISHED`).

Ví dụ:

```http
GET /books/search?keyword=harry&page=1&limit=10&sort=asc&searchByTarget=title&sortByTarget=title&bookStatus=PUBLISHED
```

#### 3.3. POST `/books`

Yêu cầu:

- Header:

```http
Authorization: Bearer <access_token_cua_admin>
Content-Type: multipart/form-data
```

- Dùng `multer.single("picture")` để upload ảnh bìa (nếu có).
- Body (fields dạng text, có thể là JSON hoặc form fields, validate bằng `createBookSchema`):

```json
{
  "title": "Book Title",
  "description": "Book description",
  "publishDate": "2024-01-01",
  "language": "English",
  "pageCount": "300",
  "isbn10": "1234567890",
  "isbn13": "9781234567890",
  "publisher": "Publisher Name",
  "format": "HARDCOVER",
  "authorsIdRaw": [1, 2],        // hoặc "1,2"
  "genresIdRaw": ["1", "2"]      // hoặc "1,2"
}
```

`authorsIdRaw` và `genresIdRaw` có thể là:

- Mảng string: `["1", "2"]`.
- Chuỗi: `"1,2"`.

Trong controller sẽ parse thành `number[]` trước khi gọi service.

#### 3.4. PUT `/books/:bookId`

Tương tự `POST /books`, nhưng:

- Path param: `bookId` (string, sẽ được parse sang `number`).
- Body validate bằng `updateBookSchema`.
- Nếu có upload file, file sẽ được xoá khỏi local sau khi xử lý.

#### 3.5. DELETE `/books/:bookId`

- Yêu cầu `ADMIN` + JWT.
- Middleware `deleteBookMiddleware` validate `bookId` bằng `deleteBookSchema`.
- Thay vì xoá hẳn record, controller sẽ:
  - Cập nhật `status` sang `BookStatus.ARCHIVED`.

---

## 🗄️ Database Schema (Prisma)

Các model chính trong `schema.prisma`:

- **User**
  - Fields: `id`, `username`, `email`, `password`, `bio`, `avartarUrl`, `roleId`, timestamps.
  - Quan hệ:
    - `authorProfile`: one-to-one tới `Author`.
    - `reviews`: one-to-many `Review`.
    - `favorites`: one-to-many `Favorite`.
    - `role`: many-to-one `Role`.

- **Role**
  - Enum `RoleName`: `ADMIN`, `READER`, `AUTHOR`.
  - Bảng `role` chứa `roleName`, `description`, `users[]`.

- **Book**
  - Trường chính: `title`, `description`, `publishDate`, `language`, `pageCount`, `isbn10`, `isbn13`, `publisher`, `format`, `coverImageUrl`.
  - Thống kê: `averageRating`, `ratingsCount`, `reviewsCount`.
  - Quan hệ:
    - `authors: Author[]`.
    - `genres: Genre[]` (relation `"BookGenres"`).
    - `reviews: Review[]`.
    - `favoritedBy: Favorite[]`.
  - `status`: enum `BookStatus` (`DRAFT`, `PUBLISHED`, `ARCHIVED`).

- **Author**
  - Thông tin tác giả: `name`, `bio`, `photoUrl`, `userId`.
  - Quan hệ với `User` (optional) & `Book[]`.

- **Genre**
  - `genresName`, `description`, `books: Book[]`.

- **Favorite**
  - Khoá chính: `@@id([userId, bookId])`.
  - Quan hệ many-to-many giữa `User` và `Book`.

- **Review**
  - Trường: `title`, `content`, `rating`, `hasSpoiler`, timestamps.
  - Quan hệ: `user`, `book`.
  - Constraint: `@@unique([userId, bookId])` – mỗi user chỉ review một lần cho mỗi sách.

Enums:

- **BookFormat**: `HARDCOVER`, `PAPERBACK`, `EBOOK`, `AUDIOBOOK`.
- **BookStatus**: `DRAFT`, `PUBLISHED`, `ARCHIVED`.

---

## 🔒 Authentication & Authorization (Chi tiết)

- **JWT payload** gồm:

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

- **Passport JWT Strategy**:
  - Lấy token từ `Authorization: Bearer <token>`.
  - Decode, lấy `username`, tìm `User` trong DB.
  - Gắn `req.user = { username, email, role }`.

- **Middlewares role**:
  - `isAdmin`: chỉ cho phép nếu `role === "ADMIN"`.
  - `isAuthor`: `role === "AUTHOR"`.
  - `isUser`: `role === "READER"`.

---

## 📝 Validation (Zod)

- **`auth.schema.ts`**:
  - `signUpSchema`: validate `username`, `email`, `password`, `confirmPassword` (độ mạnh mật khẩu + trùng khớp).
  - `signInSchema`: validate `username`, `password`.
  - `changePasswordSchema`: validate `oldPassword`, `newPassword`, `confirmNewPassword`.
  - `deleteBookSchema`: validate `bookId` khi xoá sách.

- **`book.schema.ts`**:
  - `createBookSchema`, `updateBookSchema`: validate các field của book, parse `pageCount` từ string sang number.
  - `searchBookSchema`: validate query của `/books/search` (keyword, page, limit, sort, searchByTarget, sortByTarget, bookStatus).

---

## 🧱 Kiến trúc & Best Practices

- **Layered Architecture**
  - `router` → `middleware` → `controller` → `service` → `Prisma (DB)`.

- **DTO & Mapper Pattern**
  - Dùng các DTO (`responseDtos`) + `mappers` để chuẩn hoá data trả về.

- **Middleware-driven Validation**
  - Mọi request quan trọng đều đi qua Zod schema trước khi vào controller.

- **Type-safe**
  - TypeScript + Prisma Client sinh ra types mạnh, hạn chế bug runtime.

---

## 🙋‍♂️ Tác giả

- **Tên**: duyphuongz  
- **Mô tả**: Backend developer – yêu sách, thích xây hệ thống rõ ràng, dễ mở rộng.

---

## 📄 License

Project được phát hành dưới giấy phép **ISC**.

---

**Ghi chú**: Dự án đang trong quá trình phát triển, một số tính năng (review, favorite, profile UI, v.v.) có thể chưa được expose đầy đủ qua API hoặc vẫn đang hoàn thiện.
