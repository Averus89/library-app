import React, {useState, useEffect} from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";
import { Pagination } from "../Utils/Pagination";

export const SearchBooksPage = () => {
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage, setBooksPerPage] = useState(5);
    const [totalBooks, setTotalBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = "http://localhost:8081/api/books";
            const url: string = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.books;

            setTotalBooks(responseJson.page.total);
            setTotalPages(responseJson.page.totalPages);

            const loadedBooks: BookModel[] = [];

            responseData.forEach((book: BookModel) => loadedBooks.push({
                id: book.id,
                title: book.title,
                author: book.author,
                description: book.description,
                copies: book.copies,
                copiesAvailable: book.copiesAvailable,
                category: book.category,
                img: book.img,
            }));

            setBooks(loadedBooks);
            setIsLoading(false);
        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [currentPage] );

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    const indexOfLastBook: number = currentPage * booksPerPage;
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage + 1;
    let lastItem = booksPerPage * currentPage <= totalBooks ? 
        booksPerPage * currentPage : totalBooks;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    
    return (
        <div>
            <div className="container">
                <div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="d-flex">
                                <input className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search" />
                                <button className="btn btn-outline-success">Search</button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false">Category</button>
                                <ul className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1">
                                        <li>
                                            <a className="dropdown-item" href="#">All</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">Frontend</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">Backend</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">Data</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">DevOps</a>
                                        </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h5>Number of results: ({totalBooks})</h5>
                    </div>
                    <p>
                        {indexOfFirstBook} to {indexOfLastBook} of {totalBooks} items:
                    </p>
                    {books.map(book => (
                        <SearchBook book={book} key={book.id}/>
                    ))}
                    {totalPages > 1 && 
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>
                    }
                </div>
            </div>
        </div>
    );
}