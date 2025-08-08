package desafio.Neki.entity;

import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Skill {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String nome;

  @Column(nullable = false)
  private String imagemUrl;

  @Column(length = 500)
  private String descricao;

  @OneToMany(mappedBy = "skill", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonIgnore
  private List<UsuarioSkill> usuarios;

  public Skill() {}

  public Skill(String nome, String imagemUrl, String descricao) {
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

  public List<UsuarioSkill> getUsuarios() {
    return usuarios;
  }

  public void setUsuarios(List<UsuarioSkill> usuarios) {
    this.usuarios = usuarios;
  }

}
