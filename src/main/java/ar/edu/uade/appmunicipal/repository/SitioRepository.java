package ar.edu.uade.appmunicipal.repository;

import ar.edu.uade.appmunicipal.model.Sitio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SitioRepository extends JpaRepository<Sitio,Integer> {
}
