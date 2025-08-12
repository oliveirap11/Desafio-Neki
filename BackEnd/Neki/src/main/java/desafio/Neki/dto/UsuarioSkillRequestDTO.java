package desafio.Neki.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Dados para associar uma skill ao usuário")
public class UsuarioSkillRequestDTO {
    
    @Schema(description = "ID da skill a ser associada", required = true, example = "1")
    @NotNull(message = "ID da skill é obrigatório")
    private Long skillId;
    
    @Schema(description = "Nível de proficiência (1-10)", required = true, example = "5")
    @NotNull(message = "Nível é obrigatório")
    @Min(value = 1, message = "Nível deve ser pelo menos 1")
    @Max(value = 10, message = "Nível deve ser no máximo 10")
    private Integer level;
    
    public UsuarioSkillRequestDTO() {}
    
    public UsuarioSkillRequestDTO(Long skillId, Integer level) {
        this.skillId = skillId;
        this.level = level;
    }
    
    public Long getSkillId() {
        return skillId;
    }
    
    public void setSkillId(Long skillId) {
        this.skillId = skillId;
    }
    
    public Integer getLevel() {
        return level;
    }
    
    public void setLevel(Integer level) {
        this.level = level;
    }
}
