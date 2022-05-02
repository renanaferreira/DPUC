package pi.g6.fetchercriacao.entity;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Set;

@Entity
@Table(name = "dpuc")
public class Dpuc {

    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "criacao_edicao", columnDefinition = "TINYINT(1)")
    private boolean criacao_edicao;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "designacao")
    private String designacao;

    @Column(name = "sigla_ac")
    private String sigla_ac;

    @Column(name = "duracao")
    private String duracao;

    @Column(name = "responsavel")
    private String responsavel;

    @Column(name = "carga_horaria")
    private String carga_horaria;

    @Column(name = "horas_contacto")
    private String horas_contacto;

    @Column(name = "horas_trabalho")
    private String horas_trabalho;

    @Column(name = "ects")
    private String ects;

    @Column(name = "objetivos")
    private String objetivos;

    @Column(name = "conteudos")
    private String conteudos;

    @Column(name = "coerencia_conteudos")
    private String coerencia_conteudos;

    @Column(name = "metodologias")
    private String metodologias;

    @Column(name = "coerencia_metodologias")
    private String coerencia_metodologias;

    @Column(name = "bibliografia")
    private String bibliografia;

    @Column(name = "observacoes")
    private String observacoes;

    @Column(name = "regime_faltas")
    private String regime_faltas;

    @Column(name = "linguas")
    private String linguas;

    @Column(name = "modalidade")
    private String modalidade;

    @Column(name = "requisitos")
    private String requisitos;
    
    @Lob
    @Column(name = "ficheiros")
    private byte[] ficheiros;

    @Column(name = "data_alteracao")
    private String data_alteracao;

    @Column(name = "pagina_publica")
    private String pagina_publica;

    @Column(name = "funcionamento")
    private String funcionamento;

    @Column(name = "aprendizagem")
    private String aprendizagem;

    @ManyToOne
    @JoinColumn(name = "id", nullable = false)
    private Estado estado;

    @ManyToOne
    @JoinColumn(name = "id", nullable = false)
    private PeriodoLetivo periodoLetivo;

    @ManyToMany
    @JoinTable(
            name = "curso_dpuc",
            joinColumns = @JoinColumn(name = "id"),
            inverseJoinColumns = @JoinColumn(name = "id"))
    Set<Curso> cursos;

    public Dpuc() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isCriacao_edicao() {
        return criacao_edicao;
    }

    public void setCriacao_edicao(boolean criacao_edicao) {
        this.criacao_edicao = criacao_edicao;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getDesignacao() {
        return designacao;
    }

    public void setDesignacao(String designacao) {
        this.designacao = designacao;
    }

    public String getSigla_ac() {
        return sigla_ac;
    }

    public void setSigla_ac(String sigla_ac) {
        this.sigla_ac = sigla_ac;
    }

    public String getDuracao() {
        return duracao;
    }

    public void setDuracao(String duracao) {
        this.duracao = duracao;
    }

    public String getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(String responsavel) {
        this.responsavel = responsavel;
    }

    public String getCarga_horaria() {
        return carga_horaria;
    }

    public void setCarga_horaria(String carga_horaria) {
        this.carga_horaria = carga_horaria;
    }

    public String getHoras_contacto() {
        return horas_contacto;
    }

    public void setHoras_contacto(String horas_contacto) {
        this.horas_contacto = horas_contacto;
    }

    public String getHoras_trabalho() {
        return horas_trabalho;
    }

    public void setHoras_trabalho(String horas_trabalho) {
        this.horas_trabalho = horas_trabalho;
    }

    public String getEcts() {
        return ects;
    }

    public void setEcts(String ects) {
        this.ects = ects;
    }

    public String getObjetivos() {
        return objetivos;
    }

    public void setObjetivos(String objetivos) {
        this.objetivos = objetivos;
    }

    public String getConteudos() {
        return conteudos;
    }

    public void setConteudos(String conteudos) {
        this.conteudos = conteudos;
    }

    public String getCoerencia_conteudos() {
        return coerencia_conteudos;
    }

    public void setCoerencia_conteudos(String coerencia_conteudos) {
        this.coerencia_conteudos = coerencia_conteudos;
    }

    public String getMetodologias() {
        return metodologias;
    }

    public void setMetodologias(String metodologias) {
        this.metodologias = metodologias;
    }

    public String getCoerencia_metodologias() {
        return coerencia_metodologias;
    }

    public void setCoerencia_metodologias(String coerencia_metodologias) {
        this.coerencia_metodologias = coerencia_metodologias;
    }

    public String getBibliografia() {
        return bibliografia;
    }

    public void setBibliografia(String bibliografia) {
        this.bibliografia = bibliografia;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public String getRegime_faltas() {
        return regime_faltas;
    }

    public void setRegime_faltas(String regime_faltas) {
        this.regime_faltas = regime_faltas;
    }

    public String getLinguas() {
        return linguas;
    }

    public void setLinguas(String linguas) {
        this.linguas = linguas;
    }

    public String getModalidade() {
        return modalidade;
    }

    public void setModalidade(String modalidade) {
        this.modalidade = modalidade;
    }

    public String getRequisitos() {
        return requisitos;
    }

    public void setRequisitos(String requisitos) {
        this.requisitos = requisitos;
    }

    public byte[] getFicheiros() {
        return ficheiros;
    }

    public void setFicheiros(byte[] ficheiros) {
        this.ficheiros = ficheiros;
    }

    public String getData_alteracao() {
        return data_alteracao;
    }

    public void setData_alteracao(String data_alteracao) {
        this.data_alteracao = data_alteracao;
    }

    public String getPagina_publica() {
        return pagina_publica;
    }

    public void setPagina_publica(String pagina_publica) {
        this.pagina_publica = pagina_publica;
    }

    public String getFuncionamento() {
        return funcionamento;
    }

    public void setFuncionamento(String funcionamento) {
        this.funcionamento = funcionamento;
    }

    public String getAprendizagem() {
        return aprendizagem;
    }

    public void setAprendizagem(String aprendizagem) {
        this.aprendizagem = aprendizagem;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public PeriodoLetivo getPeriodoLetivo() {
        return periodoLetivo;
    }

    public void setPeriodoLetivo(PeriodoLetivo periodoLetivo) {
        this.periodoLetivo = periodoLetivo;
    }

    public Set<Curso> getCursos() {
        return cursos;
    }

    public void setCursos(Set<Curso> cursos) {
        this.cursos = cursos;
    }
}
