
const booksPagingMapper = (books: any, meta: metaPaging) => {
    return new booksPagingResponse({
        books,
        meta
    });
}

export {
    booksPagingMapper
}