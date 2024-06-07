package ar.edu.uade.appmunicipal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "vecinos")

@Getter
@Setter
@AllArgsConstructor //Constructor
@NoArgsConstructor //Constructor vacio para persistencia
public class Vecino {

    @Id
    @Column(name = "dni")
    private Integer dni;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "direccion")
    private String direccion;

    //Falta mappedBy?
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cod_barrio")
    private Barrio barrio;

    //To String

    @Override
    public String toString() {
        return "Vecino{" +
                "dni=" + dni +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", direccion='" + direccion + '\'' +
                ", barrio=" + barrio.toString() +
                '}';
    }
}
