package ar.edu.uade.appmunicipal.repository;

import ar.edu.uade.appmunicipal.model.Promocion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromocionRepository extends JpaRepository<Promocion,Integer> {
}
