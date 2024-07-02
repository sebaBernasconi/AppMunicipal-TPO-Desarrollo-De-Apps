package ar.edu.uade.appmunicipal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Schema(description = "Reclamo Model")
@Entity
@Table(name = "reclamos")

@Getter
@Setter
@AllArgsConstructor //Constructor
@NoArgsConstructor //Constructor vacio para persistencia
public class Reclamo {

    @Schema(description = "Id del Reclamo",requiredMode = Schema.RequiredMode.AUTO)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reclamo")
    private Integer idReclamo;

    @Schema(description = "Vecino Model",requiredMode = Schema.RequiredMode.AUTO)
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "dni_vecino")
    private Vecino vecino;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "legajo")
    private PersonalMunicipal personalMunicipal;

    @Schema(description = "Sitio del Reclamo",requiredMode = Schema.RequiredMode.REQUIRED)
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_sitio")
    private Sitio sitio;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_desperfecto")
    private Desperfecto desperfecto;

    @Schema(description = "Descripcion del Reclamo",requiredMode = Schema.RequiredMode.REQUIRED,example = "Semaforo roto")
    @Column(name = "descripcion")
    private String descripcion;

    @Schema(description = "Estado del Reclamo",requiredMode = Schema.RequiredMode.AUTO)
    @Column(name = "estado")
    private String estado;

    @Schema(description = "Imagenes del Reclamo",requiredMode = Schema.RequiredMode.REQUIRED)
    @Lob
    @Column(name = "imagen_local", columnDefinition = "LONGBLOB")
    private byte[] imagenReclamo;

    @Schema(description = "Id del ReclamoUnificado")
    @Column(name = "id_reclamo_unificado")
    private  Integer idReclamoUnificado;

    @Schema(description = "Id del MovimientoReclamo")
    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "id_movimiento")
    private List<MovimientoReclamo>movimientosDelReclamo;


    //Metodos de la clase
    /*
    * actualizar estado
    * asignar personal municipal
    * asignar fotos + atributo(clase img + limite de 7 imgs)*/

    public void actualizarEstado (String nuevoEstado){
        this.estado = nuevoEstado;
    }

    public void asignarPersonalMunicipal(PersonalMunicipal personalMunicipalAsignado){
        this.personalMunicipal = personalMunicipalAsignado;
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
