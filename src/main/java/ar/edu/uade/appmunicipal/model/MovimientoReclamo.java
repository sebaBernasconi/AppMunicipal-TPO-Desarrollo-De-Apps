package ar.edu.uade.appmunicipal.model;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "movimientos_reclamos")
public class MovimientoReclamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_movimiento")
    private Integer idMovimiento;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name ="id_reclamo")
    private Reclamo reclamo;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "responsable")
    private PersonalMunicipal personalMunicipal;

    @Column(name = "causa")
    private String causa;

    @Column(name = "fecha_movimiento")
    private Date fechaMovimiento;

    //Constructos

    public MovimientoReclamo(int idMovimiento, Reclamo reclamo, PersonalMunicipal personalMunicipal,
                             String causa, Date fechaMovimiento) {
        this.idMovimiento = idMovimiento;
        this.reclamo = reclamo;
        this.personalMunicipal = personalMunicipal;
        this.causa = causa;
        this.fechaMovimiento = fechaMovimiento;
    }

    //Contsructor vacio para la persistencia

    public MovimientoReclamo() {
    }

    //Getters y Setters

    public int getIdMovimiento() {
        return idMovimiento;
    }

    public void setIdMovimiento(int idMovimiento) {
        this.idMovimiento = idMovimiento;
    }

    public Reclamo getReclamo() {
        return reclamo;
    }

    public void setReclamo(Reclamo reclamo) {
        this.reclamo = reclamo;
    }

    public PersonalMunicipal getPersonalMunicipal() {
        return personalMunicipal;
    }

    public void setPersonalMunicipal(PersonalMunicipal personalMunicipal) {
        this.personalMunicipal = personalMunicipal;
    }

    public String getCausa() {
        return causa;
    }

    public void setCausa(String causa) {
        this.causa = causa;
    }

    public Date getFechaMovimiento() {
        return fechaMovimiento;
    }

    public void setFechaMovimiento(Date fechaMovimiento) {
        this.fechaMovimiento = fechaMovimiento;
    }

    //ToString

    @Override
    public String toString() {
        return "MovimientoReclamo{" +
                "idMovimiento=" + idMovimiento +
                ", reclamo=" + reclamo +
                ", personalMunicipal=" + personalMunicipal +
                ", causa='" + causa + '\'' +
                ", fechaMovimiento=" + fechaMovimiento +
                '}';
    }
}
