
class booksPagingResponse {
    books: any;
    meta: metaPaging;

    constructor({
        books,
        meta
    }: {
        books: any,
        meta: metaPaging
    }) {
        this.books = books;
        this.meta = meta;
    }
}

