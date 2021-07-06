package com.ecporto.ohyeah.respositorio;

import java.util.List;

import com.ecporto.ohyeah.modelo.GestorModelo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioGestor extends CrudRepository<GestorModelo, Integer>{

    // comando cadastrar e alterar
    <Ges extends GestorModelo> Ges save(GestorModelo gm);

    // comando delete
    void delete(GestorModelo gm);

    // listar tudo e selecionar
    List<GestorModelo> findAll();

    // listar por codigo
    GestorModelo findByCodigo(int codigo);








    
}
