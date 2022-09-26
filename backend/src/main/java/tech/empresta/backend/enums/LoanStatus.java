package tech.empresta.backend.enums;

/**
 * @author Hilbert Digenio ON 18/08/2022
 * @version 0.0.1-SNAPSHOT
 * @project empresta.tech
 */

public enum LoanStatus {
    WAITING_FOR_AUDITING("WAITING_FOR_AUDITING", 0),
    AUDITED("AUDITED", 1),
    APPROVED("APPROVED", 2),
    WAITING_FOR_SIGN("WAITING_FOR_SIGN", 3),
    SIGNED("SIGNED", 4),
    WAITING_PAYMENT("WAITING_PAYMENT", 5),
    PAID("PAID", 6),
    DENIED("DENIED", 7);

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