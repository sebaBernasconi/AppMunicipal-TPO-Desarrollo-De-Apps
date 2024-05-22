package ar.edu.uade.appmunicipal.service;

import ar.edu.uade.appmunicipal.model.Rubro;
import ar.edu.uade.appmunicipal.repository.RubroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RubroService {

    @Autowired
    RubroRepository rubroRepository;

    public List<Rubro>listarRubros(){
        return rubroRepository.findAll();
    }

    public Rubro buscarRubro(int idRubro){
        Optional<Rubro>rubro = rubroRepository.findById(idRubro);
        return rubro.orElse(null);
    }

    public Rubro guardarRubro(Rubro rubro){
        return rubroRepository.save(rubro);
    }
}
