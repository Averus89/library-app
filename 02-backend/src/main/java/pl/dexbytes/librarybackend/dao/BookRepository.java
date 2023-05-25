package pl.dexbytes.librarybackend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.dexbytes.librarybackend.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
}
