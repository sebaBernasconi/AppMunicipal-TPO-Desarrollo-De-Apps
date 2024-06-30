package ar.edu.uade.appmunicipal.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Schema(description = "PersonalMunicipal Model")
@Entity
@Table(name ="personal_municipal")

@Getter
@Setter
@AllArgsConstructor //Constructor
@NoArgsConstructor //Constructor vacio para la persistencia
public class PersonalMunicipal {

    @Schema(description = "Legajo del PersonalMunicipal",requiredMode = Schema.RequiredMode.REQUIRED,example = "24232")
    @Id
    @Column(name = "legajo")
    private Integer legajo;

    @Schema(description = "DNI del PersonalMuinicipal",requiredMode = Schema.RequiredMode.REQUIRED,example = "22333444")
    @Column(name = "dni")
    private int dni;

    @Schema(description = "Nombre del PersonalMunicipal",requiredMode = Schema.RequiredMode.REQUIRED,example = "Juan")
    @Column(name = "nombre")
    private String nombre;

    @Schema(description = "Apellido del PersonalMunicipal",requiredMode = Schema.RequiredMode.REQUIRED,example = "Perez")
    @Column(name = "apellido")
    private String apellido;

    @Schema(description = "Password del PersonalMunicipal",requiredMode = Schema.RequiredMode.AUTO)
    @Column(name = "password")
    private String password;

    @Schema(description = "Sector donde trabaja el PersonalMunicipal",requiredMode = Schema.RequiredMode.REQUIRED,example = "Administracion")
    @Column(name = "sector")
    private String sector;

    @Schema(description = "Categoria del PersonalMunicipal",requiredMode = Schema.RequiredMode.REQUIRED,example = "Categoria 2")
    @Column(name = "categoria")
    private int categoria;

    @Schema(description = "Fecha de contratacion del PersonalMunicipal",requiredMode = Schema.RequiredMode.AUTO)
    @Column(name = "fecha_ingreso")
    private Date fechaIngreso;

    //ToString

    @Override
    public String toString() {
        return "PersonalMunicipal{" +
                "legajo=" + legajo +
                ", dni=" + dni +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", password='" + password + '\'' +
                ", sector=" + sector +
                ", categoria=" + categoria +
                ", fechaIngreso=" + fechaIngreso +
                '}';
    }
}
