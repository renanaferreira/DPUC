package pi.g6.fetchercriacao.entity;

public class Curso {
    private int id;
    private String nome;
    private int unidade_organicaid;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getUnidade_organicaid() {
        return unidade_organicaid;
    }

    public void setUnidade_organicaid(int unidade_organicaid) {
        this.unidade_organicaid = unidade_organicaid;
    }
}