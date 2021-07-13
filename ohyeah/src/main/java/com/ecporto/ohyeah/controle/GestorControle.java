package com.ecporto.ohyeah.controle;

import java.util.List;

import com.ecporto.ohyeah.modelo.GestorModelo;
import com.ecporto.ohyeah.respositorio.RepositorioGestor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class GestorControle {

    @Autowired
    private RepositorioGestor acoes;

    // PAGINA INICIAL
    @GetMapping(value="")
    public String helloWorld(){
        return "Hello World!";
    }

    // CADASTRAR
    @PostMapping(value = "/api")
    public @ResponseBody GestorModelo cadastrar(@RequestBody GestorModelo gm){
        return acoes.save(gm);
    }

    // ALTERAR
    @PutMapping(value = "/api")
    public @ResponseBody GestorModelo alterar(@RequestBody GestorModelo gm){
        return acoes.save(gm);
    }

    // DELETAR
    @DeleteMapping(value = "/api/{codigo}")
    public void remover (@PathVariable int codigo){
        GestorModelo gm = acoes.findByCodigo(codigo);
        acoes.delete(gm);
    }

    // LISTAR TUDO E SELECIONAR
    @GetMapping(value = "/api")
    public @ResponseBody List<GestorModelo> listar(){
        return acoes.findAll();
    }

    // PROCURAR POR CODIGO
    @GetMapping (value = "/api/{codigo}")
    public @ResponseBody GestorModelo pesquisar(@PathVariable int codigo){
        return acoes.findByCodigo(codigo);
    }

  
}
