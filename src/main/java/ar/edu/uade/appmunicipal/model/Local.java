package ar.edu.uade.appmunicipal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Base64;

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
    private Integer idLocal;

    @Column(name = "nombre")
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "id_vecino")
    private Vecino vecino;

    @ManyToOne
    @JoinColumn(name = "id_rubro")
    private Rubro rubro;

    @Column(name = "promocion")
    private String promocion;

    @Column(name = "contacto")
    private String contacto;

    @Column(name = "descripcion")
    private String descripcion;

    @Lob
    @JsonIgnore
    @Column(name = "imagen_local", columnDefinition = "LONGBLOB")
    private byte[] imagenLocal;

    //ToString

    @Override
    public String toString() {
        return "Local{" +
                "idLocal=" + idLocal +
                ", vecino=" + vecino +
                ", rubro=" + rubro +
                ", promocion=" + promocion +
                ", contacto='" + contacto + '\'' +
                '}';
    }

    @JsonProperty("imagenLocal")
    public String getImagenLocalBase64() {
        return Base64.getEncoder().encodeToString(this.imagenLocal);
    }
}
