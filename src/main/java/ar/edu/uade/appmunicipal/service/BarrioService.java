package ar.edu.uade.appmunicipal.service;

import ar.edu.uade.appmunicipal.model.Barrio;
import ar.edu.uade.appmunicipal.repository.BarrioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BarrioService {

    @Autowired
    BarrioRepository barrioRepository;

    public List<Barrio>listarBarrios(){
        return barrioRepository.findAll();
    }

    public Barrio buscarBarrio(int codigoBarrio){
        Optional<Barrio>barrio = barrioRepository.findById(codigoBarrio);
        return barrio.orElse(null);
    }
}
