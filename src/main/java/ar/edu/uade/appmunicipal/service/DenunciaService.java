package ar.edu.uade.appmunicipal.service;

import ar.edu.uade.appmunicipal.model.Denuncia;
import ar.edu.uade.appmunicipal.repository.DenunciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DenunciaService {

    @Autowired
    DenunciaRepository denunciaRepository;

    public List<Denuncia>listarDenuncias(){
        return denunciaRepository.findAll();
    }

    public List<Denuncia>listarDenunciasPorVecino(int dni){
        return denunciaRepository.findDenunciaByVecino(dni);
    }

    public List<Denuncia>listarDenunciaPorSitio(int idSitio){
        return denunciaRepository.findDenunciaBySitio(idSitio);
    }

    public List<Denuncia>listarDenunciaPorEstado(String estado){
        return denunciaRepository.findDenunciaByEstado(estado);
    }

    public Denuncia buscarDenuncia(int idDenuncia){
        Optional<Denuncia>denuncia = denunciaRepository.findById(idDenuncia);
        return denuncia.orElse(null);
    }

    public Denuncia guardarDenuncia(Denuncia denuncia){
        return denunciaRepository.save(denuncia);
    }
}
