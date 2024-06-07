package ar.edu.uade.appmunicipal.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Entity
@Table(name ="personal_municipal")

@Getter
@Setter
@AllArgsConstructor //Constructor
@NoArgsConstructor //Constructor vacio para la persistencia
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
