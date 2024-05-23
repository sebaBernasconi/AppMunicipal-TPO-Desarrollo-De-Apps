package ar.edu.uade.appmunicipal.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "reclamos")
public class Reclamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reclamo")
    private Integer idReclamo;

    @ManyToOne(cascade = CascadeType.ALL)
    @Column(name = "dni_vecino")
    private Vecino vecino;

    @ManyToOne(cascade = CascadeType.ALL)
    @Column(name = "legajo")
    private PersonalMunicipal personalMunicipal;

    @ManyToOne(cascade = CascadeType.ALL)
    @Column(name = "id_sitio")
    private Sitio sitio;

    @OneToOne(cascade = CascadeType.ALL)
    @Column(name = "id_desperfecto")
    private Desperfecto desperfecto;

    @Column(name = "descripcion")
    private String descripcion;

    //Transformar en enumeracion(?
    //Patron state?(jodaaaa)
    @Column(name = "estado")
    private String estado;

    @Column(name = "id_reclamo_unificado")
    private  Integer idReclamoUnificado;

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private List<MovimientoReclamo>movimientosDelReclamo;

    //Constructor


    public Reclamo(int idReclamo, Vecino vecino, PersonalMunicipal personalMunicipal, Sitio sitio,
                   Desperfecto desperfecto, String descripcion,
                   String estado, List<MovimientoReclamo> movimientosDelReclamo) {
        this.idReclamo = idReclamo;
        this.vecino = vecino;
        this.personalMunicipal = personalMunicipal;
        this.sitio = sitio;
        this.desperfecto = desperfecto;
        this.descripcion = descripcion;
        this.estado = estado;
        this.idReclamoUnificado = null;
        this.movimientosDelReclamo = movimientosDelReclamo;
    }

    //Constructor vacio para la persistencia

    public Reclamo() {
    }

    //Getters y Setters

    public int getIdReclamo() {
        return idReclamo;
    }

    public void setIdReclamo(int idReclamo) {
        this.idReclamo = idReclamo;
    }

    public Vecino getVecino() {
        return vecino;
    }

    public void setVecino(Vecino vecino) {
        this.vecino = vecino;
    }

    public PersonalMunicipal getPersonalMunicipal() {
        return personalMunicipal;
    }

    public void setPersonalMunicipal(PersonalMunicipal personalMunicipal) {
        this.personalMunicipal = personalMunicipal;
    }

    public Sitio getSitio() {
        return sitio;
    }

    public void setSitio(Sitio sitio) {
        this.sitio = sitio;
    }

    public Desperfecto getDesperfecto() {
        return desperfecto;
    }

    public void setDesperfecto(Desperfecto desperfecto) {
        this.desperfecto = desperfecto;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public List<MovimientoReclamo> getMovimientosDelReclamo() {
        return movimientosDelReclamo;
    }

    public void setMovimientosDelReclamo(List<MovimientoReclamo> movimientosDelReclamo) {
        this.movimientosDelReclamo = movimientosDelReclamo;
    }

    //ToString

    @Override
    public String toString() {
        return "Reclamo{" +
                "idReclamo=" + idReclamo +
                ", vecino=" + vecino +
                ", personalMunicipal=" + personalMunicipal +
                ", sitio=" + sitio +
                ", desperfecto=" + desperfecto +
                ", descripcion='" + descripcion + '\'' +
                ", estado='" + estado + '\'' +
                ", movimientosDelReclamo=" + movimientosDelReclamo +
                '}';
    }
}
