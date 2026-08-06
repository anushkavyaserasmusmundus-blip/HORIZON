package horizon.repository;

import horizon.entity.Profile;
import horizon.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

//spring data JPA Repository is a part of the Spring Data project, which aims to simplify data access and manipulation in Java applications. It provides a set of interfaces and classes that allow developers to interact with databases using high-level abstractions, reducing the amount of boilerplate code needed for common database operations.
//The repository is the only layer that directly communicates with PostgreSQL.


public interface ProfileRepository extends JpaRepository<Profile, UUID> {
//Why extend JpaRepository?
//By writing just this:Spring automatically gives us dozens of methods for free. like the on ebelow
    Optional<Profile> findByUser(User user);

}