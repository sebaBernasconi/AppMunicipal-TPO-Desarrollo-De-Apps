package ar.edu.uade.appmunicipal.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Schema(description = "Sitio Model")
@Entity
@Table(name = "sitio")

@Getter
@Setter
@AllArgsConstructor //Constructor
@NoArgsConstructor //Constructor vacio para persistencia

public class Sitio {
    @Schema(description = "Id del Sitio",requiredMode = Schema.RequiredMode.AUTO)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sitio")
    private Integer idSitio;

    @Schema(description = "Latitud del Sitio", requiredMode = Schema.RequiredMode.AUTO)
    @Column(name = "latitud")
    private int latitud;

    @Schema(description = "Longitud del Sitio", requiredMode = Schema.RequiredMode.AUTO)
    @Column(name = "longitud")
    private int longitud;

    @Schema(description = "Calle del Sitio", requiredMode = Schema.RequiredMode.REQUIRED,example = "Lima")
    @Column(name = "calle")
    private String calle;

    @Schema(description = "Numero de la calle del Sitio", requiredMode = Schema.RequiredMode.REQUIRED,example = "234")
    @Column(name = "numero_calle")
    private int nroCalle;

    @Schema(description = "Primer entre calle del Sitio", requiredMode = Schema.RequiredMode.REQUIRED,example = "Independencia")
    @Column(name = "entre_calla_a")
    private String entreCalleA;

    @Schema(description = "Segunda entre calle del Sitio", requiredMode = Schema.RequiredMode.REQUIRED,example = "Chile")
    @Column(name = "entre_calla_b")
    private String entreCalleB;

    @Schema(description = "Descripcion del Sitio", requiredMode = Schema.RequiredMode.REQUIRED,example = "Universidad Argentina De la Empresa")
    @Column(name = "descripcion")
    private String descripcion;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "legajo")
    private PersonalMunicipal personalMunicipal;

    @Column(name = "fecha_apertura")
    private Date fechaApertura;

    @Column(name = "fecha_cierre")
    private Date fechaCierre;

    @Schema(description = "Comentarios del Sitio", requiredMode = Schema.RequiredMode.REQUIRED,example = "No aparece en google maps")
    @Column(name = "comentarios")
    private String comentarios;

    //ToString

    @Override
    public String toString() {
        return "Sitio{" +
                "idSitio=" + idSitio +
                ", latitud=" + latitud +
                ", longitud=" + longitud +
                ", calle='" + calle + '\'' +
                ", nroCalle=" + nroCalle +
                ", entreCalleA='" + entreCalleA + '\'' +
                ", entreCalleB='" + entreCalleB + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", personalMunicipal=" + personalMunicipal +
                ", fechaApertura=" + fechaApertura +
                ", fechaCierre=" + fechaCierre +
                ", comentarios='" + comentarios.toString() + '\'' +
                '}';
    }
}
