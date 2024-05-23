package ar.edu.uade.appmunicipal.model;

import jakarta.persistence.*;

import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "sitio")

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

    //Constructor

    public Sitio(int idSitio, int latitud, int longitud, String calle, int nroCalle, String entreCalleA,
                 String entreCalleB, String descripcion, PersonalMunicipal personalMunicipal,
                 Date fechaApertura, Date fechaCierre, String comentarios) {
        this.idSitio = idSitio;
        this.latitud = latitud;
        this.longitud = longitud;
        this.calle = calle;
        this.nroCalle = nroCalle;
        this.entreCalleA = entreCalleA;
        this.entreCalleB = entreCalleB;
        this.descripcion = descripcion;
        this.personalMunicipal = personalMunicipal;
        this.fechaApertura = fechaApertura;
        this.fechaCierre = fechaCierre;
        this.comentarios = comentarios;
    }

    //Constructor vacio para la persistencia

    public Sitio() {
    }

    //Getters y Setters

    public int getIdSitio() {
        return idSitio;
    }

    public void setIdSitio(int idSitio) {
        this.idSitio = idSitio;
    }

    public int getLatitud() {
        return latitud;
    }

    public void setLatitud(int latitud) {
        this.latitud = latitud;
    }

    public int getLongitud() {
        return longitud;
    }

    public void setLongitud(int longitud) {
        this.longitud = longitud;
    }

    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public int getNroCalle() {
        return nroCalle;
    }

    public void setNroCalle(int nroCalle) {
        this.nroCalle = nroCalle;
    }

    public String getEntreCalleA() {
        return entreCalleA;
    }

    public void setEntreCalleA(String entreCalleA) {
        this.entreCalleA = entreCalleA;
    }

    public String getEntreCalleB() {
        return entreCalleB;
    }

    public void setEntreCalleB(String entreCalleB) {
        this.entreCalleB = entreCalleB;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public PersonalMunicipal getPersonalMunicipal() {
        return personalMunicipal;
    }

    public void setPersonalMunicipal(PersonalMunicipal personalMunicipal) {
        this.personalMunicipal = personalMunicipal;
    }

    public Date getFechaApertura() {
        return fechaApertura;
    }

    public void setFechaApertura(Date fechaApertura) {
        this.fechaApertura = fechaApertura;
    }

    public Date getFechaCierre() {
        return fechaCierre;
    }

    public void setFechaCierre(Date fechaCierre) {
        this.fechaCierre = fechaCierre;
    }

    public String getComentarios() {
        return comentarios;
    }

    public void setComentarios(String comentarios) {
        this.comentarios = comentarios;
    }

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
