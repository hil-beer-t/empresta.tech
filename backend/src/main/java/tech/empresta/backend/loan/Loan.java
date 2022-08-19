package tech.empresta.backend.loan;

import lombok.*;
import tech.empresta.backend.enums.LoanStatus;
import tech.empresta.backend.user.User;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * @author Hilbert Digenio ON 18/08/2022
 * @version 0.0.1-SNAPSHOT
 * @project empresta.tech
 */

@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@Entity
@ToString
@Table(
        name = "tb_loan",
        uniqueConstraints = {
                @UniqueConstraint(name = "name_cod_unique", columnNames = "cod")
        }
)
public class Loan {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "cod", nullable = false)
    private String cod;

    private LoanStatus status = LoanStatus.WAITING_FOR_AUDITING;

    private LocalDate initialDate;

    private int intervals;

    private Long value;

    private LocalDateTime createdAt;

    private LocalDateTime confirmedAt;

    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "app_user_id"
    )
    private User user;

    public Loan(String cod, LoanStatus status, LocalDate initialDate, int intervals, Long value, LocalDateTime createdAt, LocalDateTime confirmedAt, User user) {
        this.cod = cod;
        this.status = status;
        this.initialDate = initialDate;
        this.intervals = intervals;
        this.value = value;
        this.createdAt = createdAt;
        this.confirmedAt = confirmedAt;
        this.user = user;
    }
}
