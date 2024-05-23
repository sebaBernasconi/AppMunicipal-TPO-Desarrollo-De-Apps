package ar.edu.uade.appmunicipal.model;

import jakarta.persistence.*;

@Entity
@Table(name = "barrio")
public class Barrio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cod_barrio")
    private Integer idBarrio;

    @Column(name = "nombre")
    private String nombre;

    //Constructor
    public Barrio(int idBarrio, String nombre) {
        this.idBarrio = idBarrio;
        this.nombre = nombre;
    }

    //Constructor vacio para la persistencia

    public Barrio() {
    }

    //Getters y Setters

    public int getIdBarrio() {
        return idBarrio;
    }

    public void setIdBarrio(int idBarrio) {
        this.idBarrio = idBarrio;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    //To string

    @Override
    public String toString() {
        return "Barrio{" +
                "idBarrio=" + idBarrio +
                ", nombre='" + nombre + '\'' +
                '}';
    }
}