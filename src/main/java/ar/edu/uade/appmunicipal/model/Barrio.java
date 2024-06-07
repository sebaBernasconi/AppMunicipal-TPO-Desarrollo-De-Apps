package ar.edu.uade.appmunicipal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "barrio")

@Getter
@Setter
@AllArgsConstructor //Constructor
@NoArgsConstructor //Constructor vacio para persistencia
public class Barrio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cod_barrio")
    private Integer idBarrio;

    @Column(name = "nombre")
    private String nombre;


    //To string

    @Override
    public String toString() {
        return "Barrio{" +
                "idBarrio=" + idBarrio +
                ", nombre='" + nombre + '\'' +
                '}';
    }
}