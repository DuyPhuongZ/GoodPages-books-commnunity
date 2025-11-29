# 📚 GoodPages - Social Network for Books

GoodPages là một nền tảng mạng xã hội dành cho những người yêu sách, nơi người dùng có thể khám phá, đánh giá, và chia sẻ về những cuốn sách yêu thích của mình.

## ✨ Tính năng chính

### 🔐 Xác thực người dùng
- Đăng ký tài khoản mới
- Đăng nhập với JWT (Access Token & Refresh Token)
- Đổi mật khẩu
- Phân quyền theo vai trò: Admin, Reader, Author

### 📖 Quản lý sách
- Xem danh sách sách với phân trang
- Xem sách trên trang chủ
- Tạo sách mới (chỉ Admin)
- Cập nhật thông tin sách (chỉ Admin)
- Upload ảnh bìa sách
- Thông tin chi tiết: ISBN, tác giả, thể loại, đánh giá, v.v.

### 👤 Quản lý người dùng
- Hồ sơ người dùng với avatar
- Liên kết tài khoản với tác giả (Author profile)
- Quản lý vai trò và quyền truy cập

### ⭐ Đánh giá và yêu thích
- Viết review cho sách
- Đánh giá bằng điểm số (rating)
- Đánh dấu sách yêu thích
- Thống kê đánh giá và số lượt review

### 🏷️ Phân loại
- Quản lý thể loại sách (Genre)
- Nhiều tác giả cho một cuốn sách
- Nhiều thể loại cho một cuốn sách

## 🛠️ Công nghệ sử dụng

### Backend Framework & Runtime
- **Node.js** - Runtime environment
- **Express.js 5.1.0** - Web framework
- **TypeScript 5.9.3** - Type-safe JavaScript

### Database & ORM
- **MySQL** - Database management system
- **Prisma 7.0.1** - Modern ORM với type-safe queries
- **@prisma/adapter-mariadb** - MariaDB adapter

### Authentication & Security
- **Passport.js** - Authentication middleware
- **passport-jwt** - JWT strategy cho Passport
- **jsonwebtoken** - JWT token generation và verification
- **bcrypt** - Password hashing

### Validation & File Upload
- **Zod 4.1.13** - Schema validation
- **Multer 2.0.2** - File upload handling

### Development Tools
- **ts-node-dev** - Development server với hot reload
- **TypeScript** - Type checking và compilation

## 📁 Cấu trúc dự án

```
GoodPages/
├── prisma/
│   ├── migrations/          # Database migrations
│   └── schema.prisma        # Prisma schema định nghĩa models
├── src/
│   ├── app.ts               # Entry point của ứng dụng
│   ├── configs/             # Cấu hình
│   │   ├── multer.config.ts      # Cấu hình upload file
│   │   ├── passport.config.ts    # Cấu hình Passport
│   │   ├── passport.jwt.config.ts # Cấu hình JWT strategy
│   │   ├── prisma.client.config.ts # Cấu hình Prisma client
│   │   └── seed.ts               # Seed data
│   ├── constants/           # Constants
│   │   ├── httpStatus.constanst.ts
│   │   └── message.constants.ts
│   ├── controllers/         # Request handlers
│   │   ├── auth.controller.ts
│   │   └── book.controller.ts
│   ├── generated/           # Generated code (Prisma)
│   │   └── prisma/
│   ├── mappers/             # Data mappers
│   │   ├── auth.mapper.ts
│   │   ├── book.mapper.ts
│   │   └── rest-response.mapper.ts
│   ├── middlewares/         # Express middlewares
│   │   ├── auth.middleware.ts
│   │   └── book.middleware.ts
│   ├── responseDtos/        # Response DTOs
│   │   ├── auth.dto.ts
│   │   ├── book.dto.ts
│   │   ├── meta.dto.ts
│   │   └── rest-response.dto.ts
│   ├── routers/             # Route definitions
│   │   ├── auth.route.ts
│   │   ├── book.route.ts
│   │   └── router.ts
│   ├── services/            # Business logic
│   │   ├── auth.service.ts
│   │   ├── book.service.ts
│   │   └── user.service.ts
│   ├── utils/               # Utility functions
│   │   ├── bcrypt.util.ts
│   │   ├── jwt.util.ts
│   │   └── time.utils.ts
│   └── validations/         # Zod schemas
│       ├── auth.schema.ts
│       └── book.schema.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js (v18 hoặc cao hơn)
- MySQL/MariaDB
- npm hoặc yarn

### Bước 1: Clone repository
```bash
git clone <repository-url>
cd GoodPages
```

### Bước 2: Cài đặt dependencies
```bash
npm install
```

### Bước 3: Cấu hình database
1. Tạo file `.env` trong thư mục gốc:
```env
DATABASE_URL="mysql://user:password@localhost:3306/goodpages"
JWT_SECRET="your-secret-key-here"
JWT_REFRESH_SECRET="your-refresh-secret-key-here"
```

2. Chạy migrations:
```bash
npx prisma migrate dev
```

3. Generate Prisma Client:
```bash
npx prisma generate
```

### Bước 4: Chạy ứng dụng
```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

