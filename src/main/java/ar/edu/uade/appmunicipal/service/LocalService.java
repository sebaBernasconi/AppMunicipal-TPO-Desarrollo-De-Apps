package ar.edu.uade.appmunicipal.service;

import ar.edu.uade.appmunicipal.model.Local;
import ar.edu.uade.appmunicipal.repository.LocalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocalService {

    @Autowired
    LocalRepository localRepository;

    public List<Local>listarLocales(){
        return localRepository.findAll();
    }

    public Local buscarLocal(Integer idLocal){
        Optional<Local>local = localRepository.findById(idLocal);
        return local.orElse(null);
    }

    public Local guardarLocal(Local local){
        return localRepository.save(local);
    }

    public Local agregarPromocion(Integer idLocal, String promocion){
        Optional<Local> local = localRepository.findById(idLocal);

        local.orElse(null).setPromocion(promocion);
        return localRepository.save(local.orElse(null));
    }

    /*public Local modificarContacto(Integer idLocal,String nuevoContacto){
       Optional<Local> local = localRepository.findById(idLocal);

        local.orElse(null).setContacto(nuevoContacto);
        return localRepository.save(local.orElse(null));
    }*/

}
