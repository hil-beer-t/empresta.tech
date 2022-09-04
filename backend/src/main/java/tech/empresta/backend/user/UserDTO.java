package tech.empresta.backend.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tech.empresta.backend.role.Role;

import javax.validation.constraints.*;
import java.util.ArrayList;
import java.util.Collection;

/**
 * @author Hilbert Digenio ON 11/08/2022
 * @version 0.0.1-SNAPSHOT
 * @project empresta.tech
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long id;

    @Size(max = 50, message = "Apelido deve conter no máximo 50 caracteres")
    private String alias;

    @Size(min = 2, max = 255, message = "Nome deve conter entre 2 e 255 caracteres")
    @NotBlank(message = "Nome do usuário não pode ser nulo/vazio")
    private String name;

    @Size(min = 2, max = 255, message = "Email deve conter entre 2 e 255 caracteres")
    @NotBlank(message = "Email do usuário não pode ser nulo/vazio")
    @Email(message = "Email inválido")
    private String email;

    @Size(min = 14, max = 50, message = "Cpf deve conter entre 14 e 50 caracteres")
    @NotBlank(message = "Cpf do usuário não pode ser nulo/vazio")
    private String cpf;

    @Size(min = 14, max = 50, message = "Celular deve conter entre 14 e 50 caracteres")
    @NotBlank(message = "Celular do usuário não pode ser nulo/vazio")
    private String phoneNumber;

    @NotNull(message = "Renda do usuário não pode ser nula/vazia")
    @Min(value = 0, message = "Renda do usuário não pode ser menor que 0")
    private Long income;

    private Boolean locked = false;

    private Boolean enabled = false;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Size(min = 6, max = 64, message = "A senha deve conter entre 6 e 64 caracteres")
    @NotBlank(message = "Senha do usuário não pode ser nulo/vazio")
    private String password;

    private Collection<Role> roles = new ArrayList<>();

}
