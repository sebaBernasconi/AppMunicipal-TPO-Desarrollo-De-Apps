package ar.edu.uade.appmunicipal.repository;

import ar.edu.uade.appmunicipal.model.MovimientoReclamo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovimientoReclamoRepository extends JpaRepository<MovimientoReclamo,Integer> {
}
