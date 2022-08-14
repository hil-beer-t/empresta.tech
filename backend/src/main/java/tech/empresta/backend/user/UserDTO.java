package tech.empresta.backend.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tech.empresta.backend.role.Role;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
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

    @Size(min = 6, max = 64, message = "A senha deve conter entre 6 e 64 caracteres")
    @NotBlank(message = "Senha do usuário não pode ser nulo/vazio")
    private String password;

    private Collection<Role> roles = new ArrayList<>();

}
