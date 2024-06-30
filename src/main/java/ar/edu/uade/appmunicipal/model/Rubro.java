package ar.edu.uade.appmunicipal.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "Rubro Model")
@Entity
@Table(name = "rubros")

@Getter
@Setter
@AllArgsConstructor //Constructor
@NoArgsConstructor //Constructor vacio para persistencia
public class Rubro {

    @Schema(description = "Id del Rubro",requiredMode = Schema.RequiredMode.AUTO)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rubro")
    private Integer idRubro;

    @Schema(description = "Descripcion del Rubro",requiredMode = Schema.RequiredMode.REQUIRED,example = "Plomero")
    @Column(name = "descripcion")
    private String descripcion;

    //ToString

    @Override
    public String toString() {
        return "Rubro{" +
                "idRubro=" + idRubro +
                ", descripcion='" + descripcion + '\'' +
                '}';
    }
}
