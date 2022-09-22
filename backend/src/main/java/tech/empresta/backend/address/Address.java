package tech.empresta.backend.address;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@ToString
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tb_address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "zip_code", length = 30)
    private String zip_code;

    @Column(name = "state", length = 30)
    private String state;

    @Column(name = "city", length = 50)
    private String city;

    @Column(name = "street")
    private String street;

    @Column(name = "number", length = 30)
    private String number;

    @Column(name = "area")
    private String area;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Address(String zip_code, String state, String city, String street, String number, String area) {
        this.zip_code = zip_code;
        this.state = state;
        this.city = city;
        this.street = street;
        this.number = number;
        this.area = area;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Address address = (Address) o;
        return id != null && Objects.equals(id, address.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}