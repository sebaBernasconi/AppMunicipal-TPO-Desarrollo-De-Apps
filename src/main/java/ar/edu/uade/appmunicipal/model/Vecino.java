package ar.edu.uade.appmunicipal.model;

import jakarta.persistence.*;

@Entity
@Table(name = "vecinos")
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

    //Constructor
    public Vecino(int dni, String nombre, String apellido, String direccion, Barrio barrio) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.barrio = barrio;
    }

    //Constructor vacio para la persistencia

    public Vecino() {
    }

    //Getters y Setters

    public int getDni() {
        return dni;
    }

    public void setDni(int dni) {
        this.dni = dni;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Barrio getBarrio() {
        return barrio;
    }

    public void setBarrio(Barrio barrio) {
        this.barrio = barrio;
    }

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
