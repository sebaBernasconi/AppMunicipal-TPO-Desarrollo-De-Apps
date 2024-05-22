package ar.edu.uade.appmunicipal.repository;

import ar.edu.uade.appmunicipal.model.Barrio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BarrioRepository extends JpaRepository<Barrio,Integer> {
}