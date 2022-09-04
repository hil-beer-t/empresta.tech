package tech.empresta.backend.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import tech.empresta.backend.role.Role;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

/**
 * @author Hilbert Digenio ON 11/08/2022
 * @version 0.0.1-SNAPSHOT
 * @project empresta.tech
 */

// TODO: add cpf, rg, address and income
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@Entity
@ToString
@Table(
        name = "tb_user",
        uniqueConstraints = {
                @UniqueConstraint(name = "name_email_unique", columnNames = "email"),
                @UniqueConstraint(name = "name_cpf_unique", columnNames = "cpf")
        }
)
public class User implements UserDetails {
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

    @Column(name = "cpf", length = 50)
    private String cpf;

    @Column(name = "phoneNumber", length = 50)
    private String phoneNumber;

    @Column(name = "income")
    private Long income;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;

    private Boolean locked = false;

    private Boolean enabled = false;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "password", length = 64, nullable = false)
    private String password;

    //@CollectionTable(name = "tb_user_roles", joinColumns = @JoinColumn(name = "owner_id"))
    @ManyToMany(fetch = FetchType.EAGER)
    //@JoinTable(name = "tb_user_roles",
    //        joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "roles_id"))
    private Collection<Role> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        this.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return authorities;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public User(String alias, String name, String email, Boolean locked, Boolean enabled, String password, Collection<Role> roles) {
        this.alias = alias;
        this.name = name;
        this.email = email;
        this.locked = locked;
        this.enabled = enabled;
        this.password = password;
        this.roles = roles;
    }

    public User(String alias, String cpf, String phoneNumber, Long income, String name, String email, String password, Collection<Role> roles) {
        this.alias = alias;
        this.cpf = cpf;
        this.phoneNumber = phoneNumber;
        this.income = income;
        this.name = name;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
}