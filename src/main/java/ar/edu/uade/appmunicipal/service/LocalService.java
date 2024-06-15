package ar.edu.uade.appmunicipal.service;

import ar.edu.uade.appmunicipal.model.DTOs.LocalDTO;
import ar.edu.uade.appmunicipal.model.Local;
import ar.edu.uade.appmunicipal.model.Rubro;
import ar.edu.uade.appmunicipal.model.Sitio;
import ar.edu.uade.appmunicipal.model.Vecino;
import ar.edu.uade.appmunicipal.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class LocalService {

    @Autowired
    LocalRepository localRepository;

    @Autowired
    VecinoRepository vecinoRepository;

    @Autowired
    RubroRepository rubroRepository;

    @Autowired
    SitioRepository sitioRepository;

    public List<Local>listarLocales(){
        return localRepository.findAll();
    }

    public Local buscarLocal(Integer idLocal){
        Optional<Local>local = localRepository.findById(idLocal);
        return local.orElse(null);
    }

    public Local guardarLocal(LocalDTO localDTO, MultipartFile archivo) throws Exception {
        Optional<Vecino> vecinoOp = this.vecinoRepository.findById(localDTO.getIdVecino());
        Optional<Rubro> rubroOp = this.rubroRepository.findById(localDTO.getIdRubro());
        if (archivo.isEmpty()) {
            throw new Exception("No hay imagen asociada con el local");
        }
        byte[] imagenLocal = archivo.getBytes();
        if (vecinoOp.isEmpty()) {
            throw new Exception("El vecino no se encuentra en la base de datos");
        }
        if (rubroOp.isEmpty()) {
            throw new Exception("El rubro no se encuentra en la base de datos");
        }

        Local local = new Local();
        local.setVecino(vecinoOp.get());
        local.setRubro(rubroOp.get());
        local.setNombre(localDTO.getNombre());
        local.setPromocion(localDTO.getPromocion());
        local.setContacto(localDTO.getContacto());
        local.setDescripcion(localDTO.getDescripcion());
        local.setImagenLocal(imagenLocal);
        return localRepository.save(local);
    }

    public Local agregarPromocion(Integer idLocal, String promocion){
        Optional<Local> local = localRepository.findById(idLocal);

        local.orElse(null).setPromocion(promocion);
        return localRepository.save(local.orElse(null));
    }

    public Local eliminarPromocion(Integer idLocal){
        Optional<Local>local = localRepository.findById(idLocal);

        local.orElse(null).setPromocion("");
        return localRepository.save(local.orElse(null));
    }

}
