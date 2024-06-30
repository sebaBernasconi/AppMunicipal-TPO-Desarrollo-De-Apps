package ar.edu.uade.appmunicipal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Base64;

@Schema(description = "Local/Servicio Model")
@Entity
@Table(name = "local")

@Getter
@Setter
@AllArgsConstructor //Constructor
@NoArgsConstructor //Constructor vacio para la persistencia
public class Local {

    @Schema(description = "Id del Local/Servicio",requiredMode = Schema.RequiredMode.AUTO)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_local")
    private Integer idLocal;

    @Schema(description = "Nombre del Local/Servicio",requiredMode = Schema.RequiredMode.REQUIRED,example = "Electronica RS")
    @Column(name = "nombre")
    private String nombre;

    @Schema(description = "Vecino asociado al Local/Servicio",requiredMode = Schema.RequiredMode.REQUIRED)
    @ManyToOne
    @JoinColumn(name = "id_vecino")
    private Vecino vecino;

    @Schema(description = "Rubro asociado al Local/Servicio",requiredMode = Schema.RequiredMode.REQUIRED)
    @ManyToOne
    @JoinColumn(name = "id_rubro")
    private Rubro rubro;

    @Schema(description = "Promocion del Local/Servicio",requiredMode = Schema.RequiredMode.NOT_REQUIRED,example = "10% de descuento en efectivo")
    @Column(name = "promocion")
    private String promocion;

    @Schema(description = "Contacto del Local/Servicio",requiredMode = Schema.RequiredMode.REQUIRED,example = "1156789076")
    @Column(name = "contacto")
    private String contacto;

    @Schema(description = "Descripcion del Local/Servicio",requiredMode = Schema.RequiredMode.REQUIRED,example = "Casa de electricidad y electronica")
    @Column(name = "descripcion")
    private String descripcion;

    @Schema(description = "Imagenes del Local/Servicio",requiredMode = Schema.RequiredMode.REQUIRED)
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
