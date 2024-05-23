package ar.edu.uade.appmunicipal.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.sql.Date;

@Entity
@Table(name ="personal_municipal")
public class PersonalMunicipal {
    @Id
    @Column(name = "legajo")
    private Integer legajo;

    @Column(name = "dni")
    private int dni;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "password")
    private String password;

    @Column(name = "sector")
    private int sector;

    @Column(name = "categoria")
    private int categoria;

    @Column(name = "fecha_ingreso")
    private Date fechaIngreso;

    //Constructor
    public PersonalMunicipal(int legajo, int dni, String nombre, String apellido,
                             String password, int sector, int categoria, Date fechaIngreso) {
        this.legajo = legajo;
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.password = password;
        this.sector = sector;
        this.categoria = categoria;
        this.fechaIngreso = fechaIngreso;
    }

    //Constructor vacio para la persistencia

    public PersonalMunicipal() {
    }

    //Getters y Setters

    public int getLegajo() {
        return legajo;
    }

    public void setLegajo(int legajo) {
        this.legajo = legajo;
    }

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getSector() {
        return sector;
    }

    public void setSector(int sector) {
        this.sector = sector;
    }

    public int getCategoria() {
        return categoria;
    }

    public void setCategoria(int categoria) {
        this.categoria = categoria;
    }

    public Date getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(Date fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    //ToString

    @Override
    public String toString() {
        return "PersonalMunicipal{" +
                "legajo=" + legajo +
                ", dni=" + dni +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", password='" + password + '\'' +
                ", sector=" + sector +
                ", categoria=" + categoria +
                ", fechaIngreso=" + fechaIngreso +
                '}';
    }
}
