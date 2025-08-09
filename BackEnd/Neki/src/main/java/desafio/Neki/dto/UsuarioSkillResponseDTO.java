package desafio.Neki.dto;

public class UsuarioSkillResponseDTO {
    
    private Long id;
    private Long skillId;
    private String skillNome;
    private String skillImagemUrl;
    private String skillDescricao;
    private Integer level;
    
    public UsuarioSkillResponseDTO() {}
    
    public UsuarioSkillResponseDTO(Long id, Long skillId, String skillNome, 
                                   String skillImagemUrl, String skillDescricao, Integer level) {
        this.id = id;
        this.skillId = skillId;
        this.skillNome = skillNome;
        this.skillImagemUrl = skillImagemUrl;
        this.skillDescricao = skillDescricao;
        this.level = level;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getSkillId() {
        return skillId;
    }
    
    public void setSkillId(Long skillId) {
        this.skillId = skillId;
    }
    
    public String getSkillNome() {
        return skillNome;
    }
    
    public void setSkillNome(String skillNome) {
        this.skillNome = skillNome;
    }
    
    public String getSkillImagemUrl() {
        return skillImagemUrl;
    }
    
    public void setSkillImagemUrl(String skillImagemUrl) {
        this.skillImagemUrl = skillImagemUrl;
    }
    
    public String getSkillDescricao() {
        return skillDescricao;
    }
    
    public void setSkillDescricao(String skillDescricao) {
        this.skillDescricao = skillDescricao;
    }
    
    public Integer getLevel() {
        return level;
    }
    
    public void setLevel(Integer level) {
        this.level = level;
    }
}
