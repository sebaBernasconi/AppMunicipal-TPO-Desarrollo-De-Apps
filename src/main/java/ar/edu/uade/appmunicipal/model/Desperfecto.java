package ar.edu.uade.appmunicipal.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "Desperfecto Model")
@Entity
@Table(name = "desperfectos")

@Getter
@Setter
@AllArgsConstructor //Constructor
@NoArgsConstructor //Constructor vacio para la persistencia
public class Desperfecto {

    @Schema(description = "Id del Desperfecto",requiredMode = Schema.RequiredMode.AUTO)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_desperfecto")
    private Integer idDesperfecto;

    @Schema(description = "Rubro al que pertenece el desperfecto",requiredMode = Schema.RequiredMode.REQUIRED)
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_rubro")
    private Rubro rubro;

    @Schema(description = "Descripcion del Desperfecto",requiredMode = Schema.RequiredMode.REQUIRED,example = "Las luces del semaforo no andan")
    @Column(name = "descripcion")
    private String descripcion;

    //ToString

    @Override
    public String toString() {
        return "Desperfecto{" +
                "idDesperfecto=" + idDesperfecto +
                ", rubro=" + rubro +
                ", descripcion='" + descripcion + '\'' +
                '}';
    }
}
