package ar.edu.uade.appmunicipal.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "Vecino Model")
@Entity
@Table(name = "vecinos")

@Getter
@Setter
@AllArgsConstructor //Constructor
@NoArgsConstructor //Constructor vacio para persistencia
public class Vecino {

    @Schema(description = "DNI Vecino", requiredMode = Schema.RequiredMode.REQUIRED, example = "22333444")
    @Id
    @Column(name = "dni")
    private Integer dni;

    @Schema(description = "Nombre del Vecino", requiredMode = Schema.RequiredMode.REQUIRED, example = "Juan")
    @Column(name = "nombre")
    private String nombre;

    @Schema(description = "Apellido del Vecino", requiredMode = Schema.RequiredMode.REQUIRED, example = "Perez")
    @Column(name = "apellido")
    private String apellido;

    @Schema(description = "Direccion del Vecino", requiredMode = Schema.RequiredMode.REQUIRED, example = "Lima 244")
    @Column(name = "direccion")
    private String direccion;

    //Falta mappedBy?
    @Schema(description = "Id del Barrio del Vecino", requiredMode = Schema.RequiredMode.REQUIRED, example = "2")
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cod_barrio")
    private Barrio barrio;

    //To String

    @Override
    public String toString() {
        return "Vecino{" +
                "dni=" + dni +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", direccion='" + direccion + '\'' +
                ", barrio=" + barrio.toString() +
                '}';
    }
}
