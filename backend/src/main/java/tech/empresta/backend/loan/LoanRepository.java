package tech.empresta.backend.loan;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import tech.empresta.backend.enums.LoanStatus;
import tech.empresta.backend.user.User;

import java.util.List;

/**
 * @author Hilbert Digenio ON 18/08/2022
 * @version 0.0.1-SNAPSHOT
 * @project empresta.tech
 */

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {

    Loan findByUser(User user);

    Loan findByCod(String cod);

    @Transactional
    @Modifying
    @Query("UPDATE Loan l " +
            "SET l.status = ?2 " +
            "WHERE l.cod = ?1")
    int updateLoanStatus(String cod,
                          LoanStatus status);

    List<Loan> getLoansByUserEmail (String email);

    long countLoanByUser(User user);
}