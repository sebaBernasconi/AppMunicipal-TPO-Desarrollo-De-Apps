package ar.edu.uade.appmunicipal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Schema(description = "MovimientoReclamo Model")
@Entity
@Table(name = "movimientos_reclamos")

@Getter
@Setter
@AllArgsConstructor //Constructor
@NoArgsConstructor //Constructor vacio para la persistencia
public class MovimientoReclamo {

    @Schema(description = "Id del MovimentoReclamo", requiredMode = Schema.RequiredMode.AUTO)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_movimiento")
    private Integer idMovimiento;

    @Schema(description = "Reclamo asociado al Movimiento",requiredMode = Schema.RequiredMode.AUTO)
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name ="id_reclamo")
    private Reclamo reclamo;

    @Schema(description = "PersonalMunicipal Responsable del Movimiento",requiredMode = Schema.RequiredMode.AUTO)
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "responsable")
    private PersonalMunicipal personalMunicipal;

    @Schema(description = "Causa del MovimientoReclamo",requiredMode = Schema.RequiredMode.REQUIRED,example = "El reclamo fue finalizado")
    @Column(name = "causa")
    private String causa;

    @JsonIgnore
    @Schema(description = "Fecha en la que se realizo el Movimiento", requiredMode = Schema.RequiredMode.AUTO)
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
