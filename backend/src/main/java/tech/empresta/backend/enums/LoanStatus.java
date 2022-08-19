package tech.empresta.backend.enums;

/**
 * @author Hilbert Digenio ON 18/08/2022
 * @version 0.0.1-SNAPSHOT
 * @project empresta.tech
 */

public enum LoanStatus {
    WAITING_FOR_AUDITING("waiting_for_auditing", 0),
    AUDITED("audited", 1),
    APPROVED("approved", 2),
    WAITING_FOR_SIGN("waiting_for_sign", 3),
    SIGNED("signed", 4),
    WAITING_PAYMENT("waiting_payment", 5),
    PAID("paid", 6),
    DENIED("denied", 7);

    private String name;
    private final int cod;

    private LoanStatus(String name, int cod){
        this.name = name;
        this.cod = cod;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCod() {
        return cod;
    }
}