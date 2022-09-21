package tech.empresta.backend.api._Private;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.empresta.backend.enums.LoanStatus;
import tech.empresta.backend.loan.Loan;
import tech.empresta.backend.loan.LoanService;
import tech.empresta.backend.response.Response;
import tech.empresta.backend.user.User;
import tech.empresta.backend.user.UserService;
import tech.empresta.backend.utils.GenerateLoanCod;

import javax.validation.Valid;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Hilbert Digenio ON 18/08/2022
 * @version 0.0.1-SNAPSHOT
 * @project empresta.tech
 */

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("/v1/private")
public class LoanController {

    private final LoanService loanService;
    private final UserService userService;


    @PostMapping("/create/loan/{userEmail}")
    public ResponseEntity<Response<Loan>> createLoan(@Valid @RequestBody Loan bodyLoan, @PathVariable String userEmail, BindingResult result) {

        Response<Loan> response = new Response<>();

        if (result.hasErrors()){
            result.getAllErrors().forEach( e -> response.getErrors().add(e.getDefaultMessage()));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        User u = userService.getUserByEmail(userEmail);
        long numOfLoans = loanService.countLoanByUser(u);
        long hasUnfinishedLoan = 0;

        // TODO: verify by loan status instead number of loans
        // we want allow a creation of a loan, when the numOfLoans > 0 but with DENIED status
        if (numOfLoans == 0 ) {
            bodyLoan.setCod(GenerateLoanCod.generate(u.getId()));
            bodyLoan.setCreatedAt(LocalDateTime.now());
            bodyLoan.setConfirmedAt(null);
            bodyLoan.setUser(u);

            response.setData(loanService.saveLoan(bodyLoan));

            URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/v1/private/create/loan").toUriString());

            return ResponseEntity.created(uri).body(response);
        }

        List<Loan> loans = loanService.getLoansByUserId(u.getId());
        for ( Loan loan: loans ){
            if ( !loan.getStatus().equals(LoanStatus.APPROVED) && !loan.getStatus().equals(LoanStatus.DENIED) ){
                hasUnfinishedLoan++;
            }
        }

        if (hasUnfinishedLoan > 0){
            throw new IllegalStateException("User has an unfinished loan");
        }

        if (hasUnfinishedLoan == 0){
            bodyLoan.setCod(GenerateLoanCod.generate(u.getId()));
            bodyLoan.setCreatedAt(LocalDateTime.now());
            bodyLoan.setConfirmedAt(null);
            bodyLoan.setUser(u);

            response.setData(loanService.saveLoan(bodyLoan));

            URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/v1/private/create/loan").toUriString());

            return ResponseEntity.created(uri).body(response);
        }
        throw new IllegalStateException("Some error occurred");
    }

    @GetMapping("/loans")
    public ResponseEntity<Response<List<Loan>>> getUsers() {

        Response<List<Loan>> response = new Response<>();

        response.setData(loanService.getAllLoans());

        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/loan/{email}")
    public ResponseEntity<Response<List<Loan>>> getLoansByUserEmail(@PathVariable String email) throws JSONException {

        Response<List<Loan>> response = new Response<>();

        response.setData(loanService.getLoansByUserEmail(email));

        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/loan/cod/{cod}")
    public ResponseEntity<Response<Loan>> getLoansByUserCod(@PathVariable String cod) throws JSONException {

        Response<Loan> response = new Response<>();

        response.setData(loanService.findLoanByCod(cod));

        return ResponseEntity.ok().body(response);
    }

    @PatchMapping("/change/loan/status/{loanCod}")
    public ResponseEntity changeStatus(@PathVariable String loanCod, @RequestParam String status) throws JSONException {

        log.info(status);

        loanService.updateLoanStatus(loanCod, LoanStatus.valueOf(status));

       return ResponseEntity.ok().build();
    }


}
