package tech.empresta.backend.loan;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tech.empresta.backend.enums.LoanStatus;
import tech.empresta.backend.user.User;

import java.util.List;

/**
 * @author Hilbert Digenio ON 18/08/2022
 * @version 0.0.1-SNAPSHOT
 * @project empresta.tech
 */

@Service
@RequiredArgsConstructor
public class LoanService {
    private final LoanRepository loanRepository;

    public Loan findLoanByUser(User user){
        return loanRepository.findByUser(user);
    }

    public Loan findLoanByCod(String cod){
        return loanRepository.findByCod(cod);
    }

    public int updateLoanStatus(String cod, LoanStatus status){
        return loanRepository.updateLoanStatus(cod, status);
    }

    public Loan saveLoan(Loan loan, Long id){
        return loanRepository.save(loan);
    }

    // TODO: Paginate
    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    public List<Loan> getLoansByUserEmail(String email) {
        return loanRepository.getLoansByUserEmail(email);
    }
}
