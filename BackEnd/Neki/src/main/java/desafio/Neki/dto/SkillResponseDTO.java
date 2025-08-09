package desafio.Neki.dto;

// DTO para retornar dados das skills disponíveis
public class SkillResponseDTO {
    
    private Long id;
    private String nome;
    private String imagemUrl;
    private String descricao;
    
    public SkillResponseDTO() {}
    
    public SkillResponseDTO(Long id, String nome, String imagemUrl, String descricao) {
        this.id = id;
        this.nome = nome;
        this.imagemUrl = imagemUrl;
        this.descricao = descricao;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNome() {
        return nome;
    }
    
    public void setNome(String nome) {
        this.nome = nome;
    }
    
    public String getImagemUrl() {
        return imagemUrl;
    }
    
    public void setImagemUrl(String imagemUrl) {
        this.imagemUrl = imagemUrl;
    }
    
    public String getDescricao() {
        return descricao;
    }
    
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
