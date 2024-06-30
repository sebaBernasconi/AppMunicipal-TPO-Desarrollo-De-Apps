package ar.edu.uade.appmunicipal.service;

import ar.edu.uade.appmunicipal.model.DTOs.DenunciaDTO;
import ar.edu.uade.appmunicipal.model.Denuncia;
import ar.edu.uade.appmunicipal.model.Sitio;
import ar.edu.uade.appmunicipal.model.Vecino;
import ar.edu.uade.appmunicipal.repository.DenunciaRepository;
import ar.edu.uade.appmunicipal.repository.VecinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class DenunciaService {

    @Autowired
    DenunciaRepository denunciaRepository;

    @Autowired
    VecinoRepository vecinoRepository;

    @Autowired
    SitioService sitioService;

    public List<Denuncia>listarDenuncias(){
        return denunciaRepository.findAll();
    }

    public Denuncia buscarDenuncia(int idDenuncia){
        Optional<Denuncia>denuncia = denunciaRepository.findById(idDenuncia);
        return denuncia.orElse(null);
    }

    public Denuncia guardarDenuncia(DenunciaDTO denunciaDTO, MultipartFile archivo) throws Exception {

        Optional<Vecino>vecinoOptional = vecinoRepository.findById(denunciaDTO.getIdVecino());

        if (vecinoOptional.isEmpty()) {
            throw new Exception("No se encontro un vecino con ese DNI");
        }

        if (archivo.isEmpty()) {
            throw new Exception("No hay imagen asociada a la denuncia");
        }
        byte[] imagenDenuncia = archivo.getBytes();

        Sitio nuevoSitio = sitioService.guardarSitio(denunciaDTO.getSitio());

        Denuncia denuncia = new Denuncia();

        denuncia.setVecino(vecinoOptional.get());
        denuncia.setSitio(nuevoSitio);
        denuncia.setDescripcion(denunciaDTO.getDescripcion());
        denuncia.setEstado("Pendiente");
        denuncia.setAceptaResponsabilidad(denunciaDTO.isAceptaResponsabilidad());
        denuncia.setImagenDenuncia(imagenDenuncia);

        return denunciaRepository.save(denuncia);
    }

    public Denuncia actualizarEstado(Integer idDenuncia, String nuevoEstado){
        Optional<Denuncia>denunciaParaActualizar = denunciaRepository.findById(idDenuncia);
        denunciaParaActualizar.orElse(null).actualizarEstado(nuevoEstado);

        denunciaRepository.save(denunciaParaActualizar.orElse(null));

        return denunciaParaActualizar.orElse(null);
    }
}
