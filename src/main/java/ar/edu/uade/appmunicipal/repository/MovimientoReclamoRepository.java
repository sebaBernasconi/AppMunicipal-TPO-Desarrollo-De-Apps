package ar.edu.uade.appmunicipal.repository;

import ar.edu.uade.appmunicipal.model.MovimientoReclamo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface MovimientoReclamoRepository extends JpaRepository<MovimientoReclamo,Integer> {

    List<MovimientoReclamo>findMovimientoReclamoByPersonalMunicipal(int legajo);
    List<MovimientoReclamo>findMovimientoReclamoByReclamo(int idReclamo);
    List<MovimientoReclamo>findMovimientoReclamoByFechaMovimiento(Date fecha);

}
