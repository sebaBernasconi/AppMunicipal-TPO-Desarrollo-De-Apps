package ar.edu.uade.appmunicipal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Entity
@Table(name = "movimientos_reclamos")

@Getter
@Setter
@AllArgsConstructor //Constructor
@NoArgsConstructor //Constructor vacio para la persistencia
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
