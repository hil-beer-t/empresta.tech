package tech.empresta.backend.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tech.empresta.backend.role.Role;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

/**
 * @author Hilbert Digenio ON 11/08/2022
 * @version 0.0.1-SNAPSHOT
 * @project empresta.tech
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(
        name = "tb_user",
        uniqueConstraints = {
                @UniqueConstraint(name = "name_email_unique", columnNames = "email")
        }
)
public class User {
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

    @Column(name = "alias", length = 50)
    private String alias;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "password", length = 64, nullable = false)
    private String password;

    //@CollectionTable(name = "tb_user_roles", joinColumns = @JoinColumn(name = "owner_id"))
    @ManyToMany(fetch = FetchType.EAGER)
    //@JoinTable(name = "tb_user_roles",
    //        joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "roles_id"))
    private Collection<Role> roles = new ArrayList<>();

}