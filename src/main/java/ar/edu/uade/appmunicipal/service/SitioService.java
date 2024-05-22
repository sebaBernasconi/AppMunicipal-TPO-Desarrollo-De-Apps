package ar.edu.uade.appmunicipal.service;

import ar.edu.uade.appmunicipal.model.Sitio;
import ar.edu.uade.appmunicipal.repository.SitioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SitioService {

    @Autowired
    SitioRepository sitioRepository;

    public List<Sitio>listarSitios(){
        return sitioRepository.findAll();
    }

    public Sitio buscarSitio(int idSitio){
        Optional<Sitio>sitio = sitioRepository.findById(idSitio);
        return sitio.orElse(null);
    }

    public Sitio guardarSitio(Sitio sitio){
        return sitioRepository.save(sitio);
    }
}
