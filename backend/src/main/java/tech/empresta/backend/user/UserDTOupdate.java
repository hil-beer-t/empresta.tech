package tech.empresta.backend.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tech.empresta.backend.role.Role;

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
public class UserDTOupdate {

    private Long id;

    private String alias;

    private String name;

    private String email;

    private Boolean locked = false;

    private Boolean enabled = false;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private Collection<Role> roles = new ArrayList<>();

}
