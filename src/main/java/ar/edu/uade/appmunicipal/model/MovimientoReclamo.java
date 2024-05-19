package ar.edu.uade.appmunicipal.model;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "movimientos_reclamos")
public class MovimientoReclamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_movimiento")
    private int idMovimiento;

    //Falta agregar la relacion con los reclamos

    @ManyToOne(cascade = CascadeType.ALL)
    @Column(name = "responsable")
    private PersonalMunicipal personalMunicipal;

    @Column(name = "causa")
    private String causa;

    @Column(name = "fecha_movimiento")
    private Date fechaMovimiento;
}
