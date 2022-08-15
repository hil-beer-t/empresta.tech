package tech.empresta.backend.email;

/**
 * @author Hilbert Digenio ON 18/08/2022
 * @version 0.0.1-SNAPSHOT
 * @project empresta.tech
 */
public interface EmailSender {
    void send(String to, String email);
}
