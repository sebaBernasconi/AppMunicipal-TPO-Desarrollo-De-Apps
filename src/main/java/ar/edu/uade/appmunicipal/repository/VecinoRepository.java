package ar.edu.uade.appmunicipal.repository;

import ar.edu.uade.appmunicipal.model.Vecino;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VecinoRepository extends JpaRepository<Vecino, Integer> {
}