## 📡 API Endpoints

### Authentication (`/auth`)

| Method | Endpoint | Mô tả | Auth Required |
|--------|----------|-------|---------------|
| POST | `/auth/sign-up` | Đăng ký tài khoản mới | ❌ |
| POST | `/auth/sign-in` | Đăng nhập | ❌ |
| POST | `/auth/change-password` | Đổi mật khẩu | ✅ |

### Books (`/book`)

| Method | Endpoint | Mô tả | Auth Required | Role |
|--------|----------|-------|---------------|------|
| GET | `/book/homepage` | Lấy sách cho trang chủ | ❌ | - |
| GET | `/book` | Lấy danh sách sách (phân trang) | ❌ | - |
| POST | `/book` | Tạo sách mới | ✅ | Admin |
| PUT | `/book` | Cập nhật sách | ✅ | Admin |

**Query Parameters cho GET `/book`:**
- `page`: Số trang (mặc định: 1)
- `limit`: Số lượng items mỗi trang (mặc định: 10)

**Request Body cho POST `/book`:**
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
  "authorsIdRaw": [1, 2] hoặc "1,2",
  "genresIdRaw": [1, 2] hoặc "1,2"
}
```
**Note:** File upload với field name `picture` (multipart/form-data)

## 🗄️ Database Schema

### Models chính

#### User
- Thông tin người dùng
- Liên kết với Author profile (optional)
- Quan hệ với Reviews và Favorites

#### Book
- Thông tin sách: title, description, ISBN, publisher, format
- Thống kê: averageRating, ratingsCount, reviewsCount
- Quan hệ many-to-many với Authors và Genres

#### Author
- Thông tin tác giả
- Liên kết với User (optional - để claim profile)

#### Genre
- Thể loại sách
- Quan hệ many-to-many với Books

#### Review
- Đánh giá của người dùng về sách
- Rating, content, hasSpoiler flag
- Một user chỉ review một lần cho mỗi cuốn sách

#### Favorite
- Sách yêu thích của người dùng
- Composite primary key (userId, bookId)

#### Role
- Vai trò: ADMIN, READER, AUTHOR

### BookFormat Enum
- HARDCOVER
- PAPERBACK
- EBOOK
- AUDIOBOOK

## 🔒 Authentication & Authorization

### JWT Token
- **Access Token**: Dùng cho các request cần xác thực
- **Refresh Token**: Dùng để refresh access token

### Middleware
- `passport.authenticate("jwt")`: Xác thực JWT token
- `isAdmin`: Chỉ Admin mới được truy cập
- `isAuthor`: Chỉ Author mới được truy cập

### Headers
```
Authorization: Bearer <access_token>
```

## 📝 Validation

Dự án sử dụng **Zod** để validate request data:

- `auth.schema.ts`: Validation cho authentication endpoints
- `book.schema.ts`: Validation cho book endpoints (create, update)

## 🎯 Best Practices

- **Layered Architecture**: Controller → Service → Database
- **DTO Pattern**: Sử dụng DTOs cho request/response
- **Mapper Pattern**: Transform data giữa các layers
- **Middleware Pattern**: Xử lý authentication, validation
- **Type Safety**: TypeScript + Prisma cho type-safe code

## 👤 Tác giả

**duyphuongz**

## 📄 License

ISC

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng tạo issue hoặc pull request.

---

**Lưu ý**: Đây là dự án đang trong quá trình phát triển. Một số tính năng có thể chưa hoàn thiện.

