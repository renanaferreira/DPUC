package pi.g6.fetchercriacao.service;

import pi.g6.fetchercriacao.entity.*;

import java.util.List;

public interface CreationService {
    List<Estado> getEstados();
    List<PeriodoLetivo> getPeriodos();
    List<DpucUc> getDPUCs();
    DpucUc getDPUC(int id);
    List<UnidadeOrganica> getUOs();
    List<Curso> getCursos();
    List<Curso> getCursos(String UO);
    List<String> getIdiomas();
    List<Utilizadores> getDocentes();
    List<AreaCientifica> getAreasCientificas();
}
