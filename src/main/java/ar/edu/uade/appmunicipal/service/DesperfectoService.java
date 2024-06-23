package ar.edu.uade.appmunicipal.service;

import ar.edu.uade.appmunicipal.model.DTOs.DesperfectoDTO;
import ar.edu.uade.appmunicipal.model.Desperfecto;
import ar.edu.uade.appmunicipal.model.Rubro;
import ar.edu.uade.appmunicipal.repository.DesperfectoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DesperfectoService {

    @Autowired
    DesperfectoRepository desperfectoRepository;
    @Autowired
    private RubroService rubroService;

    public List<Desperfecto>listarDesperfectos(){
        return desperfectoRepository.findAll();
    }

    public Desperfecto buscarDesperfecto(int idDesperfecto){
        Optional<Desperfecto>desperfecto = desperfectoRepository.findById(idDesperfecto);
        return desperfecto.orElse(null);
    }

    public Desperfecto guardarDesperfecto(DesperfectoDTO desperfectoDTO){
        Rubro rubro = rubroService.buscarRubro(desperfectoDTO.getIdRubro());

        Desperfecto desperfectoDb = new Desperfecto();
        desperfectoDb.setRubro(rubro);
        desperfectoDb.setDescripcion(desperfectoDTO.getDescripcion());
        return desperfectoRepository.save(desperfectoDb);
    }
}
