package tech.empresta.backend.signup;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import tech.empresta.backend.address.Address;

/**
 * @author Hilbert Digenio ON 18/08/2022
 * @version 0.0.1-SNAPSHOT
 * @project empresta.tech
 */

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class SignUpRequest {
    private final String alias;
    private final String cpf;
    private final String phoneNumber;
    private final Long income;
    private final String name;
    private final String email;
    private final String password;
    private final Address address;
}
