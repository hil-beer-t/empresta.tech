package tech.empresta.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Hilbert Digenio ON 11/08/2022
 * @version 0.0.1-SNAPSHOT
 * @project empresta.tech
 */

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

}