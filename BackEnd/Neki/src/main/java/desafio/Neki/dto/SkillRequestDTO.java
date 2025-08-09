package desafio.Neki.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// DTO para receber dados de criação de nova skill
public class SkillRequestDTO {
    
    @NotBlank(message = "Nome da skill é obrigatório")
    @Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
    private String nome;
    
    @NotBlank(message = "URL da imagem é obrigatória")
    private String imagemUrl;
    
    @Size(max = 500, message = "Descrição deve ter no máximo 500 caracteres")
    private String descricao;
    
    public SkillRequestDTO() {}
    
    public SkillRequestDTO(String nome, String imagemUrl, String descricao) {
        this.nome = nome;
        this.imagemUrl = imagemUrl;
        this.descricao = descricao;
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
