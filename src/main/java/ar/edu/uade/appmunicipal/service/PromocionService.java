package ar.edu.uade.appmunicipal.service;

import ar.edu.uade.appmunicipal.model.Promocion;
import ar.edu.uade.appmunicipal.repository.PromocionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PromocionService {

    @Autowired
    PromocionRepository promocionRepository;

    public List<Promocion>listarPromociones(){
        return promocionRepository.findAll();
    }

    public Promocion buscarPromocion(Integer idPromocion){
        Optional<Promocion>promocion = promocionRepository.findById(idPromocion);
        return promocion.orElse(null);
    }

    public Promocion guardarPromocion(Promocion promocion){
        return promocionRepository.save(promocion);
    }

    public boolean eliminarPromocion(Integer idPromocion){
        boolean eliminado;

        if (promocionRepository.existsById(idPromocion)){
            promocionRepository.deleteById(idPromocion);
            eliminado = true;
        }else {
            eliminado = false;
        }

        return eliminado;
    }


}
