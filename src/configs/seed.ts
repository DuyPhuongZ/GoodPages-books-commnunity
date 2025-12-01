import { RoleName, BookFormat, BookStatus } from "../generated/prisma/enums";
import prisma from "./prisma.client.config";


export async function seed() {
    console.log(">>> Running seed...");

    /**
     * ==========================
     * 1. Xóa tất cả data cũ (theo thứ tự để tránh lỗi foreign key constraint)
     * ==========================
     */
    console.log(">>> Deleting old data...");
    
    // Xóa các bảng có foreign key trước
    await prisma.favorite.deleteMany();
    console.log(">>> Deleted favorites");
    
    await prisma.review.deleteMany();
    console.log(">>> Deleted reviews");
    
    await prisma.book.deleteMany();
    console.log(">>> Deleted books");
    
    await prisma.author.deleteMany();
    console.log(">>> Deleted authors");
    
    await prisma.genre.deleteMany();
    console.log(">>> Deleted genres");
    
    await prisma.user.deleteMany();
    console.log(">>> Deleted users");
    
    await prisma.role.deleteMany();
    console.log(">>> Deleted roles");

    /**
     * ==========================
     * Reset Auto Increment
     * ==========================
     */
    console.log(">>> Resetting auto increment...");
    
    // Reset auto increment cho tất cả các bảng (theo thứ tự ngược lại với xóa)
    // Thứ tự: từ bảng không có FK đến bảng có FK
    // Tên bảng theo migration: role (lowercase), User (PascalCase), Genre, Author, Book, review (lowercase)
    await prisma.$executeRawUnsafe(`ALTER TABLE \`role\` AUTO_INCREMENT = 1`);
    await prisma.$executeRawUnsafe(`ALTER TABLE \`User\` AUTO_INCREMENT = 1`);
    await prisma.$executeRawUnsafe(`ALTER TABLE \`Genre\` AUTO_INCREMENT = 1`);
    await prisma.$executeRawUnsafe(`ALTER TABLE \`Author\` AUTO_INCREMENT = 1`);
    await prisma.$executeRawUnsafe(`ALTER TABLE \`Book\` AUTO_INCREMENT = 1`);
    await prisma.$executeRawUnsafe(`ALTER TABLE \`review\` AUTO_INCREMENT = 1`);
    // Favorite không có auto increment vì dùng composite primary key (userId, bookId)
    
    console.log(">>> Reset auto increment completed");

    /**
     * ==========================
     * 2. Seed Roles
     * ==========================
     */
    console.log(">>> Seeding roles...");
    await prisma.role.createMany({
        data: [
            {
                roleName: RoleName.ADMIN,
                description: "Administrator – full access",
            },
            {
                roleName: RoleName.AUTHOR,
                description: "Author – author of books",
            },
            {
                roleName: RoleName.READER,
                description: "Reader – normal user",
            },
        ],
    });
    console.log(">>> Seeded roles (ADMIN, AUTHOR, READER)");

    /**
     * ==========================
     * 3. Seed Users
     * ==========================
     */
    console.log(">>> Seeding users...");
    
    // Lấy id role từ DB (không hard-code số id)
    const adminRole = await prisma.role.findUnique({
        where: { roleName: RoleName.ADMIN },
    });
    const authorRole = await prisma.role.findUnique({
        where: { roleName: RoleName.AUTHOR },
    });
    const readerRole = await prisma.role.findUnique({
        where: { roleName: RoleName.READER },
    });

    if (!adminRole || !authorRole || !readerRole) {
        throw new Error(">>> Roles not found. Make sure roles are seeded correctly.");
    }

    await prisma.user.createMany({
        data: [
            {
                username: "admin",
                email: "admin@example.com",
                name: "Main Admin",
                password: "123456", // TODO: hash password khi dùng thực tế
                bio: "System administrator",
                roleId: adminRole.id,
            },
            {
                username: "author1",
                email: "author1@example.com",
                name: "First Author",
                password: "123456",
                bio: "Content creator",
                roleId: authorRole.id,
            },
            {
                username: "reader1",
                email: "reader1@example.com",
                name: "First Reader",
                password: "123456",
                bio: "Just reading stuff",
                roleId: readerRole.id,
            },
        ],
    });
    console.log(">>> Seeded users (admin, author1, reader1)");

    /**
     * ==========================
     * 4. Seed Genres
     * ==========================
     */
    console.log(">>> Seeding genres...");
    await prisma.genre.createMany({
        data: [
            {
                genresName: "Fiction",
                description: "Literary works of imagination, typically prose",
            },
            {
                genresName: "Non-Fiction",
                description: "Books based on facts, real events, and real people",
            },
            {
                genresName: "Science Fiction",
                description: "Fiction based on imagined future scientific or technological advances",
            },
            {
                genresName: "Fantasy",
                description: "Fiction with magical or supernatural elements",
            },
            {
                genresName: "Mystery",
                description: "Fiction involving a mysterious crime or puzzle to be solved",
            },
            {
                genresName: "Romance",
                description: "Fiction focusing on romantic relationships",
            },
            {
                genresName: "Thriller",
                description: "Fiction with suspense, excitement, and tension",
            },
            {
                genresName: "Horror",
                description: "Fiction intended to frighten, scare, or disgust",
            },
            {
                genresName: "Biography",
                description: "An account of someone's life written by someone else",
            },
            {
                genresName: "History",
                description: "Books about past events, particularly in human affairs",
            },
        ],
    });
    console.log(">>> Seeded 10 genres");

    /**
     * ==========================
     * 5. Seed Authors
     * ==========================
     */
    console.log(">>> Seeding authors...");
    
    // Lấy user author1 để link với author profile
    const authorUser = await prisma.user.findUnique({
        where: { username: "author1" },
    });

    await prisma.author.createMany({
        data: [
            {
                name: "J.K. Rowling",
                bio: "British author, best known for the Harry Potter fantasy series",
                userId: authorUser?.id,
            },
            {
                name: "Stephen King",
                bio: "American author of horror, supernatural fiction, suspense, and fantasy novels",
            },
            {
                name: "Agatha Christie",
                bio: "English writer known for her detective novels",
            },
            {
                name: "George R.R. Martin",
                bio: "American novelist and short story writer, best known for A Song of Ice and Fire",
            },
            {
                name: "Jane Austen",
                bio: "English novelist known primarily for her six major novels",
            },
        ],
    });
    console.log(">>> Seeded authors");

    /**
     * ==========================
     * 6. Seed Books
     * ==========================
     */
    console.log(">>> Seeding books...");
    
    // Lấy genres và authors đã tạo
    const allGenres = await prisma.genre.findMany();
    const allAuthors = await prisma.author.findMany();

    if (allGenres.length === 0 || allAuthors.length === 0) {
        throw new Error(">>> Genres or Authors not found. Make sure they are seeded correctly.");
    }

    // Tạo books với quan hệ many-to-many
    const fictionGenre = allGenres.find(g => g.genresName === "Fiction");
    const fantasyGenre = allGenres.find(g => g.genresName === "Fantasy");
    const mysteryGenre = allGenres.find(g => g.genresName === "Mystery");
    const horrorGenre = allGenres.find(g => g.genresName === "Horror");
    const romanceGenre = allGenres.find(g => g.genresName === "Romance");
    const sciFiGenre = allGenres.find(g => g.genresName === "Science Fiction");

    const jkRowling = allAuthors.find(a => a.name === "J.K. Rowling");
    const stephenKing = allAuthors.find(a => a.name === "Stephen King");
    const agathaChristie = allAuthors.find(a => a.name === "Agatha Christie");
    const georgeMartin = allAuthors.find(a => a.name === "George R.R. Martin");
    const janeAusten = allAuthors.find(a => a.name === "Jane Austen");

    // Tạo các books
    const book1 = await prisma.book.create({
        data: {
            title: "Harry Potter and the Philosopher's Stone",
            description: "The first novel in the Harry Potter series and J.K. Rowling's debut novel",
            publishDate: new Date("1997-06-26"),
            language: "English",
            pageCount: 223,
            isbn10: "0747532699",
            isbn13: "9780747532699",
            publisher: "Bloomsbury",
            format: BookFormat.PAPERBACK,
            status: BookStatus.PUBLISHED,
            authors: {
                connect: jkRowling ? [{ id: jkRowling.id }] : [],
            },
            genres: {
                connect: fantasyGenre ? [{ id: fantasyGenre.id }] : [],
            },
        },
    });

    const book2 = await prisma.book.create({
        data: {
            title: "The Shining",
            description: "A horror novel by American author Stephen King",
            publishDate: new Date("1977-01-28"),
            language: "English",
            pageCount: 447,
            isbn10: "0307743659",
            isbn13: "9780307743657",
            publisher: "Doubleday",
            format: BookFormat.HARDCOVER,
            status: BookStatus.PUBLISHED,
            authors: {
                connect: stephenKing ? [{ id: stephenKing.id }] : [],
            },
            genres: {
                connect: horrorGenre ? [{ id: horrorGenre.id }] : [],
            },
        },
    });

    const book3 = await prisma.book.create({
        data: {
            title: "Murder on the Orient Express",
            description: "A detective novel by Agatha Christie featuring Hercule Poirot",
            publishDate: new Date("1934-01-01"),
            language: "English",
            pageCount: 256,
            isbn10: "0062693662",
            isbn13: "9780062693662",
            publisher: "Collins Crime Club",
            format: BookFormat.PAPERBACK,
            status: BookStatus.PUBLISHED,
            authors: {
                connect: agathaChristie ? [{ id: agathaChristie.id }] : [],
            },
            genres: {
                connect: mysteryGenre ? [{ id: mysteryGenre.id }] : [],
            },
        },
    });

    const book4 = await prisma.book.create({
        data: {
            title: "A Game of Thrones",
            description: "The first novel in A Song of Ice and Fire series",
            publishDate: new Date("1996-08-01"),
            language: "English",
            pageCount: 694,
            isbn10: "0553103547",
            isbn13: "9780553103540",
            publisher: "Bantam Spectra",
            format: BookFormat.HARDCOVER,
            status: BookStatus.PUBLISHED,
            authors: {
                connect: georgeMartin ? [{ id: georgeMartin.id }] : [],
            },
            genres: {
                connect: [
                    ...(fantasyGenre ? [{ id: fantasyGenre.id }] : []),
                    ...(fictionGenre ? [{ id: fictionGenre.id }] : []),
                ],
            },
        },
    });

    const book5 = await prisma.book.create({
        data: {
            title: "Pride and Prejudice",
            description: "A romantic novel of manners written by Jane Austen",
            publishDate: new Date("1813-01-28"),
            language: "English",
            pageCount: 432,
            isbn10: "0141439513",
            isbn13: "9780141439518",
            publisher: "T. Egerton",
            format: BookFormat.PAPERBACK,
            status: BookStatus.PUBLISHED,
            authors: {
                connect: janeAusten ? [{ id: janeAusten.id }] : [],
            },
            genres: {
                connect: [
                    ...(romanceGenre ? [{ id: romanceGenre.id }] : []),
                    ...(fictionGenre ? [{ id: fictionGenre.id }] : []),
                ],
            },
        },
    });

    const book6 = await prisma.book.create({
        data: {
            title: "The Hobbit",
            description: "A fantasy novel by J.R.R. Tolkien",
            publishDate: new Date("1937-09-21"),
            language: "English",
            pageCount: 310,
            isbn10: "054792822X",
            isbn13: "9780547928227",
            publisher: "George Allen & Unwin",
            format: BookFormat.PAPERBACK,
            status: BookStatus.PUBLISHED,
            genres: {
                connect: fantasyGenre ? [{ id: fantasyGenre.id }] : [],
            },
        },
    });

    console.log(">>> Seeded 6 books with authors and genres");

    console.log(">>> Seed finished.");
}

// Nếu muốn có thể chạy trực tiếp file này bằng ts-node
if (require.main === module) {
    seed()
        .catch((e) => {
            console.error(e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}
