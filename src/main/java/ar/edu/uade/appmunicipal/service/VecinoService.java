package ar.edu.uade.appmunicipal.service;

import ar.edu.uade.appmunicipal.model.Vecino;
import ar.edu.uade.appmunicipal.repository.VecinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VecinoService {

    @Autowired
    VecinoRepository vecinoRepository;

    public List<Vecino>listarTodosLosVecinos(){
        return vecinoRepository.findAll();
    }

      /*
    public List<Vecino>listarVecinosPorBarrio(int codigoBarrio){
        return vecinoRepository.findAllByBarrio(codigoBarrio);
    }*/

    public Vecino buscarVecino(int dni){
        Optional<Vecino>vecino =vecinoRepository.findById(dni);
        return vecino.orElse(null);
    }
}
