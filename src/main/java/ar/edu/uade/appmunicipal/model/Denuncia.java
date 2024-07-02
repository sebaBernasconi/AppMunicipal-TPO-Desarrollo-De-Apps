package ar.edu.uade.appmunicipal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "Denuncia Model")
@Entity
@Table(name = "denuncias")

@Getter
@Setter
@AllArgsConstructor //Constructor
@NoArgsConstructor //Constructor vacio para la persistencia
public class Denuncia {

    @Schema(description = "Id de la Denuncia", requiredMode = Schema.RequiredMode.AUTO)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_denuncia")
    private Integer idDenuncia;

    @Schema(description = "Vecino asociado a la Denuncia", requiredMode = Schema.RequiredMode.REQUIRED)
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "dni")
    private Vecino vecino;

    @Schema(description = "Sitio asociado a la Denuncia", requiredMode = Schema.RequiredMode.REQUIRED)
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_sitio")
    private Sitio sitio;

    @Schema(description = "Descripcion de la Denuncia",requiredMode = Schema.RequiredMode.REQUIRED,example = "Ruidos molestos a la madrugada")
    @Column(name = "descripcion")
    private String descripcion;

    @Schema(description = "Estado de la Denuncia", requiredMode = Schema.RequiredMode.AUTO)
    @Column(name = "estado")
    private String estado;

    @Schema(description = "Indica si el Vecino acepta las consecuencias si la Denuncia fuera Falsa",requiredMode = Schema.RequiredMode.REQUIRED,example = "true")
    @Column(name = "acepta_responsabilidad")
    private boolean aceptaResponsabilidad;

    @Schema(description = "Imagenes de la Denuncia",requiredMode = Schema.RequiredMode.REQUIRED)
    @Lob
    @Column(name = "imagen_local", columnDefinition = "LONGBLOB")
    private byte[] imagenDenuncia;

    //Metodos de la clase
    public void actualizarEstado(String nuevoEstado){
        this.estado = nuevoEstado;
    }
    //ToString

    @Override
    public String toString() {
        return "Denuncia{" +
                "idDenuncia=" + idDenuncia +
                ", vecino=" + vecino +
                ", sitio=" + sitio +
                ", descripcion='" + descripcion + '\'' +
                ", estado='" + estado + '\'' +
                ", aceptaResponsabilidad=" + aceptaResponsabilidad +
                '}';
    }
}
