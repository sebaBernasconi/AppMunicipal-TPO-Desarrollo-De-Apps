package ar.edu.uade.appmunicipal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "local")

@Getter
@Setter
@AllArgsConstructor //Constructor
@NoArgsConstructor //Constructor vacio para la persistencia
public class Local {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_local")
    @JsonIgnore
    private Integer idLocal;

    @ManyToOne
    @JoinColumn(name = "id_vecino")
    private Vecino vecino;

    @ManyToOne
    @JoinColumn(name = "id_rubro")
    private Rubro rubro;

    @OneToOne
    @JoinColumn(name = "id_sitio")
    private Sitio sitio;

    @OneToOne
    @JoinColumn(name = "id_promocion")
    private Promocion promocion;

    @Column(name = "contacto")
    private String contacto;

    //ToString

    @Override
    public String toString() {
        return "Local{" +
                "idLocal=" + idLocal +
                ", vecino=" + vecino +
                ", rubro=" + rubro +
                ", sitio=" + sitio +
                ", contacto='" + contacto + '\'' +
                '}';
    }
}
