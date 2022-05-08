package pi.g6.fetchercriacao.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pi.g6.fetchercriacao.entity.Dpuc;
import pi.g6.fetchercriacao.service.CreatorService;

@RestController
@RequestMapping("/creation")
@Log4j2
public class MainController {


    @Autowired
    private final CreatorService service;

    public MainController(CreatorService service) {
        this.service = service;
    }

    @PostMapping("/createUC")
    public ResponseEntity<Dpuc> createUC(@RequestParam(name = "designacao") String designacao,
                                         @RequestParam(name = "sigla_ac") String sigla_ac,
                                         @RequestParam(name = "ects") String ects,
                                         @RequestParam(name = "responsavel") String responsavel){
        log.info("Requested DPUC!");
        Dpuc dpuc = service.createUCVersion(designacao, sigla_ac, ects, responsavel);
        return new ResponseEntity<>(dpuc, HttpStatus.OK);
    }
}
