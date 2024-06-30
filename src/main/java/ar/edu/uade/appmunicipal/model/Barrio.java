package ar.edu.uade.appmunicipal.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "Barrio Model")
@Entity
@Table(name = "barrio")

@Getter
@Setter
@AllArgsConstructor //Constructor
@NoArgsConstructor //Constructor vacio para persistencia
public class Barrio {

    @Schema(description = "Id del Barrio",requiredMode = Schema.RequiredMode.AUTO )
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cod_barrio")
    private Integer idBarrio;

    @Schema(description = "Nombre del Barrio",requiredMode = Schema.RequiredMode.REQUIRED,example = "Barrio ingles")
    @Column(name = "nombre")
    private String nombre;


    //To string

    @Override
    public String toString() {
        return "Barrio{" +
                "idBarrio=" + idBarrio +
                ", nombre='" + nombre + '\'' +
                '}';
    }
}