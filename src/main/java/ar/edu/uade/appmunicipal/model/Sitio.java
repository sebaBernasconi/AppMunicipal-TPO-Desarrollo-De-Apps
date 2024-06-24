package ar.edu.uade.appmunicipal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Entity
@Table(name = "sitio")

@Getter
@Setter
@AllArgsConstructor //Constructor
@NoArgsConstructor //Constructor vacio para persistencia

public class Sitio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sitio")
    private Integer idSitio;

    @Column(name = "latitud")
    private int latitud;

    @Column(name = "longitud")
    private int longitud;

    @Column(name = "calle")
    private String calle;

    @Column(name = "numero_calle")
    private int nroCalle;

    @Column(name = "entre_calla_a")
    private String entreCalleA;

    @Column(name = "entre_calla_b")
    private String entreCalleB;

    @Column(name = "descripcion")
    private String descripcion;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "legajo")
    private PersonalMunicipal personalMunicipal;

    @Column(name = "fecha_apertura")
    private Date fechaApertura;

    @Column(name = "fecha_cierre")
    private Date fechaCierre;

    @Column(name = "comentarios")
    private String comentarios;
    /*¿Comentarios del sitio como estaba en el momento del reclamo/denuncia?
    * Si es algo que se actualiza y puede haber muchos transformar a List<String>*/

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
